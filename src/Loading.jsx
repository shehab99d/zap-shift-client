import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
