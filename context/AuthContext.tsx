import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext<any>({});

const AuthProvider: React.FC = ({ children }: any) => {
  const [authData, setAuthData] = useState<any>();

  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    // const _authData = await authService.signIn(
    //   "lucasgarcez@email.com",
    //   "123456"
    // );

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData({});
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
