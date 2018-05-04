import { ADD_LETTER, REMOVE_LETTER, CLEAR_TITLE, CHANGE_TITLE_TEXT } from '../../../constants/actionTypes';

const sentences = ['Do You want experience unforgottable moments?',
                   'Find best bars near You...',
                   'Just get step inside!'];

const titleReducer = (state = { titleText: '', titleSentences: sentences }, action) => {
  switch(action.type) {
    case ADD_LETTER:
      return {
        ...state,
        titleText: state.titleText + action.payload
      }
    case REMOVE_LETTER:
      return {
        ...state,
        titleText: state.titleText.slice(0,-1)
      }
    case CLEAR_TITLE:
     return {
       ...state,
       titleText: ''
     }
    case CHANGE_TITLE_TEXT:
      return {
        ...state,
        titleText: action.payload
      }
    default:
      return state;
  }
};

export default titleReducer;
