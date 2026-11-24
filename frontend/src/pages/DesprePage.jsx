import { Link } from "react-router-dom";
import styles from "./DesprePage.module.css";

export default function DesprePage() {
  return (
    <div className={styles.container}>
     
      <section className={`panel ${styles.hero}`}>
        <h2>De ce este importantă gestiunea alimentelor?</h2>
        <p className={styles.lead}>
          O bucătărie organizată nu înseamnă doar ordine pe rafturi, ci și respect față de resurse,
          timp și buget. Monitorizarea constantă a stocurilor ajută la prevenirea risipei alimentare
          și la planificarea eficientă a meselor zilnice.
        </p>
      </section>

      
      <div className={styles.cardsGrid}>
        <article className="panel">
          <h3>🌱 Reducerea risipei alimentare</h3>
          <p>
            Peste o treime din alimentele produse la nivel global ajung să fie aruncate. Când știi
            exact ce ai în stoc și ce necesită aprovizionare, cumperi doar ce folosești cu adevărat
            și eviți expirarea produselor uitate în spatele rafturilor.
          </p>
        </article>

        <article className="panel">
          <h3>💰 Economisirea bugetului</h3>
          <p>
            Cumpărăturile impulsive sau dublarea produselor pe care le ai deja acasă generează
            cheltuieli inutile. O evidență clară a disponibilului îți permite să mergi la
            cumpărături cu o listă precisă și să valorifici ingredientele existente.
          </p>
        </article>

        <article className="panel">
          <h3>⏱️ Economie de timp și organizare</h3>
          <p>
            Atunci când știi dinainte ce ingrediente ai în frigider, cămară sau congelator,
            decizia „ce gătim azi?” devine mult mai simplă. Gătitul este mai rapid, iar
            aprovizionarea se face organizat, o singură dată pe săptămână.
          </p>
        </article>
      </div>

      
      <section className="panel">
        <h3>Reguli de bază pentru o depozitare eficientă</h3>
        <ul className={styles.tipsList}>
          <li>
            <strong>Frigider (0°C – 4°C):</strong> Ideal pentru lactate, ouă, carne proaspătă,
            legume sensibile și preparate gătite. Aplică regula <em>FIFO</em> (First In, First Out) —
            produsele cumpărate mai demult stau în față.
          </li>
          <li>
            <strong>Congelator (-18°C):</strong> Păstrează pe termen lung carnea, legumele
            porționate, fructele de pădure sau pâinea, prevenind alterarea atunci când nu le poți
            consuma imediat.
          </li>
          <li>
            <strong>Cămară (loc uscat și răcoros):</strong> Potrivită pentru făină, paste, orez,
            conserve, uleiuri și condimente. Păstrarea lor în recipiente etanșe le prelungește
            prospețimea și le ferește de umiditate.
          </li>
        </ul>

        <div className={styles.cta}>
          <Link to="/" className={styles.backBtn}>
            Înapoi la inventarul tău de alimente →
          </Link>
        </div>
      </section>
    </div>
  );
}