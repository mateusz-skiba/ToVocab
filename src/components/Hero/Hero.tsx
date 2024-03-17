import { useState, useEffect } from 'react';

import Title from './Title/Title.tsx';
import AddWord from './AddWord/AddWord.tsx';
import WordList from './WordList/WordList.tsx';
import GenerateButton from './GenerateButton/GenerateButton.tsx';
import styles from './Hero.module.scss';

type HeroProps = {
  setStyleLoader: {};
}

type StyleHeroState = {}

function Hero({ setStyleLoader }: HeroProps) {
    const [styleHero, setStyleHero] = useState<StyleHeroState>({
      opacity: 0,
      transform: 'translateY(200px)',
      transition: '0.9s',
      display: 'block',
    });
  
    useEffect(() => {
      setTimeout(() => setStyleHero(prev => ({ ...prev, opacity: 0 })), 150);
      setTimeout(() => setStyleHero(prev => ({ ...prev, transform: 'translateY(0px)', opacity: 1 })), 300);
    }, []);
  
    return (
      <>
        <section className={styles.hero} style={styleHero}>
          <div className={styles.container}>
            <Title />
            <AddWord />
            <WordList />
            <GenerateButton setStyleLoader={setStyleLoader} setStyleHero={setStyleHero} />
          </div>
        </section>
      </>
    )
}

export default Hero;