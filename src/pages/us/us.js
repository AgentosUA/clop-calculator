import React, { useState } from 'react'
import { Card } from '../../components'

import lightVehiclesJSON from '../../data/us/us_light.json'
import styles from './us.module.css'

const Us = () => {
  const [searchValue, setSearchValue] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [isLightVehicle, setIsLightVehicle] = useState(true);

  const onSearchValueChange = (value) => {
    setSearchValue(value);
  }

  const onMinPriceChange = (value) => {
    setMinPrice(value);
  }

  const onMaxPriceChange = (value) => {
    setMaxPrice(value);
  }

  const lightVehicles = lightVehiclesJSON.filter((vehicle) => {
    return (
      vehicle.price >= minPrice
      && vehicle.price <= maxPrice
      && (
        searchValue ?
          vehicle.name.toLowerCase().trim().replace('(', '').replace(')', '').includes(searchValue.toLowerCase().trim().replace('(', '').replace(')', ''))
          : true
      )
    )
  });

  return (
    <section className={styles.us}>
      <div className={styles.filters}>
        <div className={styles.search}>
          <label htmlFor='search'>Поиск</label><br />
          <input name='search' type='text' placeholder='Поиск по названию' value={searchValue} onChange={(e) => onSearchValueChange(e.target.value)} />
        </div>
        <div className={styles.parameters}>
          <div>
            <label htmlFor='search'>Мин цена</label><br />
            <input type='number' min='0' max='100' step='1' value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} />
          </div>
          <div>
            <label htmlFor='search'>Макс цена</label><br />
            <input type='number' min='0' max='100' step='1' value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} />
          </div>
          <div>
            <label htmlFor='isLightVehicle'>Легкая техника</label><br />
            <input type='checkbox' checked={isLightVehicle} value={isLightVehicle} onChange={(e) => setIsLightVehicle(!isLightVehicle)} />
          </div>
        </div>
      </div>
      {isLightVehicle && <h3>Легкая техника</h3>}
      {isLightVehicle && <div className={styles.products}>
        {lightVehicles.map((vehicle) => {
          return (
            <Card
              key={vehicle.name}
              name={vehicle.name}
              className={vehicle.className}
              price={vehicle.price}
              weapons={vehicle.weapon}
              ammo={vehicle.ammo}
              crewCount={vehicle.crewCount}
              comment={vehicle.comment}
            />

          )
        })}
      </div>}
    </section>
  )
}

export { Us };