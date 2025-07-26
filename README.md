
# 🌱 Satore — A Mental Wellness Desktop App

Satore is a mindfulness-focused Electron desktop application powered by a React frontend and a Node.js backend. It includes personality-driven mentor guidance, voice support, and interactive features to promote self-reflection and growth.

---

## 🛠️ Getting Started

Follow the steps below to set up the project locally:

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/satore.git](https://github.com/aditya2125csit1033/murf-ai-challenge-satore.git)
cd murf-ai-challenge-satore
````

### 2. Install Dependencies (Root Project)

```bash
npm install
```

### 3. Install Backend Dependencies (Inside `/server`)

```bash
cd Server
npm install
```

### 4. Return to Root Directory

```bash
cd ..
```

### 5. Run the App

```bash
npm start
```

This will start:

* ✅ The Electron desktop window
* ✅ Your React frontend (served via Electron)
* ✅ The backend Node.js server

---

## 📂 Project Structure

```
murf-ai-challenge-satore/
├── Server/                # Node.js backend (Server.js, package.json)
│   └── package.json
├── frontend/              # React frontend (optional if prebuilt)
│   └── build/
├── main.js                # Electron main process (starts backend + UI)
├── package.json           # Root dependencies (Electron, React, etc.)
└── README.md              # You're here 🌱
```

---

## 🤍 Contributions

Feel free to fork and enhance it. Open an issue if you'd like to suggest improvements or new features.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

```
