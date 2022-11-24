import { useEffect, useState } from "react";
import { createContext } from "react";
import Axios from "axios";
import { API_URL } from ".././constant/API";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    //to do

    const res = await Axios.post(`${API_URL}/api/auth/login`, input, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = async () => {
    Axios.post(
      "http://localhost:8800/api/auth/logout",
      {},
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res.data);
        setCurrentUser(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
