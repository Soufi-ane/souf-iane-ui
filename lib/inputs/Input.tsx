import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const inputStyles = "rounded-md border-2 py-[6.5px] w-[28.5vw] px-2";

interface InputProps<T extends string | number> {
  label?: string;
  type: "text" | "number" | "password" | "tel" | "email";
  error?: FieldError | undefined;
  register?: UseFormRegisterReturn;
  value?: T;
  onChange?: (value: T) => void;
}

const Input = <T extends string | number>({
  label,
  type,
  register,
  error,
  onChange,
  value,
}: InputProps<T>) => {
  return (
    <span className={` ${error && "mb-4"} relative `}>
      {label && (
        <label className="w-28 inline-block">
          {label == "Confirm password" ? "" : `${label}:`}{" "}
        </label>
      )}
      {register ? (
        <input
          {...register}
          className={inputStyles}
          type={type}
          placeholder={label ? label.toLowerCase() : ""}
        />
      ) : (
        <input
          value={value ? String(value) : ""}
          onChange={(e) => onChange && onChange(e.target.value as T)}
          className={inputStyles}
          type={type}
          placeholder={label ? label.toLowerCase() : ""}
        />
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
