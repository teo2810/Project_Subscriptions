# 💳 I Miei Abbonamenti

**Progressive Web App** in un **singolo file** HTML/CSS/JS per tracciare abbonamenti ricorrenti (streaming, software, palestra, cloud, AI, gaming, utenze…) in modo semplice, visivo e **offline-first**.

> Apri `index.html` con un doppio clic — nessuna installazione, nessun account, nessun server obbligatorio.

---

## Caratteristiche

| Area | Cosa offre |
|------|------------|
| **Standalone** | Un solo file, zero dipendenze di build. Funziona da `file://` e offline. |
| **Multi-profilo** | Profili separati (es. Personale, Famiglia, Lavoro) con dati e storico indipendenti. |
| **Tema** | Chiaro / scuro, interfaccia responsive mobile-first (Material Design 3). |
| **Inserimento rapido** | Autocompletamento servizi noti, piani suggeriti, icone integrate + cache loghi. |
| **Dashboard** | Spesa mensile/annuale, attivi, grafici per area (barre / composizione / radar), prossimi rinnovi. |
| **Elenco** | Ricerca, filtri, ordinamento, card mobile, stampa A4. |
| **Calendario** | Vista anno e mese sulle scadenze. |
| **Risparmio** | Simulazione “quanto risparmi se disattivi…”. |
| **Backup** | Export / import JSON del profilo corrente; avvisi se il backup è assente o datato. |

---

## Privacy

- I dati restano **solo sul dispositivo** (`localStorage`), con wrapper sicuro e fallback in memoria.
- **Nessun account**, analytics o sync cloud obbligatorio.
- L’unica rete **opzionale** è il recupero loghi brand (CDN / Simple Icons); offline → icone locali o di categoria.
- Il backup esiste **solo** se esporti tu un file JSON (o stampi).

---

## Come usarla

### Apertura diretta
1. Scarica `index.html`
2. Aprilo in Chrome, Edge, Firefox, Safari o Brave

### Come PWA
- **Desktop (Chrome/Edge):** icona “Installa” nella barra indirizzi  
- **Android Chrome / iOS Safari:** *Aggiungi alla schermata Home*

---

## Stack

- **Vanilla** HTML5, CSS3 (custom properties), JavaScript ES6+
- **Canvas** per i grafici (niente Chart.js)
- Persistenza: `safeGet` / `safeSet` + namespace per profilo  
  (`subManager_subscriptions_v1::[profileId]`, ecc.)
- SVG inline per servizi noti; upload icona personalizzata; loghi esterni in cache locale

---

## Backup JSON (esempio)

```json
{
  "version": "1.0.0",
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

Importando un file, i dati del **profilo attivo** vengono sostituiti: controlla le date prima di confermare.

---

## Sviluppo

UI e codice evoluti con supporto **AI** (**Claude** e **Grok / xAI**), sotto direzione e scelte dell’autore.

Contributi e feedback sono benvenuti: preferisci patch piccole, senza dipendenze pesanti se non necessarie.

---

## Licenza

Distribuito liberamente per **uso personale**.  
Fornito “**così com’è**”, senza garanzia.  
I marchi e i loghi dei servizi restano dei rispettivi titolari.

> Non sostituisce un consulente finanziario: è uno strumento di organizzazione personale.
