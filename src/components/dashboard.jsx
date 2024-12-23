import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, Loader2, LogOut, Camera, Clock } from 'lucide-react';

const Dashboard = ({ onLogout }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recentUploads, setRecentUploads] = useState([]);

    useEffect(() => {
        console.log("Prediction state updated (from useEffect):", prediction);
    }, [prediction]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPrediction('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://127.0.0.1:8000/predict/', {
                method: 'POST',
                body: formData,
            });

            console.log("Raw Response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP Error:", response.status, errorText);
                setError(`HTTP error ${response.status}: ${errorText}`);
                return;
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const responseText = await response.text();
                console.error("Response is not JSON:", responseText);
                setError("Response is not JSON");
                return;
            }

            const data = await response.json();
            console.log("Parsed Response Data:", data);
            console.log("Prediction before setPrediction:", prediction);
            setPrediction(data.prediction);
            console.log("Prediction after setPrediction:", data.prediction);
            console.log("Prediction state after setPrediction:", prediction);

            setRecentUploads([
                {
                    id: Date.now(),
                    image: previewUrl,
                    prediction: data.prediction,
                    timestamp: new Date().toLocaleString(),
                },
                ...recentUploads.slice(0, 4),
            ]);

        } catch (error) {
            console.error("Fetch Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-100 to-lime-300">
            <header className="bg-white/80 backdrop-blur-sm shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-lime-700 flex items-center gap-2">
                        <Camera className="w-6 h-6" />
                        Coconut Maturity Detection
                    </h1>
                    <Button onClick={onLogout} variant="ghost" className="flex items-center gap-2 text-lime-700 hover:bg-lime-100">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lime-700">Upload Image</CardTitle>
                            <CardDescription>Upload a coconut image to detect its maturity</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>

                            {previewUrl && (
                                <div className="mt-4">
                                    <img src={previewUrl} alt="Preview" className="max-w-full h-auto max-h-96 mx-auto rounded-lg shadow-lg" />
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button onClick={handleUpload} disabled={!selectedImage || loading} className="px-8 bg-lime-600 hover:bg-lime-700 text-white font-bold" size="lg">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing
                                        </>
                                    ) : (
                                        'Detect Maturity'
                                    )}
                                </Button>
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div>
                                <p>Prediction: {prediction}</p>
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lime-700">
                                <Clock className="w-5 h-5" />
                                Recent Uploads
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentUploads.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No recent uploads</p>
                            ) : (
                                recentUploads.map((upload) => (
                                    <div key={upload.id} className="border rounded-lg p-3 space-y-2 border-lime-200">
                                        <img src={upload.image} alt="Recent upload" className="w-full h-32 object-cover rounded-lg" />
                                        <div className="text-sm">
                                            <p className="font-medium text-lime-700">Result: {upload.prediction}</p>
                                            <p className="text-gray-500">{upload.timestamp}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;