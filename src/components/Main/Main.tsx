import { useState } from 'react'

import Loader from '../Loader/Loader.tsx';
import Hero from '../Hero/Hero.tsx';
import Worksheet from '../Worksheet/Worksheet.tsx';

import styles from './Main.module.scss';
  
type StyleLoaderState = {
    display: string;
    opacity: number;
};

function Main() {
    const [styleLoader, setStyleLoader] = useState<StyleLoaderState>({
        display: 'none',
        opacity: 0,
    });
      
    return (
        <main className={styles.main}>
            <Loader styleLoader={styleLoader} />
            <Hero setStyleLoader={setStyleLoader} />
            <Worksheet />
        </main>
    )
}

export default Main;