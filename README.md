# learn-mongodb

## We have some schema types:
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
```s
Boolean: Dùng để lưu giữ một giá trị Boolean
Double: Dùng để lưu các trị số thực dấu chấm động.
Chuỗi: Dùng để lưu trữ dữ liệu, thường là các chuỗi là UTF-8 hợp lệ.
Số nguyên: Dùng để lưu các giá trị số 32 bit – 64 bit, tùy thuộc vào Máy chủ của bạn.
Min/Max keys: Dùng để so sánh giá trị của các phần tử BSON thấp nhất – cao nhất.
Timestamp: Để đánh dấu thời điểm các Document đã được chỉnh sửa.
Object: Sử dụng khi nhúng các Document vào.
Mảng: Dùng để lưu các giá trị, mảng hay danh sách vào một key.
Null: Dùng để lưu một giá trị Null.
Code: Dùng để lưu JavaScript code vào Document.
Regular expression: Dùng để lưu trữ Regular Expression.
Symbol: Hoạt động như một chuỗi.
Date: Được sử dụng để lưu thời gian (Date & Time) hiện tại.
Object ID: Để lưu ID của Document.
Binary data: Để lưu dữ liệu nhị phân.
```
## All Schema types
[Reference Link](https://mongoosejs.com/docs/timestamps.html)
- required: boolean or function, if true adds a required validator for this property
- default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
- select: boolean, specifies default projections for queries
- validate: function, adds a validator function for this property
- get: function, defines a custom getter for this property using Object.defineProperty().
- set: function, defines a custom setter for this property using Object.defineProperty().
- alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.
- immutable: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has isNew: true.
- transform: function, Mongoose calls this function when you call Document#toJSON() function, including when you JSON.stringify() a document.
## Convert from Scheme to model
```javascript
var User = mongoose.model('User', user);

example:
// Khởi tạo một Schema
var animalSchema = new Schema({ name: String, type: String });
```

### Instance methods trong Mongoose
```javascript 
// Gán một hàm cho object 'methods' của animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model("Animal").find({ type: this.type }, cb);
};
```

### Schema Statics trong Mongoose
```javascript 
// Tạo một statics function bằng cách thêm một object
animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, "i") });
};
// hoặc thêm bằng cách gọi một hàm.
animalSchema.static("findByBreed", function(breed) {
  return this.find({ breed });
});
 
const Animal = mongoose.model("Animal", animalSchema);
let animals = await Animal.findByName("fido");
animls = animals.concat(await Animal.findByBreed("Poodle"));
};
```

### Query Helper
```javascript
animalSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};
 
var Animal = mongoose.model('Animal', animalSchema);
 
Animal.find().byName('fido').exec(function(err, animals) {
  console.log(animals);
});
 
Animal.findOne().byName('fido').exec(function(err, animal) {
  console.log(animal);
});
```

###  Virtuals
```javascript
// Chỉ định một Schema
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
 
// Đưa nó vào một Modal
var Person = mongoose.model('Person', personSchema);
 
// Tiến hành tạo môt document
var axl = new Person({
  name: { first: '', last: 'Rose' }
});
```
### Query Building
```javascript
UserModel.find()                       // find all users
         .skip(100)                    // skip the first 100 items
         .limit(10)                    // limit to 10 items
         .sort({firstName: 1}          // sort ascending by firstName
         .select({firstName: true}     // select firstName only
         .exec()                       // execute the query
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
```


### Aggregation
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fp8ONk%2FbtqzHbgP92T%2FIyaGVUX2U8qX8mBPPBFQ9K%2Fimg.png" width="500">

[Link](https://junho94.tistory.com/11)


### Collection Method
[Reference Link](https://github.com/PerfectlySoft/PerfectDocs/blob/master/guide/MongoDB-Collections.md) <br>
[Reference Link](https://www.mongodb.com/docs/manual/reference/method/js-collection/)
[Reference Link](https://poiemaweb.com/mongoose)
[Reference Link](https://incheol-jung.gitbook.io/docs/study/nodejs/2018-01-16-nodejs-5st)

- db.collection.aggregate(): Provides access to the aggregation pipeline.
- db.collection.bulkWrite(): Provides bulk write operation functionality.
- db.collection.count(): Wraps count to return a count of the number of documents in a collection or a view.
- db.collection.countDocuments(): Wraps the $group aggregation stage with a $sum expression to return a count of the number of documents in a collection or a view.
- db.collection.createIndex(): Builds an index on a collection.
- db.collection.createIndexes(): Builds one or more indexes on a collection.
- db.collection.dataSize(): Returns the size of the collection. Wraps the size field in the output of the collStats.
- db.collection.deleteOne(): Deletes a single document in a collection.
- db.collection.deleteMany(): Deletes multiple documents in a collection.
- db.collection.distinct(): Returns an array of documents that have distinct values for the specified field.
- db.collection.drop(): Removes the specified collection from the database.
- db.collection.dropIndex(): Removes a specified index on a collection.
- db.collection.dropIndexes(): Removes all indexes on a collection.
- db.collection.ensureIndex(): Removed. Use - db.collection.createIndex().
- db.collection.estimatedDocumentCount(): Wraps count to return an approximate count of the documents in a collection or a view.
- db.collection.explain(): Returns information on the query execution of various methods.
- db.collection.find(): Performs a query on a collection or a view and returns a cursor object.
- db.collection.findAndModify(): Atomically modifies and returns a single document.
- db.collection.findOne(): Performs a query and returns a single document.
- db.collection.findOneAndDelete(): Finds a single document and deletes it.
- db.collection.findOneAndReplace(): Finds a single document and replaces it.
- db.collection.findOneAndUpdate(): Finds a single document and updates it.
- db.collection.getIndexes(): Returns an array of documents that describe the existing indexes on a collection.
- db.collection.getShardDistribution(): For collections in sharded clusters, - db.collection.getShardDistribution() reports data of chunk distribution.
- db.collection.getShardVersion(): Internal diagnostic method for sharded cluster.
- db.collection.hideIndex(): Hides an index from the query planner.
- db.collection.insertOne(): Inserts a new document in a collection.
- db.collection.insertMany(): Inserts several new document in a collection.
- db.collection.isCapped(): Reports if a collection is a capped collection.
- db.collection.latencyStats(): Returns latency statistics for a collection.
- db.collection.mapReduce(): Performs map-reduce style data aggregation.
- db.collection.reIndex(): Rebuilds all existing indexes on a collection.
- db.collection.remove(): Deletes documents from a collection.
- db.collection.renameCollection(): Changes the name of a collection.
- db.collection.replaceOne(): Replaces a single document in a collection.
- db.collection.stats(): Reports on the state of a collection. Provides a wrapper around the collStats.
- db.collection.storageSize(): Reports the total size used by the collection in bytes. Provides a wrapper around the storageSize field of the collStats output.
- db.collection.totalIndexSize(): Reports the total size used by the indexes on a collection. Provides a wrapper around the totalIndexSize field of the collStats output.
- db.collection.totalSize(): Reports the total size of a collection, including the size of all documents and all indexes on a collection.
- db.collection.unhideIndex(): Unhides an index from the query planner.
- db.collection.updateOne(): Modifies a single document in a collection.
- db.collection.updateMany(): Modifies multiple documents in a collection.
- db.collection.watch(): Establishes a Change Stream on a collection.
- db.collection.validate(): Performs diagnostic operations on a collection.