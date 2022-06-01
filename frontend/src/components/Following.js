import React, { useEffect, useContext } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "../Context/StateContext";
import ProfileUpdate from "./ProfileUpdate";

function Following() {
    const navigate = useNavigate();
    const globalState = useContext(StateContext);
  
    const initialState = {
      followingList: [],
    };
  
    function ReducerFunction(draft, action) {
      switch (action.type) {
        case "catchFollowing":
        draft.followingList = action.followingArray;
        break
  
        default:
          break;
      }
    }
  
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

//request to get all profiles info
useEffect(() => {
    async function getFollowers() {
      try {
        const response = await Axios.get(`api/users/`);
        console.log(response.data);
        dispatch({
          type: "catchFollowing",
          followingArray: response.data,
        });
        dispatch({
          type: "loadingDone",
          profileObject: response.data,
        });
      } catch (e) {
        console.log(e.response);
      }
    }
    getFollowers();
  }, []);




  return ( 
    <div>
        {state.followingList.map((following)=>{
            return <li>{following.username}</li>
})}
    </div>
  )
}

export default Following