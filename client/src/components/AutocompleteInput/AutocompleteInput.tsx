import React, { FC, ChangeEvent } from "react";
import { InlineLoader } from "../InlineLoader";
import { FieldsForm } from "../../constants";
import "./AutocompleteInput.css";

interface AutocompleteInputProps {
  name: FieldsForm;
  label: string;
  value: string;
  isValid: boolean;
  pattern: string;
  isRenderOptions: boolean;
  options: string[];
  isLoadingOptions: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (name: FieldsForm) => void;
  onBlur: (name: FieldsForm) => void;
  onOptionSelect: (name: FieldsForm, option: string) => void;
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({
  name,
  label,
  value,
  isValid,
  pattern,
  isRenderOptions,
  options,
  isLoadingOptions,
  onChange,
  onFocus,
  onBlur,
  onOptionSelect,
}) => (
  <div className="input-container">
    <label htmlFor={name}>{label}</label>
    <input
      className={!isValid ? "invalid" : ""}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => onFocus(name)}
      onBlur={() => onBlur(name)}
      pattern={pattern}
      autoComplete="off"
    />
    {isRenderOptions && (
      <div className="options-container">
        <ul className="option-list">
          <div className="loader">{isLoadingOptions && <InlineLoader />}</div>
          {options.map((option, index) => (
            <li
              className="option"
              key={index}
              onMouseDown={() => onOptionSelect(name, option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="triangle"></div>
      </div>
    )}
  </div>
);
