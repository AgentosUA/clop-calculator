const defaultState = {
  us: {
    heavy: {
      total: 0,
      products: [],
    },
    light: {
      total: 0,
      products: [],
    },
  },
  ru: {
    heavy: {
      total: 0,
      products: [],
    },
    light: {
      total: 0,
      products: [],
    },
  },
};

export const cart = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'ADD_PRODUCT':
      const { army, name, price, clopType } = payload;
      if (!clopType && !army) return;
      
      console.log(state, army, clopType);
      const side = state[army][clopType];

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
            ...state[army],
            [clopType]: {
              total: side.total + price,
              products,
            },
          }
        };
      }

      products.push({ name, price, quantity: 1 });

      return {
        ...state,
        [army]: {
          ...state[army],
          [clopType]: {
            total: side?.total + price,
            products,
          }
        },
      };
    case 'REMOVE_PRODUCT': {
      const { army, name, price, clopType } = payload;
      const side = state[army][clopType];
      const products = [...side.products];
      const productIndex = products.findIndex(
        (product) => product.name === name
      );

      if (products[productIndex].quantity === 1) {

        return {
          ...state,
          [army]: {
            ...state[army],
            [clopType]: {
              total: side.total - price,
              products: products.filter((product) => product.name !== name),
            },
          },
        };
      }

      products[productIndex].quantity -= 1;

      return {
        ...state,
        [army]: {
          ...state[army],
          [clopType]: {
            total: side.total - price,
            products,
          },
        }
      };
    }
    case 'CLEAR_CART': {
      const { army, clopType } = payload;

      return {
        ...state,
        [army]: {
          ...state[army],
          [clopType]: {
            total: 0,
            products: []
          }
        }
      }
    }
    default:
      return state;
  }
};
