import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>Pagina nu există</h2>
      <p className="info">Adresa cerută nu a fost găsită în sistem.</p>
      <Link to="/">Înapoi la lista de alimente</Link>
    </section>
  );
}