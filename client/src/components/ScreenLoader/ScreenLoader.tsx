import React, { FC } from "react";
import "./ScreenLoader.css";

export const ScreenLoader: FC = () => (
  <div className="loader-overlay">
    <div className="loader">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  </div>
);
