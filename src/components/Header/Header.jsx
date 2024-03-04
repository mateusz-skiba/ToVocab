import React from "react";
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <span className={styles.logo}>ToVocab</span>
            </div>
        </header>
    )
}

export default Header;