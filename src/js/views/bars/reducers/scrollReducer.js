import { SET_SCROLLBAR_POSITION_Y, TOOGLE_IS_GRABBED, CHANGE_SCROLL_BUTTON_POSITION, CHANGE_BARS_POSITION, SET_BARS_HEIGHT } from '../../../constants/actionTypes';

/* You can safely change these properites,
rest of the properties will be calculated, don't touch them! */
const customStyling = {
  desirableBarStyle: {
    margin: 8,
    padding: 14,
    height: 110
  },
  desirableScrollButtonHeight: 52,
  desirableBarsContainerHeight: 468,
  desirableScrollbarHeight: 385
};

const initialState = {
    isGrabbed: false,
    scrollbar: {
      height: customStyling.desirableScrollbarHeight,
      positionY: 0
    },
    scrollButton: {
      height: customStyling.desirableScrollButtonHeight,
      positionY: 0
    },
    barsContainerHeight: customStyling.desirableBarsContainerHeight,
    barsPosition: 0,
    barsHeight: 0,
    barStyle: customStyling.desirableBarStyle
};

const scrollReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SCROLLBAR_POSITION_Y:
      return {
        ...state,
        scrollbar: {
          ...state.scrollbar,
          positionY: action.payload
        }
      }
    case SET_BARS_HEIGHT:
      return {
        ...state,
        barsHeight: action.payload
      }
    case TOOGLE_IS_GRABBED:
      return {
        ...state,
        isGrabbed: action.payload
      }
    case CHANGE_SCROLL_BUTTON_POSITION:
      return {
        ...state,
        scrollButton: {
          ...state.scrollButton,
          positionY: action.payload
        }
      }
    case CHANGE_BARS_POSITION:
      return {
        ...state,
        barsPosition: action.payload
      }
    default:
      return state;
  }
};

export default scrollReducer;
