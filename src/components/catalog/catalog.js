import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Products } from '../../components/products/products';

import styles from './catalog.module.css';

import { addProduct, removeProduct } from '../../store/cart';

const Catalog = ({ army = 'us' }) => {
  const dispatch = useDispatch();
  const {
    catalog: { units, filters },
    cart,
  } = useSelector((state) => state);

  const onAddProduct = (product) => {
    dispatch(addProduct(product));
  };
  
  const onRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <section className={styles.catalog}>
      {filters.categories
        .filter((category) => category.isChecked)
        ?.map((category) => {
          return (
            <Products
              key={category.name}
              name={category.name}
              products={units[army].filter((product) => {
                return (
                  product.category === category.name &&
                  filters.params.minPrice <= product.price &&
                  filters.params.maxPrice >= product.price &&
                  (product.name
                    .toLowerCase()
                    .trim()
                    .includes(filters.params.search.toLowerCase().trim()) ||
                    product?.className
                      ?.toLowerCase()
                      .trim()
                      .includes(filters.params.search.toLowerCase().trim()))
                );
              })}
              total={cart[army].total}
              cart={cart}
              onAdd={onAddProduct}
              onRemove={onRemoveProduct}
              army={army}
            />
          );
        })}
    </section>
  );
};

export { Catalog };
