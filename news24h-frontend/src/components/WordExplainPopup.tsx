import React from "react";

type Meaning = {
    pos: string;
    definition: string;
    source: string;
};

interface Props {
    word: string;
    meanings: Meaning[];
    position: {x: number; y: number };
    onClose: () => void;
}

const WordExplainPopup: React.FC<Props> = ({ word, meanings, position, onClose }) => {
    return (
         <div
      className="fixed z-50 bg-white shadow-xl border rounded-lg p-4 max-w-sm text-sm"
      style={{ top: position.y + 10, left: position.x + 10 }}
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-green-700">{word}</strong>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">
          ✕
        </button>
      </div>

      {meanings.map((m, i) => (
        <div key={i} className="mb-2">
          <span className="italic text-gray-600">[{m.pos}]</span>{" "}
          {m.definition}
          <div className="text-xs text-gray-400">Nguồn: {m.source}</div>
        </div>
      ))}
    </div>
    );
};

export default WordExplainPopup;