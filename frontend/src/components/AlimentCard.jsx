const ETICHETE_DEPOZITARE = { camara: "Cămară", frigider: "Frigider", congelator: "Congelator" };

export default function AlimentCard({ aliment, onToggle, onDelete }) {
  const cardStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url('${aliment.imagine}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  };

  return (
    <li 
      className={aliment.necesitaAprovizionare ? "task-card done" : "task-card"} 
      style={cardStyle}
    >
      <label className="task-main">
        <input
          type="checkbox"
          checked={aliment.necesitaAprovizionare}
          onChange={() => onToggle(aliment.id)}
        />
        <h3>{aliment.titlu}</h3>
      </label>
      
      <span className={`badge badge-${aliment.depozitare}`}>
        {ETICHETE_DEPOZITARE[aliment.depozitare]}
      </span>
      
      <span className="status">
        {aliment.necesitaAprovizionare ? "Necesită aprov." : "Disponibil"}
      </span>

      <button
        className="btn-danger"
        onClick={() => onDelete(aliment.id)}
        aria-label={`Șterge ${aliment.titlu}`}
      >
        Șterge
      </button>
    </li>
  );
}