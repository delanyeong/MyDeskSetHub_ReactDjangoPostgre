//REACT AND STUFF
import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

//CONTEXTS
import DispatchContext from "./Context/DispatchContext";
import StateContext from "./Context/StateContext";

//COMPONENTS
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';
import AddPost from "./pages/AddPost";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Following from "./components/Following";

function App() {

  
  const initialState = {
    userUsername: localStorage.getItem('theUserUsername'),
    userEmail: localStorage.getItem('theUserEmail'),
    userId: localStorage.getItem('theUserId'),
    userToken: localStorage.getItem('theUserToken'),
    userIsLogged: localStorage.getItem('theUserUsername') ? true : false,

  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue
        break;

      case "userSignsIn":
        draft.userUsername = action.usernameInfo
        draft.userEmail = action.emailInfo
        draft.userId = action.idInfo
        draft.userIsLogged = true
        break;
      
      case 'logout':
        draft.userIsLogged = false
      
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

  useEffect(()=>{
    if (state.userIsLogged) {
      localStorage.setItem('theUserUsername', state.userUsername)
      localStorage.setItem('theUserEmail', state.userEmail)
      localStorage.setItem('theUserId', state.userId)
      localStorage.setItem('theUserToken', state.userToken)
    } else {
      localStorage.removeItem('theUserUsername')
      localStorage.removeItem('theUserEmail')
      localStorage.removeItem('theUserId')
      localStorage.removeItem('theUserToken')
    }
  }, [state.userIsLogged])



  return (
    <div>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/following" element={<Following />} />
            </Routes>
          <Footer />
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
