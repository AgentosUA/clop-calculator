import React from 'react'
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p><b>App by</b> <span className={styles.names}>Agentos & HoLo_D</span><br />
      <b>Idea, host and support by</b> <span className={styles.names}>XDred</span><br />
      <b>Vehicle screenshots by</b> <span className={styles.names}>Dagon, Darude, HoLo_D</span><br />
      </p>
    </footer>
  )
}

export { Footer };