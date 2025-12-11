# Tabibak Web Demo

Single-page HTML/CSS/JS demo mirroring the Tabibak Flutter app flows (doctor discovery, booking, telemedicine, chat, medical records, prescriptions, nearby doctors, settings) with a responsive web layout.

## What's here
- Landing hero with CTAs for booking, telemedicine, and messaging previews.
- Booking: specialty/location/type filters, doctor cards, availability-aware actions.
- Telemedicine: call state simulation (connecting/connected/ended) with mute/camera/screen-share/record toggles.
- Appointments: status/type aware cards with patient/doctor context.
- Chat: mock thread with send simulation and call shortcuts.
- Symptom checker: free-text plus common symptom tags with mock analysis results.
- Medical file and prescriptions: tabbed mock data views.
- Nearby doctors: distance/specialty filters with availability chips.
- Settings: notification/location/theme/language/region toggles.

## Run locally
1. Open `index.html` directly in a browser (no build needed).
2. Interact with filters, toggles, and tabs; all data is mocked client-side.

## Structure
- `index.html` - layout and sections.
- `styles.css` - theme, grid system, cards, buttons, responsive tweaks.
- `app.js` - mock data models and interactive behavior.

## Notes
- Role toggle and language/RTL toggle remain in the top bar; patient/doctor dashboard sections were removed per request.
- No backend required; only Google Fonts are loaded.
