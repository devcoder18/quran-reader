import React from 'react';

interface ContentCardProps {
    title: string;
    verseText: string;
    verseNum: number;
    lastWord: string;
    goToNextWord: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, verseText, lastWord, verseNum, goToNextWord }) => {
    console.log({ title, verseText, lastWord, verseNum, goToNextWord });
    return (
        <div className="rtl rounded-lg border border-gray-300 p-4 shadow-md mx-4" style={{ width: '90%' }}>
            <h2 className="text-base font-medium mb-2">{title}</h2>
            <button
                onClick={goToNextWord}
                className="rounded-full bg-gray-200 px-3 py-1 text-xs leading-4 font-semibold text-black hover:bg-gray-300 mb-2">
                <span className="material-icons">arrow_back</span>
            </button>

            <div className="rtl text-2xl md:text-2xl lg:text-3xl">
                {verseText} <span className='highlighted-word'>{lastWord}</span>
                <span className="rounded-full border border-gray-400 px-2 py-1 mx-1 w-8 h-8 inline-flex items-center justify-center">
                    {verseNum.toLocaleString('ar-SA')}
                </span>
            </div>
        </div>
    );
};

export default ContentCard;