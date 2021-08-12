import React from 'react'
import styles from './sidebar.module.css'
import { Navigation } from '../navigation';
import { Preview, Filters } from '../../components';
const Sidebar = () => {
  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.sidebarContainer}>
        <div className={styles.cartWrapper}>
          <Filters />
        </div>
        <div className={styles.filterWrapper}>
          <Preview />
        </div>
      </div>
    </aside>
  )
}

export { Sidebar };