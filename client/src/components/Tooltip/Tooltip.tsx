import React, { FC } from "react";
import "./Tooltip.css";

interface TooltipProps {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({ text }) => (
  <div className="tooltip-container">
    <span className="question-mark-container">
      <span className="question-mark">?</span>
    </span>
    <div className="tooltip-text">{text}</div>
  </div>
);
