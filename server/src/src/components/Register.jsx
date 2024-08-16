import { useEffect, useState } from "react";
import Api from "../axiosconfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./task.css"

const Register = () => {
    const router=useNavigate();
    const[userData, setUserData]=useState({
        name:"",
        email:"",
        password:"",
    });
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    console.log(userData,"userData");
    function handleChange(event){
        setUserData({ ...userData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(userData.name && userData.email && userData.password){
                const response = await Api.post("/auth/register" , {userData});
                if(response.data.success){
                    setUserData({
                        name:"",
                        email:"",
                        password:"",
                    });
                    router("/login");
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
        if (!userData.name) {
          errorsArray.push("Name is required.");
        }
        if (!userData.email) {
          errorsArray.push("Email is required.");
        }
        if (!userData.password) {
          errorsArray.push("Password is required.");
        }
        setErrors(errorsArray);
        if (errorsArray.length == 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }, [userData]);

  return (
    <div className="task">
        <form onSubmit={handleSubmit}>
            <h1 style={{color:"white"}}>Register page</h1>
            <label>Name:</label><br/>
            <input type='text' name='name' onChange={handleChange} value={userData.name}/><br/>
            <label>Email:</label><br/>
            <input type='email' name='email' onChange={handleChange} value={userData.email}/><br/>
            <label>Password:</label><br/>
            <input type='password' name='password' onChange={handleChange} value={userData.password}/><br/>
            <input type='submit' value="Register" />
        </form>
    </div>
  )
}

export default Register;