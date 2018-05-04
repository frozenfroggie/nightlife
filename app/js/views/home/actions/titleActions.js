import { ADD_LETTER, REMOVE_LETTER, CLEAR_TITLE, CHANGE_TITLE_TEXT } from '../../../constants/actionTypes';

export const addLetter = letter => ({
  type: ADD_LETTER,
  payload: letter
});

export const removeLetter = () => ({
  type: REMOVE_LETTER
});

export const clearTitle = () => ({
  type: CLEAR_TITLE
});

export const changeTitleText = title => ({
  type: CHANGE_TITLE_TEXT,
  payload: title
});
