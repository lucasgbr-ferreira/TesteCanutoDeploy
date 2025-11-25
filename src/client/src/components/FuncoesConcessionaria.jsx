// para redirecionar para as outras páginas das funções coloque os links dentro dos cards
// link: "aqui",  

import React from "react";
import "../styles/funcoesConcessionaria.css";

import {
  Boxes,
  ShoppingCart,
  History,
  Folder,
  FileSignature,
  Calendar,
} from "lucide-react";

export default function FuncoesConcessionaria() {
  const funcoes = [
    {
      titulo: "Controle de estoque",
      desc: "Gerencie carros armazenados e atualizações",
      icon: <Boxes size={30} />,
      link: "#", 
      imgUrl:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
    },
    {
      titulo: "Vendas realizadas",
      desc: "Resumo e detalhes de transações",
      icon: <ShoppingCart size={30} />,
      link: "#",
      imgUrl:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=600",
    },
    {
      titulo: "Histórico de vendas",
      desc: "Acompanhe registros antigos",
      icon: <History size={30} />,
      link: "#",
      imgUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
    },
    {
      titulo: "Catálogo",
      desc: "Modelos disponíveis para venda",
      icon: <Folder size={30} />,
      link: "#",
      imgUrl:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=60",
    },
    {
      titulo: "Propostas",
      desc: "Negociações e ofertas",
      icon: <FileSignature size={30} />,
      link: "#",
      imgUrl:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=60",
    },
    {
      titulo: "Agenda",
      desc: "Reuniões e compromissos",
      icon: <Calendar size={30} />,
      link: "#",
      imgUrl:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="fc-section">
      <div className="fc-container">
        <p className="lp-destaque-tag">Gerenciamento</p>
        <h2 className="lp-destaque-title">Funções do Gestor</h2>
        <p className="lp-destaque-desc">
          Para o melhor gerenciamento da empresa use as funções
        </p>

        <div className="fc-grid">
          {funcoes.map((f, i) => (
            <a key={i} href={f.link} className="fc-card novo-card">
              <div className="card-icon">{f.icon}</div>

              <h3 className="card-title">{f.titulo}</h3>
              <p className="card-desc">{f.desc}</p>

              <div className="card-img">
                <img src={f.imgUrl} alt={f.titulo} />
              </div>

              <div className="card-footer">
                <span>Acessar</span>
                <span className="arrow">›</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}