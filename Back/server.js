const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )
app.listen(port, () => console.log(`listening on port ${port}!`));
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use(cors(
    {
        origin: "*",
    }
))

var con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6469791",
    password: "7HNQyWi9n8",
    database:"sql6469791"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/",(req,res)=>{
    // create table
    // let sql='CREATE TABLE task (taskId INT NOT NULL,taskHolderName varchar(255),taskDate varchar(255),taskName varchar(255),taskStatus varchar(255), PRIMARY KEY (taskId));';
    // con.query(sql,(err,result)=>{
    //     if (err) throw err
    //     console.log('displayed');
    // })
    // res.send('server running');
})

//insert task
app.post('/saveTask', function(req, res){
    var data=req.body;
    console.log(data)
    data.taskId=Number(data.taskId);
    console.log(data);
    let sql='INSERT INTO task SET ?';
    con.query(sql,data,(err,result)=>{
        if (err) throw err
        res.send("data added")
    })
});

//display
app.get('/alltasks', function(req, res){
    let sql='SELECT * FROM task';
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('displayed');
        res.json(result)
    })
});

//display by id
app.get('/getHouse/:id', function(req, res){
    let sql=`SELECT * FROM house WHERE houseId = ${req.params.id}`;
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        res.send(result)
    })
});

//display by task holder name
app.get('/getTask/:name', function(req, res){
    console.log(req.params.name)
    let sql="SELECT * FROM task WHERE taskHolderName ='"+req.params.name+"'";
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        res.send(result)
    })
});

//delete by id
app.post('/deleteTask/:id', function(req, res){
    let sql=`DELETE FROM task WHERE taskId = ${req.params.id}`;
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('deleted');
        res.send(result)
    })
});

//update by id
app.post('/changeTask/:id', function(req, res){
    let task=req.body;
    let sql=`UPDATE task SET taskStatus='${task.status}' WHERE taskId=${task.id}`;
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('updated');
        res.send(result)
    })
});