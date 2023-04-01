import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';


export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.reset();
  };

  reset = () => {
    this.setState({
        search: '',
    });
};

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
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
            onChange={this.handleInputChange}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}