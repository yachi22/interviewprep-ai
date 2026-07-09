import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const response = await getProfile();
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}