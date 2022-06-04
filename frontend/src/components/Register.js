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
    // navigate('/login')
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
          navigate('/')
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
    <div class="bg-no-repeat bg-cover bg-center relative bg-setup-image">
      <div class="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div class="self-start hidden lg:flex flex-col  text-white">
              <img src="" class="mb-3" alt=""/>
              <h1 class="mb-3 font-bold text-5xl">Hi 👋 Welcome to MDSH </h1>
              <p class="pr-3">Your one stop hub for your Dream Desk Setup.</p>
            </div>
          </div>
          <div class="flex justify-center self-center  z-10">
            <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                <div class="mb-4">
                  <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
                  <p class="text-gray-500">Please sign in to your account.</p>
                </div>
                <form onSubmit={FormSubmit}>
                <div class="space-y-5">
                            <div class="space-y-2">
                                  <label class="text-sm font-medium text-gray-700 tracking-wide">Username</label>
                  <input type="text" class="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" placeholder="Enter your username"
                  value={state.usernameValue} 
                  onChange = {(e)=> dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value})} />
                  </div>
                            <div class="space-y-2">
                                  <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                  <input class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" placeholder="Enter your username"
                  type="text"
                  value={state.emailValue}
                  onChange = {(e)=> dispatch({ type: 'catchEmailChange', emailChosen: e.target.value})} />
                  </div>
                            <div class="space-y-2">
                                  <label class="text-sm font-medium text-gray-700 tracking-wide">Password</label>
                  <input class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" placeholder="Enter your username"
                  type="password"
                  value={state.passwordValue}
                  onChange = {(e)=> dispatch({ type: 'catchPasswordChange', passwordChosen: e.target.value})} />
                  </div>
                              <div class="space-y-2">
                  <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Re-type Password
                  </label>
                  <input class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" placeholder="Enter your password"
                  type="password"
                  value={state.password2Value}
                  onChange = {(e)=> dispatch({ type: 'catchPassword2Change', password2Chosen: e.target.value})}/>
                </div>
                  <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                    <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <p href="#" class="text-green-400 hover:text-green-500"
                    onClick={() => navigate("/")}>
                      Create an account
                    </p>
                  </div>
                </div>
                <div>
                  <button type="submit" class="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Sign in
                  </button>
                </div>
                </div>
                </form>
                <div class="pt-5 text-center text-gray-400 text-xs">
                  <span>
                    
                    <p href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-green hover:text-green-500 "></p></span>
                </div>
            </div>
          </div>
      </div>
    </div>






























    
  );
}

export default Register;
