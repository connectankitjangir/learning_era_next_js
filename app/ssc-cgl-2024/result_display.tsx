"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import YouTube icon
import html2canvas from 'html2canvas';
import RankTimer from './RankTimer'; // Import the RankTimer component

interface Result {
  roll_number: number;
  exam_date: string;
  NAME: string;
  CAT1: number;
  CAT2: number;
  CAT3: number;
  total_normalized_marks: number;
  computer_status: string;
  rank_by_section_1_2_marks: number;
  rank_by_section_1_2_marks_with_bonous: number;
  rank_by_total_normalized_marks: number;
  category_rank: number;
  zone_rank: number;
  state_rank: number;
  zone_rank_all_india: number;
  state_rank_all_india: number;
}

interface ResultDisplayProps {
  result: Result;
  answerKeyLink: string;
  setAnswerKeyLink: (link: string) => void;
  showRank: boolean;
  timeLeft: number;
}

export default function ResultDisplay({
  result,
  answerKeyLink,
  setAnswerKeyLink,
  showRank,
  timeLeft,
}: ResultDisplayProps) {
  const downloadTableAsImage = () => {
    const table = document.getElementById('result-tiles');
    if (table) {
      html2canvas(table).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'learningera_CGL_2024_Result.png';
        link.click();
      });
    }
  };

  const getCategoryLabel = (category: number) => {
    const categoryLabels: { [key: number]: string } = {
      9: 'UR',
      6: 'OBC',
      0: 'EWS',
      1: 'SC',
      2: 'ST',
      4: 'OH',
      5: 'HH',
      7: 'VH',
      8: 'Other-PWD',
    };
    return categoryLabels[category] || category;
  };

  const getRankValue = (result: Result, rankKey: keyof Result) => {
    return result.exam_date
      ? result.exam_date === "ABSENT"
        ? '-'
        : result.computer_status === "F"
        ? 'Disqualified in Computer'
        : result[rankKey]
      : 'Data not found';
  };

  return (
    <div className="mt-6 mx-2">
      <h3 className="text-2xl font-bold">Result Details</h3>
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Normalization Process</h4>
        <p>
          Normalization is done section-wise as per the SSC formula. 
          This ensures that the scores are adjusted based on the difficulty level of each section, 
          allowing for a fair comparison among candidates.
        </p>
      </div>
      <button onClick={downloadTableAsImage} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Download Result as Image
      </button>
      {result.exam_date === "" && (
        <div className="mt-4">
          <input
            type="url"
            value={answerKeyLink}
            onChange={(e) => setAnswerKeyLink(e.target.value)}
            placeholder="Enter Answer Key Link"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            onClick={async () => {
              try {
                const response = await fetch('https://api.learningera.co.in/answerkey/ssc-cgl-2024-answerkey/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ link: answerKeyLink }),
                });
                if (!response.ok) throw new Error('Failed to submit answer key link');
                const data = await response.json();
                alert(data.message);
                window.location.href = '/';
              } catch (error: unknown) {
                alert('Error submitting answer key link: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
              }
            }}
            className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit Answer Key Link
          </button>
        </div>
      )}
      <div id="result-tiles" className="grid grid-cols-2 gap-4 mt-4 mx-auto">
        {[
          { label: "Roll Number:", value: result.roll_number },
          { label: "Exam Date:", value: result.exam_date === "ABSENT" ? '-' : result.exam_date.split(' ')[0] },
          { label: "Name:", value: result.NAME },
          { label: "Category 1:", value: getCategoryLabel(result.CAT1) },
          { label: "Category 2:", value: result.CAT2 === 3 ? 'ESM' : result.CAT2 || '-' },
          { label: "Category 3:", value: getCategoryLabel(result.CAT3) },
          { label: "Total Normalized Marks:", value: result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.total_normalized_marks) : 'Data not found' },
          { label: "Raw Marks Rank:", value: getRankValue(result, 'rank_by_section_1_2_marks') },
          { label: "Raw Marks with Bonus Rank:", value: getRankValue(result, 'rank_by_section_1_2_marks_with_bonous') },
          { label: "Normalized Marks Rank:", value: getRankValue(result, 'rank_by_total_normalized_marks') },
          { label: "Category Rank (Normalized Marks):", value: getRankValue(result, 'category_rank') },
          { label: "Zone Rank (Without Category):", value: getRankValue(result, 'zone_rank_all_india') },
          { label: "YouTube Channel:", value: <span className="flex items-center font-bold text-blue-600"><FontAwesomeIcon icon={faYoutube} className="mr-2" />/learningera</span> },
          { label: "Website URL:", value: <span className="flex items-center font-bold text-blue-600"><FontAwesomeIcon icon={faGlobe} className="mr-2" />learningera.co.in</span> },
          { label: "State Rank (Without Category):", value: getRankValue(result, 'state_rank_all_india') },
          { label: "Zone Rank (With Category):", value: getRankValue(result, 'zone_rank') },
          { label: "State Rank (With Category):", value: getRankValue(result, 'state_rank') },
        ].map((item, index) => (
          <div key={index} className="relative border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center">
            <strong>{item.label}</strong> {item.value}
          </div>
        ))}
        {!showRank && (
          <div className="border border-gray-300 p-4 rounded-lg shadow-md">
            <strong> Age & CPT Wise Rank :</strong> <span className="text-blue-500 font-bold animate-pulse">Age & CPT Wise Rank will be available soon!</span>
          </div>
        )}
      </div>
      {!showRank && (
        <RankTimer timeLeft={timeLeft} />
      )}
      <div className="mt-4">
        <h4 className="text-xl font-semibold">Zone and State Information</h4>
        <p>
          Based on the Tier 1 exam city, candidates can determine their respective zones and states. 
          This information is crucial for understanding the regional distribution of ranks and for 
          further analysis of performance across different areas. 
          Please refer to the official SSC guidelines for detailed information on zones and states.
        </p>
      </div>
      <button onClick={downloadTableAsImage} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Download Result as Image
      </button>
    </div>
  );
}