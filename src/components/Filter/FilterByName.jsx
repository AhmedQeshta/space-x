import React from 'react';
import PropTypes from 'prop-types';

import './filterByName.css';

export default function FilterByName({ search, updateSearch }) {
  return (
    <div className="form__input__filter">
      <input
        type="search"
        value={search}
        onChange={updateSearch}
        name="name"
        id="name"
        placeholder="Search by name..."
      />
    </div>
  );
}

FilterByName.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};
