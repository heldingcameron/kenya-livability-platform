import { Link } from 'react-router-dom';
import { Zap, Droplet, Wifi, MapPin, TrendingUp } from 'lucide-react';
import type { Building } from '../../types';

interface BuildingPopupProps {
    building: Building;
}

const getStatusColor = (status: string | null) => {
    switch (status) {
        case 'STABLE':
            return 'text-stable';
        case 'FLICKERING':
            return 'text-caution';
        case 'OUTAGE':
            return 'text-critical';
        default:
            return 'text-slate-400';
    }
};

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

export const BuildingPopup: React.FC<BuildingPopupProps> = ({ building }) => {
    return (
        <div
            style={{
                minWidth: '240px',
                maxWidth: '280px',
                boxSizing: 'border-box'
            }}
            className="overflow-hidden"
        >
            <div className="px-4 pt-4 pb-3">
                {/* Building Name */}
                <h3 className="text-lg font-semibold mb-1 text-slate-900 break-words">{building.name}</h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{building.neighbourhood}, {building.city}</span>
                </div>

                {/* Composite Score */}
                {building.hasData && building.score !== null ? (
                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="text-sm font-medium text-slate-700">Livability Score</span>
                            <span
                                className={`text-xl font-bold flex-shrink-0 ${building.score >= 75
                                    ? 'text-stable'
                                    : building.score >= 40
                                        ? 'text-caution'
                                        : 'text-critical'
                                    }`}
                            >
                                {Math.round(building.score)}
                            </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all ${building.score >= 75
                                    ? 'bg-stable'
                                    : building.score >= 40
                                        ? 'bg-caution'
                                        : 'bg-critical'
                                    }`}
                                style={{ width: `${building.score}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mb-3 p-2 bg-slate-50 rounded border border-slate-200">
                        <p className="text-xs text-slate-600">Insufficient data for score</p>
                    </div>
                )}

                {/* Utility Scores */}
                <div className="space-y-1.5 mb-3">
                    {(['POWER', 'WATER', 'INTERNET'] as const).map((utilityType) => {
                        const utility = building.utilityScores[utilityType];
                        const Icon = getUtilityIcon(utilityType);

                        return (
                            <div key={utilityType} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <Icon className={`w-4 h-4 flex-shrink-0 ${getStatusColor(utility.status)}`} />
                                    <span className="text-sm capitalize">{utilityType.toLowerCase()}</span>
                                </div>
                                <span
                                    className={`text-sm font-medium tabular-nums flex-shrink-0 ${utility.score !== null ? getStatusColor(utility.status) : 'text-slate-400'
                                        }`}
                                >
                                    {utility.score !== null ? Math.round(utility.score) : 'N/A'}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Report Count */}
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                    <TrendingUp className="w-3 h-3 flex-shrink-0" />
                    <span>{building.reportCount} reports (last 30 days)</span>
                </div>
            </div>

            {/* View Details Button - Full width within container */}
            <Link
                to={`/buildings/${building.id}`}
                className="block w-full text-center bg-primary-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-primary-700 transition-colors"
            >
                View Details
            </Link>
        </div>
    );
};
