const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      await mongoose.connect(`mongodb+srv://huong:${process.env.MONGODB}@cluster0.riupw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
      console.log('Connected to MongoDB')
  } catch (error) {
      console.error(error)
      process.exit(1)
  }
}

connectDB()