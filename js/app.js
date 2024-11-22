var fabmo = new FabMoDashboard();
let bitOptions = [];
let atc;

// Update the current tool in the configuration
function updateCurrentToolInConfig(currentTool) {
    fetch('config/opensbp.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ATC: { NUMCLIPS: atc.toolSlots, TOOLIN: currentTool + 1, STATUS: atc.currentTool ? "OK" : "NOT ATTACHED" },
            TOOLS: Object.assign({}, ...[...atc.tools, ...atc.offBarTools].map((tool, i) => ({ [i]: tool })))
        })
    })
    .then(response => response.ok ? console.log('Configuration updated successfully') : Promise.reject('Error updating configuration'))
    .catch(error => console.error('Error updating configuration:', error));
}

// Event listeners for control buttons
document.addEventListener("DOMContentLoaded", () => {
    // Button functionality
    const buttonActions = {
        "C2-Zero": () => fabmo.runSBP('C2'),
        "C3-Home": () => fabmo.runSBP('C3'),
        "C72-Measure-all-Tools": () => fabmo.runSBP('C72 \n'),
        "C73-Get-plate-offset": () => fabmo.runSBP("C73 \n"),
        "C74-Calibrate": () => fabmo.runSBP('C74 \n'),
        "C10-Messure Outside Corner": () => fabmo.runSBP('C10 \n'),
        "C11-Messure-Inside-Corner": () => fabmo.runSBP('C11 \n'),
        "C12-Calculate-Contact-Diameter": () => fabmo.runSBP('C12 \n'),
    };

    Object.entries(buttonActions).forEach(([id, action]) => {
        const button = document.getElementById(id);
        if (button) button.addEventListener("click", action);
    });

    // Settings pane functionality
    const settingsButton = document.getElementById("settings-button");
    const settingsPane = document.getElementById("settings-pane");
    const backdrop = document.getElementById("backdrop");
    const closeSettingsButton = document.getElementById("close-settings-button");

    settingsButton.addEventListener("click", () => {
        settingsPane.classList.toggle("show");
        settingsPane.classList.toggle("hidden");
        backdrop.classList.toggle("show");
    });

    closeSettingsButton.addEventListener("click", () => {
        settingsPane.classList.add("hidden");
        settingsPane.classList.remove("show");
        backdrop.classList.remove("show");
    });

    backdrop.addEventListener("click", () => {
        settingsPane.classList.add("hidden");
        settingsPane.classList.remove("show");
        backdrop.classList.remove("show");
    });
});
