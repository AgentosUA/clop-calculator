const defaultState = {
  categories: [],
  units: {
    ru: [],
    us: [],
  },
  filters: {
    params: {
      minPrice: 0,
      maxPrice: 100,
      search: '',
    },
    categories: []
  },
}

export const catalog = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_UNITS':
      const usUnits = action?.payload?.filter(unit => unit?.side === 'US')
      const rfUnits = action?.payload?.filter(unit => unit?.side === 'RF')

      return {
        ...state,
        units: {
          ru: rfUnits,
          us: usUnits,
        }
      };
    case 'SET_CATEGORIES':
      const categories = action?.payload?.map((category) => category?.name)
      return {
        ...state,
        categories,
        filters: {
          ...state.filters,
          categories: categories.map(category => ({
            name: category,
            isChecked: true,
          }))
        }
      }
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: action?.payload
        },
      }
    case 'SET_PARAMS':
      return {
        ...state,
        filters: {
          ...state.filters,
          params: {
            ...state.filters.params,
            [action?.payload?.name]: action?.payload?.value
          }
        }
      }
    default:
      return state;
  }
}
