const mongoose = require('mongoose')

const connectDB = async () => {
   mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   console.log('mongodb connected')
 
}

module.exports = connectDB;