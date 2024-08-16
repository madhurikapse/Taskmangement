
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function Home(){
    const {state}=useContext(AuthContext);
    
    const navigate = useNavigate();
    const handleSubmit = () => {
    // Perform form submission logic here
    // Navigate to another page after submission
    navigate('/Home2');
  };

    return(
        
        <div id="home">
                        <h1>Welcome to Home - {state?.user?.name}</h1>
            
            <img style={{width:"100%"}} src='https://cdn.optinmonster.com/wp-content/uploads/2020/08/welcome-message-example-with-discount.png'/>
            <button style={{backgroundColor:"red"}} onClick={handleSubmit}>Thank you</button>
        </div>
    )
}

export default Home;