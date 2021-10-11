import React, { useState } from 'react';
import styles from './card.module.css';

import cardErrorImage from '../../assets/card-error.jpg';

const Card = ({
  id,
  img = '',
  name = 'Неизвестно',
  price,
  className = '"Неизвестно"',
  weapons = '-',
  ammo = '-',
  crewCount = '-',
  isCrew = false,
  comment = '-',
  onAdd,
  onRemove,
  addDisabled = false,
  removeDisabled = true,
}) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className={styles.card} key={id}>
      <div className={styles.interface}>
        <img src={isImageError ? cardErrorImage : img} alt='military vehicle' onError={() => setIsImageError(true)} />
        <div className={styles.price}>
          <span className={styles.red}>Цена:</span> {price}
        </div>
        <div className={styles.controls}>
          <button className={styles.add} disabled={addDisabled} onClick={onAdd}>
            Добавить
          </button>
          <button
            className={styles.remove}
            disabled={removeDisabled}
            onClick={onRemove}>
            Удалить
          </button>
        </div>
      </div>
      <div className={styles.description}>
        <h3>{name}</h3>
        <span>
          <a
            className={styles.config}
            href={`https://config.kaskad-arma.ru/vehicles.php?_=${className
              ?.replace('"', '')
              ?.replace('"', '')}`}
            target='_blank'
            rel='noopener noreferrer'>
            {className}
          </a>
        </span>
        <div className={styles.specs}>
          <p>
            <b>Вооружение:</b> {weapons}
          </p>
          <p>
            <b>БК:</b> {ammo || '-'}
          </p>
          <p>
            <b>Кол-во экипажа:</b> {crewCount || 'Нет инфы'}
          </p>
          <p>
            <b>Спец слот:</b> {isCrew ? 'Да' : 'Нет'}
          </p>
          <p>
            <b>Комментарий:</b> <br />
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Card };
