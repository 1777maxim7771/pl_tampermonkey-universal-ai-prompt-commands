// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PL
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pl
// @version      1.0.0
// @description  Polska wersja: zamienia krótkie komendy PL1-PL10 na przygotowane polskie prompty AI do szybkiego wpisywania w czatach AI
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /*
        Tampermonkey Universal AI Prompt Commands PL

        Cel:
        Ten skrypt pomaga szybciej pracować z czatami sztucznej inteligencji.
        Użytkownik wpisuje krótką komendę PL1-PL10, a skrypt zamienia ją
        na pełny przygotowany prompt w języku polskim.

        Przykład:
        PL1 -> pełny prompt do dokładnego tłumaczenia tekstu na język rosyjski.

        Ważne:
        Skrypt zamienia tylko dokładne komendy. Zwykły tekst nie jest zmieniany.
    */

    const COMMANDS = {
        'PL1': `Przetłumacz podany tekst w całości i dokładnie na język rosyjski.
Zachowaj sens, kolejność informacji, imiona i nazwiska, daty, kwoty, numery dokumentów, nazwy organizacji oraz ważne sformułowania.
Jeśli tekst zawiera wyrażenia urzędowe lub prawne, przetłumacz je zrozumiale, ale bez zmiany znaczenia.
Nie dodawaj własnych wniosków, nie skracaj tekstu i nie zmieniaj treści.`,

        'PL2': `Podsumuj podany tekst po rosyjsku zgodnie z jego sensem i kontekstem.
Wyjaśnij, o czym jest tekst, kto do kogo pisze lub coś przekazuje, jakiego tematu dotyczy i jaka jest główna treść.
Osobno wskaż wymagania, prośby, decyzje, daty, terminy, kwoty i ważne szczegóły.
Pisz prostym i zrozumiałym językiem, bez zbędnych rozważań.`,

        'PL3': `Zrób krótkie tematyczne streszczenie pisma po rosyjsku, ściśle w jednym zdaniu lub jednej linii.
W tej jednej linii wskaż: od kogo jest pismo, jakiej sprawy dotyczy, co jest przekazywane lub wymagane oraz jakie ważne daty, terminy, kwoty, dokumenty lub działania są wymienione.
Wynik ma być krótki, ale treściwy.`,

        'PL4': `Przetłumacz podany tekst na prosty i zrozumiały język niemiecki na poziomie A2-B1.
Sformułuj tekst uprzejmie, oficjalnie i poprawnie gramatycznie.
Zachowaj pierwotny sens, daty, imiona i nazwiska, kwoty, adresy, nazwy organizacji i ważne szczegóły.
Nie używaj zbyt skomplikowanych niemieckich sformułowań.`,

        'PL5': `Popraw podany tekst w języku rosyjskim.
Uczyń go poprawnym, zrozumiałym i logicznym, ale zachowaj mój pierwotny sens.
Usuń błędy, powtórzenia, nieudane sformułowania i zbyt potoczne fragmenty.
Jeśli tekst jest przeznaczony do pisma, nadaj mu bardziej uprzejmy i oficjalny styl.
Nie dodawaj faktów, których nie ma w tekście źródłowym.`,

        'PL6': `Napisz krótką, uprzejmą i oficjalną odpowiedź na to pismo w języku niemieckim.
Odpowiedź powinna być prosta, na poziomie A2-B1.
Uwzględnij treść pisma i odpowiedz rzeczowo, bez zbędnych zwrotów.
Jeśli trzeba potwierdzić otrzymanie, wyjaśnić dokumenty, poprosić o wyjaśnienie albo przekazać informacje, sformułuj to poprawnie.
Na końcu dodaj: Mit freundlichen Grüßen`,

        'PL7': `Wyjaśnij prostymi słowami po rosyjsku, co oznacza ten tekst.
Przeanalizuj sens według kontekstu: kto pisze, w jakiej sprawie, czego chce, co trzeba zrobić oraz jakie terminy, daty, kwoty, dokumenty lub warunki są ważne.
Jeśli tekst jest urzędowy, wyjaśnij go zwykłym ludzkim językiem.
Osobno wskaż, czy w tekście jest żądanie, ostrzeżenie, prośba, decyzja czy tylko informacja.`,

        'PL8': `Wyodrębnij z podanego tekstu wszystkie ważne fakty i uporządkuj je po rosyjsku.
Osobno wskaż: imiona i nazwiska, organizacje, adresy, daty, terminy, kwoty, numery dokumentów, wymagania, decyzje, obowiązki, wymienione dokumenty i dalsze niezbędne kroki.
Nie wymyślaj danych, których nie ma w tekście.
Jeśli jakiejś informacji brakuje, napisz: nie podano.`,

        'PL9': `Sporządź po rosyjsku jasną listę działań, które należy wykonać na podstawie tego tekstu.
Określ, co trzeba zrobić, jakie dokumenty przygotować, komu odpowiedzieć, dokąd się zwrócić, jakich terminów przestrzegać i na co zwrócić uwagę.
Podziel działania według priorytetu: pilne, ważne, można później.
Jeśli z tekstu nie wynika jasno, co dokładnie trzeba zrobić, wskaż pytania wymagające wyjaśnienia.`,

        'PL10': `Przygotuj na podstawie podanego tekstu uprzejme oficjalne pismo w języku niemieckim.
Pismo powinno być proste, zrozumiałe i poprawne, na poziomie A2-B1.
Zachowaj wszystkie ważne fakty: imiona i nazwiska, daty, kwoty, adresy, nazwy organizacji, numery dokumentów i okoliczności.
Struktura pisma: zwrot grzecznościowy, krótkie wyjaśnienie sytuacji, główna prośba lub informacja, w razie potrzeby prośba o potwierdzenie lub wyjaśnienie, zakończenie.
Na końcu dodaj: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = [
        'textarea',
        'input[type="text"]',
        'input[type="search"]',
        '[contenteditable="true"]',
        '[contenteditable="plaintext-only"]',
        '[role="textbox"]'
    ];

    function isEditableElement(element) {
        if (!element || !element.matches) return false;
        if (element.disabled || element.readOnly) return false;

        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();

        if (tagName === 'input') {
            const allowedInputTypes = ['text', 'search'];
            if (!allowedInputTypes.includes(inputType)) return false;
        }

        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }

    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;

        if (target.closest) {
            const element = target.closest(EDITABLE_SELECTORS.join(','));
            if (isEditableElement(element)) return element;
        }

        return null;
    }

    function getText(element) {
        if (!element) return '';
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        if (tagName === 'textarea' || tagName === 'input') return element.value || '';
        return element.innerText || element.textContent || '';
    }

    function normalizeCommand(text) {
        return text.trim().replace(/\s+/g, '').toUpperCase();
    }

    function setCursorToEnd(element) {
        element.focus();
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';

        if (tagName === 'textarea' || tagName === 'input') {
            const length = element.value.length;
            element.setSelectionRange(length, length);
            return;
        }

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function dispatchInputEvents(element, text) {
        try {
            element.dispatchEvent(new InputEvent('input', {
                bubbles: true,
                cancelable: true,
                inputType: 'insertReplacementText',
                data: text
            }));
        } catch (error) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }

        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function replaceText(element, newText) {
        if (!element) return;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        element.focus();

        if (tagName === 'textarea' || tagName === 'input') {
            element.value = newText;
            setCursorToEnd(element);
            dispatchInputEvents(element, newText);
            return;
        }

        try {
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('insertText', false, newText);
        } catch (error) {
            element.textContent = newText;
        }

        setCursorToEnd(element);
        dispatchInputEvents(element, newText);
    }

    function showNotification(message) {
        const oldBox = document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');
        if (oldBox) oldBox.remove();

        const box = document.createElement('div');
        box.id = 'tampermonkey-universal-ai-prompt-commands-notification';
        box.textContent = message;
        box.style.position = 'fixed';
        box.style.right = '20px';
        box.style.bottom = '20px';
        box.style.zIndex = '999999';
        box.style.background = '#111';
        box.style.color = '#fff';
        box.style.padding = '12px 18px';
        box.style.borderRadius = '10px';
        box.style.fontSize = '14px';
        box.style.fontFamily = 'Arial, sans-serif';
        box.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)';
        box.style.maxWidth = '420px';
        box.style.lineHeight = '1.4';
        document.body.appendChild(box);
        setTimeout(() => box.remove(), 2200);
    }

    function checkAndReplace(target) {
        const editable = findEditableElement(target);
        if (!editable) return;

        const currentText = getText(editable);
        const command = normalizeCommand(currentText);

        if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return;

        replaceText(editable, COMMANDS[command]);
        showNotification(`Komenda ${command} została zastąpiona gotowym promptem`);
    }

    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();