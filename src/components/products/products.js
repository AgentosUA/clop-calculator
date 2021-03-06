import React, { Fragment } from 'react';
import { Card } from '../../components';

import styles from './products.module.css';

const Products = ({ name, products, onAdd, onRemove, total, cart, army }) => {
  return (
    <Fragment>
      {products.length > 0 && <h3 className={styles.title}>{name}</h3>}
      <div className={styles.products}>
        {products.map((vehicle) => {
          return (
            <Card
              key={vehicle.name}
              img={
                vehicle.img || vehicle.className
                  ? `https://db.armaproject.ru/images/vehicles/${vehicle.className
                      .toLowerCase()
                      .replace('"', '')
                      .replace('"', '')}.jpg`
                  : `https://db.armaproject.ru/images/items/${vehicle.name
                      .replace('/"/g', '')
                      .split(' ')
                      .join('%20')}.jpg`
              }
              name={vehicle.name}
              className={vehicle.className}
              price={vehicle.price}
              weapons={vehicle.weapon}
              ammo={vehicle.ammo}
              crewCount={vehicle.crewCount}
              comment={vehicle.comment}
              onAdd={() =>
                onAdd({
                  name: vehicle.name,
                  price: vehicle.price,
                  army,
                })
              }
              onRemove={() =>
                onRemove({
                  name: vehicle.name,
                  price: vehicle.price,
                  army,
                })
              }
              addDisabled={vehicle.price + total > 100}
              removeDisabled={
                !cart[army].products.find(
                  (product) => product.name === vehicle.name
                )
              }
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export { Products };
