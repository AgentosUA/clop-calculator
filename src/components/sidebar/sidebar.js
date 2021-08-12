import React from 'react'
import styles from './sidebar.module.css'
import { Navigation } from '../navigation';
import { Preview } from '../preview';
const Sidebar = () => {
  return (
    <aside className={styles.sidebarWrapper}>
      <div className={styles.cartWrapper}>
        <Preview />
        фыв
      </div>
      <div className={styles.filterWrapper}>
        <Preview />
      </div>
    </aside>
  )
}

export { Sidebar };