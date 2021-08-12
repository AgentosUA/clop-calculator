import React from 'react'
import styles from './card.module.css'

const Card = (
  { id,
    img = '',
    name = 'Неизвестно',
    price, className = '"Неизвестно"',
    weapons = '-',
    ammo = '-', crewCount = '-',
    isCrew = false,
    comment = '-',
    onAdd, onRemove,
    addDisabled = false,
    removeDisabled = true
  }) => {
  return (
    <div className={styles.card} key={id}>
      <div className={styles.interface}>
        <img src={img} alt='military vehicle' />
        <div className={styles.price}>
          <span className={styles.red}>Цена:</span> {price}
        </div>
        <div className={styles.controls}>
          <button className={styles.add} disabled={addDisabled} onClick={onAdd}>Добавить</button>
          <button className={styles.remove} disabled={removeDisabled} onClick={onRemove}>Удалить</button>
        </div>
      </div>
      <div className={styles.description}>
        <h3>{name}</h3>
        <span>{className}</span>
        <div className={styles.specs}>
          <p><b>Вооружение:</b> {weapons}</p>
          <p><b>БК:</b> {ammo || '-'}</p>
          <p><b>Кол-во экипажа:</b> {crewCount || 'Нет инфы'}</p>
          <p><b>Спец слот:</b> {isCrew ? 'Да' : 'Нет'}</p>
          <p><b>Комментарий:</b> <br />{comment}</p>
        </div>
      </div>
    </div>
  )
}

export { Card };