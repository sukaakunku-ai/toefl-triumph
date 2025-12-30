import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Simple auth - you can replace this with a more secure solution
const ADMIN_PASSWORD = "admin123"; // Change this to your desired password

export default function Login() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if already logged in
        const auth = localStorage.getItem("adminAuth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }

        // Theme handling
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem("adminAuth", "true");
            setIsAuthenticated(true);
            toast.success("Login berhasil!");
        } else {
            toast.error("Password salah!");
            setPassword("");
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/admin/panel" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Masukkan password untuk mengakses panel admin
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        placeholder="Masukkan password admin"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" variant="hero">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
