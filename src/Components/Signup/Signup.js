import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

const schema = yup.object().shape({
  name : yup.string().required('Name is required'),
  email : yup.string().email('Email is not valid').required('Email is required'),
  phone : yup.number().typeError('should be number').positive("Remove '-' from here").integer("Remove '.' from here").required('Phone is required'),
  password : yup.string().min(8,'Password should contain 8 characters').required('Password is required'),
})

export default function Signup() {
  const history = useHistory();
  const {firebase} = useContext(FirebaseContext);

  const {
    register,  handleSubmit, formState :{errors} } = useForm({
      resolver: yupResolver(schema),
    })

  const myhandleSubmit = ({name,email,phone,password}) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
      result.user.updateProfile({displayName: name}).then(()=>{
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: name,
          phone: phone
        }).then(()=>{
          history.push("/login")
        })
      })
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit(myhandleSubmit)}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            {...register('name')}
          />
          <p className='signup-error'>{errors.name?.message}</p>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            {...register('email')}
          />
          <p className='signup-error'>{errors.email?.message}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            {...register('phone')}
          />
          <p className='signup-error'>{errors.phone?.message}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            {...register('password')}
          />
          <p className='signup-error'>{errors.password?.message}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>history.push('/login')} >Login</a>
      </div>
    </div>
  );
}
