import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export default function RoleMenu({ value = "", onChange = () => {}, label = "Role" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const rootRef = useRef(null);

  useEffect(() => setSelected(value), [value]);

  // close on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const options = [
    { key: "client", label: "Client" },
    { key: "concessionaria", label: "Concessionária" },
    { key: "admin", label: "Admin" }
  ];

  function pick(optKey) {
    setSelected(optKey);
    onChange(optKey);
    // small delay for smoothness
    setTimeout(() => setOpen(false), 80);
  }

  function onKeyDownItem(e, optKey) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(optKey);
    }
  }

  return (
    <Wrap ref={rootRef} className="role-menu-wrapper">
      <Button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(s => !s)}
        open={open}
      >
        <div className="left">
          <div className="label">{options.find(o => o.key === selected)?.label || label}</div>
        </div>

        <div className="bars" aria-hidden>
          <span className="bar top" />
          <span className="bar middle" />
          <span className="bar bottom" />
        </div>
      </Button>

      <Menu className={`menu ${open ? "open" : ""}`} role="listbox" aria-activedescendant={selected}>
        {options.map((opt, i) => (
          <MenuItem
            key={opt.key}
            role="option"
            tabIndex={0}
            aria-selected={selected === opt.key}
            className={selected === opt.key ? "active" : ""}
            onClick={() => pick(opt.key)}
            onKeyDown={(e) => onKeyDownItem(e, opt.key)}
            index={i}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </Wrap>
  );
}

/* Styled components */

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
`;

/* Button that shows label + animated bars */
const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--text, #eaeaea);
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  transition: box-shadow .18s ease, transform .12s ease;

  .label {
    color: rgba(255,255,255,0.92);
    font-weight: 600;
    font-size: 14px;
  }

  .bars {
    width: 28px;
    display:flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    height: 18px;
    position: relative;
  }

  .bar {
    display:block;
    width: 100%;
    height: 2.8px;
    border-radius: 999px;
    background: white;
    transform-origin: center;
    transition: transform .28s cubic-bezier(.2,.9,.2,1), opacity .18s ease, width .18s ease, background .18s ease;
  }

  /* closed state => "hamburger" transformed to arrow when open */
  ${({ open }) => open ? `
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    transform: translateY(-2px);
    .top { transform: translateY(6px) rotate(-45deg); width: 100%; }
    .middle { opacity: 0; width: 60%; transform: translateX(-6px); }
    .bottom { transform: translateY(-6px) rotate(45deg); width: 100%; }
  ` : `
    /* closed */
    .top { transform: translateY(-0px) rotate(0deg); }
    .middle { opacity: 1; transform: translateY(0); }
    .bottom { transform: translateY(0) rotate(0deg); }
  `}
`;

/* Menu panel with animation + staggered children */
const Menu = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: calc(100% + 10px);
  background: rgba(15,15,16,0.98);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 14px 40px rgba(2,6,23,0.6);
  overflow: hidden;
  transform-origin: top center;
  transform: translateY(-6px) scale(.98);
  opacity: 0;
  pointer-events: none;
  transition: opacity .22s ease, transform .22s cubic-bezier(.2,.9,.2,1);
  z-index: 60;
  padding: 6px 6px;

  &.open {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  /* stagger effect — each child will animate with increasing delay using nth-child */
  .menu-item {
    transform: translateY(10px);
    opacity: 0.0;
  }

  &.open .menu-item {
    transform: translateY(0);
    opacity: 1;
  }
`;

/* Each option */
const MenuItem = styled.div.attrs(props => ({ className: 'menu-item' }))`
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--text, #eaeaea);
  cursor: pointer;
  font-size: 14px;
  transition: background .12s ease, transform .2s ease, opacity .24s ease;
  margin-bottom: 6px;

  &:last-child { margin-bottom: 0; }

  &:hover { background: rgba(255,255,255,0.03); transform: translateY(-2px); }

  &.active {
    background: linear-gradient(90deg, rgba(99,102,241,0.12), rgba(79,70,229,0.08));
    font-weight: 700;
    color: #dbeafe;
  }

  /* calculate cascade delay based on index prop if present (we pass index through props) */
  ${({ index }) => index !== undefined ? `
    transition-delay: calc(0.06s * ${index});
  ` : ''}
`;

