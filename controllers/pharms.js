const exp = require("express")
const app = exp();
const mongoose = require("mongoose")
var conn = mongoose.connection;
const path = require("path");
const router = exp.Router();
const bodyp = require("body-parser");

const { RSA_NO_PADDING } = require("constants");

const credd = mongoose.model('credd' , {
    id : {type : String},
    pass : {type : String}
});

const phm = mongoose.model('phm' , {
    dname: { type: String   },   
    dmfd: {type: String    },         
    dqty: { type: Number,get: v => Math.round(),set: v => Math.round() },       
    dprice: { type: Number,get: v => Math.round(),set: v => Math.round() }
});

const pur = mongoose.model('pur' , {
    fname: { type: String   },   
    lname: { type: String   },
    email: {type: String    },         
    doctorr: { type: String },       
    dpurchase: { type: String },
    medn:{type :String},
    medq:{ type: Number,get: v => Math.round(),set: v => Math.round() }
});
router.use(bodyp.urlencoded({
    extended : true
}));
router.use(exp.json())

router.get("/stock" , (req,res)=>{
    conn.collection("phms").find().toArray(function(er , d){
        console.log(d)
        if(er){
            console.log("Error")
        }
        else{
            res.render("ins_up_del" , {data : d})
        }
    })
})


router.get("/receipt" , (req,res) =>{
    conn.collection("phms").find().toArray(function(er , d){
        console.log(d)
        if(er){
            console.log("Error")
        }
        else{
            res.render("receipt" , {data : d})
        }
    })
})

router.post("/receipt" , (req,res)=>{
    var q = {fname: req.body.fname,   lname:req.body.lname  ,email:req.body.email, doctorr:req.body.doctorr, dpurchase: req.body.dpurchase,medn:req.body.medn ,medq:req.body.medq  }
    conn.collection("purs").insertOne(q , function(err ,docs){
        if(err){
            console.log(err)
        }else{
            
            var x = parseInt(req.body.medq)
            
            console.log(x)
            conn.collection("phms").findOne({dname :req.body.medn}, function(er , d){
                if(!er){
                    var y = (parseInt(d.dqty)-x)
                    conn.collection("phms").updateOne({dname :req.body.medn} , {$set :{dqty : y}},function(err , doc){
                        if(!err){
                            console.log("Stock Updated")
                            res.render("receipt")
                        }
                    })
                }
                else{
                    console.log(er)
                }
            })
           
        }
    })
})

router.get("/ins" , (req,res)=>{
    res.render("ins")
})
router.get("/data" , (req,res)=>{
    conn.collection("purs").find().toArray(function(er , d){
        if(!er)
        {console.log(d);
            res.render("purdata" , {data : d})}
    })
})
router.post("/data" , (req,res)=>{
    conn.collection("purs").find().toArray(function(er , d){
        if(!er)
        {console.log(d);
            res.render("purdata" , {data : d})}
    })
})
router.post("/ins" , (req,res)=>{
    var a = req.body.dname
    var b = req.body.dmfd
    var c = (req.body.dqty)
    var d = (req.body.dprice)
    var q = {dname : req.body.dname , dmfd : req.body.dmfd , dqty :req.body.dqty , dprice : req.body.dprice };
    conn.collection("phms").insertOne(q , function(er , d){
        console.log(d);
        if(er){
            console.log("Error")
        }
        else{
            res.redirect("/pharmacy/stock");
        }
    });
});

router.post("/up" , (req,res)=>{
    var a = req.body.dname
    var b = req.body.dmfd
    var c = req.body.dqty
    var d = req.body.dprice
    var q = {dname : req.body.dname }
    var nq = {$set : {dmfd : req.body.dmfd , dqty :req.body.dqty , dprice : req.body.dprice }}
    conn.collection("phms").updateOne(q , nq , function(er , d){
        console.log(d);
        if(er){
            console.log("Error")
        }
        else{
            res.redirect("/pharmacy/stock");
        }
    });
});

router.get("/up" , (req,res)=>{
    res.render("up")
})
router.get("/del" , (req,res)=>{
    res.render("del")
})

router.post("/del" , (req,res)=>{
    var a = req.body.dname
    
    var q = {dname : req.body.dname }
    
    conn.collection("phms").deleteOne(q, function(er , d){
        console.log(d);
        if(er){
            console.log("Error")
        }
        else{
            res.redirect("/pharmacy/stock");
        }
    });
});






router.get("/login" , (req,res)=>{
    res.render("index")
})
router.post("/login" , (req,res)=>{
    
    console.log(req.body)
    var a = req.body.username
    var b = req.body.password
    var que = {$and : [{id : {$eq : a}} , {pass : {$eq : b}}]}
    credd.find(que , function(err , docs){
        if(err){
            console.log("Error")
        }
        else{
            if (docs.length == 0){
                res.render("invcred")
            }
            else{
                console.log("Logged in ")
                res.redirect("/pharmacy/stock")
            }
        }
    })

})


router.use(exp.static(path.join(__dirname , 'public')));

module.exports = router;