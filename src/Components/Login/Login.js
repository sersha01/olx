import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [error, setError] = useState(null);
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, passWord).then(()=>{
      history.push('/')
    }).catch((error)=>{
      setError('Invalid Email or Password')
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          {error && <p id='error-login'>{error}</p>}
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>history.push('/signup')} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
