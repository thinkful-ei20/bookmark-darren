'use strict';
/* global shoppingList, store api Item $*/

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/darren/bookmarks';


  function getItems(callback) {
    $.getJSON(`${BASE_URL}`, callback);
  }

  return {
    getItems,
  };

}());