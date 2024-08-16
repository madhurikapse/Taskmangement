import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import toast from "react-hot-toast";

import "./task.css"
function AddTask(){
    const router=useNavigate();
    const[taskData, setTaskData]=useState({
        title:"",
        description:"",
        duedate:"",
        status:"",
        assignedTo: "",
        reset:""
    });
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    const [users, setUsers] = useState([]);
    console.log(taskData,"taskData");

    useEffect(() => {
      async function fetchUsers() {
          try {
              const response = await Api.get("/auth/getall"); // Fetch all users
              if (response.data.success) {
                  setUsers(response.data.users);
              }
          } catch (error) {
              console.error("Error fetching users:", error);
          }
      }

      fetchUsers();
  }, []);

    function handleChange(event){
        setTaskData({ ...taskData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try {
            if( taskData.title && taskData.description && taskData.duedate && taskData.status){
                const response = await Api.post("/task/addtask" , {taskData});
                if(response.data.success){
                    setTaskData({
                        title:"",
                        description:"",
                        duedate:"",
                        status:"",
                        assignedTo: "",
                        reset:""
                    });
                    router("/all-tasks");
                    toast.success(response.data.message);
                }
            }else{
                toast.error("All fields are mandatory.");
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        const errorsArray = [];
        if (!taskData.title) {
          errorsArray.push("Title is required.");
        }
        if (!taskData.description) {
          errorsArray.push("Description is required.");
        }
        if (!taskData.duedate) {
          errorsArray.push("Due Date is required.");
        }
        if (!taskData.status) {
          errorsArray.push("Status is required.");
        }
        setErrors(errorsArray);
        if (errorsArray.length == 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }, [taskData]);

  return (
    <div id="ar-main" className="task">
        <form onSubmit={handleSubmit}>
            <h1 style={{color:"white"}}>Add your task</h1>
            <label>Title:</label><br/>
            
            <input type='text' name='title' onChange={handleChange} value={taskData.title}/><br/>
            <label>Instructions:</label><br/>

            <textarea name='description' onChange={handleChange} value={taskData.description}></textarea><br/>
            <label>Due Date:</label><br/>
           
            <input type="date" name="duedate" value={taskData.duedate} onChange={handleChange}/><br/>
            <label>Status:</label><br/>
            
            <select name="status" value={taskData.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="completed">rejected</option>
            </select><br/>
            <label>Assign to:</label><br />
                <select name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select><br />
            <input type='submit' value="ADD TASK"/>
        </form>
    </div>
  )
}

export default AddTask;