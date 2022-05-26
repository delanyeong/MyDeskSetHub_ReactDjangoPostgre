import React, { useEffect } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useImmerReducer } from 'use-immer'

function Register() {
  const navigate = useNavigate();

  const initialState = {
    usernameValue: '',
    emailValue: '',
    passwordValue: '',
    password2Value: '',
    sendRequest: 0

  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen
        break;

      case "catchEmailChange":
        draft.emailValue = action.emailChosen
        break;

      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen
        break;

      case "catchPassword2Change":
        draft.password2Value = action.password2Chosen
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

  
  function FormSubmit(e) {
    e.preventDefault();
    console.log("the form has been submitted");
    dispatch({ type : 'changeSendRequest' });
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
            },
            { cancelToken: source.token }
          );
          console.log(response);
          navigate('/dashboard')
        } catch (error) {
          console.log(error.response);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  return (
    <div name="home" className="relative w-full h-screen bg-zinc-900/60">
      {/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src={setup1Img} alt="" /> */}

      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={FormSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-8"
        >
          <h2 className="text-4xl font-bold text-center py-6">MyDeskSetHub.</h2>

          <div className="flex flex-col py-2">
            <label>Username</label>
            <input className="border relative bg-gray-100 p-2" 
            type="text" 
            value={state.usernameValue}
              onChange = {(e)=> dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value})} />
          </div>

          <div className="flex flex-col py-2">
            <label>Email</label>
            <input className="border relative bg-gray-100 p-2" 
            type="text"
            value={state.emailValue}
            onChange = {(e)=> dispatch({ type: 'catchEmailChange', emailChosen: e.target.value})} />
          </div>

          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
              value={state.passwordValue}
              onChange = {(e)=> dispatch({ type: 'catchPasswordChange', passwordChosen: e.target.value})} />
          </div>

          <div className="flex flex-col py-2">
            <label>Confirm password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
              value={state.password2Value}
              onChange = {(e)=> dispatch({ type: 'catchPassword2Change', password2Chosen: e.target.value})} />
          </div>

          <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white relative">
            Sign Up
          </button>

          <div className="flex justify-center relative">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer text-indigo-600 underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
