# Tampermonkey Universal AI Prompt Commands PL

**Tampermonkey Universal AI Prompt Commands PL** to userscript dla rozszerzenia **Tampermonkey**. Pomaga szybciej pracować z czatami sztucznej inteligencji, takimi jak ChatGPT, Gemini, Claude, Copilot oraz innymi stronami z polem tekstowym.

Skrypt zamienia krótkie komendy, takie jak `PL1`, `PL3` lub `PL10`, na długie, wcześniej przygotowane prompty AI.

---

## Do czego służy

Służy do szybkiego wstawiania promptów do tłumaczenia, streszczania, analizy pism, wyodrębniania faktów, odpowiedzi urzędowych i przygotowywania tekstów.

---

## Jak działa

Jeżeli pole tekstowe zawiera dokładnie znaną komendę, na przykład:

```text
PL1
```

zostanie ona zastąpiona pełnym promptem. Zwykły tekst nie jest zmieniany.

---

## Przykłady

- `PL1` — dokładne tłumaczenie na język polski.
- `PL3` — streszczenie pisma w jednym wierszu.
- `PL8` — wyodrębnianie dat, kwot, osób, organizacji i dokumentów.
- `PL10` — pismo urzędowe w prostym języku niemieckim A2-B1.

---

## Gdzie używać

ChatGPT, Google Gemini, Claude, Microsoft Copilot oraz inne strony z polem tekstowym.

```javascript
// @match        *://*/*
```

Skrypt działa na różnych stronach, ale zamienia tylko dokładne komendy.

---

## Przed instalacją

Najpierw zainstaluj rozszerzenie **Tampermonkey** w przeglądarce. Pozwala ono instalować i uruchamiać pliki `.user.js`.

---

## Szybka instalacja przez Raw

1. Zainstaluj Tampermonkey.
2. Otwórz ten link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/pl_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potwierdź instalację w Tampermonkey.
4. Przetestuj `PL1` w czacie AI.

---

## Instalacja z GitHub

Otwórz `tampermonkey-universal-ai-prompt-commands.user.js`, kliknij **Raw** i potwierdź instalację w Tampermonkey.

---

## Import przez URL

Tampermonkey → Dashboard → Utilities → Import from URL → wklej link Raw.

---

## Instalacja ręczna

Tampermonkey → Create a new script → usuń szablon → wklej zawartość `.user.js` → zapisz przez **Ctrl + S**.

---

## Dlaczego Tampermonkey rozpoznaje skrypt

Dzięki nagłówkowi `// ==UserScript==` i rozszerzeniu `.user.js`. Skrypt instaluje się w **Tampermonkey**, a nie w GitHub i nie na konkretnej stronie.

---

## Komendy

- `PL1` — tłumaczenie na język polski.
- `PL2` — streszczenie po polsku.
- `PL3` — streszczenie pisma w jednym wierszu.
- `PL4` — tłumaczenie na niemiecki A2-B1.
- `PL5` — poprawa polskiego tekstu.
- `PL6` — krótka odpowiedź oficjalna.
- `PL7` — proste wyjaśnienie.
- `PL8` — wyodrębnianie ważnych faktów.
- `PL9` — lista wymaganych działań.
- `PL10` — oficjalne pismo po niemiecku.

---

## Sprawdzenie

Wpisz `PL1`. Jeśli komenda zostanie zastąpiona pełnym promptem, skrypt działa.

---

## Możliwe problemy

Sprawdź, czy Tampermonkey i skrypt są włączone, czy strona została odświeżona i czy komenda została wpisana samodzielnie.

---

## Plik skryptu

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Cel projektu

Przyspieszenie powtarzalnej pracy z czatami AI dzięki krótkim komendom, które wstawiają pełne prompty.