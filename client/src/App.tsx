import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MapPage } from './pages/MapPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-slate-50">
                    <Header />
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected routes */}
                        <Route
                            path="/map"
                            element={
                                <ProtectedRoute>
                                    <MapPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Placeholder routes for Phase 2 */}
                        <Route path="/buildings" element={<div className="p-8 text-center">Buildings page - Coming in Phase 2</div>} />
                        <Route path="/buildings/:id" element={<div className="p-8 text-center">Building detail - Coming in Phase 2</div>} />
                        <Route path="/submit-report" element={<div className="p-8 text-center">Submit report - Coming in Phase 2</div>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
