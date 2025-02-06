import React from 'react';

interface DrawerProps {
  chapters: any[];
  drawerOpen: boolean;
  toggleDrawer: () => void;
  onChapterSelect: (chapterId: number) => void;
  selectedChapterId: number;
}

const Drawer: React.FC<DrawerProps> = ({ chapters, drawerOpen, toggleDrawer, onChapterSelect, selectedChapterId }) => {
  return (
    <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}>
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
              toggleDrawer();
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
