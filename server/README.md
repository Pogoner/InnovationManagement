# Pitch-Server mit Live-Menüwahl

Kleiner Node.js-Server ohne Abhängigkeiten. Er liefert `pitch/`, `assets/` und `teil6/` aus und speichert die Buchungen der Zuhörer im Arbeitsspeicher. Es gibt kein Login. Einträge, die älter als 30 Minuten sind, werden verworfen.

## Lokal starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Die Buchungsseite liegt unter `/pitch/buchen.html`. Für einen Test mit dem Handy muss der Rechner im selben Netz erreichbar sein.

## Auf Azure bereitstellen

Im Repository-Stamm (dort liegt `package.json`):

```
az webapp up --name <eindeutiger-name> --runtime "NODE:20-lts" --sku B1
```

Der QR-Code im Pitch zeigt automatisch auf die Adresse, unter der der Pitch geöffnet wurde (`buchen.html` daneben). Die Pitch-Seite deshalb über die Azure-Adresse zeigen, nicht über `localhost`. Eine Stunde vorher einmal aufrufen, damit die App nicht gerade startet.

## Schnittstelle

- `GET /api/bookings` liefert die Buchungen der letzten 30 Minuten.
- `POST /api/bookings` mit `{cid, name, avatar, menu, extras}`. Dieselbe `cid` ersetzt die frühere Buchung des Geräts.

Erlaubte Werte stehen in `server/server.js` und müssen mit `pitch/booking-shared.js` übereinstimmen.
