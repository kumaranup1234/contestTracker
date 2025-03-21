import './App.css'
import ContestPage from "./pages/ContestPage.jsx";
import toast, {Toaster} from "react-hot-toast";

function App() {

    const toggleDarkMode = () => {
        return toast('Coming soon! 🛠');
    }

    return (
      <div>
          <div><Toaster/></div>
          <div className="mb-3">
              <div className="p-4 flex justify-between items-center max-w-6xl mx-auto">
                  <h1 className="font-bold text-xl dark:text-white">Contest Tracker</h1>
                  <button className="bg-blue-500 rounded px-4 py-2 text-white cursor-pointer">
                      Contests
                  </button>
                  <button
                      onClick={toggleDarkMode}
                      className="hover:accent-gray-700 dark:bg-white bg-black dark:text-black text-white rounded-xl h-10 px-4 py-2 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                               className="h-4 w-4">
                              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                          </svg>
                  </button>
              </div>

              <div className="border border-gray-100 w-full"></div>
          </div>
          <ContestPage />
      </div>
  )
}

export default App
