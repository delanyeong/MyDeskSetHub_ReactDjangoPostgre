import React, { useEffect, useContext } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "../Context/StateContext";

function AddPost() {
  const navigate = useNavigate();
  const globalState = useContext(StateContext);

  const initialState = {
    nameValue: "",
    brandValue: "",
    categoryValue: "",
    descriptionValue: "",
    linkValue: "",
    priceValue: "",
    imageValue: "",
    uploadedImage1: [],
    sendRequest: 0,
    userProfile: {
      occupationName: '',
    }
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchNameChange":
        draft.nameValue = action.nameChosen;
        break;

      case "catchBrandChange":
        draft.brandValue = action.brandChosen;
        break;

      case "catchCategoryChange":
        draft.categoryValue = action.categoryChosen;
        break;

      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;

      case "catchLinkChange":
        draft.linkValue = action.linkChosen;
        break;

      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;

      case "catchImageChange":
        draft.imageValue = action.imageChosen;
        break;

      case "catchUploadedImage1":
        draft.uploadedImage1 = action.imagesChosen1;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      case "catchUserProfileInfo":
        draft.userProfile.occupationName = action.profileObject.occupation
        break

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    if (state.uploadedImage1[0]) {
      dispatch({
        type: "catchImageChange",
        imageChosen: state.uploadedImage1[0],
      });
    }
  }, [state.uploadedImage1[0]]);

  //request to get profile info
  useEffect(()=>{
    async function getProfileInfo() {
      try {
        const response = await Axios.get(`api/profiles/${globalState.userId}/`)
        console.log(response.data)
        dispatch({ type: 'catchUserProfileInfo', profileObject: response.data})
      } catch (e) {
        console.log(e.response)
      }
    }
    getProfileInfo()
  }, [])

  function FormSubmit(e) {
    e.preventDefault();
    console.log("the form has been submitted");
    dispatch({ type: "changeSendRequest" });
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function addPost() {
        const formData = new FormData();
        formData.append("name", state.nameValue);
        formData.append("brand", state.brandValue);
        formData.append("category", state.categoryValue);
        formData.append("description", state.descriptionValue);
        formData.append("link", state.linkValue);
        formData.append("price", state.priceValue);
        formData.append("image", state.imageValue);
        formData.append("user", globalState.userId);
        try {
          const response = await Axios.post(
            "api/posts/create/",
            formData
          );
          console.log(response.data);
          navigate('/dashboard')
        } catch (e) {
          console.log(e.response);
        }
      }
      addPost();
    }
  }, [state.sendRequest]);

  function SubmitButtonDisplay() {
    if(globalState.userIsLogged && state.userProfile.occupationName !== null 
      && state.userProfile.occupationName !== '') {
        return (
          <p>
            Submit
          </p>
        )
      }
      else if (globalState.userIsLogged && (
        state.userProfile.occupationName === null || state.userProfile.occupationName === ''
      )) {
        return (
          <p onClick={()=> navigate('/profile')}>
            complete your profile to start posting
          </p>
        )
      }
      else if (!globalState.userIsLogged){
        return (
          <p onClick={()=> navigate('/')}>
            Sign in to start posting
          </p>
        )
      }
  }

  return (
    <div class="container items-center px-5 py-12 lg:px-20">
      <form
        onSubmit={FormSubmit}
        class="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 "
      >
        <section class="flex flex-col w-full h-full p-1 overflow-auto">
          <label for="name" class="text-base leading-7 text-blueGray-500 mb-5">
            Input Image
          </label>
          <header class="flex flex-col items-center justify-center py-12 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
            <p class="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
              <span>{state.imageValue ? <li>{state.imageValue.name}</li> : "Drag and drop your files anywhere or"}</span>
            </p>
            <button class="w-auto px-2 py-1 my-2 mr-2 text-blueGray-500 transition duration-500 ease-in-out transform border rounded-md hover:text-blueGray-600 text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-100">
              {" "}
              Upload a file{" "}
              <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) =>
                dispatch({
                  type: "catchUploadedImage1",
                  imagesChosen1: e.target.files,
                })
              }
            />
            </button>
          </header>
        </section>
        <div class="relative pt-4">
          <label for="name" class="text-base leading-7 text-blueGray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="Name"
            placeholder="Title"
            class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            value={state.nameValue}
            onChange={(e) =>
              dispatch({
                type: "catchNameChange",
                nameChosen: e.target.value,
              })
            }
          />
        </div>
        <div class="relative pt-4">
          <label for="name" class="text-base leading-7 text-blueGray-500">
            Brand
          </label>
          <input
            id="number"
            name="number"
            placeholder="Brand"
            class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            type="text"
            value={state.brandValue}
            onChange={(e) =>
              dispatch({
                type: "catchBrandChange",
                brandChosen: e.target.value,
              })
            }
          />
        </div>
        <div class="relative pt-4">
          <label for="name" class="text-base leading-7 text-blueGray-500">
            Category
          </label>
          <input
            id="date"
            name="date"
            placeholder="Category"
            class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            type="text"
            value={state.categoryValue}
            onChange={(e) =>
              dispatch({
                type: "catchCategoryChange",
                categoryChosen: e.target.value,
              })
            }
          />
        </div>

        <div class="relative pt-4">
          <label for="name" class="text-base leading-7 text-blueGray-500">
            Link
          </label>
          <input
            id="date"
            name="date"
            placeholder="Link"
            class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            type="text"
            value={state.linkValue}
            onChange={(e) =>
              dispatch({
                type: "catchLinkChange",
                linkChosen: e.target.value,
              })
            }
          />
        </div>

        <div class="relative pt-4">
            <label for="name" class="text-base leading-7 text-blueGray-500">Price</label>
            <input id="date" name="date" placeholder="Price" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            type="number"
            value={state.priceValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPriceChange",
                  priceChosen: e.target.value,
                })
              }/>
          </div>

        <div class="flex flex-wrap mt-4 mb-6 -mx-3">
          <div class="w-full px-3">
            <label
              class="text-base leading-7 text-blueGray-500"
              for="description"
            >
              Description{" "}
            </label>
            <textarea
              class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
              id="description"
              name="description"
              placeholder="Tell us more..."
              required=""
              type="text"
              value={state.descriptionValue}
              onChange={(e) =>
                dispatch({
                  type: "catchDescriptionChange",
                  descriptionChosen: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>

        {/* <div class="flex">
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox " />
            <span class="ml-2 text-blueGray-500">checkbox </span>
          </label>
        </div> */}
        <div class="flex items-center w-full pt-4 mb-4">
          <button onClick={() => console.log(state.uploadedImage1)} class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 ">
            {" "}
            {SubmitButtonDisplay()}
          </button>
        </div>
        {/* <hr class="my-4 border-gray-200" />
        <span class="px-4 py-1 mx-auto -mt-8 text-xs text-black transition duration-500 ease-in-out transform bg-gray-200 rounded-lg">
          Or continue with{" "}
        </span>
        <div class="inline-flex items-center justify-between w-full pt-8 ">
          <button class="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-github"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </button>
          <button class="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-gitlab"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z"></path>
            </svg>
          </button>
          <button class="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-twitter"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
            </svg>
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default AddPost;
