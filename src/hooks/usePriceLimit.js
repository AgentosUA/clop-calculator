const usePriceLimit = (clopType) => {
  switch (clopType) {
    case 'heavy':
      return 100;
    case 'light':
      return 50;
    default:
      return 100;
  }
};

export { usePriceLimit };
