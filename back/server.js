const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));  
const Sequelize = require('sequelize'); 
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

const sequelize =   new Sequelize('house','root','manager,',{
    dialect:'mysql',
    host:'localhost'
})

const Task = sequelize.define("task",{
    taskId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    taskHolderName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    taskDate:{
        type: Sequelize.STRING,
        allowNull: false
    },
    taskName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    taskStatus:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync()
    .then((result)=>{
        console.log('synced')
    })
    .catch((err)=>{
        console.log(err)
    })

function gettask(req,res){
    Task.findAll().then(result => {  
        console.log(result)     
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
}

app.get("/",(req,res)=>{
    // create table
    // let sql='CREATE TABLE task (taskId INT NOT NULL,taskHolderName varchar(255),taskDate varchar(255),taskName varchar(255),taskStatus varchar(255), PRIMARY KEY (taskId));';
    // con.query(sql,(err,result)=>{
    //     if (err) throw err
    //     console.log('displayed');
    // })
    res.send('server running');
})

//insert
app.post('/saveTask', function(req, res){
    var data=req.body;
    data.taskId=Number(data.taskId);
    Task.create({ 
    taskId:data.taskId,
    taskHolderName:data.taskHolderName,
    taskDate:data.taskDate,
    taskName:data.taskName,
    taskStatus:data.taskStatus,
    }).then(result => {       
        gettask(req,res)
    })
});

//display
app.get('/alltasks', function(req, res){
    Task.findAll().then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//display by task holder name
app.get('/getTask/:name', function(req, res){
    Task.findAll({where:{taskHolderName:req.params.name}}).then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//delete by id
app.post('/deleteTask/:id', function(req, res){
    Task.destroy({where:{taskId:req.params.id}}).then(result => {       
        gettask(req,res)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//update by id
app.post('/changeTask/:id', function(req, res){
    let task=req.body;
    Task.update(
    {taskStatus:task.status},
    {where:{taskId:task.id}}
    )
    .then((result)=>{
        gettask(req,res)
    })
});