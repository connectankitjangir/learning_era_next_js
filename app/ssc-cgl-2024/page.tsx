'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';

const SSCResultPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [answerKeyLink, setAnswerKeyLink] = useState(''); // Added state for answerKeyLink

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://api.learningera.co.in/ssc-results/ssc-cgl-2024/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ roll_number: rollNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        
        if (errorData.error === 'Result not found') {
          setError('Please enter a valid roll number');
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      setError('Error fetching results: ' + error.message);
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
                    // Handle success (e.g., show a success message)
                  } catch (error) {
                    setError('Error submitting answer key link: ' + error.message);
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
                <td className="border border-gray-300 px-4 py-2">{result.name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Category 1:</strong></td>
                <td className="border border-gray-300 px-4 py-2">
                  {result.cat1 === '9' ? 'UR' : 
                   result.cat1 === '6' ? 'OBC' : 
                   result.cat1 === '0' ? 'EWS' : 
                   result.cat1 === '1' ? 'SC' : 
                   result.cat1 === '2' ? 'ST' : 
                   result.cat1}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Category 2:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.cat2 == 3 ? 'ESM' : result.cat2 || '-'}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Category 3:</strong></td>
                <td className="border border-gray-300 px-4 py-2">
                  {result.cat3 == 4 ? 'OH' :
                   result.cat3 == 5 ? 'HH' :
                   
                   result.cat3 == 7 ? 'VH' :
                   result.cat3 == 8 ? 'Other-PWD' :
                   result.cat3 || '-'}


                </td>
              </tr>

              <tr className='bg-gray-100'>
                <td className="border border-gray-300 px-4 py-2 text-blue-500"><strong>Exam Marks</strong></td>
                <td className="border border-gray-300 px-4 py-2 text-blue-500">
                  <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                  www.learningera.co.in
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.section_1_2_marks) : 'Data not found'}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks with Bonus:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.section_1_2_marks_with_bonous) : 'Data not found'}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Total Normalized Marks:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.total_normalized_marks) : 'Data not found'}</td>
              </tr>
              <tr className='bg-gray-100'>
                <td className="border border-gray-300 px-4 py-2 text-blue-500"><strong>Exam Rank</strong></td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <FontAwesomeIcon icon={faTelegram} className="mr-1" />
                  /learning_era
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqalified in Computer' : result.rank_by_section_1_2_marks) : 'Data not found'}</td>
              </tr>


              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Raw Marks with Bonus Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqalified in Computer' : result.rank_by_section_1_2_marks_with_bonous) : 'Data not found'}</td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Normalized Marks Rank:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{result.exam_date ? (result.exam_date === "ABSENT" ? 'Candidate Absent' : result.computer_status === "F" ? 'Disqalified in Computer' : result.rank_by_total_normalized_marks) : 'Data not found'}</td>
              </tr>


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