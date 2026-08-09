"use client";

import { useMemo, useState } from "react";

type CourseKey = "fbd" | "ftw" | "bda";

type Course = {
  key: CourseKey;
  short: string;
  name: string;
  eyebrow: string;
  description: string;
  topics: string[];
  imageExt: string[];
  fileName: (week: number) => string;
};

const topics: Record<CourseKey, string[]> = {
  fbd: [
    "Introdução a Banco de Dados", "Introdução a Banco de Dados", "Projeto de Banco de Dados", "Modelo Conceitual",
    "Modelo Conceitual", "Atributos no Modelo Conceitual", "Diagrama Entidade-Relacionamento", "Diagrama Entidade-Relacionamento",
    "Generalização e Especialização", "Generalização e Especialização", "Modelo Relacional e Integridade", "Transformação ER para Relacional",
    "Relacionamentos e Especialização", "CREATE DATABASE e CREATE TABLE", "Tipos de Dados em SQL", "ALTER TABLE",
    "Restrições de Integridade", "Revisão para a Prova", "INSERT, UPDATE e DELETE", "Revisão Final de Banco de Dados",
  ],
  ftw: [
    "Apresentação da Disciplina", "Internet e World Wide Web", "Textos, Cabeçalhos e Cores", "Formatação de Textos",
    "Hipertextos e Cores", "Réguas e Listas em HTML", "Listas em HTML", "Imagens e Vídeos em HTML",
    "Mídias em HTML", "Links Internos em HTML", "Links Externos em HTML", "Prática com Links",
    "Frames e IFrames", "Prática com IFrames", "Tabelas em HTML", "Layout com Tabelas",
    "Formulários HTML", "Revisão para a Prova", "Formulários HTML", "Revisão Final de HTML",
  ],
  bda: [
    "Revisão SQL: DDL, DML e Integridade", "Álgebra Relacional: Introdução", "Álgebra Relacional: Seleção", "Operação de Seleção",
    "Álgebra Relacional: Projeção", "Produto Cartesiano", "Produto Cartesiano em SQL", "Junção Interna",
    "INNER JOIN", "Consolidação de INNER JOIN", "Junção Externa", "OUTER JOIN",
    "Consultas SQL Avançadas", "GROUP BY e HAVING", "Visões (Views)", "Consultas e Visões",
    "Procedimentos em Banco de Dados", "Revisão para a Prova", "Prática de SQL Aplicado", "Revisão Final de BDA",
  ],
};

const courses: Course[] = [
  {
    key: "fbd", short: "FBD", name: "Fundamentos de Banco de Dados", eyebrow: "Estruturar",
    description: "Da compreensão dos dados ao projeto conceitual, relacional e à linguagem SQL.",
    topics: topics.fbd,
    imageExt: ["png","png","png","png","png","png","png","jpg","png","png","png","png","png","png","png","png","png","png","png","png"],
    fileName: (week) => `moodle_semana${week}.html`,
  },
  {
    key: "ftw", short: "FTW", name: "Fundamentos de Tecnologia Web", eyebrow: "Construir",
    description: "Uma jornada prática pelos fundamentos da web e pela construção de páginas com HTML.",
    topics: topics.ftw,
    imageExt: ["png","png","webp","png","png","png","png","png","png","png","png","png","png","png","png","png","png","png","png","png"],
    fileName: (week) => `moodle_semana${week}.html`,
  },
  {
    key: "bda", short: "BDA", name: "Banco de Dados Aplicados", eyebrow: "Aprofundar",
    description: "Álgebra relacional e SQL aplicados à resolução de problemas reais com dados.",
    topics: topics.bda,
    imageExt: ["png","png","png","png","png","png","png","gif","png","png","gif","png","png","png","avif","png","png","png","png","png"],
    fileName: (week) => week === 17 ? "semana17_1_moodle.html" : `semana${week}_moodle.html`,
  },
];

function SearchIcon() {
  return <span className="search-symbol" aria-hidden="true" />;
}

export default function Home() {
  const [activeCourse, setActiveCourse] = useState<CourseKey>("fbd");
  const [query, setQuery] = useState("");
  const course = courses.find((item) => item.key === activeCourse)!;

  const weeks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return course.topics
      .map((topic, index) => ({ week: index + 1, topic }))
      .filter(({ week, topic }) => !normalized || topic.toLocaleLowerCase("pt-BR").includes(normalized) || String(week).includes(normalized));
  }, [course, query]);

  const goToCourse = (key: CourseKey) => {
    setActiveCourse(key);
    setQuery("");
    requestAnimationFrame(() => document.getElementById("semanas")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          <span className="brand-mark">MC</span>
          <span><strong>Prof.ª Miriã Corrêa</strong><small>Ambiente de aprendizagem</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#disciplinas">Disciplinas</a>
          <a href="#semanas">Semanas</a>
          <span className="period">2026.1</span>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="kicker"><i /> ADS · 1º semestre de 2026</span>
          <h1>Aprender tecnologia é<br /><em>construir caminhos.</em></h1>
          <p>Conteúdos, práticas e atividades organizados para acompanhar sua evolução semana a semana.</p>
          <a className="primary-button" href="#disciplinas">Explorar disciplinas <span>↓</span></a>
        </div>
        <div className="hero-panel" aria-label="Trilha das disciplinas">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-code">01</div>
          <div className="path-card path-fbd"><b>FBD</b><span>Dados ganham estrutura</span></div>
          <div className="path-card path-ftw"><b>FTW</b><span>Ideias ganham a web</span></div>
          <div className="path-card path-bda"><b>BDA</b><span>Consultas viram respostas</span></div>
          <div className="path-line line-one" />
          <div className="path-line line-two" />
          <div className="path-line line-three" />
        </div>
      </section>

      <section className="course-section" id="disciplinas">
        <div className="section-heading">
          <div><span className="section-index">01 / DISCIPLINAS</span><h2>Três perspectivas.<br />Uma formação completa.</h2></div>
          <p>Escolha uma disciplina para acessar a trilha completa de conteúdos do semestre.</p>
        </div>
        <div className="course-grid">
          {courses.map((item, index) => (
            <button className={`course-card ${item.key}`} key={item.key} onClick={() => goToCourse(item.key)}>
              <span className="card-number">0{index + 1}</span>
              <span className="card-tag">{item.eyebrow}</span>
              <strong>{item.short}</strong>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="card-footer"><span>20 semanas</span><i>→</i></span>
            </button>
          ))}
        </div>
      </section>

      <section className={`weeks-section theme-${course.key}`} id="semanas">
        <div className="weeks-header">
          <div className="course-title-row">
            <span className="course-monogram">{course.short}</span>
            <div><span className="section-index">02 / TRILHA SEMESTRAL</span><h2>{course.name}</h2></div>
          </div>
          <label className="search-box">
            <SearchIcon />
            <span className="sr-only">Buscar por tema ou semana</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema ou semana..." />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca">×</button>}
          </label>
        </div>

        <div className="course-tabs" role="tablist" aria-label="Selecionar disciplina">
          {courses.map((item) => (
            <button key={item.key} role="tab" aria-selected={item.key === activeCourse} className={item.key === activeCourse ? "active" : ""} onClick={() => { setActiveCourse(item.key); setQuery(""); }}>
              <b>{item.short}</b><span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="weeks-meta"><span>{weeks.length} {weeks.length === 1 ? "semana encontrada" : "semanas"}</span><span>Selecione um card para abrir o conteúdo completo</span></div>

        {weeks.length > 0 ? (
          <div className="weeks-grid">
            {weeks.map(({ week, topic }) => {
              const image = `/conteudos/${course.key}/imagens_semanas/semana${week}.${course.imageExt[week - 1]}`;
              const href = `/conteudos/${course.key}/${course.fileName(week)}`;
              return (
                <a className="week-card" href={href} target="_blank" rel="noreferrer" key={`${course.key}-${week}`}>
                  <div className="week-image"><img src={image} alt="" loading="lazy" /><span>SEMANA {String(week).padStart(2, "0")}</span></div>
                  <div className="week-content"><h3>{topic}</h3><span className="open-label">Abrir conteúdo <i>↗</i></span></div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="empty-state"><strong>Nenhuma semana encontrada.</strong><p>Tente buscar por outro tema ou número.</p><button onClick={() => setQuery("")}>Limpar busca</button></div>
        )}
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">MC</span><div><strong>Prof.ª Miriã Corrêa</strong><small>ADS · 2026.1</small></div></div>
        <p>Ensinar é criar condições para que cada pessoa encontre o seu caminho.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </main>
  );
}
