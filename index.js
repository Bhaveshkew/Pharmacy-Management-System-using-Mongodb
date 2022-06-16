const conn = require("./model");
const exp = require("express");
const app = exp();
const path = require("path");
const ehbs = require("express-handlebars");
const bodyp = require("body-parser")
const cont = require("./controllers/pharms")

app.use(bodyp.urlencoded({
    extended : true
}));
app.use(exp.json())

app.set('views' , path.join(__dirname , "/views/"));
app.engine("hbs" , ehbs({
    extname : "hbs",
    defaultLayout :"mainLayout",
    layoutsDir : __dirname+ "/views/layouts" 
}))

app.set("view engine" ,"hbs")

app.use("/pharmacy" , cont)
app.listen("3000" , ()=>{
    console.log("Server Started");
})