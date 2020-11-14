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
    
    CreateACollection(db, DatabaseName, "friends");

    // Close the db and its underlying connections
    /*
    client.close(
        (err) => {
            if(err){
                throw err;
                // Go out from connect when there is an error
                return;
            }
            console.log('Database connection successful close');
        }
    );
            */

    }
);

function CreateACollection(db, dbName, collectionName){
    
    db.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
};

function CheckACollectionIfexist(){

};
