import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import Api from "../axiosconfig";
import "../styles/Navbar.css"

function Navbar(){

    const router = useNavigate();
    const { state, dispatch } = useContext(AuthContext);

    async function handleLogout() {
        try {
            const response = await Api.post("/auth/logout");
            if (response.data.success) {
                dispatch({ type: "LOGOUT" });
                router("/login");
                toast.success(response.data.message);
            } else {
                toast.error("Logout failed.");
            }
        } catch (error) {
            toast.error("Failed to logout.");
        }
    }
    
    return(
        <div className="parentdiv">
            <head>
               
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

                <link rel="icon" href="https://static.vecteezy.com/system/resources/thumbnails/010/994/248/small/puma-logo-white-symbol-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg" />
            </head>
        <div className="Navbar2">
                <div className="leftNavbar2">
                    <div id='leftnavbarimg'><img alt="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-eChF4SYBpp9Nhfy0lb2gZQ7djQaA4-QmMsneDQ4dWIsbuEeG-oCeudQLdOf1obGWOs8&usqp=CAU"/></div>
                </div>
                <div className="rightNavbar2">
                    <div className="options">
                        <div onClick={()=>router("/")}>Home</div>
                        {!state?.user && (<div onClick={()=>router("/register")}><span>Register</span></div>)}
                        <div onClick={()=>router("/add-task")}>Tasks</div>
                        <div onClick={()=>router("/add-task")}>Add </div>
                        {state?.user && (<div onClick={()=>router("/all-tasks")}>All Tasks</div>)}
                        <div>{state?.user ? (<span onClick={handleLogout}>Logout</span>) : (<span onClick={()=>router("/login")}>Login</span>)}</div>
                    
                        
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Navbar;