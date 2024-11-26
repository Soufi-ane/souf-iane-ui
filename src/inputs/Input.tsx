import React from "react";
interface InputProps {
  type: string;
  label: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ type, label, onChange }) => {
  return (
    <span>
      <label>{label}</label>
      <input type={type} onChange={(e) => onChange(e.target.value)} />
    </span>
  );
};

export default Input;
