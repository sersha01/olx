import React,{useEffect,useContext} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Create from './Components/Create/Create';
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';
import ViewPost from './Pages/ViewPost';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {

  const {user,setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user=>{
      setUser(user)
    }))
  })

  return (
    <div>
      <Post>
      <BrowserRouter>
      <Route exact path='/'>
      <Home />
      </Route>
      <Route path='/signup'>
      <Signup />
      </Route>
      <Route path='/login'>
      <Login />
      </Route>
      <Route path='/create'>
      <Create />
      </Route>
      <Route path='/view'>
      <ViewPost />
      </Route>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
