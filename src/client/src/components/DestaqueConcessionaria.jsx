import React, { useState } from "react";
import "../styles/DestaqueConcessionaria.css";

export default function DestaqueConcessionaria() {
  const cards = [
    {
      titulo: "Hatch econômico",
      texto: "Compacto e ideal para o dia a dia.",
      img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    },
    {
      titulo: "SUV compacto",
      texto: "Conforto, espaço e boa altura do solo.",
      img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      titulo: "Hatch urbano",
      texto: "Perfeito para mobilidade nas grandes cidades.",
      img: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    },
    {
      titulo: "Sedan confortável",
      texto: "Estabilidade, porta-malas amplo e ótimo espaço interno.",
      img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    },
    {
      titulo: "SUV intermediário",
      texto: "Ideal para família e viagens longas.",
      img: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    },
    {
      titulo: "Picape robusta",
      texto: "Força e desempenho para trabalho pesado.",
      img: "https://images.pexels.com/photos/1007413/pexels-photo-1007413.jpeg",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < cards.length - 3) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="lp-destaque">

      <div className="lp-destaque-header">
        <p className="lp-destaque-tag">Destaques</p>
        <h2 className="lp-destaque-title">Veículos em alta</h2>
        <p className="lp-destaque-desc">Selecionamos os melhores carros para você.</p>
      </div>

      <div className="lp-slider-container">
        <button className="lp-arrow left" onClick={prev} disabled={index === 0}>
          ‹
        </button>

        <div className="lp-destaque-window">
          <div
            className="lp-destaque-track"
            style={{ transform: `translateX(-${index * 33.33}%)` }}
          >
            {cards.map((carro, i) => (
              <div className="lp-destaque-card" key={i}>
                <p className="lp-card-tag">Seminovo</p>
                <h3 className="lp-card-title">{carro.titulo}</h3>
                <p className="lp-card-text">{carro.texto}</p>

                <img src={carro.img} alt={carro.titulo} className="lp-card-img" />

                <a href="#" className="lp-card-link">
                  Ver <span>›</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          className="lp-arrow right"
          onClick={next}
          disabled={index === cards.length - 3}
        >
          ›
        </button>
      </div>

    </section>
  );
}