// src/components/Card.jsx
import React from "react";
import styled from "styled-components";

/**
 * Props:
 * - name: string
 * - role: string
 * - bio: string
 * - avatarColor: string (hex)
 * - github: string (github username)
 */
const Card = ({ name = "Nome Dev", role = "Cargo", bio = "", avatarColor = "#ffbb66", github = "" }) => {
  // url do avatar (github fornece um redirect .png)
  const avatarUrl = github ? `https://github.com/${github}.png` : null;
  const profileUrl = github ? `https://github.com/${github}` : "#";

  // iniciais para avatar fallback
  const initials = name.split(" ").map((n) => n[0] || "").slice(0, 2).join("");

  return (
    <StyledWrapper>
      <div className="card" aria-hidden={false}>
        <div className="content">
          {/* FRONT: informações (visível por padrão) */}
          <div className="front">
            <div className="front-content">
              <div className="front-top">
                <div className="circle" style={{ background: avatarColor }}>
                  {initials}
                </div>
                <div className="front-meta">
                  <strong className="title">{name}</strong>
                  <span className="role">{role}</span>
                </div>
              </div>

              <div className="description">
                <p className="desc-text">{bio}</p>
              </div>
            </div>
          </div>

          {/* BACK: avatar GitHub (aparece ao hover) */}
          <div className="back">
            <a className="back-link" href={profileUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${name}`}>
              {avatarUrl ? (
                <img className="gh-avatar" src={avatarUrl} alt={`${name} GitHub avatar`} />
              ) : (
                <div className="gh-fallback" style={{ background: avatarColor }}>{initials}</div>
              )}
              <strong className="back-name">{name}</strong>
              <span className="back-role">{role}</span>
            </a>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 220px;
    height: 260px;
    perspective: 1400px;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 520ms cubic-bezier(.2,.9,.2,1);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.55);
    overflow: visible;
    background: linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01));
  }

  /* quando hover no cartão, gira 180º para mostrar o verso */
  .card:hover .content,
  .card:focus-within .content {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* FRONT (visível por padrão) */
  .front {
    z-index: 2;
    transform: rotateY(0deg);
    padding: 14px;
    color: #fff;
  }

  .front-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .front-top {
    display:flex;
    gap:12px;
    align-items:center;
  }

  .circle {
    width:64px;
    height:64px;
    border-radius:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    color:#0b0b0b;
    font-size:20px;
    flex-shrink:0;
    filter: blur(0px);
  }

  .front-meta .title { display:block; font-size:15px; color:#fff; }
  .front-meta .role { display:block; font-size:13px; color: rgba(170,170,180,0.9); margin-top:6px; }

  .description {
    margin-top: 10px;
    background: rgba(0,0,0,0.12);
    padding: 10px;
    border-radius: 8px;
    color: rgba(230,230,230,0.92);
    font-size: 13px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35) inset;
  }

  .card-footer { font-size:11px; color: rgba(255,255,255,0.6); }

  /* BACK (oculto por padrão; aparece após rotacionar) */
  .back {
    transform: rotateY(-180deg);
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    color: #fff;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 18px;
  }

  .back-link {
    display:flex;
    gap:12px;
    align-items:center;
    flex-direction:column;
    text-decoration:none;
    color: inherit;
  }

  .gh-avatar, .gh-fallback {
    width:110px;
    height:110px;
    border-radius: 14px;
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    border: 2px solid rgba(255,255,255,0.03);
  }
  .gh-fallback { display:flex; align-items:center; justify-content:center; font-weight:700; color:#0b0b0b; }

  .back-name { font-size:14px; margin-top:8px; }
  .back-role { font-size:12px; color: rgba(200,200,200,0.8); margin-top:4px; }

  /* mobile */
  @media (max-width: 640px) {
    .card { width: 100%; height: 220px; }
    .circle { width:54px; height:54px; }
    .gh-avatar { width:92px; height:92px; }
  }
`;

export default Card;
