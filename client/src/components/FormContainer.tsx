import React from "react";

type Props = {
  children: React.ReactNode;
  header: string;
};

const FormContainer = ({ children, header }: Props) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
      <div className="p-8 bg-white rounded-lg shadow-2xl shadow-slate-300 min-w-1/2">
        <h2 className="mb-4 text-2xl font-bold capitalize">{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
