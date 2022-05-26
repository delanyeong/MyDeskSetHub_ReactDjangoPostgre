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
    <div name='home' className='relative w-full h-screen bg-zinc-900/60'>
        
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={setup1Img} alt="" />

        <div className='flex justify-center items-center h-full'>
            <form onSubmit={FormSubmit} className='max-w-[400px] w-full mx-auto bg-white p-8'>
                
                <h2 className='text-4xl font-bold text-center py-6 text-black'>MyDeskSetHub.</h2>

                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border relative bg-gray-100 p-2' 
                    type="text"
                    value={state.usernameValue} 
                    onChange = {(e)=> dispatch({ type: 'catchUsernameChange', usernameChosen: e.target.value})} />
                </div>

                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border relative bg-gray-100 p-2' 
                    type="password"
                    value={state.passwordValue} 
                    onChange = {(e)=> dispatch({ type: 'catchPasswordChange', passwordChosen: e.target.value})} />
                </div>

                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white relative'>Sign In</button>

                <div className='flex justify-between relative'>
                  <p className='flex items-center text-black'>
                    <input className='mr-2' type="checkbox" />
                    Remember Me
                  </p>
                  <p onClick={() => navigate('/register')} className="cursor-pointer text-indigo-600 underline">
                    Create an account
                  </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login