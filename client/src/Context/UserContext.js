import React, { createContext, useContext, useState } from "react";
 
const UserContext = createContext()

const UserProvider = (props) => {
    const [userData,setUserData]=useState({
        user:undefined,
        token:undefined
    });

  return (
    <UserContext.Provider value={[userData,setUserData]}>
        {props.children}
    </UserContext.Provider>

  )
};

export default UserProvider;
export const useDataContext = ()=> useContext(UserContext);