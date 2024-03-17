import styles from './Loader.module.scss';

type LoaderState = {
  styleLoader: {
    display: string;
    opacity: number;
  }
};

function Loader({ styleLoader }: LoaderState) {
    return (
        <div id="loader" className={styles.loader} style={styleLoader} role='alert' aria-label='Generating exercises'>
          <div className={styles.loadIcon} aria-hidden></div>
        </div>
    )
}

export default Loader;