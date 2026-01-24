import { useState } from 'react';
import { useWorldState } from '../../hooks/useWorldState';
import { type ZoneKey } from '../../data/portfolio';
import { personalInfo } from '../../data/portfolio';

export function Header() {
    const { currentZone, navigateToZone } = useWorldState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems: { key: ZoneKey; label: string }[] = [
        { key: 'entry', label: 'Home' },
        { key: 'about', label: 'About' },
        { key: 'projects', label: 'Projects' },
        { key: 'contact', label: 'Contact' },
    ];

    const handleNavigate = (key: ZoneKey) => {
        navigateToZone(key);
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-20 p-3 md:p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => handleNavigate('entry')}
                    className="flex items-center gap-2 md:gap-3 group"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl glass flex items-center justify-center font-bold text-sm md:text-lg group-hover:scale-110 transition-transform glow-primary">
                        <span className="text-gradient">SP</span>
                    </div>
                    <div className="hidden sm:block">
                        <div className="font-bold leading-tight text-sm md:text-base">{personalInfo.name}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 font-mono">{personalInfo.title}</div>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleNavigate(item.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentZone === item.key
                                    ? 'bg-primary text-black'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center glass rounded-lg"
                    aria-label="Toggle menu"
                >
                    <svg
                        className={`w-5 h-5 text-white transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Status Indicator - Desktop only */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-400 font-mono">Available</span>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-3 right-3 mt-2 glass rounded-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleNavigate(item.key)}
                            className={`w-full px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${currentZone === item.key
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* Mobile status */}
                    <div className="flex items-center gap-2 px-4 py-3 mt-2 border-t border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-gray-400 font-mono text-xs">Available for work</span>
                    </div>
                </div>
            )}
        </header>
    );
}
