let q = require('../databases/dbConnection')
let router = require('express').Router()
router.delete("/deleteProd",(req,res)=>{
    let {id} = req.body;
    q.execute(`delete from products  where id = ${id}`,(err,results)=>{
        if(!err){
            res.json({"message":"success","products":results});
        }
        else{
            res.json({"message":err});
        }
    });
});
module.exports = router