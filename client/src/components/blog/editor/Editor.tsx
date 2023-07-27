import { SetStateAction, useRef } from "react";
import ReactQuill from "react-quill";
import { EDITOR_TOOLS } from "./tools";

type EditorProps = {
  value?: string;
  onChange: React.Dispatch<SetStateAction<string>>;
};

const Editor = ({ value, onChange }: EditorProps) => {
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: EDITOR_TOOLS,
  };

  return (
    <div className="mx-auto">
      <ReactQuill
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
