import React, { useEffect, useRef } from 'react';
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

  return (
    <div ref={drawerRef} className={`drawer ${drawerOpen ? 'open' : ''}`}>
      <button onClick={toggleDrawer} className="p-2">
        <span className="material-icons">close</span>
      </button>
      <ul>
        {chapters.map((chapter: any) => (
          <li
            key={chapter.id}
            className={`p-2 border-b drawer-item ${chapter.id === selectedChapterId ? 'selected-chapter' : ''}`}
            onClick={() => {
              onChapterSelect(chapter.id);
            }}
          >
            {chapter.name_arabic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
