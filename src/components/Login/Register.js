import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework } from './GoogleSignIn';
import { createSignInWithEmailAndPassword } from './UserSignIn';
import { UserContext } from '../../App';


const Register = () => {
    initializeLoginFramework();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error : '',
    success : false
  });

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  

  const handleSubmit = (e) => {
        if(user.email && user.password){
            createSignInWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
        }

        e.preventDefault();
    }
  const handleBlur = (e) => {
    let isFieldValid = true; 
    if(e.target.name === 'email'){
        const validEmail = /\S+@\S+\.\S+/;
        isFieldValid = validEmail.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const formdivStyle = {
    width : '25%',
    margin:'auto',
    backgroundColor:'#fff',
    padding:'30px'
  }
  return (
    <div style={{backgroundImage:'linear-gradient(#0C8898,#0379AB)',height:'100vh'}}>
        <div style={{paddingTop:'150px'}}>
        <div>
            <h4 className="text-center  text-light">Linkd<strong className="text-light bg-primary rounded px-1">in</strong></h4>
        </div>
        <div className="text-center text-light mt-4">
            <h4>Welcome Back</h4>
            <p>Don't miss your next opportunity. Sign in to stay updated on your professional world.</p>
        </div>
        <div style={formdivStyle} className="mt-4">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
            <Form.Control className="py-4" type="text" onBlur={handleBlur} name="name"  placeholder="Your Name" required />
            
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Control className="py-4" type="email" onBlur={handleBlur} name="email"  placeholder="Your email" required />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Control className="py-4" type="password" onBlur={handleBlur} name="password" placeholder="Password" required/>
            </Form.Group>
            <Button className="py-3" style={{width:'100%',borderRadius:'30px'}} variant="primary" type="submit">
            Sign Up
            </Button>
            {/* <input type="submit" value="Submit"/> */}
        </Form>
        <div className="text-center mt-3">
        <p>Already have Account?<Link to="/login"> <strong> Sign in</strong></Link></p>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Register;