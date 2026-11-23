import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Stil inline temporar pentru meniu
  const linkStyle = { color: 'white', textDecoration: 'none', margin: '0 10px', padding: '5px', borderRadius: '5px' };

  return (
    <>
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Gestiune Alimente</h1>
          </div>
          <nav data-testid="nav">
            {/* Link-urile noastre */}
            <NavLink to="/" end style={({ isActive }) => ({ ...linkStyle, backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent' })}>
              Lista Alimente
            </NavLink>
            <NavLink to="/despre" style={({ isActive }) => ({ ...linkStyle, backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent' })}>
              Despre
            </NavLink>
          </nav>
        </div>
        <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
      </header>
      
      <main className="container">
        {/* Aici se încarcă paginile (AlimentePage, DesprePage, etc) */}
        <Outlet />
      </main>
    </>
  );
}