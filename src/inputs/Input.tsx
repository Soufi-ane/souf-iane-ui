import React from "react";
interface InputProps {
  type: string;
  label: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ type, label, onChange }) => {
  return (
    <span>
      <label>hellllooo</label>
      <input
        className="bg-red-500 border-2 border-black"
        type={type}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </span>
  );
};

export default Input;
