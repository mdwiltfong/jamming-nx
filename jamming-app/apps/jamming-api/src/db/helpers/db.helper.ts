import {
  Collection,
  CollectionInfo,
  Condition,
  CreateCollectionOptions,
  Filter,
  MongoClient,
  ObjectId,
  ServerApiVersion,
  WithId,
} from 'mongodb';
import config from '../../libs/utils/config';
import color from 'colors';
import { Playlist, User } from './models/User';
import MongoDBErrorHandler from '../errorHandlers/MongoDBErrorHandler';
class MongoDBHelper {
  private static connectionString: string = config.MONGODB_URI;
  private static cluster: string = 'cluster0';
  private static client: MongoClient = this.generateMongoClient();
  private static generateMongoClient(): MongoClient {
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
      console.log(
        color.green(
          'Pinged your deployment. You successfully connected to MongoDB!'
        )
      );
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
  public static async loadCollection(
    collectionName: string,
    collectionSchema: CreateCollectionOptions,
    mockData: any
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
        console.log('Dropped Collection =>', deleteResult);
      }
      // Creating collection
      const newUsrCollection = await dbClient.createCollection(
        collectionName,
        collectionSchema
      );
      console.log('Created Collection =>', newUsrCollection.namespace);
      const insertionResult = await newUsrCollection.insertMany(mockData);
      console.log(
        'Inserted mock data into collection =>',
        insertionResult.insertedCount
      );
      insertionResult.insertedIds;
    } catch (error) {
      console.log(
        `There was an issue loading the \"${collectionName}\" collection`
      );
      throw new MongoDBErrorHandler(error);
    } finally {
      await this.disconnect();
    }
  }
  public static async findUser(
    userId: Condition<ObjectId>
  ): Promise<User | null> {
    try {
      await this.connect();
      const userCollection = this.client.db('cluster0').collection('users');
      const user: User = (await userCollection.findOne(userId)) as User;
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
      const userCollection = this.client.db('cluster0').collection('users');
      const users: User[] = (await userCollection.find().toArray()) as User[];
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
      if (document === null) {
        throw new Error('No user found');
      }
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
    } finally {
    }
  }

  public async deleteDocument(
    query: Filter<T>,
    collectName: CollectionInfo
  ): Promise<User> {
    try {
      await this.dbClient.connect();
      const collection = await this.findCollection(collectName);
      const document = await collection.findOneAndDelete(query);
      if (document === null) {
        throw new Error('No user found');
      }
      console.log(document);
      return document.value as User;
    } catch (error) {
    } finally {
      await this.dbClient.close();
    }
  }
}

export default MongoDBHelper;
