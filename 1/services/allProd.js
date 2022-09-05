let q = require('../databases/dbConnection')
let router = require('express').Router()
router.get("/allProd",(req,res)=>{
    q.execute("select * from products",(err,results)=>{
        if(!err){
            res.json({"message":"success","products":results});
        }
        else{
            res.json({"message":err});
        }
    })
})
module.exports = router