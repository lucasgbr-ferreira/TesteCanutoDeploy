// src/components/RegisterModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import RoleMenu from "./RoleMenu";

const API = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || window.__API_BASE_URL || "http://localhost:3000";

export default function RegisterModal({ onSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState(""); // composed name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    // quick client-side validation
    if (!firstName || !lastName || !email || !password || !password2 || !role) {
      setIsError(true); setMsg("Preencha todos os campos obrigatórios."); return;
    }
    if (!isValidEmail(email)) { setIsError(true); setMsg("E-mail inválido."); return; }
    if (password !== password2) { setIsError(true); setMsg("As senhas não coincidem."); return; }
    setName(`${firstName.trim()} ${lastName.trim()}`);

    // build payload consistent with your backend
    const payload = { name: `${firstName.trim()} ${lastName.trim()}`, email: email.trim(), password, role };
    // optional: add role-specific placeholders or additional fields as needed

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const txt = await res.text();
      let data;
      try { data = JSON.parse(txt); } catch { data = { message: txt }; }

      if (!res.ok) {
        const serverMsg = data.message || `Erro ${res.status}`;
        setIsError(true); setMsg(`${serverMsg} (status ${res.status})`);
        setLoading(false);
        return;
      }

      setIsError(false);
      setMsg("Registrado com sucesso!");
      setTimeout(() => { if (onSuccess) onSuccess(data); }, 700);
    } catch (err) {
      console.error("register modal error", err);
      setIsError(true); setMsg("Erro de comunicação com a API.");
    } finally { setLoading(false); }
  }

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <div className="flex">
          <label>
            <input className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder=" " required />
            <span>Firstname</span>
          </label>
          <label>
            <input className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder=" " required />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=" " required />
          <span>Email</span>
        </label>

        <label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=" " required />
          <span>Password</span>
        </label>

        <label>
          <input className="input" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder=" " required />
          <span>Confirm password</span>
        </label>

        {/* role selection */}
        <div style={{ marginTop: 6 }}>
          <RoleMenu value={role} onChange={(r)=>setRole(r)} label="Select role" />
        </div>

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Submit"}
        </button>

        {msg && <p className="signin" style={{ color: isError ? "#ff6b6b" : "#7be495", marginTop: 8 }}>{msg}</p>}
      </form>
    </StyledWrapper>
  );
}

/* reuse your CSS but keep inside the styled component so it's self-contained */
const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 420px;
    padding: 20px;
    border-radius: 14px;
    position: relative;
    background-color: #0b0b0b;
    color: #fff;
    border: 1px solid #222;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #60a5fa;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    border-radius: 50%;
    left: 0px;
    background-color: #60a5fa;
  }

  .title::after {
    animation: pulse 1s linear infinite;
    opacity: 0.6;
  }

  .message, .signin {
    font-size: 14.5px;
    color: rgba(255,255,255,0.75);
  }

  .signin {
    text-align: center;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 8px;
  }

  .form label {
    position: relative;
    width: 100%;
  }

  .form label .input {
    background-color: #111;
    color: #fff;
    width: 100%;
    padding: 18px 6px 6px 10px;
    outline: 0;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255,255,255,0.55);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.22s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #60a5fa;
    top: 0px;
    font-size: 0.72em;
    font-weight: 600;
  }

  .input { font-size: 15px; }

  .submit {
    border: none;
    outline: none;
    padding: 12px;
    border-radius: 10px;
    color: #111;
    font-size: 16px;
    font-weight: 700;
    transition: background-color 0.2s;
    background-color: #60a5fa;
    margin-top: 8px;
  }
  .submit:hover { background-color: #60a5facc; }

  @keyframes pulse {
    from { transform: scale(0.9); opacity: 1; }
    to { transform: scale(1.7); opacity: 0; }
  }
`;
