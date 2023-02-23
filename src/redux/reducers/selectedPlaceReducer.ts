const initialState = {
    selectedPlace: ''
  };
  
  const selectedPlaceReducer = (state = initialState, action: any): any => {
    switch (action.type) {
      case 'SET_SELECTED_PLACE':
        return {
          selectedPlace: action.payload
        };
      default:
        return state;
    }
  };
  
  export default selectedPlaceReducer;