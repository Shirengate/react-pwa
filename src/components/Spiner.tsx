import "@/assets/index.css";
import type { FC } from "react";

const Spiner: FC<{ proportions: number }> = ({ proportions }) => {
  return (
    <span
      className="loader"
      style={{ width: `${proportions}px`, height: `${proportions}px` }}
    ></span>
  );
};

export default Spiner;
