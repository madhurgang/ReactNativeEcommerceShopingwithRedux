const initialState = {
  allProducts: [],
  auth: false
}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return {
        ...state,
        loggedInUser: action.payload
      };
    }
    case "LIST_PRODUCTS": {
      return {
        ...state,
        allProducts: action.payload
      };
    }
    case 'AUTH_FALSE': {
      return {
        ...state,
        auth: false
      }
    }
    case 'AUTH_TRUE': {
      return {
        ...state,
        auth: true
      }
    }
    default:
      return state;
  }
};