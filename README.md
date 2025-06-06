# 🐍 MiniCurso Python

Repositório oficial do **MiniCurso Python** – um conjunto de páginas interativas
e material de apoio que leva você do nível básico ao avançado em Python usando
apenas o navegador.

> “Aprender programação deve ser **divertido, visual e prático** – por isso todo
> o conteúdo roda 100 % client-side via **Pyodide** (Python em WebAssembly).”

---

## 🌟 O que você encontra aqui

| Módulo / Arquivo                 | Conteúdo principal                                    |
| -------------------------------- | ----------------------------------------------------- |
| `index.html`                     | Guia completo: instalação, fundamentos, libs e +      |
| `estruturas_dados.html`          | Listas, tuplas, dicionários, sets – com exemplos 👀   |
| `interatividade_material.html`   | **Playground** Pyodide para executar código na hora   |
| `guia_python_estruturas.pdf`     | Cheatsheet resumido p/ consulta rápida                |
| `*.py` / `*.db` (extras)         | Scripts auxiliares & base de dados de exemplos        |

---

## 🚀 Como usar

1. **Clone ou baixe** o repositório  
   ```bash
   git clone https://github.com/juanmmendes/MiniCursoPython.git
   cd MiniCursoPython
   ```

2. **Abra `index.html`** no navegador **OU** sirva localmente:  
   ```bash
   # Python 3.8+
   python -m http.server 8000
   # depois acesse http://localhost:8000
   ```

3. Explore os links no menu superior para navegar entre os módulos, testar
   códigos no playground e baixar o PDF.

---

## 🛠️ Tecnologias

- **HTML 5 + Tailwind CSS / CSS-in-JS** – visual moderno e responsivo  
- **PrismJS** – realce de sintaxe nos blocos de código  
- **Pyodide 0.27** – Python rodando em WebAssembly diretamente no browser  
- **Vanilla JS** – interações, animações e smooth-scroll  
- **GitHub Pages** – deploy estático gratuito (basta ativar nas _Settings_)  

---

## ✨ Roadmap

- [ ] Adicionar módulo de **APIs REST** com FastAPI online no Replit  
- [ ] Laboratório de **Data Science** usando Pandas + Plotly via Pyodide  
- [ ] Dark / Light mode automático 👀  
- [ ] Tradução simultânea EN ↔ PT via i18n

Contribuições são muito bem-vindas! Veja as instruções abaixo.

---

## 🤝 Como contribuir

1. *Fork* → `git clone` → `git checkout -b feat/minha-feature`  
2. Faça suas alterações e inclua exemplos interativos se possível  
3. `git commit -m "feat: descrição"` → `git push` → **Pull Request** 🙌  

---

## ⚖️ Licença

Distribuído sob a licença **MIT**.  
Use, modifique, compartilhe – e não esqueça de deixar sua estrela ⭐!

---

_Desenvolvido por **@juanmmendes** com ❤️ e muita cafeína._
