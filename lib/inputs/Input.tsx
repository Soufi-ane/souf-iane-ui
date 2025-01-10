import {useState} from "react";
import {FieldError, UseFormRegisterReturn } from "react-hook-form";
import {FiEye, FiEyeOff} from "react-icons/fi";


interface InputProps<T extends string | number> {
  label: string;
  type: "text" | "number" | "password" | "tel" | "email";
  error?: FieldError | undefined;
  register?: UseFormRegisterReturn;
  value?: T;
  Icon? : React.ReactNode;
  rounded? : "md" | "lg" | "full" | "none";
  onChange?: (value: T) => void;
}

const Input = <T extends string | number>({
  label,
  type,
  register,
  error,
  onChange,
  value,
  Icon,
  rounded = "none",
}: InputProps<T>) => {
	const [passwordShown,setPasswordShown] = useState(false);
	let inputStyles = `py-[9px] focus:outline-none leading-1 rounded-${rounded} ${Icon ? "pl-9" : "pl-3"} pr-2 text-xl
	border-[3.5px] focus:border-blue-600`;
	let eyeStyles = "absolute top-[46px] right-3 cursor-pointer";
  return (
    <span className={` ${error && "mb-4"} w-[30%] relative flex select-none flex-col`}>
			
		{Icon && <span className="absolute top-[46px] left-3">{Icon}</span>}
		{type == "password" && (
		!passwordShown ? 
		<FiEye onClick={()=>setPasswordShown(true)} className={eyeStyles} color="gray" size={20}/>:
		<FiEyeOff onClick={()=>setPasswordShown(false)} className={eyeStyles} color="gray" size={20}/>	
		)}
        <label className="inline-block pb-0.5 text-xl text-gray-600 w-28">
          {label == "Confirm password" ? "" : label}
        </label>
      {register ? (
        <input
          {...register}
          className={inputStyles}
          type={type != "password" ? type : (passwordShown ? "text" : "password")}
          placeholder={label.toLowerCase()}
        >
				</input>
      ) : (
        <input
          value={value ? String(value) : ""}
          onChange={(e) => onChange && onChange(e.target.value as T)}
          className={inputStyles}
          type={type != "password" ? type : (passwordShown ? "text" : "password")}
          placeholder={label.toLowerCase()}
        >

					</input>
      )}
      {error && (
        <p className="absolute mt-[3px] py-[1.5px] -bottom-4.5 leading-[11px] text-red-500 bg-red-100 rounded-md px-1 text-xs left-28">
          {error.message}
        </p>
      )}
    </span>
  );
};

export default Input;





























