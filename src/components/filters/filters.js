import React, { useState, useEffect } from 'react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '../../hooks'
import styles from './filters.module.css'

const Filters = () => {
  const [searchValue, setSearchValue] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const [isCar, setisCar] = useState(true);
  const [isTruckVehicle, setIsTruckVehicle] = useState(true);
  const [isLightVehicle, setIsLightVehicle] = useState(true);
  const [isHeavyVehicle, setIsHeavyVehicle] = useState(true);
  const [isAirVehicle, setIsAirVehicle] = useState(true);
  const [isExtra, setIsExtra] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, set_cart] = useLocalStorage('', []);
  const { categories } = useSelector((state) => state.catalog);

  useEffect(() => {
    setTotalPrice(cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  }, [cart])

  const onSearchValueChange = (value) => {
    setSearchValue(value);
  }

  const onMinPriceChange = (value) => {
    setMinPrice(value);
  }

  const onMaxPriceChange = (value) => {
    setMaxPrice(value);
  }

  const onAdd = (vehicle) => {
    if (!cart || !cart.length) {
      set_cart([{ ...vehicle, quantity: 1 }]);
      return;
    }

    const isExists = cart.find(item => {
      return item.name === vehicle.name
    })

    if (isExists) {
      isExists.quantity += 1;
      set_cart([...cart.filter(item => item.name !== isExists.name), isExists]);
      return;
    }

    vehicle.quantity = 1;
    set_cart([...cart, vehicle]);
  }

  const onRemove = (vehicle) => {
    if (!cart || !cart.length) return;

    const cartProduct = cart.find(item => item.name === vehicle.name);
    if (cartProduct.quantity < 2) {
      set_cart([...cart.filter(item => item.name !== cartProduct.name)]);
      return;
    }

    cartProduct.quantity -= 1;
    set_cart([...cart.filter(item => item.name !== cartProduct.name), cartProduct]);

  }

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <label htmlFor='search'>Поиск</label><br />
        <input name='search' type='text' placeholder='Название или класснейм' value={searchValue} onChange={(e) => onSearchValueChange(e.target.value)} />
      </div>
      <div className={styles.price}>
        <div>
          <label htmlFor='search'>Мин цена</label><br />
          <input type='number' min='0' max='100' step='1' value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} />
        </div>
        <div>
          <label htmlFor='search'>Макс цена</label><br />
          <input type='number' min='0' max='100' step='1' value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} />
        </div>
      </div>
      <div className={styles.unitsType}>
        {categories?.map((category) => {
          return (
            <Fragment>
              <input type='checkbox' checked="true" value="true" onChange={(e) => { }} />
              <label>{category}</label><br />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export { Filters };