import { useState, useEffect, useMemo } from 'react';
import { buildingApi } from '../utils/api';
import type { Building } from '../types';
import { BuildingCard } from '../components/buildings/BuildingCard';
import { Dropdown } from '../components/ui';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

type SortOption = 'name-asc' | 'name-desc' | 'score-desc' | 'score-asc';

export const BuildingsPage = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('all');
    const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
    const [showOnlyWithData, setShowOnlyWithData] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('name-asc');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

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

    // Get unique neighbourhoods for filter
    const neighbourhoods = useMemo(() => {
        const unique = [...new Set(buildings.map((b) => b.neighbourhood))].sort();
        return unique;
    }, [buildings]);

    // Filter and sort buildings
    const filteredAndSortedBuildings = useMemo(() => {
        let filtered = buildings;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (b) =>
                    b.name.toLowerCase().includes(query) ||
                    b.neighbourhood.toLowerCase().includes(query)
            );
        }

        // Neighbourhood filter
        if (selectedNeighbourhood !== 'all') {
            filtered = filtered.filter((b) => b.neighbourhood === selectedNeighbourhood);
        }

        // Score range filter
        filtered = filtered.filter((b) => {
            if (b.score === null) return scoreRange[0] === 0;
            return b.score >= scoreRange[0] && b.score <= scoreRange[1];
        });

        // Data availability filter
        if (showOnlyWithData) {
            filtered = filtered.filter((b) => b.hasData);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'score-desc':
                    return (b.score ?? -1) - (a.score ?? -1);
                case 'score-asc':
                    return (a.score ?? -1) - (b.score ?? -1);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [buildings, searchQuery, selectedNeighbourhood, scoreRange, showOnlyWithData, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedBuildings.length / ITEMS_PER_PAGE);
    const paginatedBuildings = filteredAndSortedBuildings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedNeighbourhood, scoreRange, showOnlyWithData, sortBy]);

    const neighbourhoodOptions = [
        { value: 'all', label: 'All Neighbourhoods' },
        ...neighbourhoods.map((n) => ({ value: n, label: n })),
    ];

    const sortOptions = [
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'score-desc', label: 'Score (High to Low)' },
        { value: 'score-asc', label: 'Score (Low to High)' },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-body text-slate-600">Loading buildings...</p>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-display text-slate-900 mb-2">Browse Buildings</h1>
                    <p className="text-body text-slate-600">
                        Explore {buildings.length} buildings across Nairobi
                    </p>
                </div>

                {/* Filters */}
                <div className="card mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <SlidersHorizontal className="w-5 h-5 text-slate-600" />
                        <h2 className="text-h2 text-slate-900">Filters & Search</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-body-sm font-medium text-slate-700 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or neighbourhood..."
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Neighbourhood Filter */}
                        <Dropdown
                            label="Neighbourhood"
                            options={neighbourhoodOptions}
                            value={selectedNeighbourhood}
                            onChange={setSelectedNeighbourhood}
                        />

                        {/* Sort */}
                        <Dropdown
                            label="Sort By"
                            options={sortOptions}
                            value={sortBy}
                            onChange={(value) => setSortBy(value as SortOption)}
                        />
                    </div>

                    {/* Score Range Slider */}
                    <div className="mt-4">
                        <label className="block text-body-sm font-medium text-slate-700 mb-2">
                            Score Range: {scoreRange[0]} - {scoreRange[1]}
                        </label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={scoreRange[0]}
                                onChange={(e) => setScoreRange([parseInt(e.target.value), scoreRange[1]])}
                                className="flex-1"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={scoreRange[1]}
                                onChange={(e) => setScoreRange([scoreRange[0], parseInt(e.target.value)])}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    {/* Data Availability Toggle */}
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="showOnlyWithData"
                            checked={showOnlyWithData}
                            onChange={(e) => setShowOnlyWithData(e.target.checked)}
                            className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary/20"
                        />
                        <label htmlFor="showOnlyWithData" className="text-body-sm text-slate-700">
                            Show only buildings with reliable data
                        </label>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4 text-body-sm text-slate-600">
                    Showing {paginatedBuildings.length} of {filteredAndSortedBuildings.length} buildings
                </div>

                {/* Buildings Grid */}
                {paginatedBuildings.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {paginatedBuildings.map((building) => (
                                <BuildingCard key={building.id} building={building} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`
                                                w-10 h-10 rounded-lg font-medium transition-all
                                                ${page === currentPage
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-white text-slate-700 hover:bg-slate-100'
                                                }
                                            `}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <div className="card text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-h3 text-slate-900 mb-2">No buildings found</h3>
                        <p className="text-body text-slate-600 mb-4">
                            Try adjusting your filters or search query
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedNeighbourhood('all');
                                setScoreRange([0, 100]);
                                setShowOnlyWithData(false);
                            }}
                            className="btn-secondary"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
