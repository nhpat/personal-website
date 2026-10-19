import { useEffect, useState } from "react";
import "./App.css";
import profilePic from "./assets/neha-patil-pfp.png";
import priceTraceDemo from "./assets/pricetrace-demo.mp4";
import altScanDemo from "./assets/alt-scanner-demo.mp4";

const projects = [
  {
    name: "Internal Developer Portal Daily Digest",
    category: "Internship",
    description: "A full-stack Slack digest I built at Datadog that delivers engineers a daily summary of their SLOs, tickets, campaigns, PRs, and incidents.",
    details: "During my summer 2026 internship on Datadog’s Internal Developer Portal team, I built the Slack Daily Digest end-to-end: a personalized daily Slack summary of each user’s SLOs, Jira tickets, PRs, incidents, and campaigns. I wrote the RFC covering the architecture, API design, PostgreSQL preferences schema, and scheduling approach, then implemented it in Go, React, and TypeScript. Users can configure their own notification preferences, choosing which updates they get and when the digest arrives. Digests are delivered reliably across time zones with retries on failed sends, and I made the digest endpoint channel-agnostic so it can later power email and Teams.",
    tech: "Go, gRPC/Protobuf, PostgreSQL, React, TypeScript",
    link: "",
    image: "",
    video: "",
  },
  {
    name: "PriceTrace Search Engine",
    category: "CBA Client Project",
    description: "A visual search app for e-commerce client PriceTrace that finds similar clothing items from a photo instead of a text search.",
    details:
      "PriceTrace is an e-commerce company for which we built a full-stack visual search engine for fashion: upload a photo of a clothing item and it returns visually similar products from a cloud-hosted catalog, with no text search or product tags involved. Each image is run through Grounding DINO, a zero-shot object detector, to isolate the actual garment from the rest of the photo before it's embedded with OpenAI's CLIP model and compared against the catalog via cosine similarity in a Chroma Cloud vector index, with image files served from Cloudinary. Building it meant debugging real retrieval-quality problems past the initial happy path — fixing cases where detection picked an accessory over the actual garment, where full-outfit photos with multiple clothing items silently dropped one category from the results, and where one garment type's stronger matches could crowd out a weaker-but-correct category entirely — each traced to a specific, verifiable cause rather than patched by guesswork. The React/Vite frontend talks to a Flask API for both the indexing and search paths.",
    tech: "Python, Flask, PyTorch, Hugging Face Transformers (CLIP, Grounding DINO), ChromaDB (Chroma Cloud), Cloudinary, React, Vite",
    link: "",
    image: "",
    video: priceTraceDemo,
    videoCaption:
      "Demo taken using a 2,000-item Kaggle dataset before handing off to using the client's 45K-item database.",
  },
  {
    name: "AltScan",
    category: "Personal Project",
    description: "AltScan crawls websites and uses the Claude API to fix missing image alt text — async, Kubernetes-deployed, and SSRF-hardened.",
    details:
      "AltScan crawls a website, finds images with missing or junk alt text, and asks Claude to write real, context-aware replacements using the surrounding page content — built as a fully async system (FastAPI, PostgreSQL, Redis-backed queues, dedicated Python workers), hardened against SSRF since it processes arbitrary user-submitted URLs, and deployed to Kubernetes with a load-tested autoscaler. It started as an image-processing pipeline before I pivoted it into an accessibility tool, and validating it against real sites caught genuine WCAG violations on a live healthcare site.",
    tech: "Python/FastAPI, PostgreSQL, Redis, MinIO, Claude API, Docker, Kubernetes",
    link: "https://github.com/nhpat/alt-scanner",
    image: "",
    video: altScanDemo,
  },
  {
    name: "OCaml Cross-Terminal Blackjack",
    category: "CS 3110 - Final Project",
    description: "Terminal blackjack in OCaml, with an asynchronous Lwt server so several players can sit at the same table.",
    details:
      "Blackjack played entirely in the terminal, built by a team of four for CS 3110. The table renders with ANSI escape codes, and an asynchronous multiplayer server written with Lwt lets several players join the same game. Built with Dune and tested with OUnit2." ,
    tech: "OCaml, Dune, Lwt, OUnit2, ANSI terminal rendering",
    link: "https://github.coecis.cornell.edu/aka96/3110GroupProject",
    image: "",
    video: "",
    youtube: "PTT3e4ojwgA",
  },
  {
    name: "RiskSpan",
    category: "Internship",
    description: "Automated mortgage rate sheet analytics with Python ETL pipelines and ML classification across 100+ lenders.",
    details:
      "Mortgage lenders publish pricing in unstructured rate sheets that are slow to compare by hand. I built an automated pipeline to turn them into clean, usable data. It used Pandas and NumPy ETL to extract data from 100+ rate sheets from lenders like Acra, HomeLend, and NQM, and Scikit-learn classification models to categorize it. Ingestion workflows automatically update the database whenever new rate sheets are released, keeping the mortgage analytics current with minimal manual effort.",
    tech: "Python, Scikit-learn, Pandas, NumPy",
    link: "",
    image: "",
    video: "",
  },
  {
    name: "Frequency Domain Analysis for Cardiac Ablation Targeting",
    category: "Research",
    description: "Explored multiple ML techniques to identify patterns in data of patients with Ventricular Tachycardia",
    details:
      "Cardiac ablation treats heart rhythm disorders by destroying small areas of tissue that cause abnormal electrical activity. Its success depends on finding the right targets, which today relies heavily on clinicians interpreting noisy electrical recordings in real time. My research at MIT explored a more objective, data-driven approach. I applied a Fast Fourier Transform (FFT) to convert cardiac signals into the frequency domain, exposing patterns like dominant frequency that are hard to see in the raw waveform. I then used these features in K-means clustering to group heart tissue by its electrical behavior, without needing labeled data. That flagged regions likely to be ablation targets. The goal was a decision-support tool to help clinicians reduce guesswork, and I presented the work at the 2023 Heart Rhythm Society Conference.",
      tech: "Python, Scikit-learn, K means clustering, Fast Fourier Transform, Logistic Regression",
    link: "https://www.heartrhythmjournal.com/article/S1547-5271(23)01487-X/fulltext",
    linkLabel: "View Abstract",
    image: "",
    video: "",
  },
];

function App() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <div className="page">
      <header className="hero">
        <img className="profile-pic" src={profilePic} alt="Neha Patil" />
        <div className="hero-text">
          <h1>Neha Patil</h1>
          <p className="tagline">Computer Science student at Cornell</p>
          <p className="intro">
            Hi, I’m Neha! I’m a Computer Science student at Cornell with minors in Business and AI. I love building software end-to-end, from designing systems to bringing them to life. Most recently, I was a software engineering intern at Datadog and I am currently a technical Project Manager at Cornell Business Analytics. I’m most interested in backend, infrastructure, applied AI, and distributed systems. I also founded Girls ReCode, a nonprofit that has introduced 250+ girls to coding. Outside of tech, you’ll find me learning how to DJ, baking, or singing Indian classical music.
          </p>
        </div>
      </header>

      <section id="projects" className="section reveal">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project, i) => (
            <button
              key={project.name}
              type="button"
              className="project-card reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setActiveProject(project)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="tech">{project.tech}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="contact" className="section reveal">
        <h2>Contact</h2>
        <ul className="contact-list">
          <li>
            <a href="mailto:reachnehap2024@gmail.com">Email</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/neha--patil/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Neha Patil</p>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.name}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={() => setActiveProject(null)}
            >
              &times;
            </button>

            <div
              className={`modal-body${
                activeProject.video || activeProject.image || activeProject.youtube
                  ? " has-media"
                  : ""
              }`}
            >
              {activeProject.video || activeProject.image || activeProject.youtube ? (
                <div className="modal-media-wrap">
                  {activeProject.video ? (
                    <video
                      className="modal-media"
                      src={activeProject.video}
                      controls
                      autoPlay
                      muted
                      loop
                    />
                  ) : activeProject.youtube ? (
                    <iframe
                      className="modal-media"
                      src={`https://www.youtube.com/embed/${activeProject.youtube}`}
                      title={`${activeProject.name} demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      className="modal-media"
                      src={activeProject.image}
                      alt={activeProject.name}
                    />
                  )}
                  {activeProject.videoCaption && (
                    <p className="modal-media-caption">
                      <em>{activeProject.videoCaption}</em>
                    </p>
                  )}
                </div>
              ) : null}

              <div className="modal-text">
                {activeProject.category && (
                  <span className="category">{activeProject.category}</span>
                )}
                <h3>{activeProject.name}</h3>
                <span className="tech">{activeProject.tech}</span>
                <p>{activeProject.details || activeProject.description}</p>

                {activeProject.link && (
                  <a
                    className="modal-link"
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activeProject.linkLabel || "View project"} &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
