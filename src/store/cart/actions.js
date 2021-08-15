/* Basic entities */

export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

export const removeProduct = (product) => ({
  type: 'REMOVE_PRODUCT',
  payload: product,
});

export const clearCart = (side) => ({
  type: 'CLEAR_CART',
  payload: side,
});