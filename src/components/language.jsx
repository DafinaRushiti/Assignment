import React from 'react';
import { useTranslation } from 'react-i18next';

function Language({ language, setLanguage }) {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <footer>
      <label>
        {t("language")}:
        <select
          value={language}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem' }}
          className="filter-status"
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="sq">Shqip</option>
        </select>
      </label>
    </footer>
  );
}

export default Language;
