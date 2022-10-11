const mongoose = require('mongoose');
const { mongoURI } = require('./config');

mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log(err.message));