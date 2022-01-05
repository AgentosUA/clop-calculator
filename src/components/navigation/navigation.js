import React from 'react'
import { Link } from 'react-router-dom'
import { useMedia, useHover } from 'react-use';
import styles from './navigation.module.css'

const Navigation = () => {
  const isMobile = useMedia('(max-width: 780px)');
  const usLinkElement = (hovered) => {
    return (
      <div className={styles.link}>
        {!hovered && <div className={styles.linkTitle}>US Army</div>}
        <div className={styles.innerLinks}>
          <Link className={styles.innerLink} to='/us'>Heavy</Link>
          <Link className={styles.innerLink} to='/us-light'>Light</Link>
        </div>
      </div>
    );
  };

  const ruLinkElement = (hovered) => {
    return (
      <div className={styles.link}>
        {!hovered && <div className={styles.linkTitle}>ВС РФ</div>}
        <div className={styles.innerLinks}>
          <Link className={styles.innerLink} to='/ru'>Heavy</Link>
          <Link className={styles.innerLink} to='/ru-light'>Light</Link>
        </div>
      </div>
    );
  };

  const [usLink] = useHover(usLinkElement);
  const [ruLink] = useHover(ruLinkElement);

  if (isMobile) {
    return (
      <nav className={styles.navigation}>
        <Link className={styles.link} to='/'>Главная</Link>
        <div className={styles.inlineLinks}>
          <Link className={styles.link} to='/us'>US Heavy</Link>
          <Link className={styles.link} to='/us-light'>US Light</Link>
        </div>
        <div className={styles.inlineLinks}>
          <Link className={styles.link} to='/ru'>RU Heavy</Link>
          <Link className={styles.link} to='/ru-light'>RU Light</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to='/'>Главная</Link>
      {usLink}
      {ruLink}
    </nav>
  )
}

export { Navigation };