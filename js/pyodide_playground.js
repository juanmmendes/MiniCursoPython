import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.21.0/full/pyodide.js";

async function main() {
    let pyodide = await loadPyodide();
    console.log("Pyodide loaded!");

    const runCode = async (code) => {
        try {
            pyodide.runPython(code);
        } catch (err) {
            console.error(err);
            return err.message;
        }
    };

    window.runPythonCode = runCode;

    // Initial setup for the interactive playground
    const outputElement = document.getElementById("output");
    const editorElement = document.getElementById("editor");
    const executeButton = document.getElementById("execute-button");

    if (executeButton) {
        executeButton.addEventListener("click", async () => {
            const code = editorElement.value;
            outputElement.textContent = "Executando...";
            const result = await runCode(code);
            if (result) {
                outputElement.textContent = result;
            } else {
                // If no explicit return, capture stdout
                outputElement.textContent = pyodide.runPython("import sys\nfrom io import StringIO\nsys.stdout = StringIO()\n");
                pyodide.runPython(code);
                outputElement.textContent = pyodide.runPython("sys.stdout.getvalue()");
            }
        });
    }

    // Setup for the free playground
    const freeOutputElement = document.getElementById("free-output");
    const freeEditorElement = document.getElementById("free-editor");
    const freeExecuteButton = document.getElementById("free-execute-button");

    if (freeExecuteButton) {
        freeExecuteButton.addEventListener("click", async () => {
            const code = freeEditorElement.value;
            freeOutputElement.textContent = "Executando...";
            const result = await runCode(code);
            if (result) {
                freeOutputElement.textContent = result;
            } else {
                freeOutputElement.textContent = pyodide.runPython("import sys\nfrom io import StringIO\nsys.stdout = StringIO()\n");
                pyodide.runPython(code);
                freeOutputElement.textContent = pyodide.runPython("sys.stdout.getvalue()");
            }
        });
    }
}

main();


