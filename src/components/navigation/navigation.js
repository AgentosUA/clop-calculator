import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to='/'>Главная</Link>
      <div className={styles.link}>
        <div className={styles.linkTitle}>US Army</div>
        <div className={styles.innerLinks}>
          <Link className={styles.innerLink} to='/us'>Heavy</Link>
          <Link className={styles.innerLink} to='/us-light'>Light</Link>
        </div>
      </div>
      <div className={styles.link}>
        <div className={styles.linkTitle}>ВС РФ</div>
        <div className={styles.innerLinks}>
          <Link className={styles.innerLink} to='/ru'>Heavy</Link>
          <Link className={styles.innerLink} to='/ru-light'>Light</Link>
        </div>
      </div>
      {/* <Link to='/cart'>Корзина</Link> */}
    </nav>
  )
}

export { Navigation };