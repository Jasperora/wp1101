import { useState, useContext, createContext } from "react";

const UserContext = createContext({
  name: "",
  setName: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const UserProvider = (props) => {
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        isLogin,
        setIsLogin,
      }}
      {...props}
    />
  );
};

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
