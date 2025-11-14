import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Define o estado inicial do usuário (ninguém logado)
// 'guest' (convidado) é mais seguro do que 'user'
const estadoInicialUsuario = {
  nome: null,
  role: "user", 
  token: null
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(estadoInicialUsuario);

  const logout = () => {
    setUser(estadoInicialUsuario);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}