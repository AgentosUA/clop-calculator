import React, { useEffect, useState } from 'react'
import styles from './preview.module.css'

const Preview = ({ totalPrice, usCart=[] }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.us_preview}>
        <h2>Закуп US Army</h2>
        <h4>Доступно очков: {100 - totalPrice}<br />Сумма: {totalPrice}</h4>
        <ul>
          {usCart.map((item) => {
            return <li key={item.className}>{item.quantity}x {item.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export { Preview };