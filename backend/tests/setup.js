//to create a mock db in my tests
//Mongoose documentation
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server"); //(https://github.com/nodkz/mongodb-memory-server)

//this declares mongoServer for use in setup and teardown
let mongoServer;

// Before all tests, start the in-memory MongoDB server and connect
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); //(https://github.com/nodkz/mongodb-memory-server#usage)
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

 // Clear the database before each test
 beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

// After all tests, disconnect and stop the server
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
 