// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PL
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pl
// @version      1.0.0
// @description  Zamienia krótkie komendy PL1-PL10 na gotowe prompty AI w czatach sztucznej inteligencji.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Polska wersja. Zamieniana jest tylko dokładna komenda na pełny prompt.
    const COMMANDS = {
        'PL1': `Przetłumacz podany tekst na język polski w sposób pełny i dokładny. Zachowaj sens, kolejność informacji, imiona i nazwiska, daty, kwoty, numery dokumentów, nazwy organizacji oraz ważne sformułowania. Nie dodawaj własnych wniosków i nie skracaj treści.`,
        'PL2': `Podsumuj podany tekst po polsku zgodnie z sensem i kontekstem. Wyjaśnij, czego dotyczy tekst, kto do kogo pisze, jaki jest główny temat oraz jakie prośby, decyzje, daty, terminy, kwoty lub ważne szczegóły zostały wskazane.`,
        'PL3': `Utwórz po polsku bardzo krótkie tematyczne streszczenie tego pisma, ściśle w jednym wierszu. Wskaż nadawcę, temat, co zostało przekazane lub wymagane oraz jakie daty, terminy, kwoty, dokumenty lub działania są ważne.`,
        'PL4': `Przetłumacz podany tekst na prosty i zrozumiały język niemiecki na poziomie A2-B1. Sformułuj tekst uprzejmie, oficjalnie i poprawnie gramatycznie. Zachowaj sens, imiona i nazwiska, daty, kwoty, adresy, organizacje i ważne szczegóły.`,
        'PL5': `Popraw podany tekst po polsku. Uczyń go poprawnym gramatycznie, jasnym, logicznym i naturalnym, zachowując pierwotny sens. Usuń błędy, powtórzenia i niezręczne sformułowania. Nie dodawaj faktów, których nie ma w tekście źródłowym.`,
        'PL6': `Napisz krótką, uprzejmą i oficjalną odpowiedź na to pismo po polsku. Odpowiedz konkretnie na treść, bez zbędnych zdań. Jeśli trzeba, potwierdź otrzymanie, poproś o wyjaśnienie, wskaż dokumenty lub przekaż wymagane informacje.`,
        'PL7': `Wyjaśnij po polsku prostymi słowami, co oznacza ten tekst. Przeanalizuj kontekst, kto pisze, do kogo, w jakiej sprawie, czego się wymaga, co trzeba zrobić oraz jakie daty, terminy, kwoty, dokumenty lub warunki są ważne.`,
        'PL8': `Wyodrębnij z tekstu wszystkie ważne fakty i uporządkuj je po polsku. Osobno wskaż osoby, organizacje, adresy, daty, terminy, kwoty, numery dokumentów, wymagania, decyzje, obowiązki, wymienione dokumenty i dalsze kroki. Nie wymyślaj informacji.`,
        'PL9': `Sporządź po polsku jasną listę działań wymaganych na podstawie tego tekstu. Wskaż, co trzeba zrobić, jakie dokumenty przygotować, komu odpowiedzieć, gdzie się zwrócić, jakich terminów dotrzymać i na co uważać. Uporządkuj działania według priorytetu.`,
        'PL10': `Na podstawie podanego tekstu napisz uprzejme oficjalne pismo w prostym języku niemieckim na poziomie A2-B1. Zachowaj imiona i nazwiska, daty, kwoty, adresy, organizacje, numery dokumentów i okoliczności. Uporządkuj pismo: zwrot grzecznościowy, krótkie wyjaśnienie, główna prośba i zakończenie. Zakończ: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element) { if (!element || !element.matches) return false; if (element.disabled || element.readOnly) return false; const tagName = element.tagName ? element.tagName.toLowerCase() : ''; const inputType = (element.getAttribute('type') || '').toLowerCase(); if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false; return EDITABLE_SELECTORS.some(selector => element.matches(selector)); }
    function findEditableElement(target) { if (!target) return null; if (isEditableElement(target)) return target; if (target.closest) { const element = target.closest(EDITABLE_SELECTORS.join(',')); if (isEditableElement(element)) return element; } return null; }
    function getText(element) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || ''; }
    function normalizeCommand(text) { return String(text || '').trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element, text) { try { element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text })); } catch (error) { element.dispatchEvent(new Event('input', { bubbles: true })); } element.dispatchEvent(new Event('change', { bubbles: true })); }
    function setCursorToEnd(element) { element.focus(); if ('selectionStart' in element) { const length = element.value.length; element.setSelectionRange(length, length); return; } const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
    function replaceText(element, newText) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; element.focus(); if (tagName === 'textarea' || tagName === 'input') { element.value = newText; } else { try { const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText', false, newText); } catch (error) { element.textContent = newText; } } setCursorToEnd(element); dispatchInputEvents(element, newText); }
    function showNotification(message) { const oldBox = document.getElementById('tm-ai-prompt-commands-notification'); if (oldBox) oldBox.remove(); const box = document.createElement('div'); box.id = 'tm-ai-prompt-commands-notification'; box.textContent = message; box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4'; document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }
    function checkAndReplace(target) { const editable = findEditableElement(target); if (!editable) return; const command = normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return; replaceText(editable, COMMANDS[command]); showNotification(`Komenda ${command} została zastąpiona gotowym promptem AI`); }
    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();