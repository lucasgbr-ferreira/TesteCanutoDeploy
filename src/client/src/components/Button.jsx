// src/components/Button.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <StyledWrapper>
      <button
        type="button"
        className="animated-button"
        aria-label="Começar"
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24" aria-hidden>
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>

        <span className="text">ENTRAR</span>

        <span className="circle" aria-hidden />

        <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24" aria-hidden>
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: 2px solid transparent;
    font-size: 14px;
    background-color: rgba(255,255,255,0.06);
    border-radius: 100px;
    font-weight: 700;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.45);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    border: none;
  }

  .animated-button svg {
    position: absolute;
    width: 18px;
    height: 18px;
    fill: currentColor;
    color: rgba(0,0,0,0.8);
    z-index: 9;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.9;
    pointer-events: none;
  }

  .animated-button .arr-1 {
    right: 12px;
  }

  .animated-button .arr-2 {
    left: -20%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: rgba(197, 229, 228, 1);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(0);
    letter-spacing: 2px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
    color: #0b1220;
    background-color: #c5e5e4;
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    right: -24%;
  }

  .animated-button:hover .arr-2 {
    left: 12px;
  }

  .animated-button:hover .text {
    transform: translateX(8px);
    color: #0b1220;
  }

  .animated-button:hover svg {
    fill: #0b1220;
  }

  .animated-button:active {
    transform: scale(0.98);
    box-shadow: 0 8px 20px rgba(0,0,0,0.45);
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }
`;
export default Button;
