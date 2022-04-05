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