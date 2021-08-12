import React, { useEffect, useState } from 'react'
import { Preview } from '../../components'
import { Products } from '../../components/products/products'

import { useLocalStorage } from '../../hooks'
import styles from './catalog.module.css'

const Catalog = ({carJSON, truckJSON, lightJSON, heavyJSON, airJSON, extraJSON, cartName, army}) => {
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
  const [cart, set_cart] = useLocalStorage(cartName, [])
  
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
      {/*<Preview army={army} totalPrice={totalPrice} cart={cart} onAdd={onAdd} onRemove={onRemove} />*/}
      <Products
        name='Автомобили'
        filter={filter}
        isVisible={isCar}
        products={carJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
      <Products
        name='Грузовики'
        filter={filter}
        isVisible={isTruckVehicle}
        products={truckJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
      <Products
        name='Легкая техника'
        filter={filter}
        isVisible={isLightVehicle}
        products={lightJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
      <Products
        name='Тяжёлая техника'
        filter={filter}
        isVisible={isHeavyVehicle}
        products={heavyJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
      <Products
        name='Авиация'
        filter={filter}
        isVisible={isAirVehicle}
        products={airJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
      <Products
        name='Доп. вооружение'
        filter={filter}
        isVisible={isExtra}
        products={extraJSON}
        totalPrice={totalPrice}
        onAdd={onAdd}
        onRemove={onRemove}
        cart={cart}
      />
    </section>
  )
}

export { Catalog };