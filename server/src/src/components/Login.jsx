import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosconfig';
import "./task.css"

const Login = () => {
const {state,dispatch}=useContext(AuthContext);
const navigate = useNavigate();
    const Submit = () => {
    // Perform form submission logic here
    // Navigate to another page after submission
    navigate('/Home2');
  };

    const router=useNavigate();
    const[userData, setUserData]=useState({
        email:"",
        password:"",
    });

    console.log(userData,"userData");
    function handleChange(event){
        setUserData({ ...userData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
          if (userData.email && userData.password) {
              const response = await Api.post("/auth/login" , {userData});
            if (response.data.success) {
              dispatch({ type: "LOGIN", payload: response.data.userData });
              setUserData({
                email: "",
                password: "",
              });
              router("/");
              toast.success(response.data.message);
            } else {
              toast.error(response?.data?.error)
            }
          } else {
            throw Error("All fields are mandatory.");
          }
        } catch (error) {
          console.log(error, "error");
          toast.error(error?.response?.data?.error);
        }
      }
  return (
    <div className='task'>
        <form onSubmit={handleSubmit}>
            <h1 style={{color:"white"}}>Login</h1>
            <label>Email:</label><br/>
            <input type='email' name='email' onChange={handleChange} value={userData.email}/><br/>
            <label>Password:</label><br/>
            <input type='password' name='password' onChange={handleChange} value={userData.password}/><br/>
            <input type='submit' value="Login"/><br/><br/>
            <button style={{backgroundColor:"red"}} onClick={Submit}>Thank you</button>

        </form>
    </div>
  )
}

export default Login;
