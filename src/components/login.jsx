import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Camera, Loader2 } from 'lucide-react';

const Login = ({ onLogin, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
        if (username && password) {
            onLogin(username, password);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 via-lime-200 to-emerald-200 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-24 h-24 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-24 h-24 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="space-y-6 text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <Camera className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                        Coconut Maturity Detection
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="h-12 px-4 bg-white/50 backdrop-blur-sm border-lime-200 focus:border-lime-400 focus:ring-lime-400 transition-all duration-300"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 px-4 bg-white/50 backdrop-blur-sm border-lime-200 focus:border-lime-400 focus:ring-lime-400 transition-all duration-300"
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive" className="animate-shake">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;