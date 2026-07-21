# Tampermonkey Universal AI Prompt Commands PL

**Tampermonkey Universal AI Prompt Commands PL** to polska wersja skryptu użytkownika dla rozszerzenia **Tampermonkey**. Skrypt pomaga szybciej pracować z czatami sztucznej inteligencji, takimi jak ChatGPT, Gemini, Claude, Copilot oraz innymi stronami z polem wpisywania tekstu.

Głównym zadaniem skryptu jest automatyczna zamiana krótkich komend `PL1–PL10` na przygotowane długie prompty AI w języku polskim. Dzięki temu nie trzeba za każdym razem ręcznie wpisywać tego samego długiego polecenia.

---

## Do czego służy ten skrypt?

Skrypt służy do szybkiego wpisywania gotowych promptów w czatach AI.

Pomaga przy powtarzających się zadaniach:

- tłumaczenie tekstu na język rosyjski;
- tłumaczenie tekstu na prosty język niemiecki poziomu A2-B1;
- krótkie streszczenie pisma w jednej linii;
- podsumowanie pisma, dokumentu lub wiadomości;
- wyjaśnienie tekstu urzędowego prostymi słowami;
- wyodrębnianie dat, kwot, imion, organizacji, terminów i wymagań;
- tworzenie listy działań do wykonania;
- przygotowanie oficjalnej odpowiedzi lub pisma.

---

## Jak działa skrypt?

Użytkownik wpisuje dokładną komendę w polu tekstowym czatu AI.

Przykład:

```text
PL1
```

Skrypt automatycznie zamienia tę komendę na pełny polski prompt do dokładnego tłumaczenia tekstu na język rosyjski.

Inne przykłady:

```text
PL3
```

zostaje zamienione na prompt do krótkiego tematycznego streszczenia pisma w jednej linii.

```text
PL8
```

zostaje zamienione na prompt do wyodrębniania ważnych faktów z tekstu.

```text
PL9
```

zostaje zamienione na prompt do stworzenia listy działań.

---

## Komendy polskiej wersji

- `PL1` — dokładne tłumaczenie tekstu na język rosyjski.
- `PL2` — podsumowanie tekstu po rosyjsku.
- `PL3` — krótkie tematyczne streszczenie pisma w jednej linii.
- `PL4` — tłumaczenie tekstu na prosty niemiecki A2-B1.
- `PL5` — poprawa tekstu rosyjskiego z zachowaniem sensu.
- `PL6` — krótka oficjalna odpowiedź w języku niemieckim.
- `PL7` — proste wyjaśnienie tekstu po rosyjsku.
- `PL8` — wyodrębnienie ważnych faktów z tekstu.
- `PL9` — lista działań do wykonania na podstawie tekstu.
- `PL10` — oficjalne pismo w języku niemieckim na podstawie tekstu źródłowego.

W tej polskiej wersji komentarze, opis, powiadomienie i prompty są napisane po polsku.

---

## Co musi być zainstalowane wcześniej?

Przed instalacją tego skryptu w przeglądarce musi być zainstalowane rozszerzenie **Tampermonkey**.

Tampermonkey to rozszerzenie przeglądarki, które pozwala instalować i uruchamiać skrypty użytkownika w formacie `.user.js`.

---

## Szybka instalacja

1. Zainstaluj **Tampermonkey** w przeglądarce.
2. Otwórz bezpośredni link Raw do pliku skryptu:

```text
https://raw.githubusercontent.com/1777maxim7771/pl_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Tampermonkey powinien automatycznie otworzyć okno instalacji.
4. Kliknij **Install / Zainstaluj**.
5. Otwórz czat AI i wpisz:

```text
PL1
```

Jeśli komenda zostanie zamieniona na długi prompt, skrypt został zainstalowany poprawnie.

---

## Instalacja przez GitHub

1. Otwórz to repozytorium.
2. Otwórz plik:

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

3. Kliknij **Raw**.
4. Tampermonkey powinien rozpoznać plik `.user.js` i zaproponować instalację.
5. Kliknij **Install / Zainstaluj**.

---

## Jeśli Raw nie działa

Otwórz Tampermonkey ręcznie:

```text
Tampermonkey → Dashboard → Utilities → Import from URL
```

Wklej link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/pl_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Instalacja ręczna

1. Otwórz Tampermonkey.
2. Kliknij **Create a new script / Utwórz nowy skrypt**.
3. Usuń domyślny szablon.
4. Skopiuj cały kod z pliku `tampermonkey-universal-ai-prompt-commands.user.js`.
5. Wklej kod do Tampermonkey.
6. Zapisz przez **Ctrl + S**.

---

## Ważna informacja

Skrypt nie jest instalowany w GitHub i nie jest instalowany w konkretnej stronie internetowej. Jest instalowany w rozszerzeniu **Tampermonkey**.

GitHub służy tylko jako miejsce przechowywania pliku skryptu.

W skrypcie znajduje się:

```javascript
// @match        *://*/*
```

Oznacza to, że skrypt może działać na różnych stronach internetowych. Zamienia jednak tylko dokładne komendy `PL1–PL10`. Zwykły tekst nie jest zmieniany.