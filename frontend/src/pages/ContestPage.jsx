import React, {useEffect, useState} from 'react';
import FilterCard from '../components/FilterCard';
import {fetchContests} from "../services/apiService.js";
import ContestCard from "../components/ContestCard.jsx";
import toast from "react-hot-toast";

const statusMapping = {
    BEFORE: 'Upcoming',
    ONGOING: 'Ongoing',
    FINISHED: 'Finished',
};

const platforms = ['Codeforces', 'CodeChef', 'LeetCode']

const ContestPage = () => {
    const [selectedPlatforms, setSelectedPlatforms] = useState(new Set(platforms));
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
    const [bookmarkedContests, setBookmarkedContests] = useState(new Set());
    const [contests, setContests] = useState([]);


    const handleRefresh = async () => {
        const data = await fetchContests();
        setContests(data);
    };

    const handleReset = () => {
        setSelectedPlatforms(new Set(platforms));
        setSelectedStatus('All');
        setBookmarkedOnly(false);
    };

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarkedContests(new Set(savedBookmarks));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                toast.loading("⏳ Fetching contests from the server. Please wait!");
                const data = await fetchContests();
                setContests(data);
                toast.dismiss();
                toast.success("✅ Data loaded successfully! 🎉");
            } catch (error) {
                console.error("Error fetching contests:", error);
                toast.dismiss();
                toast.error("❗ Error fetching contests. Please try again. 🚫");
            }
        };
        fetchData();
    }, []);


    const toggleBookmark = (contestId) => {
        const updatedBookmarks = new Set(bookmarkedContests);

        if (updatedBookmarks.has(contestId)) {
            updatedBookmarks.delete(contestId);
        } else {
            updatedBookmarks.add(contestId);
        }

        setBookmarkedContests(new Set(updatedBookmarks));
        localStorage.setItem('bookmarks', JSON.stringify(Array.from(updatedBookmarks)));
    };

    const filteredContests = contests.filter((contest) => {
        const isPlatformMatch =
            selectedPlatforms.size === 0 || selectedPlatforms.has(contest.platform);
        const isStatusMatch =
            selectedStatus === 'All' || statusMapping[contest.phase] === selectedStatus;
        const isBookmarkedMatch = !bookmarkedOnly || bookmarkedContests.has(contest.contestId);

        return isPlatformMatch && isStatusMatch && isBookmarkedMatch;
    });


    const groupedContests = selectedStatus === "All" ?
        filteredContests.reduce((acc, contest) => {
            const phaseName = statusMapping[contest.phase];
            if (!acc[phaseName]) acc[phaseName] = [];
            acc[phaseName].push(contest);
            return acc;
        }, {})
        : { [selectedStatus]: filteredContests };


    return (
        <div className="p-4 grid lg:flex gap-4">
            <div className="lg:w-1/4 lg:min-w-[260px] overflow-y-auto">
                <FilterCard
                    selectedPlatforms={selectedPlatforms}
                    setSelectedPlatforms={setSelectedPlatforms}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    bookmarkedOnly={bookmarkedOnly}
                    setBookmarkedOnly={setBookmarkedOnly}
                    onRefresh={handleRefresh}
                    onReset={handleReset}
                />
            </div>
            <div className="flex-1 overflow-y-auto h-full">
                {selectedStatus === 'All' && <p className="font-bold text-2xl">All Contests</p>}
            {selectedStatus === 'All' ? (
                    Object.entries(groupedContests).map(([status, contests]) => (
                        contests.length > 0 && (
                            <div key={status} >
                                <div className="h-full">
                                    <p className="font-bold mt-4 mb-3 text-lg">{status} Contests <span className="text-sm px-2 py-1 rounded-xl bg-blue-500 text-white">{contests.length}</span></p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {contests.map((contest) => (
                                            <ContestCard
                                                key={contest.contestId}
                                                contest={contest}
                                                isBookmarked={bookmarkedContests.has(contest.contestId)}
                                                toggleBookmark={toggleBookmark}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                <div className="flex-1 overflow-y-auto h-full">
                    <p className="font-bold text-2xl">{selectedStatus} Contests</p>
                <p className="font-bold mt-4 mb-3 text-lg">{selectedStatus} Contests <span className="text-sm px-2 py-1 rounded-xl bg-blue-500 text-white">{filteredContests.length}</span></p>
                {filteredContests.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredContests.map((contest) => (
                            <ContestCard
                                key={contest.contestId}
                                contest={contest}
                                isBookmarked={bookmarkedContests.has(contest.contestId)}
                                toggleBookmark={toggleBookmark}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No contests available based on the current filters.</p>
                )}
            </div>
            )}
            </div>
        </div>
    );

};

export default ContestPage;
