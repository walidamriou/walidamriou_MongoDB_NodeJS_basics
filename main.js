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
// Database Name
const DatabaseName = 'walidamriou_MongoDB_NodeJS_basics';
// Collection name
const CollectionName = "friends";
// mongodb server local / Connection URL 
const url = 'mongodb://localhost:27017'; // The localhost is 127.0.0.1



// Connecting to the Database

// Connect to MongoDB using a url
MongoClient.connect(url, 
    // If we are using version >= 3.1.0 this part required
    {useNewUrlParser: true,useUnifiedTopology: true}, 
    (err, client) => {
    if(err){
        // NodeJS will throw an exception (throw an error). It will actually create an Error object with two properties: name and message.
        throw err;
        // Go out from connect when there is an error
        return;
    }

    console.log('Database connection successful');

    // Create a db instance sharing the current socket connections
    const db = client.db(DatabaseName);

    // check if "Friends" exist, and if not exist, so create it! 
    if(CheckACollectionIfexist(db, DatabaseName, CollectionName) === 0){
        CreateACollection(db, dbName, collectionName);
        // Close the db and its underlying connections
        client.close((err) => {
            if(err){
                throw err;return;
            }
            console.log('Database connection successful close');
        });
    }

    // Insert one document

    let ThedataWantInsert = { name: "Hanson", age: 37 };
    InsertOneDocument(db,CollectionName,ThedataWantInsert);
    
    // Insert multi data 
    // Note tthat when we don't specify an _id field, then MongoDB will add one for you and assign a unique 
    // id for each document.

    let TheMultidataWantInsert = [
      { name: 'Martyn', age: 15},
      { name: 'Abdulrahman', age: 22},
      { name: 'Leona', age: 60},
      { name: 'Myrtle', age: 20},
      { name: 'Michael', age: 35},
      { name: 'Adelina', age: 40},
      { name: 'Sila', age: 26},
      { name: 'Ross', age: 85},
      { name: 'Tariq', age: 23},
      { name: 'Darcie', age: 10},
      { name: 'Ben', age: 13},
      { name: 'William', age: 96}
    ];

    InsertMultipleDocument(db,CollectionName,TheMultidataWantInsert);


    // specify the _id field of the data that we want to insert 
    // Note that to test this part you need to remove the database
    // because you can't create a data with the same id
    let TheMultidataWantInsert2 = [
        { _id: 112,name: 'Martyn', age: 11},
        { _id: 110,name: 'Abdulrahman', age: 25},
        { _id: 111,name: 'Leona', age: 52},
        { _id: 120,name: 'Sila', age: 14},
        { _id: 002,name: 'Michael', age: 6},
        { _id: 113,name: 'Adelina', age: 45},
        { _id: 200,name: 'Sila', age: 50}
    ];
    
    //InsertMultipleDocument(db,CollectionName,TheMultidataWantInsert2);

    //DisplayAllCollection(db,CollectionName);
    // Display all element has 'Martyn' as a name 
    //DisplayElementCollection(db,CollectionName,'Martyn');
    // To find only the documents where the "name" field starts with the letter "M"
    //DisplayElementCollection(db,CollectionName,{name:/^M/});
    // Display all element has age: 50 
    //DisplayPartfromCollection(db,CollectionName);
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

// Insert one document
function InsertOneDocument(db,collectionName,Thedata){
    db.collection(collectionName).insertOne(Thedata, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        // The result object contains information about how the insertion affected the database
        console.log(result.ops);
        //db.close();
    });
}

// Insert Multiple Documents
function InsertMultipleDocument(db,collectionName,Thedata){
    db.collection(collectionName).insertMany(Thedata, function(err, result) {
        if (err) throw err;
        console.log("Number of documents inserted: " + result.insertedCount);
        //db.close();
    });
}

function DisplayAllCollection(db,collectionName){
    db.collection(CollectionName).find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        //db.close();
      });
}

// find with Query, TheElement is Query
function DisplayElementCollection(db,collectionName,TheElement){
    db.collection(CollectionName).find({TheElement}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        //db.close();
      });
}

// The projection object describes which fields to include in the result
// specify the fields by 0 or 1 
function DisplayPartfromCollection(db,collectionName){
    db.collection(CollectionName).find({}, { projection: {_id:0,age:1} }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        //db.close();
      });
}

