import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Products } from '../../components/products/products';
import { useClopType, usePriceLimit } from '../../hooks';
import styles from './catalog.module.css';

import { addProduct, removeProduct } from '../../store/cart';

const Catalog = ({ army = 'us'}) => {
  const clopType = useClopType();
  const priceLimit = usePriceLimit(clopType);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [clopType]);

  return (
    <section className={styles.catalog}>
      <h2 className={styles.catalogInfo}>{army?.toUpperCase()} | {clopType?.toUpperCase()}</h2>
      {filters.categories
        ?.filter((category) => category.isChecked)
        ?.map((category) => {
          return (
            <Products
              key={category.name}
              name={category.name}
              clopType={clopType}
              products={units[army][clopType]?.filter((product) => {
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
              total={cart[army][clopType]?.total}
              priceLimit={priceLimit}
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
