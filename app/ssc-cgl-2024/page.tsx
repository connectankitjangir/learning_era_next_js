'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { supabase } from "../../lib/supabase";


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
}


const SSCResultPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [answerKeyLink, setAnswerKeyLink] = useState('');

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
    <section className="text-center bg-white m-6 py-6 text-black rounded-lg shadow-md relative">
      
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
        <button type="submit" className="ml-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Result Details</h3>
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
                <td className="border border-gray-300 px-4 py-2">{result.exam_date.split(' ')[0]}</td>
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
                  <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                  www.learningera.co.in
                </td>
              </tr>
              {/* <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.section_1_2_marks) : 'Data not found'}</td>
              </tr> */}
              {/* <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks with Bonus:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.section_1_2_marks_with_bonous) : 'Data not found'}</td>
              </tr> */}
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Total Normalized Marks:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.total_normalized_marks) : 'Data not found'}</td>
              </tr>
              <tr className='bg-gray-100'>
                <td className="border border-gray-300 px-4 py-2 text-blue-500"><strong>Exam Ranks</strong></td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <FontAwesomeIcon icon={faTelegram} className="mr-1" />
                  /learning_era
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_section_1_2_marks) : 'Data not found'}</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks with Bonus Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_section_1_2_marks_with_bonous) : 'Data not found'}</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Normalized Marks Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqualified in Computer' : result.rank_by_total_normalized_marks) : 'Data not found'}</td>
              </tr>

              {/* <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Category Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqualified in Computer' : result.category_rank) : 'Data not found'}</td>
              </tr> */}
            </tbody>
          </table>
          <button onClick={downloadTableAsImage} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Download Result as Image
          </button>
        </div>
      )}
    </section>
  );
};

export default SSCResultPage;