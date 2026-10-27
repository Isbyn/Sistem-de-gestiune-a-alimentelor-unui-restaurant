import AlimentCard from "./AlimentCard.jsx";

export default function AlimentList({ alimente, onToggle, onDelete }) {
  if (alimente.length === 0) {
    return <p className="empty">Nu există niciun aliment.</p>;
  }

  return (
    <ul className="task-list">
      {alimente.map((aliment) => (
        <AlimentCard 
          key={aliment.id} 
          aliment={aliment} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}