// src/pages/AgendamentoCliente.jsx //

//  IMPORTS //

import React, { useEffect, useState } from "react";
import HeaderCliente from "../components/HeaderCliente.jsx";
import FooterPerfil from "../components/FooterPerfil.jsx";
import HeroACliente from "../components/HeroACliente.jsx";
import TestDrive from "../components/AgendarTesteCliente.jsx";
import AgendarTesteCliente from "../components/AgendarTesteCliente.jsx";

//  IMPORTS  //

export default function AgendamentoCliente() {

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
            <HeroACliente nome= {nomeUsuario}/>
            <AgendarTesteCliente />
            <FooterPerfil />
        </div>
    );
}