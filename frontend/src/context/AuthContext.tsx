import {
  createContext,
  useContext,
  useState,
} from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;

  login: (data: any) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: any) => {
  // RESTORE USER FROM LOCALSTORAGE
  const savedUser =
    localStorage.getItem('user');

  const [user, setUser] =
    useState<User | null>(
      savedUser
        ? JSON.parse(savedUser)
        : null
    );

  // LOGIN
  const login = (data: any) => {
    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    setUser(data.user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};