import { createContext, useContext, useState } from "react";

/* Permite o compartilhamento de informações do usuário sem precisar ficar passando manualmente */
const AuthContext = createContext();

/* Define o estado padrão do usuário quando a aplicação inicia. Assume que ele começa "deslogado", mas define uma role padrão como "user" por segurança */
const estadoInicialUsuario = {
    nome: null,
    role: "user",
    token: null
};

/* Componente pai que envolve as partes sem precisar saber quem está logado. Ele recebe 'children' para poder renderizar qualquer componente que colocar dentro dele */
export function AuthProvider({ children }) {

    /* Guardar os dados do usuário */
    const [user, setUser] = useState(estadoInicialUsuario);

    /* Função de logout para facilitar */
    const logout = () => {
        setUser(estadoInicialUsuario);
    };

    /* No value coloca tudo o que quer exportar para todo o projeto */
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}