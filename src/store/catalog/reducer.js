export const catalog = (state = {}, action) => {
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
      return {
        ...state,
        categories: action?.payload?.map((category) => category?.name)
      }
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action?.payload
      }
    default:
      return state;
  }
}
