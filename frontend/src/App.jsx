import React from 'react'
import Home from './component/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup';
import PageNotFound from './component/PageNotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='*' element = {<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
