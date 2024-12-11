//to create a mock db in my tests

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Before all tests, start the in-memory MongoDB server and connect
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After all tests, disconnect and stop the server
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  // Clear the database before each test
  beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
  