const defaultState = {
  categories: [],
  units: {
    ru: {
      heavy: [],
      light: []
    },
    us: {
      heavy: [],
      light: []
    },
  },
  filters: {
    params: {
      minPrice: 0,
      maxPrice: 100,
      search: '',
      allSelected: true,
    },
    categories: []
  },
}

export const catalog = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_UNITS':
      const { us, ru } = action?.payload;
      return {
        ...state,
        units: {
          ru: {
            heavy: ru.heavy,
            light: ru.light,
          },
          us: {
            heavy: us.heavy,
            light: us.light,
          },
        }
      };
    case 'SET_CATEGORIES':
      const { categories: category } = action?.payload;
      return {
        ...state,
        categories: category?.us?.heavy || category || [],
        filters: {
          ...state.filters,
          categories: category?.us?.heavy?.map(category => ({
            name: category?.name,
            isChecked: true,
          }))
        }
      }
    case 'SET_SELECTED_CATEGORIES':
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: action?.payload,
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
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          params: {
            minPrice: 0,
            maxPrice: 100,
            search: '',
            allSelected: true,
          },
          categories: state.filters.categories.map(category => ({
            name: category?.name,
            isChecked: true,
          })),
        }
      }
    default:
      return state;
  }
}
