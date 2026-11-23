import { useState } from 'react';

const DEPOZITARE = [
  { value: "Frigider", label: "Frigider" },
  { value: "congelator", label: "Congelator" },
  { value: "camara", label: "Cămară" }
];
const TITLU_MAX = 100;

export default function FormularAliment({ onAdd, onCancel }) {
  const [titlu, setTitlu] = useState("");
  const [depozitare, setDepozitare] = useState("Frigider");
  const [disponibil, setDisponibil] = useState(true);
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  // Funcția de validare cerută la Etapa 7
  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Numele alimentului este obligatoriu.";
    if (t.length > TITLU_MAX) return `Numele are maximum ${TITLU_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const mesaj = valideaza();
    
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({ 
        titlu: titlu.trim(), 
        depozitare: depozitare, 
        necesitaAprovizionare: !disponibil 
      });
      setTitlu("");
      setDepozitare("Frigider");
      setDisponibil(true);
      if (onCancel) onCancel(); 
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
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
    cursor: trimite ? 'not-allowed' : 'pointer', 
    opacity: trimite ? 0.6 : 1, 
    flex: 1,
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <form className="formular" onSubmit={handleSubmit} noValidate data-testid="form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '450px', margin: '0 0 2rem 0' }}>
      
      <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        <input 
          type="text" 
          placeholder="Nume aliment (ex: Lapte)" 
          value={titlu} 
          onChange={(e) => setTitlu(e.target.value)} 
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-titlu"
          style={{ ...inputStyle, borderColor: eroare ? '#991b1b' : '#c3c7cf' }}
        />
        
        <select 
          value={depozitare} 
          onChange={(e) => setDepozitare(e.target.value)} 
          data-testid="form-depozitare" 
          style={inputStyle}
        >
          {DEPOZITARE.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
        <input 
          type="checkbox" 
          checked={disponibil} 
          onChange={(e) => setDisponibil(e.target.checked)} 
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        />
        Este disponibil acum?
      </label>

      {eroare && (
        <p className="error" data-testid="form-error" style={{ color: '#991b1b', margin: 0 }}>
          {eroare}
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button 
          type="submit" 
          disabled={trimite}
          data-testid="form-submit" 
          style={{ ...btnStyle, backgroundColor: '#22c55e' }}
        >
          {trimite ? "Se salvează..." : "Salvează"}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ ...btnStyle, backgroundColor: '#6b7280' }}
        >
          Anulează
        </button>
      </div>
    </form>
  );
}