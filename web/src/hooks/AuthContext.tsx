import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ICredentialsData{
    token: string;
    user: IUser;
}

interface ICredentials {
    email: string;
    password: string;   
}

interface IAuthContext {
    token: string;
    user: IUser;
    signIn(credentials:ICredentials): Promise<void>;
    signOut(): void;
    updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider: React.FC = ({children}) => {

    const getCredentialsFromLocalStorage = useCallback(()=>{
      const token = localStorage.getItem('@HappyApp:token');
      const user = localStorage.getItem('@HappyApp:user');
  
      if(token && user){
        api.defaults.headers.authorization = `Bearer ${token}`;
        return { token, user:JSON.parse(user)}
      }
  
      return {} as ICredentialsData;
    },[]);

  const [credentialsData, setCredentialsData] = useState<ICredentialsData>(getCredentialsFromLocalStorage);


  const signIn = useCallback(async({email, password}) => {
      const response = await api.post('sessions',{
          email: email,
          password: password
      });
      const { token, user } = response.data;
      
      api.defaults.headers.authorization = `Bearer ${token}`;

      localStorage.setItem('@HappyApp:token', token);
      localStorage.setItem('@HappyApp:user', JSON.stringify(user));

      setCredentialsData({token: token, user: user});
  },[]);

  const signOut = useCallback(() => {
    
    localStorage.removeItem('@HappyApp:token');
    localStorage.removeItem('@HappyApp:user');

    setCredentialsData({} as ICredentialsData);
},[]);

const updateUser = useCallback((updateData: IUser) => {
  setCredentialsData({ token: credentialsData.token, user: updateData});
  localStorage.setItem('@HappyApp:user', JSON.stringify(updateData));
},[credentialsData.token]);

  return (
    <AuthContext.Provider value={{token: credentialsData.token, user: credentialsData.user, signIn, signOut, updateUser}}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth must be used within an Auth Provider');
    }

    return context;
}
