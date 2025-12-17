# MedTicket

System zgłoszeniowy do wewnętrznego zgłaszania problemów technicznych i utrzymaniowych w szpitalu/placówce medycznej.

## Opis projektu

Ticket-System to prosty, wewnętrzny system ticketowy umożliwiający pracownikom szybkie zgłaszanie awarii i problemów z zakresu:

- Informatyki (IT)
- Aparatury medycznej
- Instalacji elektrycznych
- Utrzymania budynku
- Cyberbezpieczeństwa
- Innych kategorii

System pozwala na wybór miejsca zdarzenia, działu docelowego, priorytetu oraz powtarzalności problemu.

## Road Map

### Etap 0 – Struktura projektu
- Poprawienie i uporządkowanie struktury plików w folderze `app`

### Etap 1 – Walidacja formularza
- Dodanie pełnej walidacji po stronie klienta (JavaScript) do formularza zgłoszeniowego  

### Etap 2 – Poprawki na stronie potwierdzenia
- Usunięcie błędów przy drukowaniu strony „Thank You”
- Poprawne drukwanie oraz kopiowanie numeru ID zgłoszenia

### Etap 3 – Panel wyboru działów
- Dodanie dedykowanej strony z wyborem działów (IT, Elektrycy, Budowlany, Aparatura medyczna, Cyberbezpieczeństwo itp.)

### Etap 4 – Panel zgłoszeń
- Strona listy wszystkich zgłoszeń
- Szczegółowy widok pojedynczego zgłoszenia

### Przyszłe funkcjonalności
- System logowania użytkowników
- Profil użytkownika z historią zgłoszeń
- Przypisywanie zgłoszeń do konkretnych osób/techników
- Statusy zgłoszeń (nowe, w trakcie, zamknięte)
- Powiadomienia e-mail
- Eksport danych

## Technologie
- HTML / CSS / JavaScript / ejs
- Backend – Node.js, express
- Baza danych – mariaDB

## Jak uruchomić lokalnie
- git clone https://github.com/gresh0wy/Ticket-System.git
- git push -u origin main

# instrukcje uruchomienia serwera (do uzupełnienia)
- npm run dev

## 📸 Podgląd aplikacji

---

### Strona główna
<p align="center">
  <img src="imgProject/homePage.png" alt="Strona główna" width="800">
</p>

---

### Ekran z podsumowanie zgłoszenia
<p align="center">
  <img src="imgProject/thankYou.png" alt="Ekran podziękowania" width="700">
</p>

---

### Dashboard – widok główny
<p align="center">
  <img src="imgProject/dashboard.png" alt="Dashboard" width="800">
</p>

---

### Dashboard – szczegóły
<p align="center">
  <img src="imgProject/dashboard2.png" alt="Dashboard szczegóły" width="800">
</p>

---

### Logowanie
<p align="center">
  <img src="imgProject/loginPage.png" alt="Strona logowania" width="600">
</p>

---

### Strona błędu 404
<p align="center">
  <img src="imgProject/error404.png" alt="Błąd 404" width="600">
</p>



