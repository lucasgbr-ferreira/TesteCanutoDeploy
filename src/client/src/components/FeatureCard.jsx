// src/components/FeatureCard.jsx
import React from "react";
import styled from "styled-components";

export default function FeatureCard({
  title = "Title",
  line1 = "",
  line2 = "",
  accentFrom = "#e81cff",
  accentTo = "#40c9ff",
  icon = null
}) {
  return (
    <CardWrap accentFrom={accentFrom} accentTo={accentTo} role="article" aria-label={title}>
      <div className="card">
        {icon ? <div className="card-icon">{icon}</div> : null}
        <div className="card-body">
          <p className="heading">{title}</p>
          {line1 ? <p className="line">{line1}</p> : null}
          {line2 ? <p className="line accent">{line2}</p> : null}
        </div>
      </div>
    </CardWrap>
  );
}

const CardWrap = styled.div`
  --accent-from: ${p => p.accentFrom};
  --accent-to: ${p => p.accentTo};

  .card {
    position: relative;
    width: 220px;
    height: 200px;
    background-color: rgba(0,0,0,0.56);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 16px;
    gap: 8px;
    border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.03);
    transition: transform .28s ease, box-shadow .28s ease;
  }

  .card-icon {
    position: absolute;
    left: 16px;
    top: 14px;
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
    color: white;
    z-index: 5;
    box-shadow: 0 6px 20px rgba(0,0,0,0.6);
    svg { display: block; }
  }

  .card-body { z-index: 6; }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -6px;
    margin: auto;
    width: 230px;
    height: 210px;
    border-radius: 14px;
    background: linear-gradient(-45deg, var(--accent-from) 0%, var(--accent-to) 100% );
    z-index: -10;
    pointer-events: none;
    transform-origin: center;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 0.98;
  }

  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, var(--accent-from) 0%, var(--accent-to) 100% );
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
    opacity: 0.86;
  }

  .heading {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px 0;
    padding-left: 66px; /* espaço para o ícone */
  }

  .line {
    font-size: 13px;
    color: rgba(230,230,230,0.9);
    margin: 0;
    padding-left: 66px;
  }

  .line.accent { color: var(--accent-from); font-weight: 600; }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 70px rgba(0,0,0,0.7);
  }

  .card:hover::after { filter: blur(30px); }
  .card:hover::before { transform: rotate(-90deg) scaleX(1.34) scaleY(0.77); }

  @media (max-width: 640px) {
    .card { width: 100%; height: auto; min-height: 150px; border-radius: 10px; }
    .card-icon { left: 12px; top: 12px; }
    .heading, .line { padding-left: 60px; }
    .card::before { width: calc(100% + 24px); height: calc(100% + 24px); left: -10px; }
  }
`;
