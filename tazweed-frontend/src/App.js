import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Profile from './components/Profile'
import Appointments from './components/Appointments.js'
import MenuBar from './components/MenuBar'


function App() {
  return (
   <Router> 
     <Container>
     <MenuBar/>
     <Route exact path='/' component={Home}/>
     <Route exact path='/appointments' component={Appointments}/>
     <Route exact path='/profile' component={Profile}/>
     <Route exact path='/login' component={Login}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/logout' component={Logout}/>
     </Container>
    
   </Router>
  );
}

export default App;