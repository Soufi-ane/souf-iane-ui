import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useClickOutside from "../hooks/useClickOutside"
import { allDays, formatDayOrMonth, isLeap, months } from "../utils"
const CurrentDate = new Date();
interface PickerParams {
  label?: string;
  width?: "36" | "40" | "80" | "96";
  noPreview?: boolean;
  yearsRange?: number;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<PickerParams> = ({
  label,
  onChange,
  width,
  noPreview = false,
  yearsRange = 100,
}) => {
  const years = Array.from(
    { length: yearsRange <= 2000 ? yearsRange : 2000 },
    (_, index) =>
      index +
      (CurrentDate.getFullYear() - (yearsRange <= 2000 ? yearsRange : 2000) + 1)
  );
  const [isPicking, setIsPicking] = useState(false);
  const [picker, setPicker] = useState("year");
  const [year, setYear] = useState(CurrentDate.getFullYear());
  const [month, setMonth] = useState(CurrentDate.getMonth());
  const [day, setDay] = useState(CurrentDate.getDate());
  const [days, setDays] = useState(allDays);
  const [page, setPage] = useState(Math.round(years.length / 20) - 1);
  useEffect(() => {
    if (month == 2) {
      if (isLeap(year)) {
        setDays((prev) => prev.slice(0, 29));
      } else {
        setDays((prev) => prev.slice(0, 28));
      }
    } else if (month % 2 == 0) {
      setDays((prev) => prev.slice(0, 30));
    } else {
      setDays(allDays);
    }
  }, [month, year]);

  useEffect(() => {
    onChange(`${year}-${formatDayOrMonth(month)}-${formatDayOrMonth(day)}`);
  }, [year, month, day]);

  const { ref } = useClickOutside(() => {
    setIsPicking(false);
    setPicker("year");
    setPage(Math.round(years.length / 20) - 1);
  });
  return (
    <span className="flex items-center">
      {label && <label>{label}</label>}
      {!noPreview && (
        <span
          className={`${
            width ? `w-${width}` : "grow"
          } text-center leading-8 font-mono font-bold ml-3 mr-2 border-2 h-9 rounded-md`}
        >
          {formatDayOrMonth(day)} / {formatDayOrMonth(month)} / {year}
        </span>
      )}
      <span ref={ref} className="relative">
        <IoCalendarOutline
          onClick={() => {
            if (isPicking) {
              setIsPicking(false);
              setPicker("year");
            } else setIsPicking(true);
          }}
          size={32}
          className={`bg-gray-200 hover:bg-black hover:text-gray-100 p-1.5 rounded-md cursor-pointer`}
        />

        <div
          ref={ref}
          className={`${
            isPicking || "hidden"
          } absolute w-72 select-none  py-2 bg-gray-100 rounded-md left-1/2 shadow-[0px_5px_20px_10px_#00000024] bottom-9 -translate-x-1/2`}
        >
          <span className="flex items-center justify-between px-3">
            <IoIosArrowBack
              onClick={() => {
                if (page > 0 && picker == "year") setPage((prev) => prev - 1);
              }}
              size={25}
              className="bg-white p-1 hover:bg-black hover:text-white rounded-md cursor-pointer"
            />
            <p
              onClick={() => {
                if (picker == "day") setPicker("month");
                if (picker == "month") setPicker("year");
              }}
              className="text-center hover:bg-black hover:text-white px-3 py-1 rounded-md"
            >
              {picker}
            </p>
            <IoIosArrowForward
              onClick={() => {
                if (page < 4 && picker == "year") setPage((prev) => prev + 1);
              }}
              size={25}
              className="bg-white p-1 hover:bg-black hover:text-white rounded-md cursor-pointer"
            />
          </span>
          {picker == "year" && (
            <span className="grid px-2 grid-cols-4 gap-2 pt-3">
              {years.slice(page * 20, page * 20 + 20).map((y, index) => (
                <span
                  onClick={() => {
                    setYear(y);
                    if (y != CurrentDate.getFullYear()) setMonth(0);
                    setPicker("month");
                  }}
                  className="bg-white hover:bg-black hover:text-white cursor-pointer text-center py-2 rounded-sm"
                  key={index}
                >
                  {y}
                </span>
              ))}
            </span>
          )}
          {picker == "month" && (
            <span className="grid grid-cols-3 gap-2 pt-3 px-2">
              {months.map((m, index) => (
                <span
                  onClick={() => {
                    setMonth(index + 1);
                    if (index + 1 != CurrentDate.getMonth()) setDay(0);
                    setPicker("day");
                  }}
                  className="bg-white hover:bg-black hover:text-white cursor-pointer text-center py-2 rounded-sm"
                  key={index}
                >
                  {m}
                </span>
              ))}
            </span>
          )}
          {picker == "day" && (
            <span className="grid grid-cols-5 gap-2 pt-3 px-2">
              {days.map((d, index) => (
                <span
                  onClick={() => {
                    setDay(d);
                    setIsPicking(false);
                    setPicker("year");
                  }}
                  className="bg-white hover:bg-black hover:text-white cursor-pointer text-center py-0.5 rounded-sm"
                  key={index}
                >
                  {d}
                </span>
              ))}
            </span>
          )}
        </div>
      </span>
    </span>
  );
};

export default DatePicker;
