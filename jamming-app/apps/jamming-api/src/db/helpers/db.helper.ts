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
  public static async connect(): Promise<void> {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      );
    } finally {
      // Ensures that the this.client will close when you finish/error
      await this.client.close();
    }
  }
}

export default MongoDBHelper;
