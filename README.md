# 💳 I Miei Abbonamenti - Gestore e Monitoraggio Spese

Una **Progressive Web App (PWA) standalone** in un singolo file HTML/CSS/JS per tracciare, organizzare e gestire tutti i tuoi abbonamenti ricorrenti (streaming, software, palestra, cloud, AI, gaming, ecc.) in modo semplice, visivo e sicuro.

---

## 🌟 Caratteristiche Principali

* **🚀 Standalone & Zero Dipendenze**: Un unico file HTML autosufficiente. Non richiede installazioni, Node.js o server web: funziona con un semplice doppio clic anche offline da protocollo `file://`.
* **👥 Gestione Multi-Profilo**: Supporto per più profili distinti (es. *Personale*, *Famiglia*, *Lavoro*). Ogni profilo mantiene i propri abbonamenti e il proprio storico spese in modo indipendente.
* **🎨 Tema Chiaro / Scuro**: Interfaccia moderna responsive con toggle istantaneo tra Dark Mode e Light Mode.
* **🔍 Auto-Completamento & Loghi Automatici**:
  * Riconoscimento intelligente dei servizi noti (Netflix, Spotify, ChatGPT, Amazon Prime, Google One, iCloud, Disney+, PlayStation, ecc.).
  * Suggerimento di piani tariffari e icone vettoriali pre-integrate.
  * Integrazione con CDN pubblico (*Simple Icons*) per il recupero e il salvataggio in cache locale dei loghi ufficiali ad alta risoluzione.
* **📊 Dashboard & Analytics**:
  * Grafici interattivi (Barre e Torta) per visualizzare l'impatto economico per abbonamento e categoria.
  * Mini-calendario del mese corrente con evidenziazione del giorno di rinnovo.
  * Statistiche immediate: Spesa mensile media, spesa annua stimata e totale abbonamenti attivi.
* **📅 Calendario Annuale Scadenze**: Vista a "parete" per visualizzare tutte le scadenze dei 12 mesi dell'anno a colpo d'occhio.
* **💡 Simulatore di Risparmio**: Calcola istantaneamente quanto denaro potresti risparmiare disattivando o mettendo in pausa determinati abbonamenti.
* **🖨️ Report Stampabile e Tabelle Avanzate**: Filtra per categoria e stato (Attivo/Disattivato), cerca per nome, ordina per prezzo o data di rinnovo e genera un report stampabile con layout ottimizzato.
* **🔒 Privacy & Backup Dati**:
  * Tutti i dati sono memorizzati **esclusivamente in locale** nel browser dell'utente (`localStorage`) con wrapper sicuro di fallback in memoria.
  * Esportazione ed importazione completa di backup in formato `.json`.

---

## 🚀 Come Utilizzare l'App

### Apertura Diretta
1. Scarica o salva il file HTML (es. `index.html`).
2. Fai doppio clic sul file per aprirlo in un qualsiasi browser web moderno (Chrome, Safari, Firefox, Edge, Brave).

### Installazione come Web App (PWA)
Grazie ai tag manifest inline e al meta theme-color:
* **Da Desktop (Chrome/Edge)**: Clicca sull'icona di installazione nella barra degli indirizzi o seleziona *"Installa I Miei Abbonamenti"*.
* **Da Mobile (iOS Safari / Android Chrome)**: Apri il menu di condivisione del browser e seleziona **"Aggiungi alla schermata Home"**.

---

## 🛠️ Architettura Tecnica

* **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 con Custom Properties (CSS Variables) per il tematizzazione.
* **Grafici**: Canvas API standard HTML5 (senza librerie esterne pesanti).
* **Persistenza**:
  * Wrapper di salvataggio sicuro (`safeGet` / `safeSet`) per prevenire errori in ambiti sandboxati o in modalità incognito.
  * Namespace separato per profilo (`subManager_subscriptions_v1::[profileId]`).
* **Loghi & Asset**: SVG inline per i servizi noti + supporto per upload di icone personalizzate o recupero automatico via Simple Icons API.

---

## 💾 Struttura Dati Backup JSON

Un file di backup esportato contiene la seguente struttura JSON:

```json
{
  "version": "2026-07-28.8",
  "profile": {
    "id": "default",
    "name": "Personale",
    "color": "#0f9b8e"
  },
  "subscriptions": [
    {
      "id": "1722200000000",
      "name": "Netflix",
      "category": "Streaming",
      "price": 12.99,
      "currency": "€",
      "frequency": "Mensile",
      "startDate": "2024-01-15",
      "nextRenewal": "2026-08-15",
      "status": "Attivo",
      "payment": "Carta",
      "notes": "Piano Standard"
    }
  ],
  "history": []
}
```

---

## 📄 Licenza

Distribuito liberamente per uso personale.
