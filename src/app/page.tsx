'use client'

import Image from "next/image";
import ContentCard from "@/components/ContentCard";
import Drawer from "@/components/Drawer";
import { useEffect, useState } from "react";

export default function Home() {
  const [chapters, setChapters] = useState<any>([]);
  const [verses, setVerses] = useState<any>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [chapterId, setChapterId] = useState<number>(1);
  const [verseNum, setVerseNum] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [verseText, setVerseText] = useState<string>("");

  useEffect(() => {
    const fetchChapters = fetch("/data/chapters.json").then((response) => response.json());
    const fetchSurah = fetch("/data/chapters/1.json").then((response) => response.json());

    Promise.all([fetchChapters, fetchSurah])
      .then(([chaptersData, surahData]) => {
        setChapters(chaptersData.chapters);
        setVerses(surahData.verses);
        setVerseNum(1);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleChapterSelect = (chapterId: number) => {
    fetch(`/data/chapters/${chapterId}.json`)
      .then((response) => response.json())
      .then((data) => {
        setChapterId(chapterId);
        setVerses(data.verses);
        setVerseText("");
        setVerseNum(1);
        setWordIndex(0);
      })
      .catch((error) => console.error("Error fetching chapter:", error));
  };

  const goToNextWord = () => {
    const currentVerse = verses[verseNum - 1];
    const rawFullText = currentVerse?.text_uthmani.trim();

    if (wordIndex <= rawFullText.split(" ").length - 1) {
      setWordIndex((prevIndex) => prevIndex + 1); //go to next word
    } else if (verseNum < verses.length) {
      setVerseNum((prevVerseNum) => prevVerseNum + 1); //go to next verse
      setVerseText("");
      setWordIndex(0);
      return;
    } else if (chapterId < chapters.length) {
      setVerseText("");
      setVerseNum(1);
      setWordIndex(0);
      handleChapterSelect(chapterId + 1); //go to next chapter
      return;
    }

    const fullText: string = verses[verseNum - 1]?.text_uthmani.trim();
    const words: Array<string> = fullText?.split(" ");
    const partialText: string = words.slice(0, wordIndex + 1).join(" ");
    setVerseText(partialText);
  };

  const goToPreviousWord = () => {
    if (wordIndex > 0) {
      setWordIndex((prevIndex) => prevIndex - 1);
      const fullText: string = verses[verseNum - 1]?.text_uthmani.trim();
      const words: Array<string> = fullText?.split(" ");
      const partialText: string = words.slice(0, wordIndex - 1).join(" ");
      setVerseText(partialText);
    }
    else if (verseNum > 1) {
      setVerseNum((prevVerseNum) => prevVerseNum - 1); //go to next verse
      setVerseText("");
      setWordIndex(0);
      return;
    } else if (chapterId > 0) {
      setVerseText("");
      setVerseNum(1);
      setWordIndex(0);
      handleChapterSelect(chapterId - 1); //go to next chapter
      return;
    }
  };
  
  const words = verses[verseNum - 1]?.text_uthmani.trim().split(" ");
  const verseTextPrefix = verseText.split(" ").slice(0, -1).join(" ");
  const lastWord = verseText.split(" ").slice(-1).join(" ");
  const isLastVerseWord = wordIndex === words?.length;

  return (
    <div className="container max-w-screen-xl mx-auto px-4">
      <nav className="sticky top-0 flex items-center space-x-4 justify-between">
        <div className="flex items-center">
          <Image src="/icon.png" alt="icon" width={16} height={16} />
          <div className="ml-2">
            Quran Reader
          </div>
        </div>
        <button onClick={toggleDrawer} className="p-2 flex items-center">
          <span className="material-icons">menu</span>
        </button>
      </nav>
      <Drawer
        chapters={chapters}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        onChapterSelect={handleChapterSelect}
        selectedChapterId={chapterId}
      />
      <div className="flex justify-center xitems-center">
        <ContentCard
          title={chapters[chapterId - 1]?.name_arabic || ""}
          verseText={verseTextPrefix}
          lastWord={lastWord}
          verseNum={verseNum}
          goToNextWord={goToNextWord}
          goToPreviousWord={goToPreviousWord}
          isLastVerseWord={isLastVerseWord}
        />
      </div>
    </div>
  );
}
