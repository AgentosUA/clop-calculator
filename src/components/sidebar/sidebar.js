import React from 'react'
import styles from './sidebar.module.css'
import { Navigation } from '../navigation';
import { Preview, Filters } from '../../components';
const Sidebar = () => {
  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.sidebarContainer}>
        <div className={styles.filterWrapper}>
          <Filters />
        </div>
        <div className={styles.cartWrapper}>
          <Preview />
        </div>
        </div>
    </aside>
  )
}

export { Sidebar };