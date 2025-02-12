"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { supabase } from "../../lib/supabase";
import Head from 'next/head';

const RELEASE_TIME = new Date("2025-02-13T17:15:00").getTime();

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

export default function SSCResultPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [answerKeyLink, setAnswerKeyLink] = useState('');
  const [showRank, setShowRank] = useState(false);

  const [timeLeft, setTimeLeft] = useState(RELEASE_TIME - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(RELEASE_TIME - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "Category Rank is Now Available!";
    
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const checkTime = () => {
      setShowRank(Date.now() >= RELEASE_TIME);
    };

    checkTime();
    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update the page title dynamically when result changes
    if (result) {
      document.title = `SSC CGL 2024 Result - ${result.NAME}`;
    } else {
      document.title = "SSC CGL 2024 Result | LearningEra";
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!rollNumber) {
      setError("Please enter a roll number.");
      return;
    }

    const { data, error } = await supabase
      .from("cgl_2024_result")
      .select("*")
      .eq("roll_number", rollNumber)
      .single();

    if (error || !data) {
      setError("No result found for this roll number.");
    } else {
      setResult(data);
    }
  };

  const downloadTableAsImage = () => {
    const table = document.getElementById('result-table');
    if (table) {
      html2canvas(table).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'learningera_CGL_2024_Result.png';
        link.click();
      });
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content={`Check your SSC CGL 2024 Result for ${result?.NAME || 'your roll number'}.`} />
      </Head>
      <section className="text-center bg-white m-3 mt-6 py-6 text-black rounded-lg shadow-md relative">
        {/* <h1 className="text-3xl font-semibold mb-6 md:text-4xl">SSC CGL 2024 Result</h1> */}
        <h2 className="text-3xl font-semibold mb-6 md:text-4xl">Check SSC CGL 2024 Result</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className='flex justify-center items-center text-2xl font-bold'>Enter your Roll Number</div>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button type="submit" className="m-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg">
            Submit
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold">Result Details</h3>
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Normalization Process</h4>
              <p>
                Normalization is done section-wise as per the SSC formula. 
                This ensures that the scores are adjusted based on the difficulty level of each section, 
                allowing for a fair comparison among candidates. 
                Ensuring that all candidates are evaluated on a level playing field.
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
                      if (!response.ok) {
                        throw new Error('Failed to submit answer key link');
                      }
                      const data = await response.json();
                      console.log(data);
                      alert(data.message);
                      window.location.href = '/';
                    } catch (error: unknown) {
                      if (error instanceof Error) {
                        setError('Error submitting answer key link: ' + error.message);
                      } else {
                        setError('An unknown error occurred');
                      }
                    }
                  }}
                  className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Submit Answer Key Link
                </button>
              </div>
            )}
            <table id="result-table" className="w-[80vw] border-collapse border border-gray-300 mt-4 mx-auto relative">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 font-bold text-blue-500">Candidate Details</th>
                  <th className="border border-gray-300 px-4 py-2 font-bold text-red-500">
                    <FontAwesomeIcon icon={faYoutube} className="mr-1" />
                    /LearningEra
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Roll Number:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.roll_number}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Exam Date:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.exam_date === "ABSENT" ? '-' : result.exam_date.split(' ')[0]}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Name:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.NAME}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Category 1:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.CAT1 == 9 ? 'UR' : 
                     result.CAT1 == 6 ? 'OBC' : 
                     result.CAT1 == 0 ? 'EWS' : 
                     result.CAT1 == 1 ? 'SC' : 
                     result.CAT1 == 2 ? 'ST' : 
                     result.CAT1}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Category 2:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.CAT2 == 3 ? 'ESM' : result.CAT2 || '-'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Category 3:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.CAT3 == 4 ? 'OH' :
                     result.CAT3 == 5 ? 'HH' :
                     result.CAT3 == 7 ? 'VH' :
                     result.CAT3 == 8 ? 'Other-PWD' :
                     result.CAT3 || '-'}
                  </td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500"><strong>Exam Marks</strong></td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500">
                    
                    <FontAwesomeIcon icon={faTelegram} className="mr-1" />
                    /learning_era
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Total Normalized Marks:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.total_normalized_marks) : 'Data not found'}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500"><strong>Exam Ranks</strong></td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500">
                  <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                  www.learningera.co.in
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks Rank:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_section_1_2_marks) : 'Data not found'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks with Bonus Rank:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_section_1_2_marks_with_bonous) : 'Data not found'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Normalized Marks Rank:</strong></td>
                  <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_total_normalized_marks) : 'Data not found'}</td>
                </tr>
                
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Category Rank (Normalized Marks):</strong></td>
                    <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.category_rank) : 'Data not found'}</td>
                  </tr>
                    {showRank && (
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>Zone Rank (Without Category):</strong></td>
                        <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.zone_rank_all_india) : 'Data not found'}</td>
                      </tr>
                    )}
                    {showRank && (
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"><strong>State Rank (Without Category):</strong></td>
                        <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.state_rank_all_india) : 'Data not found'}</td>
                      </tr>
                    )}
                
                {showRank && (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>Zone Rank (With Category):</strong></td>
                    <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.zone_rank) : 'Data not found'}</td>
                  </tr>
                )}
                {showRank && (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong>State Rank (With Category):</strong></td>
                    <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? '-' : result.computer_status === "F" ? 'Disqualified in Computer' : result.state_rank) : 'Data not found'}</td>
                  </tr>
                )}
                {!showRank && (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><strong> Zone & State Wise Rank :</strong></td>
                    <td className="px-4 py-2 text-blue-500 font-bold animate-pulse">Zone & State Wise Rank will be available soon!</td>
                  </tr>
                )}
              </tbody>
            </table>
            {!showRank && (
              <div className="mt-4 text-lg font-bold">
                Zone & State Wise Rank will be available in: <span className="text-red-500">{formatTime(timeLeft)}</span>
              </div>
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
        )}
      </section>
    </>
  );
};
