const mongoose = require('mongoose')


async function connectDB() {
    const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV
    try {
        await mongoose.connect(uri, {})
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    connectDB
}