const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    id :{
        type : String
    },
    pass:{
        type : String
    }
})

mongoose.model("cred" , schema)