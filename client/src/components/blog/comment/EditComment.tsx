import { useState } from "react";
import { TOOLS_COMMENT } from "../../../pages/blog/constant";
import Editor from "../editor/Editor";
import FormContainer from "../../FormContainer";
import { hasEnoughContent } from "../../../utils/checkTextInHtmlTag";

type EditCommentProps = {
  body: string;
  toggleModal: () => void;
  handleEditComment: (body: string) => Promise<void>;
};

const EditComment = ({
  body,
  toggleModal,
  handleEditComment,
}: EditCommentProps) => {
  const [content, setContent] = useState(body);

  return (
    <FormContainer header="Edit Comment">
      <Editor
        tools={TOOLS_COMMENT}
        placeholder="What are you thoughts?"
        value={content}
        onChange={setContent}
      />
      <div className="flex justify-end">
        <button
          onClick={() => handleEditComment(content)}
          disabled={!hasEnoughContent(body, 0)}
          className="px-4 py-2 mt-5 text-white capitalize bg-gray-900 disabled:opacity-30 rounded-xl hover:bg-gray-900/75"
        >
          Submit
        </button>
        <button
          onClick={toggleModal}
          className="px-4 py-2 mt-5 text-gray-900 capitalize "
        >
          Cancel
        </button>
      </div>
    </FormContainer>
  );
};

export default EditComment;
