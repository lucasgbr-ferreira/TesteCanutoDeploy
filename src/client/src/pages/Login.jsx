import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("Login loaded");
const API_BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (typeof window !== "undefined" && window.__API_BASE_URL)
  || "http://localhost:3001";

export default function Login(){
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const [isError,setIsError] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setMessage(null);
    if(!email || !password){ setIsError(true); setMessage("Preencha e-mail e senha."); return; }
    setLoading(true);
    try{
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };
      if(!res.ok){ setIsError(true); setMessage(data.message || "Erro no login"); setLoading(false); return; }
      if(data.token){ localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data.user || {})); }
      setIsError(false); setMessage("Login bem-sucedido!");
      setTimeout(()=> navigate("/home"), 600);
    }catch(err){
      console.error("Login error:", err);
      setIsError(true); setMessage("Erro de comunicação com a API.");
    }finally{ setLoading(false); }
  }

  return (
    <div style={{ maxWidth:480, margin:"48px auto", padding:24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display:"grid", gap:12 }}>
        <input type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
        {message && <div style={{ color: isError ? "crimson" : "green" }}>{message}</div>}
      </form>
    </div>
  );
}
