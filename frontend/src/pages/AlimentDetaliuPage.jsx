import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAliment } from "../api.js";

const ETICHETE_DEPOZITARE = { "Frigider": "Frigider", "congelator": "Congelator", "camara": "Cămară" };

export default function AlimentDetaliuPage() {
  const { id } = useParams(); 
  const [aliment, setAliment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchAliment(id)
      .then((data) => {
        if (!ignore) {
          setAliment(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <p className="info" data-testid="loading">Se încarcă detaliile...</p>;
  
  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">Alimentul nu a putut fi încărcat: {error}</p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }

  return (
    <section className="panel" data-testid="detail">
      <Link to="/">Înapoi la listă</Link>
      <h2 data-testid="detail-title">{aliment.titlu}</h2>
      
      <p><strong>Zonă de depozitare:</strong> {ETICHETE_DEPOZITARE[aliment.depozitare]}</p>
      <p><strong>Disponibilitate stoc:</strong> {aliment.necesitaAprovizionare ? "Lipsă stoc (necesită aprovizionare)" : "În stoc (Disponibil)"}</p>
      <p><strong>ID Bază de date:</strong> {aliment.id}</p>
    </section>
  );
}