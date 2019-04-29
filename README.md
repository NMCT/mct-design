# mct.be website (in progress)
## 🚀 Setup van het project
### Installatie
- [Go Hugo](https://gohugo.io/getting-started/installing/) moet geïnstalleerd zijn.
- Zorg ervoor dat je Git geïnstalleerd hebt.

### Start de development omgeving
Start het project met ```hugo server```.
Om lokaal de site te testen kan je gebruik maken van het volgende command: ```hugo server -D --bind 192.168.1.37 --baseURL http://192.168.1.37```.

### Deployment (work in progress)
- Alle commits die naar de ```master``` gepushd worden, zullen automatisch gebuild en gedeployd worden (naar Azure).
- Via GitFlow (kan met GitKraken) worden features uitgewerkt op de develop-branch.

## 🧱 Structuur
- Volgens de manier van werken in [Go Hugo](https://gohugo.io/getting-started/directory-structure/).
- Alle styling wordt aan de hand van [ITCSS](https://xfive.co/blog/itcss-scalable-maintainable-css-architecture/) opgebouwd met SCSS.

## 📮 Contact
- Gelieve bij vragen of problemen contact op te nemen met @Simon of @Martijn, via [mct.be](https://mct.be/contact/).
