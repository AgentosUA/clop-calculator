const defaultState = {
  us: {
    total: 0,
    products: [],
  },
  ru: {
    total: 0,
    products: [],
  }
}

export const cart = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'ADD_PRODUCT':
      const { army, name, price } = payload;
      const side = state[army];
      const products = [...side.products];

      const total = side.total;

      const existingProduct = products.find(product => product?.name === name);

      console.log(existingProduct);

      if (existingProduct) {
        const existingProductIndex = products.findIndex(product => product.name === name)

        products[existingProductIndex].quanity += 1;

        return {
          ...state,
          [army]: {
            total: total + price,
            products,
          }
        };
      }

      products.push({ name, price, quanity: 1 });

      return {
        ...state,
        [army]: {
          total: total + price,
          products,
        }
      };
    default:
      return state;
  }
}
