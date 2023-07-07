import React from "react";

type Props = {
  children: React.ReactNode;
  header: string;
};

const FormContainer = ({ children, header }: Props) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full top-10 md:top-0">
      <div className="p-8 bg-white rounded-lg shadow-2xl w-72 sm:w-80 md:w-[480px] shadow-slate-300">
        <h2 className="mb-4 text-2xl font-bold capitalize">{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
