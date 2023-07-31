import React, { useEffect } from "react";
import { ITag } from "../../pages/blog/Blog";

interface SuggestionTagsProps {
  suggestions: ITag[];
  handleClickAddTag: (name: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

const SuggestionTags: React.FC<SuggestionTagsProps> = ({
  suggestions,
  handleClickAddTag,
  showSuggestions,
  setShowSuggestions,
  containerRef,
  inputRef,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [containerRef, inputRef, setShowSuggestions]);

  return (
    <div className="absolute z-10 w-full h-4" ref={containerRef}>
      {showSuggestions && (
        <ul className="left-0 w-full px-4 py-2 mt-2 space-y-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 ">
          <p className="py-2 text-xl border-b-[1px] border-gray-300">Tags</p>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClickAddTag(suggestion.name)}
              className="py-1 text-lg tracking-wider cursor-pointer hover:bg-gray-100"
            >
              #{suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionTags;
