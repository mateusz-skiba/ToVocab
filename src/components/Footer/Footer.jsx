import React from "react";
import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span className={styles.rights}>2024 ToVocab</span>
                <a href="mailto:mateusz.skiba14@gmail.com" className={styles.contact}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.763" height="9.572" viewBox="0 0 12.763 9.572">
                        <path id="envelope-solid" d="M1.2,64a1.2,1.2,0,0,0-.717,2.154L5.9,70.222a.8.8,0,0,0,.957,0l5.424-4.068A1.2,1.2,0,0,0,11.565,64ZM0,66.792v5.185a1.6,1.6,0,0,0,1.6,1.6h9.572a1.6,1.6,0,0,0,1.6-1.6V66.792L7.338,70.86a1.593,1.593,0,0,1-1.913,0Z" transform="translate(0.001 -64)" fill="#fff" opacity="0.6"/>
                    </svg>
                    <span>Contact</span>
                </a>
            </div>
        </footer>
    )
}

export default Footer;