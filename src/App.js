import { useEffect, useReducer, useState } from 'react';
import { Home, Login } from './components';
import { useCurrentState } from './Context/context';

function App() {
  const [userDetailsState, dispatch] = useCurrentState()
  const prefix = "PRACTICE_WEBSOCKET_APP"
  const userDetailsKey = `${prefix}_USER_DETAILS`

  useEffect(() => {
    // if there is no data in local storage, then set the tamplate, otherwise if data available then set that data in our tamplate...
    let prevUserData = JSON.parse(localStorage.getItem(userDetailsKey));
    console.log(prevUserData);
    if (!prevUserData) {
      console.log("in not prev data");
      console.log(prevUserData);
      localStorage.setItem(userDetailsKey, JSON.stringify(userDetailsState));
      console.log("first_userdetails => ", prevUserData);
    } else {
      dispatch({
        type: "full_update",
        allData: prevUserData
      })
    }
  }, [])


  return (
    <div className="App w-[100%] h-[100dvh] overflow-scroll select-none">
      {
        userDetailsState.userLogin ? <Home /> : <Login userDetailsKey={userDetailsKey} />
      }
    </div>
  );
}

export default App;
