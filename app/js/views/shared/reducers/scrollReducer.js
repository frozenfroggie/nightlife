import {RESET_SCROLL_SETTINGS, SET_BARS_CONTAINER_HIGHT, SET_SCROLLBAR_HEIGHT, SET_SCROLLBAR_POSITION_Y, TOOGLE_IS_GRABBED, CHANGE_SCROLL_BUTTON_POSITION, CHANGE_BARS_POSITION, SET_BARS_HEIGHT } from '../../../constants/actionTypes';

/* You can safely change these properites,
rest of the properties will be calculated, please don't touch them! */
const customStyling = {
  desirableBarStyle: {
    margin: 12,
    padding: '0px 20px',
    height: 210
  },
  desirableScrollButtonHeight: 52
};

const initialState = {
    barsRef: null,
    isGrabbed: false,
    scrollbar: {
      height: 0,
      positionY: 0
    },
    scrollButton: {
      height: customStyling.desirableScrollButtonHeight,
      positionY: 0
    },
    barsContainerHeight: 0,
    barsPosition: 0,
    barsHeight: 0,
    barStyle: customStyling.desirableBarStyle
};

const scrollReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESET_SCROLL_SETTINGS:
      return {
        ...state,
        scrollbar: {
          ...state.scrollbar,
          positionY: 0
        },
        scrollButton: {
          ...state.scrollButton,
          positionY: 0
        },
        barsPosition: 0
      }
    case SET_BARS_CONTAINER_HIGHT:
      return {
        ...state,
        barsContainerHeight: action.payload
      }
    case SET_SCROLLBAR_HEIGHT:
      return {
        ...state,
        scrollbar: {
          ...state.scrollbar,
          height: action.payload
        }
      }
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
