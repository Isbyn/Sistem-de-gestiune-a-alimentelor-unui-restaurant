import { useState } from 'react';

export default function FormularAliment({ onAdd, onCancel }) {
  const [titlu, setTitlu] = useState('');
  const [depozitare, setDepozitare] = useState('Frigider');
  const [disponibil, setDisponibil] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    if (!titlu.trim()) return;

    const nouAliment = {
      id: crypto.randomUUID(),
      titlu: titlu,
      depozitare: depozitare,
      necesitaAprovizionare: !disponibil 
    };

    onAdd(nouAliment);
  }

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #c3c7cf',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    flex: 1, 
    boxSizing: 'border-box'
  };

  const btnStyle = {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    transition: 'all 0.2s ease-in-out'
  };

 return (
    <form className="formular" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '450px', margin: '0 0 2rem 0' }}>
      
      {/* Rândul 1: Numele și zona de depozitare, așezate în linie */}
      <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        <input 
          type="text" 
          placeholder="Nume aliment (ex: Lapte)" 
          value={titlu} 
          onChange={(e) => setTitlu(e.target.value)} 
          required 
          style={inputStyle}
        />
        
        <select value={depozitare} onChange={(e) => setDepozitare(e.target.value)} style={inputStyle}>
          <option value="Frigider">Frigider</option>
          <option value="congelator">Congelator</option>
          <option value="camara">Cămară</option>
        </select>
      </div>

      {/* Rândul 2: Checkbox-ul dedesubt, aliniat la stânga */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
        <input 
          type="checkbox" 
          checked={disponibil} 
          onChange={(e) => setDisponibil(e.target.checked)} 
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        />
        Este disponibil acum?
      </label>

      {/* Rândul 3: Butoanele de Salvează și Anulează */}
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button 
          type="submit" 
          style={{ ...btnStyle, backgroundColor: '#22c55e' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1ea951'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
        >
          Salvează
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ ...btnStyle, backgroundColor: '#6b7280' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
        >
          Anulează
        </button>
      </div>
    </form>
  );
}