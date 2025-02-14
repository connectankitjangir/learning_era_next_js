"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase";
import Head from 'next/head';
import Link from 'next/link';
import ResultDisplay from './result_display'; // Import the ResultDisplay component
// import RankTimer from './RankTimer'; // Import the RankTimer component

const RELEASE_TIME = new Date("2025-02-17T17:15:00").getTime();

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

  useEffect(() => {
    const checkTime = () => {
      setShowRank(Date.now() >= RELEASE_TIME);
    };
    checkTime();
    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = result ? `SSC CGL 2024 Result - ${result.NAME}` : "SSC CGL 2024 Result | LearningEra";
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

  return (
    <>
      <Head>
        <meta name="description" content={`Check your SSC CGL 2024 Result for ${result?.NAME || 'your roll number'}.`} />
      </Head>
      <section className="text-center bg-white m-3 mt-6 py-6 text-black rounded-lg shadow-md relative">
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

        <div className="mt-4">
          <h3 className="text-2xl font-bold">Generate Your Rank</h3>
          <p className="mb-2">To generate your rank using custom filters, please visit the following link:</p>
          <Link href="/ssc-cgl-2024/generate-rank" className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            Generate Rank
          </Link>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <ResultDisplay
            result={result}
            answerKeyLink={answerKeyLink}
            setAnswerKeyLink={setAnswerKeyLink}
            showRank={showRank}
            timeLeft={timeLeft}
          />
        )}
      </section>
    </>
  );
}