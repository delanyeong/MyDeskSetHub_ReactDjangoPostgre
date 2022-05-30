import React, { useEffect, useContext } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "../Context/StateContext";

function Profile() {
  const navigate = useNavigate();
  const globalState = useContext(StateContext);

  const initialState = {
    userProfile: {
      occupationName: "",
      profilePic: "",
      bio: "",
    },
    occupationNameValue: "",
    bioValue: "",
    uploadedImage2: [],
    profilePictureValue: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.occupationName = action.profileObject.occupation;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        break;

      case "catchOccupationNameChange":
        draft.occupationNameValue = action.occupationNameChosen;
        break;

      case "catchBioChange":
        draft.bioValue = action.bioChosen;
        break;

      case "catchUploadedImage2":
        draft.uploadedImage2 = action.image2Chosen;
        break;

      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChosen;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  // Use effect to catch uploaded image 2
  useEffect(() => {
    if (state.uploadedImage2[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChosen: state.uploadedImage2[0],
      });
    }
  }, [state.uploadedImage2[0]]);

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
      } catch (e) {
        console.log(e.response);
      }
    }
    getProfileInfo();
  }, []);

  //use effect to send the request
  useEffect(() => {
    if (state.sendRequest) {
      async function updateProfile() {
        const formData = new FormData();
        formData.append("occupation", state.occupationNameValue);
        formData.append("bio", state.bioValue);
        formData.append("profile_picture", state.profilePictureValue);
        formData.append("user", globalState.userId);

        try {
          const response = await Axios.patch(
            `api/profiles/${globalState.userId}/update/`,
            formData
          );
          console.log(response.data);
          navigate("/dashboard");
        } catch (e) {
          console.log(e.response);
        }
      }
      updateProfile();
    }
  }, [state.sendRequest]);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" });
  }

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
        <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
          {globalState.userUsername}'s Profile.
          X items listed
        </p>
      );
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={FormSubmit}>
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
              <div class="mx-auto">
                <div class="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                  <div class="rounded relative mt-8 h-48">
                    <img
                      src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
                      alt=""
                      class="w-full h-full object-cover rounded absolute shadow"
                    />
                    <div class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded"></div>
                    <div class="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                      <p class="text-xs text-gray-100">
                        {/* {state.image2Value ? <li>Uploaded {state.image2Value.name}. Save to update</li> : "Change Cover Photo"} */}
                      </p>
                      <div class="ml-2 text-gray-100">
                        {/* <button> */}
                        <svg
                          // type="file"
                          // accept="image/png, image/gif, image/jpeg"
                          // onChange={(e) =>
                          //   dispatch({
                          //     type: "catchUploadedImage2",
                          //     image2Chosen: e.target.files,
                          //   })
                          // }
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-edit"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                        {/* </button> */}
                      </div>
                      <div></div>
                    </div>
                    <div class="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                      <img
                        src={state.userProfile.profilePic}
                        alt=""
                        class="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                      />
                      <div class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"></div>
                      <div class="flex flex-col justify-center items-center z-10 text-gray-100">
                        <input
                          id="files"
                          class="hidden"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) =>
                            dispatch({
                              type: "catchUploadedImage2",
                              image2Chosen: e.target.files,
                            })
                          }
                        />
                        <label className="cursor-pointer" for="files">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-edit"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                          </svg>
                        </label>

                        <p class="text-xs text-gray-100">
                          {state.profilePictureValue
                            ? `Ready to Save!`
                            : "Edit Picture"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                    <label
                      for="username"
                      class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Occupation
                    </label>
                    <input
                      tabindex="0"
                      type="text"
                      id="username"
                      name="username"
                      required
                      class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-600 dark:text-gray-400"
                      placeholder="@example"
                      value={state.occupationNameValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchOccupationNameChange",
                          occupationNameChosen: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                    <label
                      for="about"
                      class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Bio
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      required
                      class="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600 dark:text-gray-400"
                      placeholder="Let the world know who you are"
                      rows="5"
                      value={state.bioValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchBioChange",
                          bioChosen: e.target.value,
                        })
                      }
                    ></textarea>
                    <p class="w-full text-right text-xs pt-1 text-gray-600 dark:text-gray-400">
                      Character Limit: 200
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="container mx-auto w-11/12 xl:w-full">
              <div class="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                <button
                  onClick={() => navigate("/dashboard")}
                  class="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                >
                  Cancel
                </button>
                <button
                  class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
