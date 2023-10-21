import {
  Collection,
  CollectionInfo,
  CreateCollectionOptions,
  Filter,
  MongoClient,
  ServerApiVersion,
} from 'mongodb';
import config from '../../libs/utils/config';
import color from 'colors';
import { Playlist, User } from './models/User';
import MongoDBErrorHandler from '../errorHandlers/MongoDBErrorHandler';
import BaseError from '../errorHandlers/BaseError';
import OAuth from 'oauth2-server';
export class MongoDBHelper {
  private static connectionString: string =
    config.NODE_ENV == 'test' ? config.MONGODB_URI_TEST : config.MONGODB_URI;
  private static cluster = 'cluster0';
  private static client: MongoClient = this.generateMongoClient();
  private static generateMongoClient(): MongoClient {
    console.log('Connecting to MongoDB');
    console.log(config.MONGODB_URI);
    const db = new MongoClient(this.connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    return db;
  }
  public static async connect(): Promise<MongoClient | void> {
    try {
      const db = await this.client.connect();
      db;
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 });
      /*   console.log(
        color.green(
          'Pinged your deployment. You successfully connected to MongoDB!'
        ) 
      );*/
      return db;
    } catch (error: any) {
      console.log(
        color.underline.red('There was an issue connecting to MongoDB'.red)
      );
      throw new MongoDBErrorHandler(error);
    }
  }

  public static async disconnect(): Promise<MongoClient | void> {
    try {
      return await this.client.close();
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    }
  }
  public static async clearCollection(collectionName: string) {
    try {
      await this.connect();
      const dbClient = this.client.db(this.cluster);
      const collection = dbClient.collection(collectionName);
      const result = await collection.deleteMany({});
    } catch (error) {
      console.log(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async loadCollection(
    collectionName: string,
    collectionSchema: CreateCollectionOptions,
    mockData?: any
  ) {
    try {
      await this.connect();

      const dbClient = this.client.db(this.cluster);

      const usrCollection = (await dbClient.listCollections().toArray()).filter(
        (collection) => collection.name === collectionName
      );
      // If the collection exists, we drop it.
      //It if doesn't exist, we don't drop it, and go straight to creating it
      if (usrCollection.length > 0) {
        const deleteResult = await dbClient.dropCollection(collectionName);
        //console.log('Dropped Collection =>', deleteResult);
      }
      // Creating collection
      const newUsrCollection = await dbClient.createCollection(
        collectionName,
        collectionSchema
      );
      //console.log('Created Collection =>', newUsrCollection.namespace);
      const insertionResult = await newUsrCollection.insertMany(mockData);
      /*console.log(
        'Inserted mock data into collection =>',
        insertionResult.insertedCount
      );
      */
      insertionResult.insertedIds;
    } catch (error) {
      console.log(
        `There was an issue loading the "${collectionName}" collection`
      );
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async findUser(spotifyID: string): Promise<User | null> {
    try {
      await this.connect();
      const userCollection = this.client
        .db('cluster0')
        .collection<User>('users');
      const user: User = await userCollection.findOne({
        spotifyID: spotifyID,
      });
      if (user === null) {
        throw new Error('No user found');
      }
      return user;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async findUsers(): Promise<User[] | Error> {
    try {
      await this.connect();
      const userCollection = this.client
        .db('cluster0')
        .collection<User>('users');
      const users: User[] = await userCollection.find().toArray();
      if (users.length === 0) {
        throw new Error('No users found');
      }
      return users;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }

  public static getClient(): MongoClient {
    return this.client;
  }
  public static async findToken(token: string) {
    try {
      await this.connect();
      const tokenCollection = this.client
        .db('cluster0')
        .collection<OAuth.Token>('tokens');
      const tkn: OAuth.Token = await tokenCollection.findOne({
        accessToken: token,
      });
      if (tkn === null) {
        throw new Error('No token found');
      }
      return tkn;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async findClient(clientId: string) {
    try {
      await this.connect();
      const clientCollection = this.client
        .db('cluster0')
        .collection<OAuth.Client>('tokens');
      const client: OAuth.Client = await clientCollection.findOne({
        clientId: clientId,
      });
      if (client === null) {
        throw new Error('No client found');
      }
      return client;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async saveAccessToken(
    accessToken: OAuth.Token
  ): Promise<OAuth.Token> {
    try {
      await this.connect();
      const tokenCollection = this.client
        .db('cluster0')
        .collection<OAuth.Token>('tokens');
      const result = await tokenCollection.insertOne(accessToken);
      if (result.insertedId === null) {
        throw new Error('Failed to insert token');
      }
      return accessToken;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
}

export class Model<T extends User | Playlist> {
  private dbClient: MongoClient = MongoDBHelper.getClient();
  private model: string;
  constructor(model: string) {
    this.model = model;
  }

  public async findDocument(
    query: Filter<T>,
    collectionName: CollectionInfo
  ): Promise<T> {
    try {
      await this.dbClient.connect();
      const collection = (await this.findCollection(
        collectionName
      )) as Collection<T>;
      const document = await collection.findOne(query);
      return document as T;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.dbClient.close();
    }
  }

  private async findCollection(
    collectionName: CollectionInfo
  ): Promise<Collection<T>> {
    try {
      const collections = await this.dbClient
        .db('cluster0')
        .listCollections()
        .toArray();

      if (
        collections.filter(
          (collection) => collection.name === collectionName.name
        ).length == 0
      ) {
        throw new Error('Collection not found');
      }

      const collection: Collection<T> = this.dbClient
        .db('cluster0')
        .collection(collectionName.name);

      return collection;
    } catch (error) {
      throw new MongoDBErrorHandler(error);
    }
  }

  public async deleteDocument(
    query: Filter<T>,
    collectName: CollectionInfo
  ): Promise<T> {
    try {
      await this.dbClient.connect();
      const collection = await this.findCollection(collectName);
      const document = await collection.findOneAndDelete(query);
      if (document === null) {
        throw new BaseError(
          'No document found',
          404,
          `No document found with the query ${query}`,
          true
        );
      }

      return document.value as T;
    } catch (error) {
      console.log(error);
    } finally {
      await this.dbClient.close();
    }
  }
}

export default MongoDBHelper;
