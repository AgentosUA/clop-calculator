import React, { Fragment } from 'react'
import { Card } from '../../components'

import styles from './products.module.css'

const Products = ({name, isVisible, cart, products, filter, onAdd, onRemove, totalPrice}) => {


  return (
    <Fragment>
      {isVisible && filter(products).length > 0 && <h3>{name}</h3>}
      {isVisible && <div className={styles.products}>
        {filter(products).map((vehicle) => {
          return (
            <Card
              key={vehicle.name}
              img={vehicle.img || `https://db.armaproject.ru/images/vehicles/${vehicle.className.toLowerCase().replace("\"", '').replace("\"", '')}.png`}
              name={vehicle.name}
              className={vehicle.className}
              price={vehicle.price}
              weapons={vehicle.weapon}
              ammo={vehicle.ammo}
              crewCount={vehicle.crewCount}
              comment={vehicle.comment}
              onAdd={() => onAdd(vehicle)}
              onRemove={() => onRemove(vehicle)}
              addDisabled={vehicle.price + totalPrice > 100}
              removeDisabled={!cart.find(item => item.className === vehicle.className)}
            />
          )
        })}
      </div>}
    </Fragment>
  )
}

export { Products };