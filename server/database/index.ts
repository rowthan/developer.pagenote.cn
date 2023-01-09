import mongoose from 'mongoose';

// Create cached connection variable
let connected = false

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
function connectToDatabase(uri?:string,readyOnly?:boolean) {
    if(connected){
        console.log('已连接，无需重复连接')
        return;
    }
    uri = uri || process.env.MONGODB_URI || '';
    if(readyOnly){
        uri = process.env.MONGODB_READONLY_URI || ''
    }
    mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // keepAlive: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        connected=true;
        console.log('db connected')
    });
}

export default connectToDatabase
