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
      <h3 className="mb-4 text-2xl font-bold ">Comments</h3>
      <Editor
        tools={TOOLS_COMMENT}
        placeholder="What are you thoughts?"
        value={content}
        onChange={setContent}
      />
      <button
        onClick={submitComment}
        disabled={!hasEnoughContent(content, 1)}
        className="px-4 py-2 mt-5 text-white capitalize bg-gray-900 disabled:opacity-30 rounded-xl hover:bg-gray-900/75"
      >
        Send
      </button>
    </div>
  );
};

export default Comment;
