import { Link } from "react-router-dom";

const ETICHETE_DEPOZITARE = {
  "Frigider": "Frigider",
  "congelator": "Congelator",
  "camara": "Cămară"
};

export default function AlimentCard({ aliment, onToggle, onDelete }) {

  const imagineGenerica = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop";
  
  const imagineFundal = aliment.imagine ? aliment.imagine : imagineGenerica;

  const cardStyle = {
    // 3. Folosim variabila nouă aici
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url('${imagineFundal}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  };

  return (
    <li className={aliment.necesitaAprovizionare ? "task-card done" : "task-card"} style={cardStyle} data-testid="item" data-id={aliment.id}> 
      <label className="task-main">
        <input type="checkbox" checked={aliment.necesitaAprovizionare} onChange={() => onToggle(aliment.id)} data-testid="item-toggle" />
        
        <Link to={`/alimente/${aliment.id}`} style={{ color: 'white', fontSize: '1.17em', fontWeight: 'bold' }} data-testid="item-link">
          {aliment.titlu}
        </Link>
      </label>
      
      <span className={`badge badge-${aliment.depozitare}`}>
        {ETICHETE_DEPOZITARE[aliment.depozitare]}
      </span>
      <span className="status">
        {aliment.necesitaAprovizionare ? "Necesită aprov." : "Disponibil"}
      </span>
      <button onClick={() => onDelete(aliment.id)} aria-label={`Șterge ${aliment.titlu}`} data-testid="item-delete">
        Șterge
      </button>
    </li>
  );
}