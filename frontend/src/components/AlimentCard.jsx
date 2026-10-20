const ETICHETE_DEPOZITARE = { camara: "Cămară", frigider: "Frigider", congelator: "Congelator" };

export default function AlimentCard({ aliment }) {
  // Aplicăm un gradient negru semi-transparent peste poza specifică alimentului
  const cardStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url('${aliment.imagine}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white' // Textul devine alb pentru contrast
  };

  return (
    <li 
      className={aliment.necesitaAprovizionare ? "task-card done" : "task-card"} 
      style={cardStyle}
    >
      <h3>{aliment.titlu}</h3>
      
      <span className={`badge badge-${aliment.depozitare}`}>
        {ETICHETE_DEPOZITARE[aliment.depozitare]}
      </span>
      
      <span className="status">
        {aliment.necesitaAprovizionare ? "Necesită aprov." : "Disponibil"}
      </span>
    </li>
  );
}