import React from 'react'
import styles from './preview.module.css'

const Preview = ({ totalPrice, cart = [], onAdd, onRemove, army }) => {
  const clipBoard = () => {
    return String(cart.map(item => `${item.quantity}x ${item.name}\n`)).replace('[', '').replace(']','').replace(',','');
  }

  return (
    <div className={styles.preview}>
      <div className={styles.us_preview}>
        <h2>Закуп {army}</h2>
        <h4>Доступно очков: {100 - totalPrice}<br />Сумма: {totalPrice}</h4>
        <ul>
          {cart.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          }).map((item) => {
            return (
              <li key={item.name}>
                <div>
                  {item.quantity}x {item.name} ({item.quantity * item.price} очков)
                </div>
                <div>
                  <button className={styles.add} onClick={() => item.price + totalPrice > 100 ? null : onAdd(item)} disabled={item.price + totalPrice > 100}>+</button>
                  <button className={styles.remove} onClick={() => onRemove(item)}>-</button>
                </div>
              </li>
            )
          })}
        </ul>
        <button className={styles.clipboard} onClick={() => navigator.clipboard.writeText(clipBoard())}>Скопировать в буфер обмена</button>
      </div>
    </div>
  )
}

export { Preview };