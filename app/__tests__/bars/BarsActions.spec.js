import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition } from '../../src/js/views/bars/actions/scrollActions.js';
import { handleInputChange } from '../../src/js/views/bars/actions/searchActions.js';
import * as types from '../../src/js/constants/actionTypes';
import chai from 'chai';
var expect = chai.expect;
import ReactTestUtils from 'react-dom/test-utils';

describe('BARS ACTION CREATORS', () => {
  describe('scrollActions', () => {
    describe('toogleIsGrabbed', () => {
      it('should create TOOGLE_IS_GRABBED action with payload value', () => {
        const expectedAction = {
          type: types.TOOGLE_IS_GRABBED,
          payload: true
        };
        expect(toogleIsGrabbed(true)).to.deep.equal(expectedAction);
      });
    });
    describe('changeScrollButtonPosition', () => {
      it('should create CHANGE_SCROLL_BUTTON_POSITION action with payload value', () => {
        const expectedAction = {
          type: types.CHANGE_SCROLL_BUTTON_POSITION,
          payload: 10
        };
        expect(changeScrollButtonPosition(10)).to.deep.equal(expectedAction);
      });
    });
    describe('changeBarsPosition', () => {
      it('should create CHANGE_BARS_POSITION action with payload value', () => {
        const expectedAction = {
          type: types.CHANGE_BARS_POSITION,
          payload: 10
        };
        expect(changeBarsPosition(10)).to.deep.equal(expectedAction);
      });
    });
  });
  describe('searchActions', () => {
    describe('handleInputChange', () => {
      it('should create HANDLE_INPUT_CHANGE action with payload value', () => {
        const expectedAction = {
          type: types.HANDLE_INPUT_CHANGE,
          payload: "Wrocław" //enzyme to test????
        };
        expect(handleInputChange(event)).to.deep.equal(expectedAction);
      });
    });
  });
});
