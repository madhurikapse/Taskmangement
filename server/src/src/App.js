import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import Tasklist from './components/Taskslist';
import Home2 from './components/Home2';
import YourAddedProducts from './components/YourAddedProducts.js';
import AddProducts from "./components/AddProducts.js"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route  path='/' element={<Home />}/>
        <Route  path='/register' element={<Register />}/>
        <Route  path='/login' element={<Login />}/>
        <Route  path='/add-task' element={<AddTask />}/>
        <Route  path='/all-tasks' element={<Tasklist/>}/>
        <Route path='/Home2' element={<Home2/>}></Route>
        <Route path="/add-product" element={<AddProducts/>} />
        <Route path="/your-added-products" element={<YourAddedProducts/>} />
      </Routes>
    </div>
  );
}

export default App;
