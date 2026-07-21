# Tampermonkey Universal AI Prompt Commands PL

Polska wersja skryptu Tampermonkey do szybkiej pracy z czatami AI.

Skrypt zamienia uniwersalne wyzwalacze `Q1–Q10` na gotowe prompty AI. Wyzwalacze nie są powiązane z językiem. Użytkownik może zmienić `Q1`, `Q2` i inne wyzwalacze na własne słowa, komendy albo frazy.

## Do czego służy

Skrypt pomaga szybciej wpisywać gotowe prompty w ChatGPT, Gemini, Claude, Copilot i innych czatach AI. Zamiast pisać długie polecenie ręcznie, wystarczy wpisać `Q1`, a skrypt wstawi pełny prompt.

## Jak działa

Skrypt obserwuje aktywne pole tekstowe. Jeżeli cała zawartość pola jest dokładnie taka sama jak jeden z wyzwalaczy `Q1–Q10`, tekst zostaje zastąpiony gotowym promptem.

Przykład:

```text
Q1
```

zostanie zastąpione promptem do tłumaczenia na język polski.

```text
Q8
```

zostanie zastąpione promptem do wyodrębniania ważnych faktów.

Zwykły tekst nie jest zmieniany. `Q1 jakiś tekst` nie zostanie zastąpione, bo nie jest dokładnym wyzwalaczem.

## Własne wyzwalacze

Wyzwalacze można zmienić w kodzie w obiekcie `COMMANDS`.

```javascript
'Q1': `...`
```

można zmienić na przykład na:

```javascript
'TLUMACZ': `...`
```

## Gdzie można używać

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- inne strony z polem tekstowym

W skrypcie znajduje się:

```javascript
// @match        *://*/*
```

## Wymaganie przed instalacją

Najpierw w przeglądarce musi być zainstalowane rozszerzenie **Tampermonkey**. Skrypt instaluje się w Tampermonkey, a GitHub służy tylko do przechowywania pliku `.user.js`.

## Szybka instalacja

1. Zainstaluj Tampermonkey.
2. Otwórz Raw link:

```text
https://raw.githubusercontent.com/1777maxim7771/pl_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potwierdź instalację w Tampermonkey.
4. Otwórz czat AI i wpisz `Q1`.

## Instalacja przez GitHub

Otwórz plik `tampermonkey-universal-ai-prompt-commands.user.js`, kliknij **Raw** i potwierdź instalację w Tampermonkey.

## Import przez URL

W Tampermonkey otwórz **Dashboard → Utilities → Import from URL**, wklej Raw link i potwierdź instalację.

## Ręczna instalacja

Utwórz nowy skrypt w Tampermonkey, wklej kod z pliku `.user.js` i zapisz.

## Dlaczego Tampermonkey rozpoznaje skrypt

Tampermonkey rozpoznaje nagłówek `// ==UserScript==` oraz rozszerzenie `.user.js`.

## Domyślne komendy

- `Q1` — tłumaczenie na język polski.
- `Q2` — streszczenie tekstu.
- `Q3` — krótkie streszczenie listu w jednej linii.
- `Q4` — tłumaczenie na prosty niemiecki A2-B1.
- `Q5` — poprawa tekstu po polsku.
- `Q6` — krótka oficjalna odpowiedź.
- `Q7` — proste wyjaśnienie tekstu.
- `Q8` — wyodrębnianie ważnych faktów.
- `Q9` — lista działań.
- `Q10` — oficjalny list po niemiecku.

## Sprawdzenie

Wpisz `Q1` w czacie AI. Jeśli skrypt działa, `Q1` zostanie zastąpione pełnym promptem.

## Możliwe problemy

Sprawdź, czy skrypt jest włączony, strona została odświeżona, wpisano dokładnie `Q1`, Tampermonkey ma dostęp do strony i kursor znajduje się w polu tekstowym.

## Cel projektu

Projekt przyspiesza powtarzalną pracę z czatami AI: tłumaczenie, streszczanie, analizę listów, odpowiedzi oficjalne i pracę z dokumentami.
