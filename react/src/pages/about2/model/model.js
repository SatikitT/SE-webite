import React from 'react';
import styles from './model.module.css';

const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show ? `${styles.model} ${styles.displayBlock}` : `${styles.model} ${styles.displayNone}`;

    return (
        <div className={showHideClassName}>
            {/* Background overlay */}
            <div className={styles.backgroundOverlay} onClick={handleClose}></div>

            {/* Modal content */}
            <section className={styles.modelMain}>
                {/* Close button in the top right corner */}
                <button className={styles.modelCloseTopRight} onClick={handleClose}>
                    &times;
                </button>

                {/* Container for image and info */}
                <div className={styles.modelContent}>
                    {/* Right section: Info */}
                    <div className={styles.modelInfo}>
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Modal;
