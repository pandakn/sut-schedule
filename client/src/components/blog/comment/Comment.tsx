import { SetStateAction } from "react";

// constant
import { TOOLS_COMMENT } from "../../../pages/blog/constant";

import Editor from "../editor/Editor";
import { hasEnoughContent } from "../../../utils/checkTextInHtmlTag";

type CommentProps = {
  content: string;
  setContent: React.Dispatch<SetStateAction<string>>;
  submitComment: () => Promise<void>;
};

const Comment = ({ content, setContent, submitComment }: CommentProps) => {
  return (
    <div>
      <Editor
        tools={TOOLS_COMMENT}
        placeholder="What are you thoughts?"
        value={content}
        onChange={setContent}
      />
      <button
        onClick={submitComment}
        disabled={!hasEnoughContent(content, 0)}
        className="px-4 py-2 mt-5 text-white capitalize bg-gray-900 disabled:opacity-30 rounded-xl hover:bg-gray-900/75"
      >
        Respond
      </button>
    </div>
  );
};

export default Comment;
