import { useNavigate } from 'react-router-dom';
import { Building } from '../../types';
import { Badge } from '../ui';
import { Zap, Droplet, Wifi, MapPin } from 'lucide-react';

interface BuildingCardProps {
    building: Building;
}

export const BuildingCard = ({ building }: BuildingCardProps) => {
    const navigate = useNavigate();

    const getScoreColor = (score: number | null) => {
        if (score === null) return 'text-slate-400';
        if (score >= 75) return 'text-stable';
        if (score >= 40) return 'text-caution';
        return 'text-critical';
    };

    const getScoreBg = (score: number | null) => {
        if (score === null) return 'bg-slate-100';
        if (score >= 75) return 'bg-stable/10';
        if (score >= 40) return 'bg-caution/10';
        return 'bg-critical/10';
    };

    const getUtilityBadgeVariant = (status: string | null) => {
        if (!status) return 'neutral';
        if (status === 'STABLE') return 'stable';
        if (status === 'FLICKERING') return 'caution';
        return 'critical';
    };

    return (
        <div
            onClick={() => navigate(`/buildings/${building.id}`)}
            className="card cursor-pointer transition-all duration-200 hover:shadow-level-4 hover:-translate-y-1 group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-h3 text-slate-900 group-hover:text-primary-600 transition-colors">
                        {building.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-body-sm text-slate-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{building.neighbourhood}</span>
                    </div>
                </div>

                {/* Score Badge */}
                <div
                    className={`
                        ${getScoreBg(building.score)}
                        rounded-xl px-4 py-2 text-center min-w-[80px]
                    `}
                >
                    <div className={`text-2xl font-bold ${getScoreColor(building.score)}`}>
                        {building.score !== null ? Math.round(building.score) : '--'}
                    </div>
                    <div className="text-xs text-slate-600">Score</div>
                </div>
            </div>

            {/* Utility Status Badges */}
            <div className="flex flex-wrap gap-2">
                <Badge
                    variant={getUtilityBadgeVariant(building.utilityScores.POWER.status)}
                    size="sm"
                    icon={Zap}
                >
                    {building.utilityScores.POWER.status || 'No data'}
                </Badge>
                <Badge
                    variant={getUtilityBadgeVariant(building.utilityScores.WATER.status)}
                    size="sm"
                    icon={Droplet}
                >
                    {building.utilityScores.WATER.status || 'No data'}
                </Badge>
                <Badge
                    variant={getUtilityBadgeVariant(building.utilityScores.INTERNET.status)}
                    size="sm"
                    icon={Wifi}
                >
                    {building.utilityScores.INTERNET.status || 'No data'}
                </Badge>
            </div>

            {/* Data Trust Warning */}
            {!building.hasData && (
                <div className="mt-3 text-xs text-slate-500 italic">
                    Insufficient data for reliable score
                </div>
            )}

            {/* Report Count */}
            {building.reportCount > 0 && (
                <div className="mt-3 text-xs text-slate-600">
                    {building.reportCount} report{building.reportCount !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};
