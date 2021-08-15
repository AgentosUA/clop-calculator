const defaultState = {
  us: {
    total: 0,
    products: [],
  },
  ru: {
    total: 0,
    products: [],
  },
};

export const cart = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'ADD_PRODUCT':
      const { army, name, price } = payload;
      const side = state[army];
      const products = [...side.products];

      const existingProduct = products.find(
        (product) => product?.name === name
      );

      if (existingProduct) {
        const existingProductIndex = products.findIndex(
          (product) => product.name === name
        );

        products[existingProductIndex].quantity += 1;

        return {
          ...state,
          [army]: {
            total: side.total + price,
            products,
          },
        };
      }

      products.push({ name, price, quantity: 1 });

      return {
        ...state,
        [army]: {
          total: side.total + price,
          products,
        },
      };
    case 'REMOVE_PRODUCT': {
      const { army, name, price } = payload;
      const side = state[army];
      const products = [...side.products];
      const productIndex = products.findIndex(
        (product) => product.name === name
      );

      if (products[productIndex].quantity === 1) {
        
        return {
          ...state,
          [army]: {
            total: side.total - price,
            products: products.filter((product) => product.name !== name),
          },
        };
      }

      products[productIndex].quantity -= 1;

      return {
        ...state,
        [army]: {
          total: side.total - price,
          products,
        },
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        [payload]: {
          total: 0,
          products: []
        }
      }
    }
    default:
      return state;
  }
};
