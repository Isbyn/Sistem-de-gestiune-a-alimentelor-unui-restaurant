import AlimentCard from "./AlimentCard.jsx";

export default function AlimentList({ alimente }) {
  // Daca lista este goala:
  if (alimente.length === 0) {
    return <p className="empty">Nu există niciun aliment.</p>;
  }

  // 2. Altfel: un card pentru fiecare element (map)
  return (
    <ul className="task-list">
      {alimente.map((aliment) => (
        <AlimentCard key={aliment.id} aliment={aliment} />
      ))}
    </ul>
  );
}