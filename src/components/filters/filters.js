import React, { useState, useEffect } from 'react'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks'
import styles from './filters.module.css'
import { setParams, setSelectedCategories } from '../../store/catalog';

const Filters = () => {
  const dispatch = useDispatch();

  const { filters: { categories, params: { minPrice, maxPrice, search } } } = useSelector((state) => state.catalog);

  const onSearchValueChange = (value) => {
    dispatch(setParams({ name: 'search', value }));
  }

  const onMinPriceChange = (value) => {
    if (value <= 100 && value >= 0 && !isNaN(Number(value))) {
      dispatch(setParams({ name: 'minPrice', value }));
    }
  }

  const onMaxPriceChange = (value) => {
    if (value <= 100 && value >= 0 && !isNaN(Number(value))) {
      dispatch(setParams({ name: 'maxPrice', value }));
    }
  }

  const onFilterChange = ({ type, name, value }) => {
    const cloneCategories = [...categories];
    const index = cloneCategories?.findIndex((filter) => filter?.name === name);
    cloneCategories[index].isChecked = value;
    dispatch(setSelectedCategories(cloneCategories));
  }

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <label htmlFor='search'>Поиск</label><br />
        <input name='search' type='text' placeholder='Название или класснейм' value={search} onChange={(e) => onSearchValueChange(e.target.value)} />
      </div>
      <div className={styles.price}>
        <div>
          <label htmlFor='search'>Мин цена</label><br />
          <input type='number' min='0' max='100' step='1' value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} />
        </div>
        <div>
          <label htmlFor='search'>Макс цена</label><br />
          <input type='number' min='0' max='100' step='1' value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} />
        </div>
      </div>
      <div className={styles.unitsType}>
        {categories?.map((category) => {
          return (
            <Fragment>
              <input
                type='checkbox'
                checked={category.isChecked}
                value={category.isChecked}
                onChange={
                  () => onFilterChange({
                    type: 'category',
                    name: category.name, value: !category.isChecked
                  })
                }
              />
              <label>{category.name}</label><br />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export { Filters };