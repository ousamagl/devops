import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import l from './logger';

export class DbHandler {
  public mongod;

  constructor() {
    if (process.env.NODE_ENV == 'test') {
      this.mongod = new MongoMemoryServer();
    }
  }

  /**
   * Connect to the in-memory database.
   */
  public async connect() {
    let uri = `${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD)
      uri =
        `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@` + uri;
    uri = 'mongodb://' + uri;
    if (this.mongod) {
      uri = await this.mongod.getUri(`${process.env.MONGO_DB}`);
    }
    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(uri, mongooseOpts);
  }

  /**
   * Drop database, close the connection and stop mongod.
   */
  closeDatabase = async () => {
    l.info('Closing DataBase Connection');
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  };

  /**
   * Remove all the data for all db collections.
   */
  clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    l.info('Clearing DataBase');
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };
}

export default new DbHandler();
