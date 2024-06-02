import React, { FC, ChangeEvent } from "react";
import { Tooltip } from "../Tooltip";
import "./Checkbox.css";

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  description?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  checked,
  description,
  onChange,
}) => (
  <div className="checkbox-container">
    <label className="checkbox-label" htmlFor={name}>
      {description && <Tooltip text={description} />}
      {label}
    </label>
    <input
      className="checkbox-input"
      id={name}
      checked={checked}
      type="checkbox"
      onChange={onChange}
    />
  </div>
);
