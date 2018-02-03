import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sampleAsyncAction } from '../src/js/actions/sampleAsyncActions';
import * as types from '../src/js/constants/actionTypes';
import fetchMock from 'fetch-mock';

import chai from 'chai';
var expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ASYNC ACTION CREATORS', () => {
  describe('sampleAsyncAction', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('creates LOAD_DATA when fetching quote has been done', () => {
      fetchMock.getOnce('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        { body: [{'ID':1320,'title':'Nathan Rice','content':'<p>At the end of the day, pretty colors make people drool.  </p>\n','link':'https://quotesondesign.com/nathan-rice/','custom_meta':{'Source':'<a href="http://wpshout.com/wordpress-wizards-week-day-2/">article</a>'}}],
          headers: { 'content-type': 'application/json' } });

      const expectedActions = [
        { type: types.LOAD_DATA, payload: '<p>At the end of the day, pretty colors make people drool.  </p>\n' }
      ];
      const store = mockStore({});

      return store.dispatch(sampleAsyncAction()).then(() => {
        // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });
});
