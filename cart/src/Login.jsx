import React, {useState} from 'react';
import { useLoggedIn } from './hooks/useLogin';
import { login } from './services/login.service';

export default function Login({ style = {}}) {
  const loggedIn = useLoggedIn();

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("sally"); // in our sample user data
  const [password, setPassword] = useState("123"); // in our sample user data

  if (loggedIn) return null;

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)}>
        <i className="ri-fingerprint-line text-2xl" id="showlogin"></i>
      </span>
      {showLogin && (
        <div
          className="absolute p-5 border-4 border-blue-800 bg-white rounded-xl text-black"
          style={{
            width: "clamp(200px,100px + 10vmin ,25vmin)",
            top: "4rem",
            ...style
          }}
        >
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full mt-3"
          />
          <button
            className="bg-green-900 text-white py-2 px-5 rounded-md text-sm mt-5"
            onClick={() => login(username, password)}
            id="loginbtn"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
