import { SetStateAction, useRef } from "react";
import ReactQuill from "react-quill";

import { TOOLS_CREATE } from "../../../pages/blog/constant";

type EditorProps = {
  tools?: unknown[];
  value?: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

const Editor = ({
  tools = TOOLS_CREATE,
  value,
  onChange,
  placeholder,
}: EditorProps) => {
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: tools,
  };

  return (
    <div className="mx-auto">
      <ReactQuill
        placeholder={placeholder}
        ref={reactQuillRef}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
