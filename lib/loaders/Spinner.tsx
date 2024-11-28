import React from "react";

interface SpinnerProps {
  size: "large" | "medium" | "small";
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return (
    <div
      className={` 
        } flex items-center justify-center`}
    >
      <div
        className={`${size == "small" && "size-4 border-[3px]"}
                      ${size == "medium" && "size-7 border-[3px]"}
                      ${size == "large" && "size-10 border-[3.5px]"}
               animate-spin inline-block  border-current border-t-transparent  rounded-full`}
      ></div>
    </div>
  );
};

export default Spinner;
