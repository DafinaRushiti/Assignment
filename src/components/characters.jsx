import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { GET_CHARACTERS } from "../graphql/queries";
import Cards from "./cards";
import "./characters.css";

function Characters() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState({ status: "", species: "" });
  const [sort, setSort] = useState({ field: "", direction: "" });

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_CHARACTERS,
    {
      variables: { page, filter: { ...filters } },
    }
  );

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters((prev) =>
        page === 1
          ? data.characters.results
          : [...prev, ...data.characters.results]
      );
    }
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    refetch({ page: 1, filter: { ...filters } });
  }, [filters, refetch]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.characters?.info?.next) {
          setPage((prevPage) => prevPage + 1);
          fetchMore({
            variables: { page: page + 1, filter: { ...filters } },
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, data, fetchMore, page, filters]
  );

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split("|");
    setSort({ field, direction });
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    if (!sort.field) return 0;
    const valueA = sort.field === "origin" ? a.origin.name : a[sort.field];
    const valueB = sort.field === "origin" ? b.origin.name : b[sort.field];
    return sort.direction === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  if (error) {
    return (
      <p style={{ color: "red" }}>
        {t("error")}: {error.message}
      </p>
    );
  }

  return (
    <div>
      <div className="filters-container">
        <label>
          {t("filterByStatus")}:
          <select
            className="filter-status"
            name="status"
            onChange={handleFilterChange}
            value={filters.status}
          >
            <option value="">{t("all")}</option>
            <option value="Alive">{t("alive")}</option>
            <option value="Dead">{t("dead")}</option>
            <option value="unknown">{t("unknown")}</option>
          </select>
        </label>

        <label>
          {t("filterBySpecies")}:
          <input
            className="filter-species"
            name="species"
            value={filters.species}
            onChange={handleFilterChange}
            placeholder={t("placeholder")}
          />
        </label>

        <label>
          {t("sortBy")}:
          <select onChange={handleSortChange} className="filter-status">
            <option value="">{t("none")}</option>
            <option value="name|asc">{t("nameAsc")}</option>
            <option value="name|desc">{t("nameDesc")}</option>
            <option value="origin|asc">{t("originAsc")}</option>
            <option value="origin|desc">{t("originDesc")}</option>
          </select>
        </label>
      </div>

      <div className="cards-container">
        {sortedCharacters.map((character, index) => (
          <Cards
            key={character.id}
            character={character}
            innerRef={
              index === sortedCharacters.length - 1 ? lastElementRef : null
            }
          />
        ))}
      </div>
      {loading && <p>{t("loading")}</p>}
    </div>
  );
}

export default Characters;
