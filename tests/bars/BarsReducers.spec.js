import scrollReducer from '../../../src/js/views/pages/bars/reducers/scrollReducer';
import searchReducer from '../../../src/js/views/pages/bars/reducers/searchReducer';
import * as types from '../../../src/js/constants/actionTypes';

import chai from 'chai';
var expect = chai.expect;

describe('BARS REDUCERS', function() {
  describe('scrollReducer', function() {
    describe('if no action provided and initial state is undefined', function() {
      it('returns default state', function(){
        const newState = menuReducer(undefined, {});
        expect(newState).to.deep.equal({expandMenu: false});
      });
    });
    describe('if right action was provided', function() {
      it('can handle TOOGLE_EXPAND_MENU',function() {
        const action = { type: types.TOOGLE_EXPAND_MENU };
        const newState = menuReducer([], action);
        expect(newState).to.deep.equal({expandMenu: true});
      });
    });
  });
  describe('searchReducer', function() {
    describe('if no action provided and initial state is undefined', function() {
      it('returns default state', function(){
        const newState = menuReducer(undefined, {});
        expect(newState).to.deep.equal({expandMenu: false});
      });
    });
    describe('if right action was provided', function() {
      it('can handle TOOGLE_EXPAND_MENU',function() {
        const action = { type: types.TOOGLE_EXPAND_MENU };
        const newState = menuReducer([], action);
        expect(newState).to.deep.equal({expandMenu: true});
      });
    });
  });
});
