# 🎬 CINESTESIA

**CINESTESIA** é uma plataforma de **gerenciamento de filmes**, permitindo aos usuários **navegar, pesquisar, filtrar** e (com permissão) **adicionar, editar e deletar filmes**.

**Tecnologias**:

- **Frontend:** React (Vite)  
- **Backend:** Python puro (usando o `http.server` nativo)  
- **Banco de Dados:** MySQL  

---

## 📋 Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- **Node.js** (que inclui o `npm`) → para rodar o frontend  
- **Python 3** → para rodar o backend  
- **Servidor MySQL** (como MySQL Workbench)

---

## 🚀 Como Rodar o Projeto

Você precisará de **três terminais abertos** para rodar o projeto:  
um para o **Banco de Dados**, um para o **Backend** e um para o **Frontend**.

---

### 1️⃣ Banco de Dados (MySQL)

1. Inicie o seu serviço de MySQL (pelo **MySQL Workbench**).  
2. Abra o seu gerenciador de banco de dados (**MySQL Workbench**).  
3. Execute o script [`banco_filmes.sql`](backend/banco_filmes.sql).  
   Isso irá criar o banco `banco_filmes` e popular as tabelas.

> ⚠️ **Importante:**  
> O backend (arquivo [`database.py`](backend/database.py)) está configurado para usar o usuário **root** e senha **root**.  
> Se a sua configuração for diferente, ajuste o arquivo `database.py`.

---

### 2️⃣ Backend (Python)

1. Abra um terminal e navegue até a pasta do **backend** (onde está o arquivo [`server.py`](backend/server.py)).  
2. Crie um ambiente virtual:

   ```bash
   python -m venv venv
   .\venv\Scripts\activate   
   ```
3. Instale as depêndencias
   ```bash
   pip install -r requirements.txt
   ```
4. Rode o projeto
   ```bash
   python server.py
   ```
5. MENSAGEM: Servidor API rodando em **http://localhost:8000**
---
### 3️⃣ Frontend (React)
1. Abra um novo terminal e navegue até a pasta do frontend
2. Instale as dependências
  ```bash
  npm install
  ```

3. Rode o projeto
   ```bash
   npm run dev
   ```
4. MENSAGEM: **http://localhost:5173/**
--- 
