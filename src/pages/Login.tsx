import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, BookOpen, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            }
            setIsCheckingAuth(false);
        });

        // Theme handling
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
        }

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email dan password harus diisi!");
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            toast.success("Login berhasil!");
            setIsAuthenticated(true);
        } catch (error: any) {
            console.error("Login error:", error);
            let message = "Login gagal. Silakan coba lagi.";
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                message = "Email atau password salah!";
            } else if (error.code === "auth/too-many-requests") {
                message = "Terlalu banyak percobaan login. Akun Anda sementara dikunci.";
            }
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/admin/panel" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-border shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-lg mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Akses panel manajemen TOEFL Triumph
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Admin</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12"
                                        placeholder="admin@example.com"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-12"
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 font-bold text-lg rounded-xl transition-all"
                                variant="hero"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Mencoba Masuk...
                                    </>
                                ) : (
                                    "Masuk ke Panel"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <p className="text-center mt-6 text-xs text-muted-foreground">
                    Keamanan tingkat tinggi diaktifkan. Semua akses dicatat.
                </p>
            </motion.div>
        </div>
    );
}
