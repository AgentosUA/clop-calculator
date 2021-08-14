import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Products } from '../../components/products/products'

import styles from './catalog.module.css'

import { addProduct } from '../../store/cart';

const Catalog = ({ army = 'us' }) => {
  const dispatch = useDispatch();
  const { 
    catalog: { units, filters},
    cart
  } = useSelector(state => state);

  const onAddProduct = (product) => {
    dispatch(addProduct(product))
  }

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
                  )
                })
              }
              totalPrice={cart[army].totalPrice}
              onAdd={onAddProduct}
              onRemove={() => { }}
              army={army}
            />
          )
        })
      }

    </section>
  )
}

export { Catalog };