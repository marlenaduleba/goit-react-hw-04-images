import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscape);
};

componentWillUnmount() {
  window.removeEventListener("keydown", this.handleEscape);
};

handleEscape = e => {
  if (e.code === "Escape") {
    this.props.onCloseModal();
  }
};

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleCloseModal}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}
