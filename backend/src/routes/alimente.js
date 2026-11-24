import { Router } from "express";
import { parseId, valideazaAliment } from "../validation.js";

const router = Router();

// Datele stau în memorie în Etapa 9 (în Etapa 10 se mută în MariaDB)
let alimente = [
  { id: 1, titlu: "Lapte", depozitare: "Frigider", necesitaAprovizionare: false, imagine: "" },
  { id: 2, titlu: "Faina de grau", depozitare: "camara", necesitaAprovizionare: false, imagine: "" },
  { id: 3, titlu: "Mazare congelata", depozitare: "congelator", necesitaAprovizionare: true, imagine: "" }
];

let nextId = 4;

function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = alimente.findIndex((a) => a.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Alimentul nu există" });
    return -1;
  }
  return index;
}

// GET /alimente
router.get("/", (req, res) => {
  res.json(alimente);
});

// GET /alimente/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(alimente[index]);
});

// POST /alimente
router.post("/", (req, res) => {
  const { erori, date } = valideazaAliment(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const aliment = { id: nextId++, ...date };
  alimente.push(aliment);
  res.status(201).json(aliment);
});

// PATCH /alimente/:id
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaAliment(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  alimente[index] = { ...alimente[index], ...date };
  res.json(alimente[index]);
});

// DELETE /alimente/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  alimente.splice(index, 1);
  res.status(204).end();
});

export default router;