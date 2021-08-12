export const catalog = (state = [], action) => {
  switch (action.type) {
    case 'SET_UNITS':
      const usUnits = action.payload.filter(unit => unit?.side === 'US')
      const rfUnits = action.payload.filter(unit => unit?.side === 'RF')

      return {
        ...state,
        units: {
          ru: rfUnits,
          us: usUnits,
        }
      }
    default:
      return state;
  }
}
