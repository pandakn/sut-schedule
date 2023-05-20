import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  textColor: string;
  bgColor: string;
  icon?: React.ReactNode;
};

const Alert = ({ children, textColor, bgColor, icon }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 z-10 flex justify-center w-full top-6"
      role="alert"
    >
      <div
        style={{ color: textColor, backgroundColor: bgColor }}
        className={`p-4 text-sm rounded-lg`}
      >
        <span className="flex items-center justify-center gap-2 font-medium">
          {icon} <p className="text-lg">{children}</p>
        </span>
      </div>
    </motion.div>
  );
};

export default Alert;
