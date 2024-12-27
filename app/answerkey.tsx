'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const AnswerKeySubmission = () => {
  const [answerKeys, setAnswerKeys] = useState<{
    title: string;
    description: string;
    button_name: string;
  }[]>([]);

  useEffect(() => {
    const fetchAnswerKeys = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/answerkey/');
        const data = await response.json();
        setAnswerKeys(data);
      } catch (error) {
        console.error('Error fetching answer keys:', error);
      }
    };

    fetchAnswerKeys();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Answer Key Submission
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Submit your answer key to get instant normalized marks and detailed analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {answerKeys.map((key, index) => (
            <div 
              key={index}
              className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {key.title}
              </h3>
              <p className="text-gray-600 mb-4">
                Submit your {key.button_name} to get marks and analysis
              </p>
              <button
                className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                title={`Submit your ${key.button_name} to get marks and analysis`}
              >
                {key.button_name}
                <Link href="/answerkey_form">Submit</Link>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center space-y-2 bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-900">Why Submit?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Get Raw & Normalized marks instantly</li>
              <li>• Accurate result analysis</li>
              <li>• Instant Normalized marks calculation</li>
              <li>• Detailed Cut Off analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnswerKeySubmission;
