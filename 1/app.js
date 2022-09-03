let express = require('express');
let mysql = require('mysql2');
let app = express();
let cors = require('cors')
app.use(cors())
let q = mysql.createConnection({
    database:"crudops",
    password:"",
    user:"root",
    host:"localhost"
});
q.connect((err) => {
    if (!err) {
        console.log("DB has connected successfully");
    }
    else {
        console.log("DB hasn't connected successfully");

    }
})
app.use(express.json());
app.get("/allProd",(req,res)=>{
    q.execute("select * from products",(err,results)=>{
        if(!err){
            res.json({"message":"success","products":results});
        }
        else{
            res.json({"message":err});
        }
    })
})

app.post("/addProd",(req,res)=>{
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
app.delete("/deleteProd",(req,res)=>{
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
app.put("/updateProd",(req,res)=>{
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
app.all("*",(req,res)=>{
    res.json({msg:"404 notfound"})
})
app.listen(5000);