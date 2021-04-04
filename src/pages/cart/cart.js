import React, { useEffect, useState } from 'react'
import { Preview } from '../../components'
import { useLocalStorage } from '../../hooks'
import styles from './cart.module.css'

const Cart = () => {
  const [UStotalPrice, setUSTotalPrice] = useState(0);
  const [RUtotalPrice, setRUTotalPrice] = useState(0);
  const [us_cart, set_us_cart] = useLocalStorage('us_cart', [])
  const [ru_cart, set_ru_cart] = useLocalStorage('ru_cart', [])

  useEffect(() => {
    setUSTotalPrice(us_cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  }, [us_cart])

  useEffect(() => {
    setRUTotalPrice(ru_cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  }, [ru_cart])


  // US ARMY

  const onUSAdd = (vehicle) => {
    if (!us_cart || !us_cart.length) {
      set_us_cart([{ ...vehicle, quantity: 1 }]);
      return;
    }

    const isExists = us_cart.find(item => {
      return item.name === vehicle.name
    })

    if (isExists) {
      isExists.quantity += 1;
      set_us_cart([...us_cart.filter(item => item.name !== isExists.name), isExists]);
      return;
    }

    vehicle.quantity = 1;
    set_us_cart([...us_cart, vehicle]);
  }

  const onUSRemove = (vehicle) => {
    if (!us_cart || !us_cart.length) return;

    const cartProduct = us_cart.find(item => item.name === vehicle.name);
    if (cartProduct.quantity < 2) {
      set_us_cart([...us_cart.filter(item => item.name !== cartProduct.name)]);
      return;
    }

    cartProduct.quantity -= 1;
    set_us_cart([...us_cart.filter(item => item.name !== cartProduct.name), cartProduct]);

  }

  // RU ARMY

  const onRUAdd = (vehicle) => {
    if (!ru_cart || !ru_cart.length) {
      set_ru_cart([{ ...vehicle, quantity: 1 }]);
      return;
    }

    const isExists = ru_cart.find(item => {
      return item.name === vehicle.name
    })

    if (isExists) {
      isExists.quantity += 1;
      set_ru_cart([...ru_cart.filter(item => item.name !== isExists.name), isExists]);
      return;
    }

    vehicle.quantity = 1;
    set_ru_cart([...ru_cart, vehicle]);
  }

  const onRURemove = (vehicle) => {
    if (!ru_cart || !ru_cart.length) return;

    const cartProduct = ru_cart.find(item => item.name === vehicle.name);
    if (cartProduct.quantity < 2) {
      set_ru_cart([...ru_cart.filter(item => item.name !== cartProduct.name)]);
      return;
    }

    cartProduct.quantity -= 1;
    set_ru_cart([...ru_cart.filter(item => item.name !== cartProduct.name), cartProduct]);
  }

  return (
    <section className={styles.cart}>
      <Preview army='US Army' totalPrice={UStotalPrice} cart={us_cart} onAdd={onUSAdd} onRemove={onUSRemove} />
      <Preview army='ВС РФ' totalPrice={RUtotalPrice} cart={ru_cart} onAdd={onRUAdd} onRemove={onRURemove} />
    </section>
  )
}

export { Cart };