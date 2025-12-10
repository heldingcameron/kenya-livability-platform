import { Link } from 'react-router-dom';
import { Map, TrendingUp, Users, Shield } from 'lucide-react';

export const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-display text-primary-600 mb-6">
                        Track Infrastructure Reliability Across Kenya
                    </h1>
                    <p className="text-body-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        A crowdsourced platform for monitoring power, water, and internet status in real-time.
                        Make informed decisions about where to live and work.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/map" className="btn-primary">
                            Explore Map
                        </Link>
                        <Link to="/register" className="btn-secondary">
                            Join Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-h1 text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Map className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-h3 mb-2">Interactive Map</h3>
                            <p className="text-body-sm text-slate-600">
                                View buildings with color-coded livability scores across Nairobi
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-accent-600" />
                            </div>
                            <h3 className="text-h3 mb-2">Real-Time Data</h3>
                            <p className="text-body-sm text-slate-600">
                                Get up-to-date information on power, water, and internet status
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-stable-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-stable-dark" />
                            </div>
                            <h3 className="text-h3 mb-2">Community Driven</h3>
                            <p className="text-body-sm text-slate-600">
                                Submit reports and help others make informed decisions
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-caution-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-caution-dark" />
                            </div>
                            <h3 className="text-h3 mb-2">Verified Data</h3>
                            <p className="text-body-sm text-slate-600">
                                Smart algorithms ensure data quality and prevent abuse
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-primary-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-h1 mb-4">Ready to Get Started?</h2>
                    <p className="text-body-lg mb-8 opacity-90">
                        Join thousands of Kenyans making better decisions about infrastructure
                    </p>
                    <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-slate-100">
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};
