import React from 'react'
import { Catalog } from '../../components'

import carJSON from '../../data/us/us_car.json';
import truckJSON from '../../data/us/us_truck.json';
import lightJSON from '../../data/us/us_light_armor.json';
import heavyJSON from '../../data/us/us_heavy_armor.json';
import airJSON from '../../data/us/us_air.json';
import extraJSON from '../../data/us/us_extra.json';

const Us = () => {
  return (
    <Catalog
      cartName='us_cart'
      carJSON={carJSON}
      truckJSON={truckJSON}
      lightJSON={lightJSON}
      heavyJSON={heavyJSON}
      airJSON={airJSON}
      extraJSON={extraJSON}
      army='US Army'
    />
  )
}

export { Us };