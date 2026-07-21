// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands PL
// @namespace    local.tampermonkey.universal.ai.prompt.commands.pl
// @version      1.1.0
// @description  Polska wersja: zamienia uniwersalne wyzwalacze Q1-Q10 na gotowe prompty AI do szybkiego wpisywania w czatach AI
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /*
        Cel:
        Skrypt przyspiesza pracę z czatami AI, takimi jak ChatGPT, Gemini, Claude i Copilot.
        Zastępuje uniwersalne wyzwalacze Q1-Q10 gotowymi długimi promptami.
        Wyzwalacze nie są powiązane z językiem i można je zmienić na dowolne własne słowa lub komendy.
    */

    const COMMANDS = {
        'Q1': `Przetłumacz podany tekst dokładnie i w całości na język polski.
Zachowaj sens, kolejność informacji, imiona i nazwiska, daty, kwoty, numery dokumentów, nazwy organizacji oraz ważne sformułowania.
Nie dodawaj własnych wniosków, nie skracaj tekstu i nie zmieniaj treści.`,
        'Q2': `Streść podany tekst po polsku zgodnie z jego sensem i kontekstem.
Wyjaśnij, czego dotyczy tekst, kto do kogo pisze, jaki jest temat, co jest najważniejsze oraz jakie wymagania, prośby, decyzje, daty, terminy, kwoty lub ważne szczegóły są wskazane.`,
        'Q3': `Zrób krótkie tematyczne streszczenie listu po polsku dokładnie w jednym zdaniu.
Wskaż, od kogo jest list, czego dotyczy, co jest zgłaszane lub wymagane oraz jakie daty, terminy, kwoty, dokumenty lub działania są ważne.`,
        'Q4': `Przetłumacz podany tekst na prosty i zrozumiały język niemiecki na poziomie A2-B1.
Tekst ma być uprzejmy, oficjalny i poprawny gramatycznie.
Zachowaj pierwotny sens, daty, nazwiska, kwoty, adresy, nazwy organizacji i ważne szczegóły.`,
        'Q5': `Popraw podany tekst po polsku.
Uczyń go poprawnym, zrozumiałym i logicznym, ale zachowaj pierwotny sens.
Usuń błędy, powtórzenia, niezręczne sformułowania i zbyt potoczne fragmenty.
Nie dodawaj faktów, których nie ma w tekście źródłowym.`,
        'Q6': `Napisz krótką, uprzejmą i oficjalną odpowiedź na ten list po polsku.
Odpowiedź ma być rzeczowa i bez zbędnych zdań.
Jeśli trzeba potwierdzić otrzymanie, wyjaśnić dokumenty, poprosić o doprecyzowanie lub przekazać informację, sformułuj to poprawnie.`,
        'Q7': `Wyjaśnij prostymi słowami po polsku, co oznacza ten tekst.
Przeanalizuj kontekst: kto pisze, w jakiej sprawie, czego chce, co trzeba zrobić oraz jakie terminy, daty, kwoty, dokumenty lub warunki są ważne.`,
        'Q8': `Wyodrębnij z podanego tekstu wszystkie ważne fakty i uporządkuj je po polsku.
Wskaż osobno: osoby, organizacje, adresy, daty, terminy, kwoty, numery dokumentów, wymagania, decyzje, obowiązki, wspomniane dokumenty i dalsze kroki.
Nie wymyślaj informacji. Jeśli czegoś nie ma, napisz: nie podano.`,
        'Q9': `Stwórz po polsku jasną listę działań, które należy wykonać na podstawie tego tekstu.
Określ, co trzeba zrobić, jakie dokumenty przygotować, komu odpowiedzieć, dokąd się zwrócić, jakich terminów przestrzegać i na co uważać.
Podziel działania według priorytetu: pilne, ważne, można później.`,
        'Q10': `Na podstawie podanego tekstu przygotuj uprzejmy oficjalny list po niemiecku.
List ma być prosty, zrozumiały i poprawny, poziom A2-B1.
Zachowaj wszystkie ważne fakty: nazwiska, daty, kwoty, adresy, nazwy organizacji, numery dokumentów i okoliczności.
Na końcu dodaj: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element){if(!element||!element.matches)return false;if(element.disabled||element.readOnly)return false;const t=element.tagName?element.tagName.toLowerCase():'';const type=(element.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(type))return false;return EDITABLE_SELECTORS.some(s=>element.matches(s));}
    function findEditableElement(target){if(!target)return null;if(isEditableElement(target))return target;if(target.closest){const e=target.closest(EDITABLE_SELECTORS.join(','));if(isEditableElement(e))return e;}return null;}
    function getText(element){const t=element.tagName?element.tagName.toLowerCase():'';if(t==='textarea'||t==='input')return element.value||'';return element.innerText||element.textContent||'';}
    function normalizeCommand(text){return String(text||'').trim().replace(/\s+/g,'').toUpperCase();}
    function setCursorToEnd(element){element.focus();const t=element.tagName?element.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=element.value.length;element.setSelectionRange(l,l);return;}const r=document.createRange();const s=window.getSelection();r.selectNodeContents(element);r.collapse(false);s.removeAllRanges();s.addRange(r);}
    function dispatchInputEvents(element,text){try{element.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(e){element.dispatchEvent(new Event('input',{bubbles:true}));}element.dispatchEvent(new Event('change',{bubbles:true}));}
    function replaceText(element,newText){const t=element.tagName?element.tagName.toLowerCase():'';element.focus();if(t==='textarea'||t==='input'){element.value=newText;setCursorToEnd(element);dispatchInputEvents(element,newText);return;}try{const r=document.createRange();const s=window.getSelection();r.selectNodeContents(element);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,newText);}catch(e){element.textContent=newText;}setCursorToEnd(element);dispatchInputEvents(element,newText);}
    function showNotification(message){const old=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(old)old.remove();const box=document.createElement('div');box.id='tampermonkey-universal-ai-prompt-commands-notification';box.textContent=message;box.style.position='fixed';box.style.right='20px';box.style.bottom='20px';box.style.zIndex='999999';box.style.background='#111';box.style.color='#fff';box.style.padding='12px 18px';box.style.borderRadius='10px';box.style.fontSize='14px';box.style.fontFamily='Arial, sans-serif';box.style.boxShadow='0 4px 12px rgba(0,0,0,0.35)';document.body.appendChild(box);setTimeout(()=>box.remove(),2200);}
    function checkAndReplace(target){const editable=findEditableElement(target);if(!editable)return;const command=normalizeCommand(getText(editable));if(!Object.prototype.hasOwnProperty.call(COMMANDS,command))return;replaceText(editable,COMMANDS[command]);showNotification(`Wyzwalacz ${command} został zastąpiony gotowym promptem AI`);}
    document.addEventListener('input',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('keyup',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('paste',event=>setTimeout(()=>checkAndReplace(event.target),50),true);
})();