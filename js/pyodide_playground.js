// Carrega o Pyodide do CDN
async function loadPyodideAndPackages() {
    try {
        // Atualiza o status para indicar que o Pyodide está carregando
        const statusElement = document.querySelector('.editor-status');
        if (statusElement) {
            statusElement.textContent = "Carregando Python...";
            statusElement.style.color = "#ffd43b";
        }

        // Carrega o Pyodide
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        
        console.log("Pyodide carregado com sucesso!");
        
        // Atualiza o status para indicar que o Pyodide está pronto
        if (statusElement) {
            statusElement.textContent = "Python pronto!";
            statusElement.style.color = "var(--accent-green)";
        }
        
        return pyodide;
    } catch (error) {
        console.error("Erro ao carregar o Pyodide:", error);
        
        // Atualiza o status para indicar que houve um erro
        const statusElement = document.querySelector('.editor-status');
        if (statusElement) {
            statusElement.textContent = "Erro ao carregar Python";
            statusElement.style.color = "var(--accent-red)";
        }
        
        // Exibe o erro no console e na saída
        const outputElement = document.getElementById('output');
        if (outputElement) {
            outputElement.textContent = `Erro ao carregar o Python: ${error.message}`;
        }
        
        throw error;
    }
}

// Função para executar o código Python
async function executePythonCode(pyodide, code) {
    // Configura a captura da saída padrão
    pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()
    `);
    
    try {
        // Executa o código Python
        await pyodide.runPythonAsync(code);
        
        // Obtém a saída padrão e de erro
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        
        // Retorna a saída combinada
        return stderr ? `${stdout}\n\n${stderr}` : stdout;
    } catch (error) {
        // Captura erros de execução
        console.error("Erro ao executar código Python:", error);
        return `Erro: ${error.message}`;
    }
}

// Inicializa o playground quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    // Adiciona o script do Pyodide ao documento
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
    script.async = true;
    document.head.appendChild(script);
    
    // Aguarda o carregamento do script
    script.onload = async function() {
        try {
            // Elementos do playground
            const codeEditor = document.getElementById('python-code');
            const outputElement = document.getElementById('output');
            const runButton = document.getElementById('run-button');
            
            if (!codeEditor || !outputElement || !runButton) {
                console.error("Elementos do playground não encontrados");
                return;
            }
            
            // Carrega o Pyodide
            const pyodide = await loadPyodideAndPackages();
            
            // Configura o botão de execução
            runButton.addEventListener('click', async function() {
                // Atualiza o status e desabilita o botão durante a execução
                const statusElement = document.querySelector('.editor-status');
                if (statusElement) {
                    statusElement.textContent = "Executando...";
                    statusElement.style.color = "#ffd43b";
                }
                
                runButton.disabled = true;
                outputElement.textContent = "Executando...";
                
                try {
                    // Obtém o código do editor
                    const code = codeEditor.value;
                    
                    // Executa o código e obtém a saída
                    const output = await executePythonCode(pyodide, code);
                    
                    // Exibe a saída
                    outputElement.textContent = output || "Nenhuma saída";
                } catch (error) {
                    // Exibe erros na saída
                    outputElement.textContent = `Erro: ${error.message}`;
                } finally {
                    // Restaura o status e habilita o botão
                    if (statusElement) {
                        statusElement.textContent = "Python pronto!";
                        statusElement.style.color = "var(--accent-green)";
                    }
                    
                    runButton.disabled = false;
                }
            });
            
            // Adiciona atalho de teclado (Ctrl+Enter) para executar o código
            codeEditor.addEventListener('keydown', function(event) {
                if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                    event.preventDefault();
                    runButton.click();
                }
            });
            
            // Exibe mensagem inicial
            outputElement.textContent = "# A saída do seu código aparecerá aqui quando você clicar em 'Executar'";
            
        } catch (error) {
            console.error("Erro ao inicializar o playground:", error);
        }
    };
    
    // Trata erros de carregamento do script
    script.onerror = function() {
        console.error("Falha ao carregar o script do Pyodide");
        const outputElement = document.getElementById('output');
        if (outputElement) {
            outputElement.textContent = "Erro: Não foi possível carregar o Python. Verifique sua conexão com a internet.";
        }
    };
});

