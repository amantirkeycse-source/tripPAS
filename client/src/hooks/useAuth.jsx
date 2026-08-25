import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { useLocalStorage } from './useLocalStorage';

import {
  loginUser,
  registerUser,
  logoutUser
} from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useLocalStorage(
    'trippas_user',
    null
  );

  const [isAuthenticated, setIsAuthenticated] =
    useState(!!user);

  const [loading, setLoading] =
    useState(false);

  // ==================================================
  // KEEP AUTH STATE IN SYNC
  // ==================================================

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // ==================================================
  // LOGIN
  // ==================================================

  const login = async (email, password) => {
    try {
      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      if (!data.success) {
        throw new Error(
          data.message ||
          'Login failed'
        );
      }

      // Backend se real user
      setUser(data.user);

      setIsAuthenticated(true);

      return data.user;

    } catch (error) {

      console.error(
        'Login error:',
        error
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // SIGN UP
  // ==================================================

  const signup = async (
    name,
    email,
    password
  ) => {

    try {

      setLoading(true);

      const data = await registerUser(
        name,
        email,
        password
      );

      if (!data.success) {
        throw new Error(
          data.message ||
          'Registration failed'
        );
      }

      // Backend se real user
      setUser(data.user);

      setIsAuthenticated(true);

      return data.user;

    } catch (error) {

      console.error(
        'Signup error:',
        error
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {

    logoutUser();

    setUser(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==================================================
// USE AUTH
// ==================================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
};

export default useAuth;