# Moderne To‑Do App (Vanilla JS)

Eine minimalistische, moderne To‑Do‑Liste mit Glassmorphism‑Design, Dark‑Mode, Kategorien‑Filter, Prioritäten, Fälligkeitsdatum sowie persistenter Speicherung via `localStorage`. Ein dezenter Partikel‑Hintergrund (tsParticles) sorgt für visuelles Flair.

## Features

- Aufgaben anlegen, bearbeiten, erledigen, löschen
- Kategorien, Prioritäten (niedrig/mittel/hoch) und Fälligkeitsdatum
- Live‑Filterung nach Kategorie
- Dark‑Mode mit Toggle (wird gespeichert)
- Weiche Animationen für neue/gelöschte Einträge
- Persistenz in `localStorage` (kein Backend nötig)
- Particle‑Background via [tsParticles CDN](https://cdnjs.com/libraries/tsparticles)

## Schnellstart

1. Repository/Ordner lokal öffnen.
2. `index.html` im Browser öffnen – fertig.

Optional: Mit lokalem Webserver starten (empfohlen für konsistente Pfade/Cache):

- Python: `python -m http.server 5500` und dann `http://localhost:5500` öffnen
- Node (npx): `npx serve .` und die angezeigte URL öffnen

## Bedienung

- Aufgabe hinzufügen: Text im Feld „Was gibt es zu tun?“ eingeben → „Hinzufügen“
- Details (optional): Kategorie, Priorität, Fälligkeitsdatum
- Filtern: Im Feld „Nach Kategorie filtern…“ Text eingeben (Teiltreffer möglich)
- Bearbeiten: „Bearbeiten“ klicken, Text ändern, Enter zum Speichern oder „Speichern“ klicken
  - Enter: Speichern
  - Escape: Abbrechen
- Erledigen/Rückgängig: Status umschalten
- Löschen: Aufgabe entfernen (mit kurzer Ausblend‑Animation)
- Dark‑Mode: Schalter rechts oben (Speicherung in `localStorage`)

## Projektstruktur

```
.
├── index.html            # App‑Markup und Script‑Einbindung
├── style.css             # Styles (Glassmorphism, Dark‑Mode, Animationen)
├── script.js             # Logik (Tasks, Filter, Storage, UI)
└── particle-loader.js    # tsParticles‑Konfiguration und Initialisierung
```

## Technik

- HTML5, CSS3 (Variablen, responsive Layout), Vanilla JavaScript
- `localStorage` für persistente Aufgaben und Theme
- [tsParticles](https://particles.js.org/) für den animierten Hintergrund (über CDN eingebunden)

## Konfiguration (Particles)

Die Partikel‑Optik lässt sich in `particle-loader.js` über das `configs`‑Objekt anpassen (z. B. `number.value`, `links.opacity`, `move.speed`, Interaktionen). Änderungen speichern und Seite neu laden.

## Daten & Datenschutz

- Aufgaben und Theme werden ausschließlich lokal im Browser in `localStorage` gespeichert (`tasks_v2`, `theme_v1`).
- Es werden keine Daten an Server gesendet.

## Kompatibilität

- Moderne Chromium/Firefox/Edge/Safari‑Versionen. Für beste Ergebnisse aktuelle Browser nutzen.

## Deployment (GitHub Pages)

- Code in ein GitHub‑Repo pushen
- In den Repository‑Settings „Pages“ aktivieren (Source: `main`/`master`, Ordner: `/root`)
- Bereitgestellte URL öffnen (z. B. `https://<user>.github.io/<repo>/`)

## Roadmap / Ideen

- Drag‑and‑Drop‑Sortierung
- Mehr Filter (Status, Priorität, Fälligkeit)
- Export/Import der Aufgaben (JSON)
- PWA‑Unterstützung (offline‑fähig, Installierbar)

Viel Spaß beim Organisieren deiner Aufgaben!

