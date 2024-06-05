const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const uri = process.env.DB_URL;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Set collection to use
        const collection = await client.db(process.env.DB_NAME).collection(process.env.COLLECTION);
        // Import GEOjson file
        const data = require(process.env.FILE_NAME);
        // Add items inside of features only
        const insertManyResult = await collection.insertMany(data.features);
        // Should print out 12 from the included geo.json file
        console.log(`Inserted ${insertManyResult.insertedCount} locations`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);