import React, { useState } from "react";
import CharactersPages from "./pages/characterspages";
import Language from "./components/language";
import "./App.css";
import "./i18n";

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="app-container">
      <header>
        <h1 style={{ textAlign: "center" }}>Rick and Morty</h1>
      </header>
      <main className="main-content">
        <CharactersPages />
      </main>
      <Language language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;
