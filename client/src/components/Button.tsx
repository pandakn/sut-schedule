import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`border px-4 py-2 rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
