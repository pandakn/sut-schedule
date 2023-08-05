import React from "react";

type Props = {
  children: React.ReactNode;
  header?: string;
};

const FormContainer = ({ children, header }: Props) => {
  const checkHeader =
    header === "login" ||
    header === "register" ||
    header === "forgot password" ||
    header === "reset password";

  return (
    <div
      className={`${
        checkHeader && "absolute bottom-0 left-0 right-0 top-0"
      } flex items-center justify-center w-full`}
    >
      <div className="p-8 rounded-lg  shadow-2xl w-72 sm:w-80 md:w-[480px] shadow-slate-300">
        <h2 className="mb-4 text-2xl font-bold capitalize">{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
