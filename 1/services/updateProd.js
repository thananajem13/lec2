let q = require('../databases/dbConnection')
let router = require('express').Router()
router.put("/updateProd",(req,res)=>{
    let {id,name,description,price} = req.body;
    q.execute(`update products set name='${name}',description='${description}',price=${price}  where id = ${id}`,(err,results)=>{
        if(!err){
            res.json({"message":"success","products":results});
        }
        else{
            res.json({"message":err});
        }
    });
});
module.exports = router