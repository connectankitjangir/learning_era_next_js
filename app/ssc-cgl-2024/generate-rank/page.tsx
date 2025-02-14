'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import RankForm from './rank_form'; // Import the form component

export default function GenerateRankPage() {
  const [rollNo, setRollNo] = useState('');
  const [selectedMarkType, setSelectedMarkType] = useState('raw_marks');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Roll No:', rollNo);
    console.log('Selected Mark Type:', selectedMarkType);
    // Here you can add further logic to handle the roll number submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white m-3 mt-6 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-4">We&apos;re Working on It!</h1>
      <p className="text-xl">This feature is coming soon. Stay tuned!</p>
      <RankForm
        rollNo={rollNo}
        setRollNo={setRollNo}
        selectedMarkType={selectedMarkType}
        setSelectedMarkType={setSelectedMarkType}
        handleSubmit={handleSubmit}
      />
      <div className="mt-6 animate-bounce">
        <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 text-white animate-spin" />
      </div>
    </div>
  );
}