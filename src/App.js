import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Chart from './components/Chart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactDOM } from 'react';



function App() {
  return (
    <div className = "flex" >
   <Router>
    <Routes>
      <Route path = '/' element = {<Home />}/>
      <Route path = '/Chart' element = {<Chart/>}/>
      
    </Routes>
   </Router>
    </div>
  );
}

export default App;
