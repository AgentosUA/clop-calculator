import React from 'react'
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>App by Agentos<br />
      Idea and support by XDred<br />
      Vehicle screenshots by Dagon, Darude, HoLo_D<br />
      </p>
    </footer>
  )
}

export { Footer };