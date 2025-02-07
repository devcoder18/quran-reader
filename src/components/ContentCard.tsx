import React from 'react';

interface ContentCardProps {
    title: string;
    verseText: string;
    verseNum: number;
    lastWord: string;
    isLastVerseWord: boolean;
    goToNextWord: () => void;
    goToPreviousWord: () => void;
    loading: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
    title, verseText, lastWord, isLastVerseWord, verseNum, goToNextWord, goToPreviousWord, loading }) => {

    return (

        <div className="flex-col w-full">
            <h2 className="text-2xl font-medium mb-2 text-center">{title}</h2>
            <div className="flex grow">
                <button
                    onClick={goToNextWord}
                    className="next-word-button">
                    <span className="material-icons">arrow_back</span>
                </button>

                <div className="text-center rtl rounded-lg border border-gray-300 p-4 shadow-md mx-4 grow">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <span className="material-icons">hourglass</span>
                        </div>
                    ) : (
                        <div className="rtl text-2xl md:text-2xl lg:text-3xl text-center">
                            {verseText} {lastWord && <span className='highlighted-word'>{lastWord}</span>}
                            <span className={`verse-number ${isLastVerseWord ? 'verse-number-last' : 'verse-number-default'}`}>
                                {verseNum.toLocaleString('ar-SA')}
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={goToPreviousWord}
                    className="next-word-button">
                    <span className="material-icons">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default ContentCard;