import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../../libs/utils/config';

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
      //TODO: this line of code returns a truthy response whether there is a collection or not.
      const collection = this.client.db(clusterName).collection(collectionName);
      if (collection) {
        const deleteResult = await collection.deleteMany({});
        console.log('Deleted documents =>', deleteResult);
      }
      await this.disconnect();
    } catch (error) {
      console.log(
        `There was an issue loading the \"${collectionName}\" collection`
      );
      console.log(error);
      await this.disconnect();
    }
  }

  public static getClient(): MongoClient {
    return this.client;
  }
}

export default MongoDBHelper;
