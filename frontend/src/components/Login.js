import React, { useEffect, useContext } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import DispatchContext from '../Context/DispatchContext'
import StateContext from '../Context/StateContext'

import setup1Img from '../assets/setup1.jpg'

function Login() {
    const navigate = useNavigate()

    const globalDispatch = useContext(DispatchContext)
    const globalState = useContext(StateContext)


    const initialState = {
        usernameValue: '',
        passwordValue: '',
        sendRequest: 0,
        token: ''
      };
    
      function ReducerFunction(draft, action) {
        switch (action.type) {
          case "catchUsernameChange":
            draft.usernameValue = action.usernameChosen
            break;
    
          case "catchPasswordChange":
            draft.passwordValue = action.passwordChosen
            break;
    
          case "changeSendRequest":
            draft.sendRequest = draft.sendRequest + 1
            break;

          case "catchToken":
            draft.token = action.tokenValue
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
          async function SignIn() {
            try {
              const response = await Axios.post(
                "http://localhost:8000/api-auth-djoser/token/login/",
                {
                  username: state.usernameValue,
                  password: state.passwordValue,
                },
                { cancelToken: source.token }
              );
              console.log(response);
              dispatch({ type: 'catchToken', tokenValue: response.data.auth_token})
              globalDispatch({ type: 'catchToken', tokenValue: response.data.auth_token})
            //   navigate('/dashboard')
            } catch (error) {
              console.log(error.response);
            }
          }
          SignIn();
          return () => {
            source.cancel();
          };
        }
      }, [state.sendRequest]);


      //GET USER INFO
      useEffect(() => {
        if (state.token !== "") {
          const source = Axios.CancelToken.source();
          async function GetUserInfo() {
            try {
              const response = await Axios.get(
                "http://localhost:8000/api-auth-djoser/users/me/",
                {
                  headers: {Authorization : 'Token '.concat(state.token)}
                },
                { cancelToken: source.token }
              );
              console.log(response);
              globalDispatch({
                type: 'userSignsIn', 
                usernameInfo: response.data.username, 
                emailInfo: response.data.email, 
                idInfo: response.data.id
              })
              navigate('/dashboard')
            } catch (error) {
              console.log(error.response);
            }
          }
          GetUserInfo();
          return () => {
            source.cancel();
          };
        }
      }, [state.token]);
    


  return (
    
    <div class="bg-no-repeat bg-cover bg-center relative bg-setup-image">
      <div class="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div class="self-start hidden lg:flex flex-col  text-white">
              <img src="" class="mb-3" />
              <h1 class="mb-3 font-bold text-5xl">Hi 👋 Welcome to MDSH </h1>
              <p class="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                and publishing industries for previewing layouts and visual mockups</p>
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
                  <input class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="" placeholder="Enter your username"
                  value={state.usernameValue} 
                  onChange = {(e)=> dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value})} />
                  </div>
                              <div class="space-y-2">
                  <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" placeholder="Enter your password"
                  type="password"
                  value={state.passwordValue} 
                  onChange = {(e)=> dispatch({ type: 'catchPasswordChange', passwordChosen: e.target.value})}/>
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
                    onClick={() => navigate('/register')}>
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
                    Copyright © 2021-2022
                    <p href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-green hover:text-green-500 ">AJI</p></span>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login