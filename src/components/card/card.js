import React from 'react'
import styles from './card.module.css'

const Card = ({ id, name = 'Неизвестно', price, className='"Неизвестно"', weapons='-', ammo='-', crewCount='-', isCrew='-', comment='-', onAdd, onRemove}) => {
  return (
    <div className={styles.card} key={id}>
      <div className={styles.interface}>
        <img src='https://static.wikia.nocookie.net/armedassault/images/3/3a/OFP-render-uazolive.png/revision/latest?cb=20200121070138' alt='military vehicle' />
        <div className={styles.price}>
          <span className={styles.red}>Цена:</span> {price}
        </div>
        <div className={styles.controls}>
          <button className={styles.add} onClick={onAdd}>Добавить</button>
          <button className={styles.remove} onClick={onRemove}>Удалить</button>
        </div>
      </div>
      <div className={styles.description}>
        <h3>{name}</h3>
        <span>{className}</span>
        <div className={styles.specs}>
          <p><b>Вооружение:</b> {weapons}</p>
          <p><b>БК:</b> {ammo}</p>
          <p><b>Экипаж:</b> {crewCount}</p>
          <p><b>Спец:</b> {isCrew}</p>
          <p><b>Комментарий:</b> <br />{comment}</p>
        </div>
      </div>
    </div>
  )
}

export { Card };