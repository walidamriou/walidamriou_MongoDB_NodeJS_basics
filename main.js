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
const dbName = 'userdb';

// Connect to MongoDB using a url
MongoClient.connect(url, 
    // If we are using version >= 3.1.0 this part required
    {useNewUrlParser: true,useUnifiedTopology: true}, 
    (err, client) => {
    if(err){
        throw err;
        // Go out from connect when there is an error
        return;
    }

    console.log('Database connection successful');

    // Create a db instance sharing the current socket connections
    const db = client.db(dbName);
    
    // Close the db and its underlying connections
    client.close(
        (err, client) => {
            if(err){
                throw err;
                // Go out from connect when there is an error
                return;
            }
            console.log('Database connection successful close');
        }
    );
    }
);