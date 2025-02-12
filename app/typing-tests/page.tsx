"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabase";

interface Passage {
    id: number;
    title: string;
    description: string;
}

const TypingTestPage: React.FC = () => {
    const [passages, setPassages] = useState<Passage[]>([]);

    useEffect(() => {
        const fetchPassages = async () => {
            const { data, error } = await supabase
                .from('typing-passages')
                .select('*');

            if (error) {
                console.error('Error fetching passages:', error);
            } else {
                console.log('Fetched passages data:', data); // Print all data to console
                setPassages(data || []); // Ensure we set an empty array if data is null
            }
        };

        fetchPassages();
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Typing Test Passages</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {passages.length > 0 ? ( // Check if there are passages to display
                    passages.map((passage) => (
                        <div key={passage.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">{passage.title}</h2>
                            <p className="mb-4">{passage.description.split(' ').slice(0, 10).join(' ')}</p>
                            <Link href={`/typing-test/${passage.id}`} className="bg-blue-500 text-white px-4 py-2 rounded block text-center">
                                Attempt
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No passages available at the moment.</p> // Message if no passages are found
                )}
            </div>
        </div>
    );
};

export default TypingTestPage;
