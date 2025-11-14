import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Define o estado inicial do usuário (ninguém logado)
// 'guest' (convidado) é mais seguro do que 'user'
const estadoInicialUsuario = {
  nome: null,
  role: "guest", // 'guest', 'user', ou 'admin'
  token: null
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(estadoInicialUsuario);

  // Adiciona uma função de logout para limpar o usuário
  const logout = () => {
    setUser(estadoInicialUsuario);
    // Aqui você também pode invalidar o token no backend se desejar
    // fetch('http://localhost:8000/logout', { ... });
  };

  return (
    // Agora o Contexto fornece o usuário, a função de login (setUser) e a de logout
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}