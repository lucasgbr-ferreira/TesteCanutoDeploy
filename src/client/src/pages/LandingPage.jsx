// src/pages/LandingPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Users,
  BarChart3,
  CalendarCheck,
  MessageCircle,
  Wrench,
  ClipboardList,
  ShoppingCart,
  Car,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import "../styles/landing.css";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import HeroImg from "../assets/hero.jpg";
import Logo from "../assets/GesCar-Logo-removebg-preview.png";

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom }
  })
};

const teamCardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.08 * i }
  }),
  hover: { scale: 1.03, transition: { duration: 0.18 } },
  tap: { scale: 0.99 }
};

export default function LandingPage() {
  const mainRef = useRef(null);
  const [pathLen] = useState(1000);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, p => (1 - p) * pathLen);
  const pathOpacity = useTransform(progress, [0, 0.5, 1], [0.16, 0.28, 0.12]);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = container.scrollTop;
      const max = Math.max(1, container.scrollHeight - container.clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / max));
      progress.set(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [progress]);

  // equipe
  const team = [
    {
      name: "João Victor",
      role: "Scrum Master / Full Stack Developer",
      bio: "Coordena o time e garante entregas ágeis com qualidade. Atua também no desenvolvimento fullstack do sistema.",
      avatarColor: "#66c2ff",
      github: "Jukkss"
    },
    {
      name: "Lucas Ferreira",
      role: "Tech Lead / Full Stack Developer",
      bio: "Responsável pela arquitetura e padronização do código. Lidera decisões técnicas e garante escalabilidade.",
      avatarColor: "#7bdff5",
      github: "lucasgbr-ferreira"
    },
    {
      name: "Guilherme Henrik",
      role: "Marketing / Full Stack Developer",
      bio: "Une comunicação e tecnologia para impulsionar o projeto. Atua no front e estratégias de divulgação.",
      avatarColor: "#8ff5a8",
      github: "GuiHenrik97"
    },
    {
      name: "Pedro Canuto",
      role: "Full Stack Developer",
      bio: "Back-end e integração de serviços. Trabalha na estabilidade e otimização do sistema.",
      avatarColor: "#ffd166",
      github: "PedroCanutoo"
    },
    {
      name: "Gabriela Melo",
      role: "Full Stack Developer",
      bio: "Cria interfaces fluidas e responsivas, além de colaborar no desenvolvimento de componentes reutilizáveis.",
      avatarColor: "#d87bff",
      github: "gabimelo0202"
    }
  ];
  

return (
  <>
    <div className="bg-curves" aria-hidden="true">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 300 C200 380 400 140 600 180 C800 220 1000 90 1200 160"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.08"
        />
        <path
          d="M0 380 C220 440 420 200 620 240 C820 280 1020 140 1200 200"
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.06"
        />
      </svg>
    </div>

    {/* === Conteúdo principal === */}
    <main className="lp-root" ref={mainRef}>
    <header className="lp-header">
      <div className="lp-brand">
        <a href="#home"><img src={Logo} alt="GesCar" className="lp-logo" /></a>
      </div>

      <nav className="lp-nav" style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <a href="#dealer">Concessionárias</a>
        <a href="#buyer">Compradores</a>
        <a href="#features">Recursos</a>
        <a href="#team">Equipe</a>

        <div style={{ marginLeft: "18px" }}>
          <Button/>
        </div>
      </nav>
    </header>

    {/* HERO novo estilo — esquerda texto / direita imagem diagonal */}
    <section className="lp-hero lp-section" id="home" aria-label="Hero">
      <div className="lp-container lp-hero-grid">
        <div className="lp-hero-content">

          <h1 className="lp-hero-title">Gestão e experiência,<br/>simplificadas.</h1>

          <p className="lp-hero-lead">
            Plataforma que conecta concessionárias e clientes com gestão de estoque, agendamentos e propostas — tudo em uma interface clara e rápida.
          </p>

          <div className="lp-hero-ctas">
            <a className="btn primary" href="/register">Registrar</a>
            <a className="btn ghost" href="#features">Saiba mais →</a>
          </div>
        </div>
        <div
          className="lp-hero-media"
          role="img"
          aria-label="Imagem de destaque"
          style={{
            backgroundImage: `url(${HeroImg || '/src/assets/hero.jpg'})`
          }}
        />
      </div>
    </section>

      {/* FUNÇÕES PARA CONCESSIONÁRIA */}
      <section className="lp-section" id="dealer">
        <div className="lp-container">
          <motion.h2
            className="lp-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
          >
            Funções para Concessionárias
          </motion.h2>
          <p
            className="lp-sub"
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            Recursos criados para otimizar a gestão e a visibilidade do seu
            negócio automotivo.
          </p>

          <div className="lp-features-grid">
            <FeatureCard
              icon={<Car size={20} />}
              title="Gerenciamento de Estoque"
              line1="Cadastre e edite veículos facilmente com fotos, preços e condições."
              accentFrom="#565656ff"
              accentTo="#bd07d8ff"
            />
            <FeatureCard
              icon={<CalendarCheck size={20} />}
              title="Agendamento de Testes"
              line1="Organize test drives e visitas com confirmação direta na plataforma."
              accentFrom="#565656ff"
              accentTo="#bd07d8ff"
            />
            <FeatureCard
              icon={<BarChart3 size={20} />}
              title="Painel de Vendas"
              line1="Acompanhe métricas, propostas e desempenho da equipe."
              accentFrom="#565656ff"
              accentTo="#bd07d8ff"
            />
            <FeatureCard
              icon={<Users size={20} />}
              title="Gestão de Equipe"
              line1="Controle permissões e acompanhe produtividade do time."
              accentFrom="#565656ff"
              accentTo="#bd07d8ff"
            />
          </div>
        </div>
      </section>

      {/* FUNÇÕES PARA COMPRADOR */}
      <section className="lp-section" id="buyer">
        <div className="lp-container">
          <motion.h2
            className="lp-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
          >
            Funções para Compradores
          </motion.h2>
          <p
            className="lp-sub"
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            Experiência fluida e transparente para quem busca o carro ideal.
          </p>

          <div className="lp-features-grid">
            <FeatureCard
              icon={<ShoppingCart size={20} />}
              title="Busca Inteligente"
              line1="Encontre o carro ideal com filtros de preço, marca e condição."
              accentFrom="#565656ff"
              accentTo="#0693d5ff"
            />
            <FeatureCard
              icon={<ClipboardList size={20} />}
              title="Propostas Diretas"
              line1="Envie ofertas e negocie diretamente com a concessionária."
              accentFrom="#565656ff"
              accentTo="#0693d5ff"
            />
            <FeatureCard
              icon={<CreditCard size={20} />}
              title="Histórico de Compras"
              line1="Visualize ofertas anteriores e acompanhe o status das propostas."
              accentFrom="#565656ff"
              accentTo="#0693d5ff"
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title="Segurança Garantida"
              line1="Ambiente seguro com validação de dados e proteção de informações."
              accentFrom="#565656ff"
              accentTo="#0693d5ff"
            />
          </div>
        </div>
      </section>

      {/* RECURSOS GERAIS */}
      <section className="lp-features lp-section" id="features">
        <div className="lp-container">
          <motion.h2
            className="lp-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
          >
            Recursos gerais
          </motion.h2>

          <div className="lp-features-grid">
            <FeatureCard
              icon={<BarChart3 size={20} />}
              title="Plataforma em Nuvem"
              line1="Acesse de qualquer dispositivo com sincronização automática."
              accentFrom="#8be9fd"
              accentTo="#4f9dff"
            />
            <FeatureCard
              icon={<MessageCircle size={20} />}
              title="Suporte Integrado"
              line1="Atendimento direto via chat ou integração de canais."
              accentFrom="#d87bff"
              accentTo="#ff7ab6"
            />
            <FeatureCard
              icon={<CalendarCheck size={20} />}
              title="Notificações em Tempo Real"
              line1="Saiba imediatamente sobre novas propostas e agendamentos."
              accentFrom="#ffd166"
              accentTo="#ff9966"
            />
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section className="lp-team lp-section" id="team">
        <div className="lp-container">
          <motion.h2
            className="lp-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
          >
            Nossa equipe
          </motion.h2>
          <p
            className="lp-sub"
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            Conheça as pessoas por trás do desenvolvimento da plataforma GesCar.
          </p>

          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div
                key={member.github || i}
                variants={teamCardVariant}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: false, amount: 0.25 }}
                custom={i}
              >
                <Card {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta lp-section" id="cta">
        <motion.div
          className="lp-container lp-cta-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
        >
          <h2>Pronto para começar?</h2>
          <p>Crie sua conta e experimente o painel em poucos minutos.</p>
          <div style={{ marginTop: 18 }}>
            <a className="btn primary" href="/register">
              Cadastrar-se
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="lp-footer">
        <div className="lp-container">
          <small>
            © {new Date().getFullYear()} GesCar — Todos os direitos reservados
          </small>
        </div>
      </footer>
    </main>
  </>
);
}
