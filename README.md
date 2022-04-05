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

