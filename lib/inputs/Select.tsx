import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import useClickOutside from "../hooks/useClickOutside";

interface SelectProps<T, K extends keyof T> {
  label?: string;
  idKey: K;
  valueKey: K;
  data: T[];
  value?: string | undefined;
  updateValue: (value: string) => void;
}

const capitalize = (s: string): string => {
  return s && s?.charAt(0).toUpperCase() + s?.slice(1);
};

const Select = <T, K extends keyof T>({
  label,
  value,
  data,
  updateValue,
  idKey,
  valueKey,
}: SelectProps<T, K>) => {
  const [current, setCurrent] = useState<string | undefined>();
  const [isSelecting, setIsSelecting] = useState(false);
  const { ref } = useClickOutside(() => setIsSelecting(false));
  useEffect(() => {
    if (value !== undefined) {
      setCurrent(value);
    }
  }, [value]);
  return (
    <span className="flex items-center">
      {label && <label className="w-28 inline-block">{label} : </label>}
      <div
        ref={ref}
        onClick={() => setIsSelecting((prev) => !prev)}
        className={`rounded-md border-2 h-10 ${
          isSelecting && "rounded-b-none"
        } relative cursor-pointer py-[6.5px] w-[28.5vw] px-2`}
      >
        <FaAngleDown
          className={`absolute duration-100 right-2.5 ${
            isSelecting && "rotate-180 "
          } top-[9px] text-gray-500`}
          size={18}
        />
        {capitalize(current || "")}
        {isSelecting && (
          <div className="bg-white z-10 border-2 absolute w-[28.5vw] pl-1.5 py-1 -left-0.5 top-9 rounded-b-md max-h-60 overflow-y-scroll scrollbar scrollbar-thin">
            {data.map((object) => (
              <div
                key={String(object[idKey])}
                onClick={() => {
                  setCurrent(String(object[valueKey]));
                  updateValue(String(object[idKey]));
                }}
                className="hover:bg-gray-200 rounded-sm cursor-pointer px-3 py-1.5 my-1"
              >
                {capitalize(String(object[valueKey]))}
              </div>
            ))}
          </div>
        )}
      </div>
    </span>
  );
};

export default Select;
