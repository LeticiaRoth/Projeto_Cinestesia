import { Route, Routes } from "react-router-dom";

// Páginas
import Home from "./pages/Home/Home";
import VerFilmes from "./pages/VerFilmes/VerFilmes";
import AdicionarFilme from "./pages/AdicionarFilme/AdicionarFilme";
import InformacoesFilme from "./pages/InformacoesFilme/InformacoesFilme";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import AdminHome from "./pages/AdminHome/AdminHome";
import EdicaoAdmin from "./pages/EdicaoAdmin/EdicaoAdmin";

// Layouts
import MainLayout from "./components/MainLayout/MainLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";

//
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
    const { user } = useAuth();

    const Layout = user.role === "admin" ? AdminLayout : MainLayout;

    return (
        <Routes>
            {/* Rotas compartilhadas entre o administrador e o usuário comum */}
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/verFilmes" element={<VerFilmes />} />
                <Route path="/adicionar" element={<AdicionarFilme />} />
                <Route path="/filme/:id" element={<InformacoesFilme />} />
                <Route path="/filme/editar/:id" element={<EdicaoAdmin />} />
            </Route>

            {/* Rotas exclusivas do administrador */}
            {user.role === "admin" && (
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/adicionar" element={<AdicionarFilme />} />
                    <Route path="/admin/catalogo" element={<VerFilmes />} />
                </Route>
            )}

            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}