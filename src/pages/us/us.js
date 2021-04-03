import React, { useEffect, useState } from 'react'
import { Card, Preview } from '../../components'
import { Products } from '../../components/products/products'

import carJSON from '../../data/us/us_car.json';
import truckJSON from '../../data/us/us_truck.json';
import lightJSON from '../../data/us/us_light_armor.json';
import heavyJSON from '../../data/us/us_heavy_armor.json';
import airJSON from '../../data/us/us_air.json';

import { useLocalStorage } from '../../hooks'
import styles from './us.module.css'

const Us = () => {
  const [searchValue, setSearchValue] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const [isCar, setisCar] = useState(true);
  const [isTruckVehicle, setIsTruckVehicle] = useState(true);
  const [isLightVehicle, setIsLightVehicle] = useState(true);
  const [isHeavyVehicle, setIsHeavyVehicle] = useState(true);
  const [isAirVehicle, setIsAirVehicle] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);
  const [us_cart, set_us_cart] = useLocalStorage('us_cart', [])
  
  useEffect(() => {
    setTotalPrice(us_cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  }, [us_cart])

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
    if (!us_cart || !us_cart.length) {
      set_us_cart([{ ...vehicle, quantity: 1 }]);
      return;
    }

    const isExists = us_cart.find(item => {
      return item.className === vehicle.className
    })

    if (isExists) {
      isExists.quantity += 1;
      set_us_cart([...us_cart.filter(item => item.className !== isExists.className), isExists]);
      return;
    }

    vehicle.quantity = 1;
    set_us_cart([...us_cart, vehicle]);
  }

  const onRemove = (vehicle) => {
    if (!us_cart || !us_cart.length) return;

    const cartProduct = us_cart.find(item => item.className === vehicle.className);
    if (cartProduct.quantity < 2) {
      set_us_cart([...us_cart.filter(item => item.className !== cartProduct.className)]);
      return;
    }

    cartProduct.quantity -= 1;
    set_us_cart([...us_cart.filter(item => item.className !== cartProduct.className), cartProduct]);

  }

  const filter = (vehicles) => {
    return vehicles.filter((vehicle) => {
      return (
        vehicle.price >= minPrice
        && vehicle.price <= maxPrice
        && (
          searchValue ?
            vehicle.name.toLowerCase().trim().replace('(', '').replace(')', '').includes(searchValue.toLowerCase().trim().replace('(', '').replace(')', ''))
            : true
        )
      )
    })
  };

  return (
    <section className={styles.us}>
      <Preview totalPrice={totalPrice} usCart={us_cart} onAdd={onAdd} onRemove={onRemove} />
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
        </div>
        <div className={styles.unitsType}>
        <input type='checkbox' checked={isCar} value={isCar} onChange={(e) => setisCar(!isCar)} />
          <label htmlFor='isLightVehicle'>Автомобили</label><br />
          
          <input type='checkbox' checked={isTruckVehicle} value={isTruckVehicle} onChange={(e) => setIsTruckVehicle(!isTruckVehicle)} />
          <label htmlFor='isTruckVehicle'>Грузовики</label><br />

          <input type='checkbox' checked={isLightVehicle} value={isLightVehicle} onChange={(e) => setIsLightVehicle(!isLightVehicle)} />
          <label htmlFor='isLightVehicle'>Легкая техника</label><br />

          <input type='checkbox' checked={isHeavyVehicle} value={isHeavyVehicle} onChange={(e) => setIsHeavyVehicle(!isHeavyVehicle)} />
          <label htmlFor='isHeavyVehicle'>Тяжёлая техника</label><br />
          

          <input type='checkbox' checked={isAirVehicle} value={isAirVehicle} onChange={(e) => setIsAirVehicle(!isAirVehicle)} />
          <label htmlFor='isLightVehicle'>Авиация</label>
          
        </div>
      </div>
      <Products
        name='Автомобили'
        filter={filter}
        isVisible={isCar}
        products={carJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={us_cart}
      />
      <Products
        name='Грузовики'
        filter={filter}
        isVisible={isTruckVehicle}
        products={truckJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={us_cart}
      />
      <Products
        name='Легкая техника'
        filter={filter}
        isVisible={isLightVehicle}
        products={lightJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={us_cart}
      />
      <Products
        name='Тяжёлая техника'
        filter={filter}
        isVisible={isHeavyVehicle}
        products={heavyJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={us_cart}
      />
      <Products
        name='Авиация'
        filter={filter}
        isVisible={isAirVehicle}
        products={airJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={us_cart}
      />
    </section>
  )
}

export { Us };