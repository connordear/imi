import React, { FC } from "react";
import "./Switch.css";

interface SwitchProps {
  onChange?: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ onChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={(e) => onChange && onChange(e.currentTarget.checked)}
      />
      <span className="slider round"></span>
    </label>
  );
};
