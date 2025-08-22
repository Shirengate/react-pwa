import type { FC } from "react";

interface DescProps {
  completed: boolean;
  description: string;
}

const Descrtiption: FC<DescProps> = ({ completed, description }) => {
  return (
    <p
      className={`text-gray-600 text-justify w-full mb-3 ${
        completed ? "line-through" : ""
      }`}
    >
      {description}
    </p>
  );
};

export default Descrtiption;
