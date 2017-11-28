import { toogleExpandMenu } from '../src/js/actions/menuActions';
import * as types from '../src/js/constants/actionTypes';

import chai from 'chai';
var expect = chai.expect;

describe('ACTION CREATORS', () => {
  describe('expandMenu', () => {
    it('should create TOOGLE_EXPAND_MENU action', () => {
      const expectedAction = {
        type: types.TOOGLE_EXPAND_MENU
      };
      expect(toogleExpandMenu()).to.deep.equal(expectedAction);
    });
  });
});
