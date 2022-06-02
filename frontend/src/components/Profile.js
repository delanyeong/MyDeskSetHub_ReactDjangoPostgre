import React, { useEffect, useContext } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "../Context/StateContext";
import ProfileUpdate from "./ProfileUpdate";

function Profile() {
  const navigate = useNavigate();
  const globalState = useContext(StateContext);

  const initialState = {
    userProfile: {
      occupationName: "",
      profilePic: "",
      bio: "",
      userUserposts: [],
    },
    dataIsLoading: true,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.occupationName = action.profileObject.occupation;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        draft.userProfile.userUserposts = action.profileObject.user_userposts;
        break;

      case "loadingDone":
        draft.dataIsLoading = false
        break

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  

  //request to get profile info
  useEffect(() => {
    async function getProfileInfo() {
      try {
        const response = await Axios.get(`api/profiles/${globalState.userId}/`);
        console.log(response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({
          type: "loadingDone",
          profileObject: response.data,
        });
      } catch (e) {
        console.log(e.response);
      }
    }
    getProfileInfo();
  }, []);

  
  

  

  function welcomeDisplay() {
    if (
      state.userProfile.occupationName === null ||
      state.userProfile.occupationName === ""
    ) {
      return (
        <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
          Welcome, {globalState.userUsername}. Please update your profile
        </p>
      );
    } else {
      return (
        <div>
          <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
            {globalState.userUsername}'s Profile. You have {state.userProfile.userUserposts.length} posts
          </p>

          {/* <div class="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
            <img
              src={state.userProfile.profilePic}
              alt=""
              class="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
            />
            <div class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"></div>
            
          </div> */}
        </div>
      );
    }
  }

  return (
    <div>
      <div>
        <div class="bg-white dark:bg-gray-800 px-8">
          <div class="container mx-auto bg-white dark:bg-gray-800 rounded">
            <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
              <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                {welcomeDisplay()}
                <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      class="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileUpdate userProfile={state.userProfile}/>
    </div>
  );
}

export default Profile;
