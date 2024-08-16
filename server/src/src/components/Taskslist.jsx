import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import "../styles/Tasklist.css"
import { AuthContext } from "../context/auth.context";

function Tasklist(){
    const { state } = useContext(AuthContext);
    const router=useNavigate();
    const[allTasks,setAllTasks]=useState([]);
    const [loading, setLoading] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        duedate: "",
        status: ""
    });
    console.log(allTasks);
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
      async function fetchUsers() {
          try {
              const response = await Api.get("/auth/getall");
              if (response.data.success) {
                  setUsers(response.data.users);
              }
          } catch (error) {
              console.error("Error fetching users:", error);
          }
      }

      fetchUsers();
  }, []);

    async function GetTask(){
        setLoading(true);
        try{
            const response = await Api.post("/task/your-added-tasks",{userId: state?.user?.userId})
            console.log(state?.user)
            console.log(response)
            if(response.data.success){
                setLoading(false);
                setAllTasks(response.data.tasks);
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async function handleUpdate() {
        try {
            const response = await Api.put(`/task/task/update/${taskToEdit}`, {
                taskData: editFormData
            });
            if (response.data.success) {
                GetTask();
                setTaskToEdit(null);
                setEditFormData({
                    title: "",
                    description: "",
                    duedate: "",
                    status: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleEdit(task) {
        setTaskToEdit(task._id);
        setEditFormData({
            title: task.title,
            description: task.description,
            duedate: task.duedate,
            status: task.status
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleDelete(taskId) {
        try {
            const response = await Api.delete(`/task/task/delete/${taskId}`);
            if (response.data.success) {
                GetTask();
            }
        } catch (error) {
            console.log(error);
        }
    }

      

    useEffect(()=>{
        GetTask()},[]);

    return(
        <div id="main">
            <h1>All Tasks</h1>
                {loading?(<div>
                    <h1>Loading....</h1>                    
                </div>):(
                    <div id="alltasksshow">
                    {allTasks.map((task)=>(
                        <div id="taskshow">
                            <p><b>Title</b>: {task.title}</p>
                            <p><b>Description</b>: {task.description}</p>
                            <p><b>Due Date</b>: {task.duedate}</p>
                            <p><b>Status</b>: {task.status}</p>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                            <div className="aa">
                            <video width="750" height="500" controls >
      <source src="https://videos.pexels.com/video-files/3832194/3832194-uhd_1440_2732_25fps.mp4" muted
          autoPlay={"autoplay"} type="video/mp4"/>
     </video>
     </div>
                        </div>
                        
                    ))}
                </div>
                )} 

            {taskToEdit && (
                <div id="editForm">
                    <h2>Edit Task</h2>
                    <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                    <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        name="duedate"
                        value={editFormData.duedate}
                        onChange={handleInputChange}
                    />
                    <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={handleUpdate}>Update Task</button>
                    <button onClick={() => setTaskToEdit(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Tasklist;