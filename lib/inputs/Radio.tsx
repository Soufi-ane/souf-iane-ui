interface Props<T> {
  className?: string;
  selectedColor?: string;
  data: T[] | undefined;
  idKey: keyof T;
  valueKey: keyof T;
  selected: number[] | null;
  onSelect: (id: T | undefined) => void;
  onDeselect: (id: number) => void;
}
const Radio = <T,>({
  className = "",
  selectedColor = "green",
  data,
  selected,
  idKey,
  valueKey,
  onSelect,
  onDeselect,
}: Props<T>) => {
  return (
    <span className={`${className} flex gap-1 select-none flex-wrap w-[35vw]`}>
      {data &&
        data.map((obj, i) => (
          <span
            onClick={() => {
              selected && selected.includes(Number(obj[idKey]))
                ? onDeselect(Number(obj[idKey]))
                : onSelect(data.find((s) => s[idKey] == obj[idKey]));
            }}
            className={`border-2 ${
              selected && selected.includes(Number(obj[idKey]))
                ? `bg-${selectedColor}-100 border-${selectedColor}-500 text-stone-700`
                : "text-stone-600"
            } cursor-pointer  px-2 rounded-md`}
            key={i}
          >
            {String(obj[valueKey])}
          </span>
        ))}
    </span>
  );
};

export default Radio;
