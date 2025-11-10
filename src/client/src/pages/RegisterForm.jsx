console.log('import.meta.env:', import.meta.env);
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("RegisterForm loaded");
const API_BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || (typeof window !== "undefined" && window.__API_BASE_URL)
  || "http://localhost:3001";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");

  // client fields
  const [cpf,setCpf] = useState("");
  const [telefone,setTelefone] = useState("");
  const [endereco,setEndereco] = useState("");

  // concessionaria fields
  const [nomeComercial,setNomeComercial] = useState("");
  const [cnpj,setCnpj] = useState("");
  const [telefoneCom,setTelefoneCom] = useState("");
  const [emailComercial,setEmailComercial] = useState("");
  const [enderecoCom,setEnderecoCom] = useState("");

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const [isError,setIsError] = useState(false);

  function show(msg, err=false){ setMessage(msg); setIsError(err); }

  async function handleSubmit(e){
    e.preventDefault();
    show(null);
    if(!name || !email || !password || !role){ show("Preencha nome, e-mail, senha e role.", true); return; }
    const payload = { name, email, password, role };

    if(role === "client"){
      payload.cpf = cpf || null;
      payload.telefone = telefone || null;
      payload.endereco = endereco || null;
    } else if(role === "concessionaria"){
      payload.nome = nomeComercial || name;
      payload.cnpj = cnpj || null;
      payload.telefone = telefoneCom || null;
      payload.email_comercial = emailComercial || null;
      payload.endereco = enderecoCom || null;
    }

    setLoading(true);
    try{
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

      if(!res.ok){ show(data.message || "Erro ao registrar", true); setLoading(false); return; }

      show("Registrado com sucesso! Faça login.", false);
      setTimeout(()=>navigate("/login"), 800);
    }catch(err){
      console.error("RegisterForm request error:", err);
      show("Erro de comunicação com a API", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth:760, margin:"48px auto", padding:20 }}>
      <h2>Criar conta</h2>
      <form onSubmit={handleSubmit} style={{ display:"grid", gap:12 }}>
        <input placeholder="Nome completo" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="">Selecione a role</option>
          <option value="client">client</option>
          <option value="concessionaria">concessionaria</option>
          <option value="admin">admin</option>
        </select>

        {role === "client" && <>
          <input placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
          <input placeholder="Telefone" value={telefone} onChange={e=>setTelefone(e.target.value)} />
          <input placeholder="Endereço" value={endereco} onChange={e=>setEndereco(e.target.value)} />
        </>}

        {role === "concessionaria" && <>
          <input placeholder="Nome comercial" value={nomeComercial} onChange={e=>setNomeComercial(e.target.value)} />
          <input placeholder="CNPJ" value={cnpj} onChange={e=>setCnpj(e.target.value)} />
          <input placeholder="Telefone comercial" value={telefoneCom} onChange={e=>setTelefoneCom(e.target.value)} />
          <input placeholder="E-mail comercial" value={emailComercial} onChange={e=>setEmailComercial(e.target.value)} />
          <input placeholder="Endereço da concessionária" value={enderecoCom} onChange={e=>setEnderecoCom(e.target.value)} />
        </>}

        <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Registrar"}</button>

        {message && <div style={{ color: isError ? "crimson" : "green" }}>{message}</div>}
      </form>
    </div>
  );
}
