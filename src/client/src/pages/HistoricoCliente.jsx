// src/pages/HistoricoCliente.jsx //

import React, { useEffect, useState } from "react";
import HeaderCliente from "../components/HeaderCliente.jsx"
import FooterPerfil from "../components/FooterPerfil.jsx"
import HComprasCliente from "../components/HComprasCliente.jsx"
import HeroHCliente from "../components/HeroHCliente.jsx";


// CONTEÚDO DA PÁGINA //

export default function HomeConcessionaria() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    
        useEffect(() => {
            // salvando nome do usuário logado
            const user = JSON.parse(localStorage.getItem("user"));
            const nome = user?.name || user?.nome || user?.fullName || "Usuário";
            setNomeUsuario(nome);
        }, []);

    return (
        <div>
            <HeaderCliente />
            <HeroHCliente nome={nomeUsuario}/>
            <HComprasCliente />
            <FooterPerfil />
        </div>
    );
}