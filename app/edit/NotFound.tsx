// app/edit/NotFound.tsx

import React from 'react';
import Link from 'next/link';

const EditNotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Edit Section Not Found</h1>
            <p className="mb-6">The edit section you're looking for does not exist.</p>
            <Link href="/story">
                <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Go Back to Story
                </a>
            </Link>
        </div>
    );
};

export default EditNotFound;
