import type { FC } from "react";
import type React from "react";

interface InputDescProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDesc: FC<InputDescProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="text-gray-600 mt-2 p-2 text-justify w-full mb-3 border-2"
    />
  );
};

export default InputDesc;
