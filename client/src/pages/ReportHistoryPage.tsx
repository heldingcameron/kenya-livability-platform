import { useState, useEffect } from 'react';
import { reportApi } from '../utils/api';
import { Badge } from '../components/ui';
import { Calendar, MapPin, Zap, Droplet, Wifi } from 'lucide-react';
import { format } from 'date-fns';

interface ReportWithBuilding {
    id: string;
    utilityType: 'POWER' | 'WATER' | 'INTERNET';
    status: 'STABLE' | 'FLICKERING' | 'OUTAGE';
    createdAt: string;
    building: {
        id: string;
        name: string;
        neighbourhood: string;
    };
}

export const ReportHistoryPage = () => {
    const [reports, setReports] = useState<ReportWithBuilding[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterUtility, setFilterUtility] = useState<string>('all');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const { reports: data } = await reportApi.getMyReports();
                setReports(data);
            } catch (err) {
                setError('Failed to load reports');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = reports.filter((report) =>
        filterUtility === 'all' ? true : report.utilityType === filterUtility
    );

    const getUtilityIcon = (type: string) => {
        switch (type) {
            case 'POWER':
                return Zap;
            case 'WATER':
                return Droplet;
            case 'INTERNET':
                return Wifi;
            default:
                return Zap;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'STABLE':
                return 'stable';
            case 'FLICKERING':
                return 'caution';
            case 'OUTAGE':
                return 'critical';
            default:
                return 'neutral';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-body text-slate-600">Loading your reports...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="card max-w-md">
                    <p className="text-body text-critical">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-display text-slate-900 mb-2">My Reports</h1>
                    <p className="text-body text-slate-600">
                        View your report history ({reports.length} total reports)
                    </p>
                </div>

                {/* Filter */}
                <div className="card mb-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-body-sm font-medium text-slate-700">Filter by:</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilterUtility('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterUtility === 'all'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterUtility('POWER')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterUtility === 'POWER'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                Power
                            </button>
                            <button
                                onClick={() => setFilterUtility('WATER')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterUtility === 'WATER'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                Water
                            </button>
                            <button
                                onClick={() => setFilterUtility('INTERNET')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterUtility === 'INTERNET'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                Internet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reports List */}
                {filteredReports.length > 0 ? (
                    <div className="space-y-4">
                        {filteredReports.map((report) => {
                            const Icon = getUtilityIcon(report.utilityType);
                            return (
                                <div key={report.id} className="card hover:shadow-level-3 transition-shadow">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Icon className="w-5 h-5 text-slate-600" />
                                                <h3 className="text-h3 text-slate-900">
                                                    {report.utilityType}
                                                </h3>
                                                <Badge
                                                    variant={getStatusVariant(report.status) as any}
                                                    size="sm"
                                                >
                                                    {report.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-body-sm text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>
                                                        {report.building.name}, {report.building.neighbourhood}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {format(new Date(report.createdAt), 'MMM d, yyyy h:mm a')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="card text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-h3 text-slate-900 mb-2">No reports found</h3>
                        <p className="text-body text-slate-600 mb-4">
                            {filterUtility === 'all'
                                ? "You haven't submitted any reports yet"
                                : `No ${filterUtility.toLowerCase()} reports found`}
                        </p>
                        {filterUtility !== 'all' && (
                            <button
                                onClick={() => setFilterUtility('all')}
                                className="btn-secondary"
                            >
                                Show All Reports
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
