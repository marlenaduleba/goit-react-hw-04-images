import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onCloseModal]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleCloseModal}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
