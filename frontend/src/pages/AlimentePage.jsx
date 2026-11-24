import { useState, useEffect } from "react";
import AlimentList from "../components/AlimentList.jsx";
import FormularAliment from "../components/FormularAliment.jsx";
import { fetchAlimente, createAliment, updateAliment, deleteAliment } from "../api.js"; 
import styles from "./AlimentePage.module.css";

export default function AlimentePage() {
  const [alimente, setAlimente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arataFormular, setArataFormular] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchAlimente();
        if (!ignore) setAlimente(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  async function handleAddAliment(nouAliment) {
    const creat = await createAliment(nouAliment); 
    setAlimente((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const alimentCurent = alimente.find((a) => a.id === id);
    try {
      const actualizat = await updateAliment(id, { necesitaAprovizionare: !alimentCurent.necesitaAprovizionare });
      setAlimente((prev) => prev.map((a) => (a.id === id ? actualizat : a)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAliment(id);
      setAlimente((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const disponibile = alimente.filter((a) => !a.necesitaAprovizionare).length;

  return (
    <div className={styles.grid}>
      {/* Căsuța din STÂNGA: Adăugare aliment */}
      <section className="panel">
        <h2>Adaugă aliment</h2>
        <FormularAliment onAdd={handleAddAliment} />
      </section>

      {/* Căsuța din DREAPTA: Lista de alimente */}
      <section className="panel">
        <h2>Lista de alimente</h2>
        <p className={styles.summary}>
          {alimente.length} alimente, dintre care {disponibile} disponibile
        </p>

        {loading && (
          <p className="info" data-testid="loading">
            Se încarcă lista de alimente...
          </p>
        )}
        {error && (
          <p className="error" data-testid="error">
            Eroare: {error}
          </p>
        )}

        {!loading && (
          <AlimentList
            alimente={alimente}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}