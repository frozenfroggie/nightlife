import scrollReducer from '../../js/views/bars/reducers/scrollReducer';
import searchReducer from '../../js/views/bars/reducers/searchReducer';
import menuReducer from '../../js/views/app/reducers/menuReducer';
import * as types from '../../js/constants/actionTypes';

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
