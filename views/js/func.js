const exp = require("express")
const app = exp();
const mongoose = require("mongoose")
const path = require("path");
const router = exp.Router();
const bodyp = require("body-parser")

const phm = mongoose.model('phm' , {
    dname: { type: String   },   
    dmfd: {type: String    },     
    dexpdt: { type: Date   },     
    dqty: { type: Number },       
    dprice: { type: Number }
});

router.use(bodyp.urlencoded({
    extended : true
}));
router.use(exp.json())

function edit(str){

}
function dele(){
    var td = event.target.parentNode;
    var tr = td.parentNode;
    //deldb('a')
    //console.log(nm)
    tr.parentNode.removeChild(tr);
    
}

function editdb(nm , mf , ex , qt , pr){
    var nw = {$set : {dmfd : mf , dexpdt : ex , dqty : qt , dprice : pr}}
    phm.updateOne({dname : {$eq : nm}} ,nw, function(er , doc){
        if(er){
            console.log("err")
        }
    })
}

function deldb(nm){
    phm.deleteOne({dname : {$eq : nm}}, function(er , doc){
        if(er){
            console.log("err")
        }
    })
}

function insdb(nm, mf , ex , qt , pr){
    phm.insertOne({dname : nm , dmfd : mf , dexpdt : ex , dqty : qt , dprice : pr}, function(er , doc){
        if(er){
            console.log("err")
        }
    })
}