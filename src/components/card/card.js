import React, { useState } from 'react';
import styles from './card.module.css';

import weaponIcon from '../../assets/icons/weapon.png';
import ammoIcon from '../../assets/icons/ammo.png';
import crewCountIcon from '../../assets/icons/military-boots.png';
import crewIcon from '../../assets/icons/crew.png';
import descriptionIcon from '../../assets/icons/description.png';
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
          <div className={styles.spec}>
            <img src={weaponIcon} className={styles.icon} alt="icon" />
            {weapons || 'Нет'}
          </div>
          <div className={styles.spec}>
            <img src={ammoIcon} className={styles.icon} alt="icon" />
            {ammo || 'Нет'}
          </div>
          <div className={styles.spec}>
            <img src={crewIcon} className={styles.icon} alt="icon" />
            {isCrew ? 'Да' : 'Нет'}
          </div>
          <div className={styles.spec}>
            <img src={crewCountIcon} className={styles.icon} alt="icon" />
            {crewCount || 'Неизвестно'}
          </div>
          <div className={styles.spec}>
            {comment && <img src={descriptionIcon} className={styles.icon} alt="icon" />}
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
