// Lädt die gespeicherten Prompts aus localStorage und zeigt sie als Buttons mit Beschriftung an
function loadPrompts() {
    const promptButtons = document.getElementById('prompt-buttons');
    promptButtons.innerHTML = '';  // Löscht nur die Buttons, ohne andere Gestaltungselemente zu entfernen

    const prompts = JSON.parse(localStorage.getItem('prompts')) || [];

    prompts.forEach(({ label, text }) => {
        const button = document.createElement('button');
        button.textContent = label; // Nur die Beschriftung anzeigen
        button.onclick = () => copyPrompt(text); // Der Prompt-Text wird in die Zwischenablage kopiert
        promptButtons.appendChild(button);
    });
}

// Funktion, um den eingegebenen Prompt und die Beschriftung in localStorage zu speichern und anzuzeigen
function addPrompt() {
    const promptInput = document.getElementById('prompt-input');
    const labelInput = document.getElementById('label-input');
    const promptText = promptInput.value.trim();
    const labelText = labelInput.value.trim();

    // Überprüfen, ob die Beschriftung bis zu 4 Wörter hat
    if (promptText && labelText && labelText.split(" ").length <= 4) {
        const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
        prompts.push({ label: labelText, text: promptText });
        localStorage.setItem('prompts', JSON.stringify(prompts));
        
        promptInput.value = '';
        labelInput.value = '';
        
        loadPrompts();
    } else {
        alert("Bitte geben Sie eine Beschriftung mit bis zu 4 Wörtern ein.");
    }
}

// Kopierfunktion für den Prompt-Text
function copyPrompt(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Prompt kopiert: " + text);
    });
}

// Funktion, um alle gespeicherten Prompts zu löschen und die Gestaltung zu erhalten
function clearAllPrompts() {
    if (confirm("Möchten Sie wirklich alle Prompts löschen?")) {
        localStorage.removeItem('prompts'); // Entfernt alle gespeicherten Prompts aus dem Speicher
        loadPrompts(); // Aktualisiert nur den Bereich mit den Prompts
        alert("Alle Prompts wurden gelöscht.");
    }
}

// Beim Laden der Seite die gespeicherten Prompts anzeigen
window.onload = loadPrompts;
