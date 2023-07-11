import { MongoBulkWriteError, MongoClient, ServerApiVersion } from 'mongodb';
import config from '../../libs/utils/config';
import { validationSchemas } from './collectionSchemas';
import { mockUsers } from './mockData';

class MongoDBHelper {
  private static connectionString: string = config.MONGODB_URI;
  private static client: MongoClient = this.generateMongoClient();
  private static generateMongoClient(): MongoClient {
    return new MongoClient(this.connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  public static async connect(): Promise<MongoClient | void> {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      const db = await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      );
      return db;
    } catch (error) {
      console.log('There was an issue connecting to MongoDB');
      console.log(error);
    }
  }

  public static async disconnect(): Promise<MongoClient | void> {
    try {
      return await this.client.close();
    } catch (error) {
      console.log(error);
    }
  }
  public static async loadCollection(
    collectionName: string,
    clusterName: string
  ) {
    try {
      await this.connect();
      const dbClient = this.client.db(clusterName);

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
        validationSchemas.userValidationSchema
      );
      console.log('Created Collection =>', newUsrCollection.namespace);
      const insertionResult = await newUsrCollection.insertMany(mockUsers);
      console.log(
        'Inserted mock data into collection =>',
        insertionResult.insertedCount
      );
      await this.disconnect();
    } catch (error) {
      console.log(
        `There was an issue loading the \"${collectionName}\" collection`
      );
      if (error instanceof MongoBulkWriteError) {
        console.log(
          error.writeErrors[0].err.errInfo.details.schemaRuleNotSatisfied
        );
      }
      console.log(error);
      await this.disconnect();
    }
  }

  public static getClient(): MongoClient {
    return this.client;
  }
}

export default MongoDBHelper;
