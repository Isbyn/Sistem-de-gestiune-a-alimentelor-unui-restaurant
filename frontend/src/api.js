export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });

 if (!res.ok) {
  const body = await res.json().catch(() => ({}));
  throw new Error(body.error || `Eroare server: ${res.status}`);
}

  return res.status === 204 ? null : res.json();
}

export function fetchAlimente() {
  return request("/alimente");
}

export function createAliment(aliment) {
  return request("/alimente", { method: "POST", body: JSON.stringify(aliment) });
}

export function updateAliment(id, changes) {
  return request(`/alimente/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes)
  });
}

export function deleteAliment(id) {
  return request(`/alimente/${id}`, { method: "DELETE" });
}
export function fetchAliment(id) {
  return request(`/alimente/${id}`);
}