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
    uploadedImages: [],
    sendRequest: 0,
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

      case "catchUploadedImages":
        draft.uploadedImages = action.imagesChosen;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    if (state.uploadedImages[0]) {
      dispatch({
        type: "catchImageChange",
        imageChosen: state.uploadedImages[0],
      });
    }
  }, [state.uploadedImages[0]]);

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
            <label>Name</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={state.nameValue}
              onChange={(e) =>
                dispatch({
                  type: "catchNameChange",
                  nameChosen: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Brand</label>
            <input
              className="border relative bg-gray-100 p-2"
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

          <div className="flex flex-col py-2">
            <label>Category</label>
            <input
              className="border relative bg-gray-100 p-2"
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

          <div className="flex flex-col py-2">
            <label>Description</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={state.descriptionValue}
              onChange={(e) =>
                dispatch({
                  type: "catchDescriptionChange",
                  descriptionChosen: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Link</label>
            <input
              className="border relative bg-gray-100 p-2"
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

          <div className="flex flex-col py-2">
            <label>Price</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={state.priceValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPriceChange",
                  priceChosen: e.target.value,
                })
              }
            />
          </div>

          <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white relative">
            Upload Pictures
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) =>
                dispatch({
                  type: "catchUploadedImages",
                  imagesChosen: e.target.files,
                })
              }
            />
          </button>

          <div>
            <ul>{state.imageValue ? <li>{state.imageValue.name}</li> : ""}</ul>
          </div>

          <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white relative">
            Submit
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
        <button
          className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white relative"
          onClick={() => console.log(state.uploadedImages)}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}

export default AddPost;
