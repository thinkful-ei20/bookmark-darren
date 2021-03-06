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

  const createBookmark = function(newData,success_callback,failure_callback) {
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',  
      contentType: 'application/json',    
      data: JSON.stringify(newData),
      success: success_callback, 
      error: failure_callback,      
    });
  };

  return {
    getItems,
    deleteBookmark,
    createBookmark
  };

}());