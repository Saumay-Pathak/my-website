import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Faster loading - complete in ~1.5 seconds instead of 3+
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Faster fade out
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(onComplete, 200);
                    }, 150);
                    return 100;
                }
                // Faster progress increments
                return prev + 20 + Math.random() * 15;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`loading-screen transition-opacity duration-300 ${progress >= 100 ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="text-center">
                {/* Logo / Name */}
                <div className="mb-6">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        <span className="text-gradient">SP</span>
                    </h1>
                    <p className="text-gray-500 font-mono text-sm">Saumay Pathak</p>
                </div>

                {/* Simple Progress Bar */}
                <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-100"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                {/* Minimal Loading Text */}
                <div className="font-mono text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                    UI built from scratch using custom Three.js components.
                    <br />
                    <span className="opacity-50">Not a template.</span>
                </div>
            </div>
        </div>
    );
}
