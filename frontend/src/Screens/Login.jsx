import React, { useState, useEffect } from 'react'
import * as Components from "./LoginDesign";
import {Link,  useNavigate, redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { register } from '../actions/registerActions';

function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('');
  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signIn, toggle] = React.useState(true);


 /**
     * Handle the form submission.
     * 
     * @param {Event} e - The form submit event.
     */
 const submitHandler = (e) => {
  e.preventDefault()
  dispatch(login(email, password))
}
const signupHandler = (e) => {
  e.preventDefault();
  if (password !== password2) {
    alert('Passwords do not match');
  } else {
    dispatch(register(name, email, password, password2)); // Dispatch the register action
    navigate('/home');
  }
};

useEffect(() => {
  if (userInfo) {
      navigate('/home')
  }
}, [navigate, redirect, userInfo])

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={signupHandler}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={submitHandler}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>

          <Components.Button type="submit">LogIn</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Components.Title>
            <Components.Paragraph>
              Embark on an exhilarating literary journey beyond the realms of
              imagination, where each subscription unlocks a portal to
              captivating worlds, riveting characters, and uncharted narratives
              that will keep you on the edge of your seat—welcome to a
              subscription like no other, where the next chapter is always an
              adventure waiting to unfold.{" "}
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}> {/* Corrected toggle value */}
              Sign Up
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Components.Title>
            <Components.Paragraph>
              Step into a realm of endless stories tailored just for you, where
              every login welcomes you to a sanctuary of literary delights,
              awaiting the turn of each digital page to transport you to worlds
              unknown—your personalized escape into the extraordinary begins
              now.{" "}
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}> {/* Corrected toggle value */}
              Sign In
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default LoginScreen;

