import React from 'react';
import filter from '../assets/filter.svg';
import bookmarkFilled from '../assets/bookmark-filled.svg';

const FilterCard = ({
                        selectedPlatforms,
                        setSelectedPlatforms,
                        selectedStatus,
                        setSelectedStatus,
                        bookmarkedOnly,
                        setBookmarkedOnly,
                        onRefresh,
                        onReset,
                    }) => {

    const platforms = [
        { name: 'Codeforces', color: 'bg-blue-500' },
        { name: 'CodeChef', color: 'bg-orange-500' },
        { name: 'LeetCode', color: 'bg-yellow-500' }
    ];

    const statusOptions = ['All', 'Upcoming', 'Ongoing', 'Finished'];

    const togglePlatform = (platform) => {
        const updatedPlatforms = new Set(selectedPlatforms);
        if (updatedPlatforms.has(platform)) {
            updatedPlatforms.delete(platform);
        } else {
            updatedPlatforms.add(platform);
        }
        setSelectedPlatforms(updatedPlatforms);
    };

    return (
        <div className="lg:w-80 p-4 border border-gray-200 rounded-2xl bg-white">
            <h2 className="text-lg font-semibold mb-4">Filter Contests</h2>

            <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex items-center mb-4">
                    <img src={filter} alt="filter" className="w-5 h-5 mr-2" />
                    <span className="font-medium">Filters</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Platforms</h3>
                    <div className="flex gap-2 flex-wrap">
                        {platforms.map((platform) => (
                            <button
                                key={platform.name}
                                onClick={() => togglePlatform(platform.name)}
                                className={`px-3 py-1 text-sm rounded-full ${
                                    !selectedPlatforms.has(platform.name)
                                        ? 'bg-white text-gray-800'
                                        : `${platform.color} text-white`
                                }`}
                            >
                                {platform.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Status</h3>
                    <div className="flex gap-2 flex-wrap">
                        {statusOptions.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-3 py-1 rounded-full ${
                                    selectedStatus === status
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                } text-sm`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={() => setBookmarkedOnly((prev) => !prev)}
                        className={`flex items-center px-3 py-1 rounded-full text-sm ${
                            bookmarkedOnly
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        <img src={bookmarkFilled} alt="bookmark" className="h-4 mr-2" />
                        Bookmarked Only
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={onRefresh}
                    className="flex-1 px-3 py-1 text-sm rounded-xl bg-blue-500 text-white cursor-pointer"
                >
                    Refresh
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 px-3 py-1 text-sm rounded-xl bg-gray-200 text-gray-800 cursor-pointer"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterCard;
