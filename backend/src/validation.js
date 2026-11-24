export const ZONE_DEPOZITARE = ["Frigider", "congelator", "camara"];
const TITLU_MAX = 100;

export function valideazaAliment(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.depozitare !== undefined) {
    const dep = body.depozitare ?? "Frigider";
    if (!ZONE_DEPOZITARE.includes(dep)) {
      erori.push(`depozitare trebuie să fie una din: ${ZONE_DEPOZITARE.join(", ")}`);
    } else {
      date.depozitare = dep;
    }
  }

  if (body.necesitaAprovizionare !== undefined) {
    if (typeof body.necesitaAprovizionare !== "boolean") {
      erori.push("necesitaAprovizionare trebuie să fie true sau false");
    } else {
      date.necesitaAprovizionare = body.necesitaAprovizionare;
    }
  } else if (!partial) {
    date.necesitaAprovizionare = false;
  }

  if (body.imagine !== undefined) {
    if (typeof body.imagine !== "string") {
      erori.push("imagine trebuie să fie text (URL)");
    } else {
      date.imagine = body.imagine.trim();
    }
  } else if (!partial) {
    date.imagine = "";
  }

  return { erori, date };
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}