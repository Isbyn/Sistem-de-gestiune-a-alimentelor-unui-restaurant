const CATEGORII = ["carne", "lactate", "fructe", "legume", "bauturi"];
const alimente = [
  { id: 1, denumire: "Piept de pui", expirat: false, inStoc: true, categorie: "carne", cantitate: 15 },
  { id: 2, denumire: "Lapte 3.5%", expirat: true, inStoc: false, categorie: "lactate", cantitate: 0 },
  { id: 3, denumire: "Mere golden", expirat: false, inStoc: true, categorie: "fructe", cantitate: 25 },
  { id: 4, denumire: "Rosii cherry", expirat: false, inStoc: true, categorie: "legume", cantitate: 10 },
  { id: 5, denumire: "Apa minerala", expirat: false, inStoc: true, categorie: "bauturi", cantitate: 50 }
];

// --- Listarea denumirilor ---
function listeazaDenumiri(lista) {
  return lista.map((a) => a.denumire);
}

// --- Numărarea elementelor active/proaspete ---
// Numără alimentele proaspete ( expirat == false)
function numaraProaspete(lista) {
  return lista.filter((a) => !a.expirat).length;
}

// Numără alimentele aflate în stoc (inStoc == true)
function numaraInStoc(lista) {
  return lista.filter((a) => a.inStoc).length;
}

// --- Căutarea după denumire ---
function cautaDupaDenumire(lista, text) {
  const textCurat = text.toLowerCase();
  return lista.filter((a) => a.denumire.toLowerCase().includes(textCurat));
}

// --- Generarea ID-ului nou și adăugarea cu validare ---
function nextId(lista) {
  return lista.reduce((max, a) => Math.max(max, a.id), 0) + 1;
}

function adaugaAliment(lista, denumire, categorie = "legume", cantitate = 1) {
  const denumireCurata = denumire ? denumire.trim() : "";

  // Validare denumire goală
  if (!denumireCurata) {
    console.log("Eroare validare: Denumirea alimentului nu poate fi goală!");
    return lista;
  }

  // Validare categorie în lista permisă
  if (!CATEGORII.includes(categorie)) {
    console.log(`Eroare validare: Categoria "${categorie}" este invalidă!`);
    return lista;
  }

  // Validare cantitate pozitivă
  if (cantitate <= 0) {
    console.log("Eroare validare: Cantitatea trebuie să fie un număr mai mare ca 0!");
    return lista;
  }

  // Construire obiect nou
  const nou = {
    id: nextId(lista),
    denumire: denumireCurata,
    expirat: false,
    inStoc: true,
    categorie: categorie,
    cantitate: cantitate
  };

  // Returnăm un array nou 
  return [...lista, nou];
}

// ---Comutarea stării și ștergerea---
function comutaExpirat(lista, id) {
  return lista.map((a) => (a.id === id ? { ...a, expirat: !a.expirat } : a));
}

function comutaStoc(lista, id) {
  return lista.map((a) => (a.id === id ? { ...a, inStoc: !a.inStoc } : a));
}

function stergeAliment(lista, id) {
  return lista.filter((a) => a.id !== id);
}

//-------Testare in consola-------
console.log("--- Citire ---");
console.log("Toate alimentele:", listeazaDenumiri(alimente).join(", "));
console.log("Alimente proaspete (neexpirate):", numaraProaspete(alimente));
console.log("Alimente în stoc:", numaraInStoc(alimente));
console.log("Căutare 'mere':", listeazaDenumiri(cautaDupaDenumire(alimente, "mere")).join(", "));

console.log("--- Adăugare ---");
let listaActualizata = adaugaAliment(alimente, "Portocale rosii", "fructe", 12);
console.log("Lista nouă conține:", listaActualizata.length, "alimente");
console.log("Originalul a rămas cu:", alimente.length, "alimente"); 

console.log("--- Modificare și ștergere ---");
listaActualizata = comutaExpirat(listaActualizata, 1); 
console.log("După expirarea produsului cu ID 1, proaspete rămase:", numaraProaspete(listaActualizata));

listaActualizata = comutaStoc(listaActualizata, 3); 
console.log("După epuizarea stocului pentru ID 3, în stoc rămase:", numaraInStoc(listaActualizata));

listaActualizata = stergeAliment(listaActualizata, 4); 
console.log("După ștergerea ID 4:", listeazaDenumiri(listaActualizata).join(", "));

console.log("--- Validare ---");
adaugaAliment(listaActualizata, "");
adaugaAliment(listaActualizata, "Suc natural", "dulciuri"); 