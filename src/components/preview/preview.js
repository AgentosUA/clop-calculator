import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addProduct, clearCart, removeProduct } from '../../store/cart';
import styles from './preview.module.css';

const Preview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cart } = useSelector((state) => state);
  const [army, setArmy] = useState('');

  const clipBoard = () => {
    const products = [...cart[army]?.products];
    return String(
      products?.map(
        (item, index) =>
          `${item.quantity}x ${item.name} (${item.price * item.quantity} points)${
            products.length === index + 1 ? '' : '\n'
          }`
      )
    ).replaceAll(',', '');
  };

  const onAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const onRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const onClearCart = () => {
    dispatch(clearCart(army));
  };

  useEffect(() => {
    if (location.pathname === '/us') {
      setArmy('us');
    }

    if (location.pathname === '/ru') {
      setArmy('ru');
    }
  }, [location]);

  return (
    <div className={styles.preview}>
      <div className={styles.us_preview}>
        <h2>Закуп {army.toUpperCase()}</h2>
        <h4>
          Доступно очков: {100 - cart[army]?.total}
          <br />
          Сумма: {cart[army]?.total}
        </h4>
        <ul>
          {cart[army]?.products
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
                        item.price + cart[army]?.total > 100
                          ? null
                          : onAddProduct({
                              name: item.name,
                              price: item.price,
                              army,
                            })
                      }
                      disabled={item.price + cart[army]?.total > 100}>
                      +
                    </button>
                    <button
                      className={styles.remove}
                      onClick={() =>
                        onRemoveProduct({
                          name: item.name,
                          price: item.price,
                          army,
                        })
                      }>
                      -
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
        {Boolean(cart[army]?.products?.length) && (
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
