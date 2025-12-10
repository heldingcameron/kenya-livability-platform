import { motion } from 'framer-motion';

interface BuildingMarkerProps {
    score: number | null;
    hasData: boolean;
}

const getMarkerColor = (score: number | null): string => {
    if (score === null) return '#9ca3af'; // Grey for no data
    if (score >= 75) return '#10b981'; // Green
    if (score >= 40) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
};

export const BuildingMarker: React.FC<BuildingMarkerProps> = ({ score, hasData }) => {
    const color = getMarkerColor(score);
    const shouldGlow = score !== null && (score >= 75 || score < 40);

    return (
        <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            <div className="relative">
                {/* Glow effect for excellent or poor scores */}
                {shouldGlow && (
                    <div
                        className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"
                        style={{ backgroundColor: color }}
                    />
                )}

                {/* Marker pin */}
                <svg
                    width="32"
                    height="40"
                    viewBox="0 0 32 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative"
                >
                    <path
                        d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40C16 40 32 24.837 32 16C32 7.163 24.837 0 16 0Z"
                        fill={color}
                    />
                    <circle cx="16" cy="16" r="8" fill="white" fillOpacity="0.9" />
                    {score !== null && (
                        <text
                            x="16"
                            y="20"
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill={color}
                        >
                            {Math.round(score)}
                        </text>
                    )}
                </svg>
            </div>
        </motion.div>
    );
};
