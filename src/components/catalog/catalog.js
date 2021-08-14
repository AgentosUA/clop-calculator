import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Preview } from '../../components'
import { Products } from '../../components/products/products'

import { useLocalStorage } from '../../hooks'
import styles from './catalog.module.css'

const Catalog = ({ army = 'us' }) => {
  const dispatch = useDispatch();
  const { units, categories, filters } = useSelector(state => state.catalog);
  // const [searchValue, setSearchValue] = useState('');
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(100);



  // const [totalPrice, setTotalPrice] = useState(0);
  // const [cart, set_cart] = useLocalStorage(cartName, [])

  // useEffect(() => {
  //   setTotalPrice(cart.reduce((count = 0, item) => count + (item.price * item.quantity), 0));
  // }, [cart])

  // const onSearchValueChange = (value) => {
  //   setSearchValue(value);
  // }

  // const onMinPriceChange = (value) => {
  //   setMinPrice(value);
  // }

  // const onMaxPriceChange = (value) => {
  //   setMaxPrice(value);
  // }

  // const onAdd = (vehicle) => {
  //   if (!cart || !cart.length) {
  //     set_cart([{ ...vehicle, quantity: 1 }]);
  //     return;
  //   }

  //   const isExists = cart.find(item => {
  //     return item.name === vehicle.name
  //   })

  //   if (isExists) {
  //     isExists.quantity += 1;
  //     set_cart([...cart.filter(item => item.name !== isExists.name), isExists]);
  //     return;
  //   }

  //   vehicle.quantity = 1;
  //   set_cart([...cart, vehicle]);
  // }

  // const onRemove = (vehicle) => {
  //   if (!cart || !cart.length) return;

  //   const cartProduct = cart.find(item => item.name === vehicle.name);
  //   if (cartProduct.quantity < 2) {
  //     set_cart([...cart.filter(item => item.name !== cartProduct.name)]);
  //     return;
  //   }

  //   cartProduct.quantity -= 1;
  //   set_cart([...cart.filter(item => item.name !== cartProduct.name), cartProduct]);

  // }

  // const filter = (vehicles) => {
  //   return vehicles.filter((vehicle) => {
  //     return (
  //       vehicle.price >= minPrice
  //       && vehicle.price <= maxPrice
  //       && (
  //         searchValue ?
  //           vehicle.name.toLowerCase().trim().replace('(', '').replace(')', '').includes(searchValue.toLowerCase().trim().replace('(', '').replace(')', ''))
  //           : true
  //       )
  //     )
  //   })
  // };

  return (
    <section className={styles.catalog}>
      {/*<Preview army={army} totalPrice={totalPrice} cart={cart} onAdd={onAdd} onRemove={onRemove} />*/}
      {
        filters.categories.filter(category => category.isChecked)
        ?.map((category) => {
          return (
            <Products
              name={category.name}
              isVisible={true}
              products={
                units[army].filter((product) => {
                  return (
                    product.category === category.name
                    && filters.params.minPrice <= product.price
                    && filters.params.maxPrice >= product.price
                    && (
                      product.name.toLowerCase().trim().includes(filters.params.search.toLowerCase().trim())
                      || product?.className?.toLowerCase().trim().includes(filters.params.search.toLowerCase().trim())
                      )
                    // && filters.params.search ? .params.maxPrice >= product.price
                  )
                })
              }
              totalPrice={100}
              onAdd={(onAdd) => { }}
              onRemove={() => { }}
              cart={false}
            />
          )
        })
      }

    </section>
  )
}

export { Catalog };