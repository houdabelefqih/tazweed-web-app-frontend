import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Appointments from './pages/Appointments.js'
import MenuBar from './components/MenuBar'
import Requests from './pages/Requests'


function App() {
  return (
   <Router> 
     <Container>
     <MenuBar/>
     <Route exact path='/' component={Home}/>
     <Route exact path='/appointments' component={Appointments}/>
     <Route exact path='/requests' component={Requests}/>
     <Route exact path='/profile' component={Profile}/>
     <Route exact path='/login' component={Login}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/logout' component={Logout}/>
     </Container>
    
   </Router>
  );
}

export default App;