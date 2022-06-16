const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pharmacy" , {useNewUrlParser :true }, (error) => {
    if(!error){
        console.log("SUCCESS");
    }
    else{
        console.log("Error connecting to database.");
    }
});

const ph = require("./pharm.model"); 
