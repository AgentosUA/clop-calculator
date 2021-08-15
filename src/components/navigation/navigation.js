import React from 'react'
import styles from './navigation.module.css'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link to='/'>Главная</Link>
      <Link to='/us'>US Army</Link>
      <Link to='/ru'>ВС РФ</Link>
      {/* <Link to='/cart'>Корзина</Link> */}
    </nav>
  )
}

export { Navigation };