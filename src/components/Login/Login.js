import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework } from './GoogleSignIn';
import { UserContext } from '../../App';
import { signInwithEmailAndPassword } from './UserSignIn';


const Login = () => {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res)
        setLoggedInUser(res)
        history.replace(from);
      })
  }
  const handleSubmit = (e) => {
    if (user.email && user.password) {
      signInwithEmailAndPassword(user.email, user.password)
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
    if (e.target.name === 'email') {
      const validEmail = /\S+@\S+\.\S+/;
      isFieldValid = validEmail.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const { register, errors } = useForm();
  const formdivStyle = {
    width: '25%',
    margin: 'auto',
  }
  return (
    <div style={{ marginTop: '150px' }}>
      <div>
        <h4 className="text-center text-primary">Linkd<strong className="text-light bg-primary rounded px-1">in</strong></h4>
      </div>
      <div className="text-center mt-4">
        <h4>Welcome Back</h4>
        <p>Don't miss your next opportunity. Sign in to stay updated on your professional world.</p>
      </div>
      <div style={formdivStyle} className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className="py-4" type="email" onBlur={handleBlur} name="email" ref={register({ required: true })} placeholder="Enter email" />
            <Form.Text className="text-danger">
              {errors.email && <span>Email is required</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control className="py-4" type="password" onBlur={handleBlur} name="password" ref={register({ required: true })} placeholder="Password" />
            <Form.Text className="text-danger">
              {errors.password && <span>Password is required</span>}
            </Form.Text>
          </Form.Group>
          <Button className="py-3" style={{ width: '100%', borderRadius: '30px' }} variant="primary" type="submit">
            Sign in
        </Button>

        </Form>
        <div className="d-flex justify-content-center mt-4">
          <button onClick={googleSignIn} className="btn btn-primary text-light px-3" style={{ borderRadius: '50%', margin: '0px 20px' }}><i class="fa fa-google"></i></button>
          <button onClick="" className="btn btn-primary text-light px-3" style={{ borderRadius: '50%', fontSize: '20px' }}><i class="fa fa-facebook"></i></button>
        </div>
        <div className="text-center mt-3">
          <p>New to LinkedIn?<Link to="/register"><strong>Join now</strong></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;