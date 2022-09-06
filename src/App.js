import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TweetPage from './components/TweetPage';
import { useEffect, useState } from 'react';
import AllUsers from './components/AllUsers';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getAccessToken() {
    if (localStorage.getItem('user')) {
      const accessToken = await fetch("http://127.0.0.1:8080/api/v1.0/tweets/createAccessToken", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "content-type": "application/json"
        },
        body: JSON.stringify({ "refreshToken": localStorage.getItem("refresh-token") })
      })
      localStorage.setItem("access-token", await accessToken.text());
    }
  }

  useEffect(() => {
    getAccessToken();
    const t = setInterval(getAccessToken, 540000);
    return (() => clearInterval(t))
  }, [])

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className='container-fluid main'>
        <Routes>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tweets' element={<TweetPage />} />
          <Route path='/all-users' element={<AllUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
