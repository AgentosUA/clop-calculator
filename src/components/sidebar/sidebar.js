import React from 'react'
import styles from './sidebar.module.css'
import { Preview, Filters } from '../../components';
import { useClopType } from '../../hooks';
const Sidebar = () => {
  const clopType = useClopType();

  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.sidebarContainer}>
        <div className={styles.filterWrapper}>
          <Filters clopType={clopType} />
        </div>
        <div className={styles.cartWrapper}>
          <Preview clopType={clopType} />
        </div>
        </div>
    </aside>
  )
}

export { Sidebar };