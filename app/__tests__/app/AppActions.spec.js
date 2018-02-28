import { toogleExpandMenu } from '../../js/views/app/actions/menuActions';
import * as types from '../../js/constants/actionTypes';

import chai from 'chai';
var expect = chai.expect;

describe('APP ACTION CREATORS', () => {
  describe('expandMenu', () => {
    it('should create TOOGLE_EXPAND_MENU action', () => {
      const expectedAction = {
        type: types.TOOGLE_EXPAND_MENU
      };
      expect(toogleExpandMenu()).to.deep.equal(expectedAction);
    });
  });
});
