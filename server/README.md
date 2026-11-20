# Pitch-Server mit Live-Menüwahl

Kleiner Node.js-Server ohne Abhängigkeiten. Er liefert `pitch/`, `rechner/` und `quellen/` aus und speichert die Buchungen der Zuhörer im Arbeitsspeicher. Es gibt kein Login. Einträge, die älter als 30 Minuten sind, werden verworfen.

## Lokal starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Die Buchungsseite liegt unter `/pitch/buchen.html`. Für einen Test mit dem Handy muss der Rechner im selben Netz erreichbar sein.

## Auf Azure bereitstellen (Container)

Voraussetzung: Docker, Azure CLI (`az login`) und ein Docker-Hub-Konto. Ersetze `<hubuser>`, `<app>` und `<rg>` durch deine Werte. Die Befehle laufen im Repository-Stamm (dort liegt das `Dockerfile`).

1. Image bauen und lokal prüfen:

```
docker build -t <hubuser>/rocketlight-pitch:1 .
docker run --rm -p 8080:8080 <hubuser>/rocketlight-pitch:1
```

Dann `http://localhost:8080/pitch/` öffnen.

2. Bei Docker Hub anmelden und hochladen:

```
docker login
docker push <hubuser>/rocketlight-pitch:1
```

Der Zugriffs-Token von Docker Hub (Account Settings, Personal access tokens) kann statt des Passworts verwendet werden. Ist das Repository privat, braucht App Service in Schritt 3 die Zugangsdaten. Bei einem öffentlichen Repository nicht.

3. App Service für Linux-Container anlegen (einmalig):

```
az group create -n <rg> -l westeurope
az appservice plan create -g <rg> -n rocketlight-plan --is-linux --sku B1
az webapp create -g <rg> -p rocketlight-plan -n <app> --deployment-container-image-name docker.io/<hubuser>/rocketlight-pitch:1
az webapp config appsettings set -g <rg> -n <app> --settings WEBSITES_PORT=8080
```

Bei einem privaten Repository zusätzlich:

```
az webapp config container set -g <rg> -n <app> --container-image-name docker.io/<hubuser>/rocketlight-pitch:1 --container-registry-url https://index.docker.io --container-registry-user <hubuser> --container-registry-password <token>
```

4. Neue Version ausrollen (Tag erhöhen, hochladen, App auf den Tag setzen):

```
docker build -t <hubuser>/rocketlight-pitch:2 .
docker push <hubuser>/rocketlight-pitch:2
az webapp config container set -g <rg> -n <app> --container-image-name docker.io/<hubuser>/rocketlight-pitch:2
az webapp restart -g <rg> -n <app>
```

Der Pitch liegt dann unter `https://<app>.azurewebsites.net/pitch/`. Die Buchungen liegen im Arbeitsspeicher des Containers und sind nach einem Neustart weg. Lass die App deshalb auf einer Instanz (B1 ohne Scale-out) und rufe sie vor dem Auftritt einmal auf. Das Logging prüfst du mit `az webapp log tail -g <rg> -n <app>`.

## Ohne Container

Im Repository-Stamm (dort liegt `package.json`):

```
az webapp up --name <eindeutiger-name> --runtime "NODE:20-lts" --sku B1
```

Der QR-Code im Pitch zeigt automatisch auf die Adresse, unter der der Pitch geöffnet wurde (`buchen.html` daneben). Die Pitch-Seite deshalb über die Azure-Adresse zeigen, nicht über `localhost`. Eine Stunde vorher einmal aufrufen, damit die App nicht gerade startet.

## Schnittstelle

- `GET /api/bookings` liefert die Buchungen der letzten 30 Minuten.
- `POST /api/bookings` mit `{cid, name, avatar, menu, extras}`. Dieselbe `cid` ersetzt die frühere Buchung des Geräts.

Erlaubte Werte stehen in `server/server.js` und müssen mit `pitch/booking-shared.js` übereinstimmen.
