'use strict';
/* global  $ store api */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateItemElement(item) {
    
    return `
      <li class="js-item-element" data-item-id="${item.id}">         
        <h3 class="js-title">${item.title} </h3>      
        <div class="rating">Rating: ${item.rating} stars</div> 
        <div class="${item.collapsed ? 'hidden' : ''}">               
          <p>${item.desc}</p>
          <a href="${item.url}" target="_blank"><button>Go to site</button></a>
          <button class="js-delete-button">DELETE</button>
        </div>
      </li>
    `;
    
    
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
    $('.js-bookmark-list').on('click', '.js-title', event => {
      // event.stopPropagation();
      const id = getItemIdFromElement(event.currentTarget);      
      store.toggleCollapsed(id);
      console.log(id);
      render();          
    });
  }

  function handleDelete (){    
    $('.js-bookmark-list').on('click', '.js-delete-button', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('DELETE CLICKED');
      api.deleteBookmark(id, ()=> {
        store.deleteBookmarkStore(id);
        render();
      });
      

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
    handleDelete();
   
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
} ());
