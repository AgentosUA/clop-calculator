import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './filters.module.css'
import { setParams, setSelectedCategories, resetFilters } from '../../store/catalog';
import { usePriceLimit } from '../../hooks';

const Filters = (clopType) => {
  const dispatch = useDispatch();
  const priceLimit = usePriceLimit(clopType);
  const { filters: { categories, params: { minPrice, maxPrice, search, allSelected } } } = useSelector((state) => state.catalog);

  const onSearchValueChange = (value) => {
    dispatch(setParams({ name: 'search', value }));
  }

  const onMinPriceChange = (value) => {
    if (value <= priceLimit && value >= 0 && !isNaN(Number(value))) {
      dispatch(setParams({ name: 'minPrice', value }));
    }
  }

  const onMaxPriceChange = (value) => {
    if (value <= priceLimit && value >= 0 && !isNaN(Number(value))) {
      dispatch(setParams({ name: 'maxPrice', value }));
    }
  }

  const onFilterChange = ({ type, name, value }) => {
    const cloneCategories = [...categories];
    const index = cloneCategories?.findIndex((filter) => filter?.name === name);
    cloneCategories[index].isChecked = value;
    dispatch(setSelectedCategories(cloneCategories));
  }

  const onCheckAllCategories = (check) => {
    const cloneCategories = [...categories];
    cloneCategories.forEach(item => item.isChecked = check);
    dispatch(setSelectedCategories(cloneCategories));
  }

  const setAllSelected = () => {
    dispatch(setParams({ name: 'allSelected', value: !allSelected }));
  };

  const reset = () => {
    dispatch(resetFilters());
  }

  useEffect(() => {
    onCheckAllCategories(allSelected);
    // eslint-disable-next-line
  }, [allSelected]);

  const isResetDisabled = (categories?.filter(category => category.isChecked)?.length === categories?.length)
    && allSelected
    && String(minPrice) === '0'
    && String(maxPrice) === '100'
    && search === '';

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <label htmlFor='search'>Поиск</label><br />
        <input
          name='search'
          type='text'
          placeholder='Название или класснейм'
          value={search}
          onChange={(e) => onSearchValueChange(e.target.value)}
        />
      </div>
      <div className={styles.price}>
        <div>
          <label htmlFor='search'>Мин цена</label><br />
          <input
            type='number'
            min='0'
            max={String(priceLimit)}
            step='1'
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='search'>Макс цена</label><br />
          <input
            type='number'
            min='0'
            max={String(priceLimit)}
            step='1'
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.unitsType}>
        <input
          type='checkbox'
          checked={allSelected}
          onChange={setAllSelected}
        />
        <label>Все категории</label>
        <br />
        {categories?.map((category) => {
          return (
            <Fragment key={category.name}>
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
      <button
        className={styles.reset}
        onClick={reset}
        disabled={isResetDisabled}
      >
        Сбросить фильтры
      </button>
    </div>
  )
}

export { Filters };