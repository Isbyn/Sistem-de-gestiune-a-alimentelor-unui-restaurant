import { useState } from "react";
import AlimentList from "./components/AlimentList.jsx";
import FormularAliment from "./components/FormularAliment.jsx"; // Importul lipsă adăugat
import rosiiImg from './assets/rosii.jfif';
import muschiImg from './assets/muschi-vita.jfif';
import fainaImg from './assets/faina.jfif';

const ALIMENTE_INITIALE = [
  { id: 1, titlu: "Roșii", depozitare: "frigider", necesitaAprovizionare: true, imagine: rosiiImg },
  { id: 2, titlu: "Mușchi de vită", depozitare: "congelator", necesitaAprovizionare: true, imagine: muschiImg },
  { id: 3, titlu: "Făină de grâu", depozitare: "camara", necesitaAprovizionare: false, imagine: fainaImg }
];

// Citeste tema SO
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [alimente, setAlimente] = useState(ALIMENTE_INITIALE);
  const [tema, setTema] = useState(temaInitiala);
  const [arataFormular, setArataFormular] = useState(false);

  // Functie schimbarea starii: Bifare/Debifare
  function handleToggle(id) {
    setAlimente((prev) =>
      prev.map((a) => (a.id === id ? { ...a, necesitaAprovizionare: !a.necesitaAprovizionare } : a))
    );
  }

  // Functie stergere
  function handleDelete(id) {
    setAlimente((prev) => prev.filter((a) => a.id !== id));
  }

  // Functie comutare tema
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  function handleAddAliment(nouAliment) {
    setAlimente((prev) => [...prev, nouAliment]);
    setArataFormular(false); // Ascundem formularul după ce am salvat
  }

  // Contorul se calculeaza automat la fiecare randare
  const disponibile = alimente.filter((a) => !a.necesitaAprovizionare).length;

  return (
    <>
      <header className="app-header">
        <button 
          className="theme-toggle" 
          onClick={handleTema} 
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>Gestiune Alimente</h1>
        <p>Monitorizeaza stocurile de alimente si organizeaza aprovizionarea restaurantului.</p>
        <p className="app-count">
          {alimente.length} alimente, dintre care {disponibile} disponibile
        </p>
      </header>
      
      <main className="container">
        <section className="panel">
          
          {/* Secțiunea formularului a fost mutată aici, aliniată la stânga deasupra listei */}
          <div style={{ marginBottom: '1.5rem' }}>
            {!arataFormular && (
              <button 
                onClick={() => setArataFormular(true)} 
                className="btn-adauga">
                + Adaugă Aliment Nou
              </button>
            )}

            {arataFormular && (
              <FormularAliment 
                onAdd={handleAddAliment} 
                onCancel={() => setArataFormular(false)} 
              />
            )}
          </div>

          <h2>Lista de alimente</h2>
          <AlimentList 
            alimente={alimente} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        </section>
      </main>
    </>
  );
}