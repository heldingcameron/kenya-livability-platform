import { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { buildingApi } from '../utils/api';
import type { Building } from '../types';
import { BuildingMarker } from '../components/map/BuildingMarker';
import { BuildingPopup } from '../components/map/BuildingPopup';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../popup-overrides.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const NAIROBI_CENTER = { lat: -1.2921, lng: 36.8219 };

export const MapPage = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Debug: Check if Mapbox token is loaded
    useEffect(() => {
        console.log('Mapbox token loaded:', MAPBOX_TOKEN ? 'YES' : 'NO');
        console.log('Token length:', MAPBOX_TOKEN?.length || 0);
        if (!MAPBOX_TOKEN) {
            setError('Mapbox token is missing. Please check your .env file.');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const { buildings } = await buildingApi.getAll();
                setBuildings(buildings);
            } catch (err) {
                setError('Failed to load buildings');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuildings();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-body text-slate-600">Loading map...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="card max-w-md">
                    <p className="text-body text-critical">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: NAIROBI_CENTER.lng,
                    latitude: NAIROBI_CENTER.lat,
                    zoom: 11,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                {/* Map Controls */}
                <NavigationControl position="top-right" />
                <GeolocateControl position="top-right" />

                {/* Building Markers */}
                {buildings.map((building) => (
                    <Marker
                        key={building.id}
                        longitude={building.longitude}
                        latitude={building.latitude}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedBuilding(building);
                        }}
                    >
                        <BuildingMarker score={building.score} hasData={building.hasData} />
                    </Marker>
                ))}

                {/* Building Popup */}
                {selectedBuilding && (
                    <Popup
                        longitude={selectedBuilding.longitude}
                        latitude={selectedBuilding.latitude}
                        anchor="top"
                        onClose={() => setSelectedBuilding(null)}
                        closeButton={true}
                        closeOnClick={false}
                        maxWidth="300px"
                        offset={12}
                    >
                        <BuildingPopup building={selectedBuilding} />
                    </Popup>
                )}
            </Map>

            {/* Map Legend */}
            <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-level-3 p-4 max-w-xs">
                <h3 className="text-h3 mb-3">Livability Score</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-stable"></div>
                        <span className="text-body-sm">75-100: Excellent</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-caution"></div>
                        <span className="text-body-sm">40-74: Moderate</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-critical"></div>
                        <span className="text-body-sm">0-39: Poor</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-400"></div>
                        <span className="text-body-sm">No data</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
