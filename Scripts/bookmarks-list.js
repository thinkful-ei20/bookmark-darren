'use strict';
/* global  $ store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateItemElement(item) {

   

    if (item.collapsed === false) {
      return `
      <li class="js-item-element" data-item-id="${item.id}">         
        <h3>${item.title} </h3>      
        <div class="rating">${item.rating}</div>                
        <p class="">${item.desc}</p>
        <a href="${item.url}" target="_blank"><button>Go to site</button></a>
        <button class="js-delete-button">DELETE</button>

      </li>
    `;
    } else {
      return `
      <li class="js-item-element" data-id="${item.id}">
        <h3 data-id=${item.id}>${item.title}</h3>
        <div class="rating">${item.rating}</div>
      </li>
    `;
    }
    
  }
  


  function generateBookmarkItemsString(bookmarkList) {    
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {
    let items = store.items;
    

    // render the bookmarks list in the DOM
    // const bookmarksitemsstring = generatebookmakrsstring(bookmarkitems);
    console.log('render ran');
    const bookmarkListString = generateBookmarkItemsString(items);
   
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListString);
  }


  function handleToggleCollapsed() {
    $('.js-bookmark-list').on('click', 'li', event => {
      const id = getItemIdFromElement(event.currentTarget);      
      store.toggleCollapsed(id);
      console.log(id);
      render();
      
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }





  function bindEventListeners() {
    handleToggleCollapsed();
    getItemIdFromElement();
   
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
} ());
