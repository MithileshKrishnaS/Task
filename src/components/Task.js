import React,{useState} from 'react';
import { useEffect } from 'react';

var url="http://localhost:8081/"
const Task = () => {

    const [task,getTask]=useState([]);
    const [disp,dispTask]=useState([]);

    function postDetail()
    {
        var each={
            taskId:0,
            taskHolderName:'',
            taskDate:'',
            taskName:'',
            taskStatus:''
        }
        each.taskId=document.getElementById("tid").value;
        each.taskHolderName=document.getElementById("thname").value;
        each.taskDate=document.getElementById("tdate").value;
        each.taskName=document.getElementById("tname").value;
        each.taskStatus=document.getElementById("tstatus").value;
        console.log(each)
        fetch(url+"saveTask", {
            method: "POST",
            body: JSON.stringify(each),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then((json)=>{
            getTask(json)
        })
        document.getElementById("tid").value  =   '';
        document.getElementById("thname").value   =   '';
        document.getElementById("tdate").value  =   '';
        document.getElementById("tname").value =   '';
        document.getElementById("tstatus").value =   '';
    }

    function deletes(id)
    {       
        console.log(id);
        fetch(url+"deleteTask/"+id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then((json)=>{
            getTask(json)
        })
    }


    function dispName()
    {
        var id=document.getElementById("dname").value;
        fetch(url+"getTask/"+id)
        .then((res)=>res.json())
        .then((json)=>{
            dispTask(json)
        })
        document.getElementById("dname").value='';
    }

    function changeTask()
    {
        var each={
            id:0,
            status:''
        }
        each.id=document.getElementById("did").value;
        each.status=document.getElementById("ds").value;
        fetch(url+"changeTask/"+each.id, {
            method: "POST",
            body: JSON.stringify(each),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((json)=>{
            getTask(json)
        })
        document.getElementById("did").value='';
        document.getElementById("ds").value='';
    }
 
    useEffect(()=>{
        fetch(url+'alltasks')
        .then((res)=>res.json())
        .then((json)=>{
            getTask(json)
        })
    },[])

    return (
        <div>
            <h1>Task Manager</h1>
            <br></br>
            <div className="whole">
                <div className="each">
                    <h2>Add Task</h2>
                    <input type="text" placeholder="Task Id" id="tid"></input><br></br><br></br>
                    <input type="text" placeholder="Task Holder Name" id="thname"  ></input><br></br><br></br>
                    <input type="text" placeholder="Task Date" id="tdate" ></input><br></br><br></br>
                    <input type="text" placeholder="Task Name" id="tname"></input><br></br><br></br>
                    <input type="text" placeholder="Task Status" id="tstatus"></input><br></br><br></br>
                    <button onClick={postDetail}>SUBMIT</button> 
                </div>

                <div className="each">
                    <h2>Display By Holder Name</h2>
                    <input type="text" placeholder="Task Holder Name" id="dname"></input>
                    <br></br><br></br>
                    <button onClick={dispName}>SUBMIT</button> 
                    <br></br><br></br>                    
                </div>

                <div className="each">
                    <h2>Change Task Status</h2>
                    <input type="text" placeholder="Task Id" id="did"></input><br></br><br></br>
                    <input type="text" placeholder="Task Status" id="ds"></input><br></br><br></br>
                    <button onClick={changeTask}>SUBMIT</button> 
                </div>
            </div>
            <br></br><br></br><br></br>
            <div className="lr">
                <div><h2>All Data</h2></div>
                <div><h2>Display By Task Holder Name</h2></div>
            </div>
            <br></br>
            <div className="display">
                <div className="left">
                    {task.map((input,index)=>{
                        return(
                        <div className="each">
                            <div className="each-ele">
                                <p>ID : {input.taskId} </p>
                                <p>TASK HOLDER NAME : {input.taskHolderName} </p>
                                <p>DATE : {input.taskDate} </p>
                                <p>TASK NAME : {input.taskName} </p>
                                <p>TASK STATUS : {input.taskStatus} </p>
                            </div><br></br><br></br>
                            <button onClick={()=>{deletes(input.taskId)}}>DELETE</button>
                        </div>  )
                    })}
                </div>
                <div>
                    {disp.map((input,index)=>{
                                return(
                                <div className="each">
                                <div className="each-ele">
                                <p>ID : {input.taskId} </p>
                                <p>TASK HOLDER NAME : {input.taskHolderName} </p>
                                <p>DATE : {input.taskDate} </p>
                                <p>TASK NAME : {input.taskName} </p>
                                <p>TASK STATUS : {input.taskStatus} </p>
                                </div><br></br><br></br>
                                </div> )
                        })}
                </div>
            </div>
            <br></br><br></br>
        </div>
    )
}

export default Task
