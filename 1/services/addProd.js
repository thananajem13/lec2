let q = require('../databases/dbConnection.js')
let routerExpress = require('express').Router()
routerExpress.post("/addProd",(req,res)=>{
    let {name,price,description} = req.body;
    q.execute(`insert into products (name,price,description) values ('${name}',${price},'${description}')`,(err,results)=>{ 
        if(!err){
            res.json({"message":"success","products":results});
        }
        else{
            console.log(err);
            res.json({"message":err});
        }
    })
})

module.exports = routerExpress