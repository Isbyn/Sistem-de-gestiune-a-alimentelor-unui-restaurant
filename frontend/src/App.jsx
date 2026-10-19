const alimente = [
  { id: 1, titlu: "Roșii", necesitaAprovizionare: false, depozitare: "frigider" },
  { id: 2, titlu: "Mușchi de vită", necesitaAprovizionare: true, depozitare: "congelator" },
  { id: 3, titlu: "Făină de grâu", necesitaAprovizionare: false, depozitare: "camara" }
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
          {}
          <pre>{JSON.stringify(alimente, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}