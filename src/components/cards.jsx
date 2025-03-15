import React from "react";
import { useTranslation } from "react-i18next";
import "./cards.css";

function Cards({ character, innerRef }) {
  const { t } = useTranslation();
  return (
    <div className="card" ref={innerRef}>
      <img
        className="card__image"
        src={character.image}
        alt={character.name}
      />
      <p className="card__title">{character.name}</p>
      <div className="card__content">
        <p className="card__title">{character.name}</p>
        <div className="card__description">
          <p>
            <strong>{t("status")}</strong>: {t(character.status.toLowerCase())}
          </p>
          <p>
            <strong>{t("species")}</strong>:{" "}
            {t(character.species.toLowerCase())}
          </p>
          <p>
            <strong>{t("gender")}</strong>: {t(character.gender.toLowerCase())}
          </p>
          <p>
            <strong>{t("origin")}</strong>: {character.origin.name.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
