import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Map, Building, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-level-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                            <Map className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-h3 text-slate-900 hidden sm:block">Livability</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/map"
                            className="flex items-center gap-2 text-body text-slate-700 hover:text-primary-600 transition-colors"
                        >
                            <Map className="w-4 h-4" />
                            <span>Map</span>
                        </Link>
                        <Link
                            to="/buildings"
                            className="flex items-center gap-2 text-body text-slate-700 hover:text-primary-600 transition-colors"
                        >
                            <Building className="w-4 h-4" />
                            <span>Buildings</span>
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/submit-report"
                                className="flex items-center gap-2 text-body text-slate-700 hover:text-primary-600 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Submit Report</span>
                            </Link>
                        )}
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-body-sm text-slate-600">{user?.email}</span>
                                <button onClick={handleLogout} className="btn-ghost flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-ghost">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <nav className="px-4 py-4 space-y-3">
                        <Link
                            to="/map"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-body text-slate-700 hover:bg-slate-50 rounded-lg"
                        >
                            <Map className="w-5 h-5" />
                            <span>Map</span>
                        </Link>
                        <Link
                            to="/buildings"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-body text-slate-700 hover:bg-slate-50 rounded-lg"
                        >
                            <Building className="w-5 h-5" />
                            <span>Buildings</span>
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/submit-report"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-body text-slate-700 hover:bg-slate-50 rounded-lg"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Submit Report</span>
                            </Link>
                        )}

                        <div className="border-t border-slate-200 pt-3 mt-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-4 py-2 text-body-sm text-slate-600">{user?.email}</div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-body text-slate-700 hover:bg-slate-50 rounded-lg"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full btn-ghost text-center"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full btn-primary text-center"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
