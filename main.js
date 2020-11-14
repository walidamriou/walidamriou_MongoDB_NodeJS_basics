/* 
walidamriou_MongoDB_NodeJS_basics
A small project to introduce MongoDB with NodeJS

https://github.com/walidamriou/walidamriou_MongoDB_NodeJS_basics

Developed by: Walid Amriou
Last update: November 2020
*/

// import MongoDB module:
const mongodb = require('mongodb');

// Instantiate a client
const MongoClient = mongodb.MongoClient;

// Connecting to the Database

// Connection URL 
const url = 'mongodb://localhost:27017'; // The localhost is 127.0.0.1

// Database Name
const DatabaseName = 'walidamriou_MongoDB_NodeJS_basics';

// Connect to MongoDB using a url
MongoClient.connect(url, 
    // If we are using version >= 3.1.0 this part required
    {useNewUrlParser: true,useUnifiedTopology: true}, 
    (err, client) => {
    if(err){
        // NodeJS will throw an exception (throw an error). It will actually create an Error 
        // object with two properties: name and message.
        throw err;
        // Go out from connect when there is an error
        return;
    }

    console.log('Database connection successful');

    // Create a db instance sharing the current socket connections
    const db = client.db(DatabaseName);
        
    if(CheckACollectionIfexist(db, DatabaseName, "friends") === 0){
        CreateACollection(db, dbName, collectionName);
        // Close the db and its underlying connections
        client.close((err) => {
            if(err){
                throw err;return;
            }
            console.log('Database connection successful close');
        });
    }
});

// Function to check a collection if exist
function CheckACollectionIfexist(db, dbName, collectionName){
    db.listCollections().toArray(function(err, items) {
        let CollectionsNumber = items.length;
        let CollectionExist = 0;
        for(let i=0;i<CollectionsNumber;i++){
            if(items[i].name == collectionName){
                CollectionExist = 1;
            }
        }
        if(CollectionExist === 1 ){
            console.log("Collection exist!\n");
            return 1;
        } 
        else {
            return 0;
        }
    })
}

// Function to create a collection
function CreateACollection(db, dbName, collectionName){
    db.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
};

