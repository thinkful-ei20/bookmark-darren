'use strict';
/* global shoppingList, store api Item $*/

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/darren/bookmarks';


  function getItems(callback) {
    $.getJSON(`${BASE_URL}`, callback);
  }

  const deleteBookmark = function(id,callback) {
    
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',      
      data: JSON.stringify(id),
      success: callback,
      
    });
  };

  return {
    getItems,
    deleteBookmark
  };

}());