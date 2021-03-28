import React from 'react'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CLOP Calculator</h1>
      <div>
        <span className={styles.subtitle}>Собирай свою армию для Classified Operations</span><br />
        Специально для <span className={styles.about}>armaproject.ru</span>
      </div>
    </header>
  )
}

export { Header };