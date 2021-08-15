/* Basic entities */

export const setUnits = (units) => ({
  type: 'SET_UNITS',
  payload: units,
});

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

/* Filters */

export const setSelectedCategories = (categories) => ({
  type: 'SET_SELECTED_CATEGORY',
  payload: categories,
});

export const setParams = (payload) => ({
  type: 'SET_PARAMS',
  payload,
});
