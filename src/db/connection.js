const mongoose = require("mongoose");

// mongoose.connect('mongodb://'+config.host+':'congig.port+'/'+config.db,)
mongoose.connect("mongodb://localhost:27017/starkdatabase",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is Successfull.");
}).catch((error)=>{
   console.log(error);
})