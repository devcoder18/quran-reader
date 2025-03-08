import React, { useEffect, useRef, useState } from 'react';
import './Drawer.css';

interface DrawerProps {
  chapters: any[];
  drawerOpen: boolean;
  toggleDrawer: () => void;
  onChapterSelect: (chapterId: number) => void;
  selectedChapterId: number;
}

const Drawer: React.FC<DrawerProps> = ({ chapters, drawerOpen, toggleDrawer, onChapterSelect, selectedChapterId }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(preferredTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        toggleDrawer();
      }
    };

    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen, toggleDrawer]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div ref={drawerRef} className={`drawer ${drawerOpen ? 'open' : ''}`}>
      <button onClick={toggleDrawer} className="p-2">
        <span className="material-icons">close</span>
      </button>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="p-2">
          <span className="material-icons">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
        </button>
      </div>
      <ul>
        {chapters.map((chapter: any) => (
          <li
            key={chapter.id}
            className={`p-2 border-b drawer-item ${chapter.id === selectedChapterId ? 'selected-chapter' : ''}`}
            onClick={() => {
              onChapterSelect(chapter.id);
            }}
          >
            <span className="chapter-number">{chapter.id.toLocaleString('ar-SA')}</span>
            <span className="chapter-name">{chapter.name_arabic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
