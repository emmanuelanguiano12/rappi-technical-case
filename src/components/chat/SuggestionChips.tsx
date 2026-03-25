'use client';

interface Props {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function SuggestionChips({ suggestions, onSelect }: Props) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1.5 hover:bg-orange-100 transition-colors text-left"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
