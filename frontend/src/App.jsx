import AlimentList from "./components/AlimentList.jsx";
import rosiiImg from './assets/rosii.jfif';
import muschiImg from './assets/muschi-vita.jfif';
import fainaImg from './assets/faina.jfif';
const alimente = [
  { 
    id: 1, 
    titlu: "Roșii", 
    depozitare: "frigider", 
    necesitaAprovizionare: true,
    imagine:rosiiImg
  },
  { 
    id: 2, 
    titlu: "Mușchi de vită", 
    depozitare: "congelator", 
    necesitaAprovizionare: true,
    imagine: muschiImg
  },
  { 
    id: 3, 
    titlu: "Făină de grâu", 
    depozitare: "camara", 
    necesitaAprovizionare: false,
    imagine: fainaImg
  }
];

export default function App() {
  const disponibile = alimente.filter((a) => !a.necesitaAprovizionare).length;

  return (
    <>
      <header className="app-header">
        <h1>Gestiune Alimente</h1>
        <p>Monitorizeaza stocurile de alimente si organizeaza aprovizionarea restaurantului.</p>
        <p className="app-count">
          {alimente.length} alimente, dintre care {disponibile} disponibile
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>Lista de alimente</h2>
          <AlimentList alimente={alimente} />
        </section>
      </main>
    </>
  );
}