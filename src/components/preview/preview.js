import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { usePriceLimit } from '../../hooks';
import { addProduct, clearCart, removeProduct } from '../../store/cart';
import styles from './preview.module.css';

const Preview = ({ clopType = 'heavy' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const priceLimit = usePriceLimit(clopType);
  const { cart } = useSelector((state) => state);
  const [army, setArmy] = useState('us');

  const clipBoard = () => {
    const products = [...cart[army][clopType]?.products];
    return String(
      products?.map(
        (item, index) =>
          `${item.quantity}x ${item.name} (${item.price * item.quantity} points)${
            products?.length === index + 1 ? '' : '\n'
          }`
      ) + `\nВсего: ${cart[army][clopType]?.total} points`
    ).replaceAll(',', '');
  };

  const onAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const onRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const onClearCart = () => {
    dispatch(clearCart({ army, clopType }));
  };

  useEffect(() => {
    if (location.pathname === '/us' || location.pathname === '/us-light') {
      setArmy('us');
    }

    if (location.pathname === '/ru' || location.pathname === '/ru-light') {
      setArmy('ru');
    }
  }, [location.pathname, clopType]);

  return (
    <div className={styles.preview}>
      <div className={styles.us_preview}>
        <h2>Закуп {army?.toUpperCase()} {clopType?.toUpperCase()}</h2>
        <h4>
          Доступно очков: {priceLimit - (cart[army][clopType]?.total || 0)}
          <br />
          Сумма: {cart[army][clopType]?.total || 0}
        </h4>
        <ul>
          {cart[army][clopType]?.products
            .sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((item) => {
              return (
                <li key={item.name}>
                  <div className={styles.product}>
                    {item.quantity}x {item.name} ({item.quantity * item.price}{' '}
                    points)
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.add}
                      onClick={() =>
                        item.price + cart[army][clopType]?.total > priceLimit
                          ? null
                          : onAddProduct({
                              name: item.name,
                              price: item.price,
                              army,
                              clopType,
                            })
                      }
                      disabled={item.price + cart[army][clopType]?.total > priceLimit}>
                      +
                    </button>
                    <button
                      className={styles.remove}
                      onClick={() =>
                        onRemoveProduct({
                          name: item.name,
                          price: item.price,
                          army,
                          clopType,
                        })
                      }>
                      -
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
        {Boolean(cart[army][clopType]?.products?.length) && (
          <Fragment>
            <hr />
            <div className={styles.cartButtons}>
              <button
                className={styles.clipboard}
                onClick={() => navigator.clipboard.writeText(clipBoard())}>
                Копировать
              </button>
              <button
                className={styles.clearCart}
                onClick={() => onClearCart()}>
                Очистить
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export { Preview };
