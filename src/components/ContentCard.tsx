import React from 'react';

interface ContentCardProps {
    title: string;
    verseText: string;
    verseNum: number;
    lastWord: string;
    isLastVerseWord: boolean;
    goToNextWord: () => void;
    goToPreviousWord: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
    title, verseText, lastWord, isLastVerseWord, verseNum, goToNextWord, goToPreviousWord }) => {

    return (
        <div className="rtl rounded-lg border border-gray-300 p-4 shadow-md mx-4" style={{ width: '90%' }}>
            <h2 className="text-2xl font-medium mb-2">{title}</h2>
            <div className="flex space-x-4 mb-2">
                <button
                    onClick={goToPreviousWord}
                    className="next-word-button">
                    <span className="material-icons">arrow_forward</span>
                </button>
                <div className="flex-2"></div>
                <button
                    onClick={goToNextWord}
                    className="next-word-button">
                    <span className="material-icons">arrow_back</span>
                </button>
            </div>
            <div className="rtl text-2xl md:text-2xl lg:text-3xl">
                {verseText} {lastWord && <span className='highlighted-word'>{lastWord}</span>}
                <span className={`verse-number ${isLastVerseWord ? 'verse-number-last' : 'verse-number-default'}`}>
                    {verseNum.toLocaleString('ar-SA')}
                </span>
            </div>
        </div>
    );
};

export default ContentCard;