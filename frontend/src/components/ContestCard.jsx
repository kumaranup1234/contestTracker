import bookmarkFilled from '../assets/bookmark-filled.svg';
import bookmarkEmpty from '../assets/bookmark.svg';
import calendar from '../assets/calendarIcon.svg';
import clock from '../assets/clock.svg';
import trophy from '../assets/trophy.svg';
import youtube from '../assets/youtube.svg';

const ContestCard = ({ contest, isBookmarked, toggleBookmark }) => {

    const startDate = new Date(contest.startTimeUnix * 1000).toLocaleString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    const hours = Math.floor(contest.durationSeconds / 3600);
    const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
    const duration = `${hours}h ${minutes}m`;

    const platformColors = {
        LeetCode: 'bg-yellow-100 text-yellow-800',
        Codeforces: 'bg-blue-100 text-blue-800',
        CodeChef: 'bg-orange-100 text-orange-800',
    };

    const phaseColors = {
        FINISHED: 'bg-gray-200 text-gray-600',
        UPCOMING: 'bg-green-100 text-green-800',
        BEFORE: 'bg-green-100 text-green-800',
        ONGOING: 'bg-blue-100 text-blue-800',
    };

    const handleAddToGoogleCalendar = (contest) => {
        const startTime = new Date(contest.startTimeUnix * 1000);
        const endTime = new Date((contest.startTimeUnix + contest.durationSeconds) * 1000);

        const formatDateToGoogleCalendar = (date) => {
            const isoString = date.toISOString();
            return isoString.replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z');
        };

        const startTimeFormatted = formatDateToGoogleCalendar(startTime);
        const endTimeFormatted = formatDateToGoogleCalendar(endTime);

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.platform + ' ' + contest.name)}&dates=${startTimeFormatted}/${endTimeFormatted}&details=${encodeURIComponent('Join this contest on ' + contest.platform)}&location=${encodeURIComponent(contest.url)}`;

        window.open(url, '_blank');
    };


    return (
        <div className="border border-gray-200 h-auto lg:w-80 p-6 rounded-2xl bg-white">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${platformColors[contest.platform]}`}>
            {contest.platform}
          </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${phaseColors[contest.phase]}`}>
            {contest.phase}
          </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${phaseColors[contest.phase]}`}>
            {contest.type == null ? "Regular" : contest.type}
          </span>
                </div>

                <img
                    src={isBookmarked ? bookmarkFilled : bookmarkEmpty}
                    alt="Bookmark"
                    className="h-5 cursor-pointer"
                    onClick={() => {
                        console.log(contest.contestId)
                        toggleBookmark(contest.contestId);
                    }}
                />
            </div>

            <h1 className="font-bold text-xl mt-4 dark:text-white">{contest.name}</h1>

            <div className="flex items-center space-x-2 mt-4 dark:text-white">
                <img src={calendar} alt="Calendar" className="h-4 mt-1" />
                <div>
                    <p className="text-sm">Start:</p>
                    <p className="text-sm font-semibold">{startDate} (IST)</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={clock} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Duration:</p>
                    <p className="text-sm font-semibold">{duration}</p>
                </div>
            </div>

            <div className="flex space-x-4 mt-6 dark:text-white">
                <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2"
                >
                    <img src={trophy} alt="Trophy" className="h-4" />
                    <span>Join Contest</span>
                </a>
                {contest.phase === 'BEFORE' && <button className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                            onClick={() => {handleAddToGoogleCalendar(contest)}}
                    >
                        Remind Me
                    </button>}

                {contest.solutionLink && contest.phase === 'FINISHED' && <a
                    href={contest.solutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                >
                    <img src={youtube} alt="Youtube link" className="h-4" />
                    <span> Solution</span>
                </a>}
            </div>
        </div>
    );
};

export default ContestCard;
