import Admin from "@/pages/Admin";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin() {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Admin />;
}
