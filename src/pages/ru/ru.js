import React from 'react'
import { Catalog } from '../../components'
import carJSON from '../../data/ru/ru_car.json';
import truckJSON from '../../data/ru/ru_truck.json';
import lightJSON from '../../data/ru/ru_light_armor.json';
import heavyJSON from '../../data/ru/ru_heavy_armor.json';
import airJSON from '../../data/ru/ru_air.json';
import extraJSON from '../../data/ru/ru_extra.json';

const Ru = () => {
  return (
    <Catalog
      cartName='ru_cart'
      carJSON={carJSON}
      truckJSON={truckJSON}
      lightJSON={lightJSON}
      heavyJSON={heavyJSON}
      airJSON={airJSON}
      extraJSON={extraJSON}
      army='ВС РФ'
    />
  )
}

export { Ru };