import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = e => {
    setSearch(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    reset();
  };

  const reset = () => setSearch('');

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleFormSubmit}>
        <button className={css.searchFormButton} type="submit">
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
