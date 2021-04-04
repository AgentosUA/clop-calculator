import React, { useEffect, useState } from 'react'
import { Preview } from '../../components'
import { Products } from '../../components/products/products'

import carJSON from '../../data/ru/ru_car.json';
import truckJSON from '../../data/ru/ru_truck.json';
import lightJSON from '../../data/ru/ru_light_armor.json';
import heavyJSON from '../../data/ru/ru_heavy_armor.json';
import airJSON from '../../data/ru/ru_air.json';
import extraJSON from '../../data/ru/ru_extra.json';

import { useLocalStorage } from '../../hooks'
import styles from './ru.module.css'

const Ru = () => {
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
  const [ru_cart, set_ru_cart] = useLocalStorage('ru_cart', [])
  
  useEffect(() => {
    setTotalPrice(ru_cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  }, [ru_cart])

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
    if (!ru_cart || !ru_cart.length) {
      set_ru_cart([{ ...vehicle, quantity: 1 }]);
      return;
    }

    const isExists = ru_cart.find(item => {
      return item.className === vehicle.className
    })

    if (isExists) {
      isExists.quantity += 1;
      set_ru_cart([...ru_cart.filter(item => item.className !== isExists.className), isExists]);
      return;
    }

    vehicle.quantity = 1;
    set_ru_cart([...ru_cart, vehicle]);
  }

  const onRemove = (vehicle) => {
    if (!ru_cart || !ru_cart.length) return;

    const cartProduct = ru_cart.find(item => item.className === vehicle.className);
    if (cartProduct.quantity < 2) {
      set_ru_cart([...ru_cart.filter(item => item.className !== cartProduct.className)]);
      return;
    }

    cartProduct.quantity -= 1;
    set_ru_cart([...ru_cart.filter(item => item.className !== cartProduct.className), cartProduct]);
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
    <section className={styles.ru}>
      <Preview army='ВС РФ' totalPrice={totalPrice} cart={ru_cart} onAdd={onAdd} onRemove={onRemove} />
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
          <label htmlFor='isLightVehicle'>Авиация</label><br />

          <input type='checkbox' checked={isExtra} value={isExtra} onChange={(e) => setIsExtra(!isExtra)} />
          <label htmlFor='isExtra'>Доп. вооружение</label>
          
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
        cart={ru_cart}
      />
      <Products
        name='Грузовики'
        filter={filter}
        isVisible={isTruckVehicle}
        products={truckJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={ru_cart}
      />
      <Products
        name='Легкая техника'
        filter={filter}
        isVisible={isLightVehicle}
        products={lightJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={ru_cart}
      />
      <Products
        name='Тяжёлая техника'
        filter={filter}
        isVisible={isHeavyVehicle}
        products={heavyJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={ru_cart}
      />
      <Products
        name='Авиация'
        filter={filter}
        isVisible={isAirVehicle}
        products={airJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={ru_cart}
      />
      <Products
        name='Доп. вооружение'
        filter={filter}
        isVisible={isExtra}
        products={extraJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={ru_cart}
      />
    </section>
  )
}

export { Ru };