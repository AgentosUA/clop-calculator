import React from 'react'
import styles from './preview.module.css'

const Preview = ({ totalPrice, usCart = [], onAdd, onRemove }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.us_preview}>
        <h2>Закуп US Army</h2>
        <h4>Доступно очков: {100 - totalPrice}<br />Сумма: {totalPrice}</h4>
        <ul>
          {usCart.map((item) => {
            return (
              <li key={item.className}>
                {item.quantity}x {item.name}
                <button className={styles.add} onClick={() => onAdd(item)} disabled={item.price + totalPrice > 100}>+</button>
                <button className={styles.remove} onClick={() => onRemove(item)}>-</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export { Preview };