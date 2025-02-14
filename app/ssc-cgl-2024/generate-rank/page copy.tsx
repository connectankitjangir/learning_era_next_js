import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function GenerateRankPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white m-3 mt-6 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-4">We&apos;re Working on It!</h1>
      <p className="text-xl">This feature is coming soon. Stay tuned!</p>
      <div className="mt-6 animate-bounce">
        <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 text-white animate-spin" />
      </div>
    </div>
  );
}
