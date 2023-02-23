const initialState = {
  auth: false
};

const authReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'LOGIN':
        return {
          auth: true
        };
        case 'LOGOUT':
        return {
          auth: false
        };
        default:
        return state;
    }
};

export default authReducer;