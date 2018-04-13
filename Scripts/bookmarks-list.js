'use strict';
/* global  $ store api  */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateItemElement(item) {    
    return `
      <li class="js-item-element" data-item-id="${item.id}">         
        <h3 class="js-title" role="button">${item.title} </h3>      
        <div class="rating">Rating: ${item.rating} stars</div> 
        <div class="${item.collapsed ? 'hidden' : ''}">               
          <p>${item.desc}</p>
          <a href="${item.url}" target="_blank"><button>Go to site</button></a>
          <button class="js-delete-button">DELETE</button>
        </div>
      </li>
    `;  
  }
  
  function generateCreateBookmarkForm() {
    return `
    <form class="js-create-form">
      <input class="create-title" type="text" placeholder="title">
      <input class="create-url" type="text" placeholder="must enter http://">
      <input class="create-description" type="text" placeholder="describe your link">
      <select role="listbox" name="rating" class="create-rating">          
          <option value="1" role="option">1 star</option>
          <option value="2" role="option">2 stars</option>
          <option value="3" role="option">3 stars</option>
          <option value="4" role="option">4 stars</option>
          <option value="5" role="option">5 stars</option>
        </select>
      <button class="create-submit-button" type="submit">Create Bookmark!</button>
    </form>
    `;
  }

  //create generate function to create div that has error button
  //  and has a listener on button and sets createFormChecker to true.
  //and renders


  function generateBookmarkItemsString(bookmarkList) {    
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {
    
    let items = store.items;  
    const checkCreateState = generateCreateBookmarkForm();

    if (store.creatingState) {
      $('.create-form').html(checkCreateState);
      console.log(store.creatingState);
    }

    
    items = items.filter(elem => elem.rating >= store.filterLevel);
    console.log('Filtering:', store.filterLevel);
    
    
    console.log('render ran');
    const bookmarkListString = generateBookmarkItemsString(items);
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

  function handleCreateBookmark() {
    $('.container').on('click','.create-bookmark', event=> {
      event.preventDefault();
      console.log('creator clickskskskks');
      store.switchCreatingState();
      render();
    });
  }

  // function verifyFormSubmit(title,url,description,rating) {
  //   if (!url.length > 4 || !url.included('http')) {
  //     return false;
  //   }
  //   if (!title.length > 1) {
  //     return false;
  //   } 
  //   if (!description.length > 1) {
  //     return false;
  //   }
  //   if (!rating > 1 || !rating < 6){
  //     return false;
  //   }    
  //   return true;
  // }

  function handleCreateFormSubmit() {
    $('.container').on('click', '.create-submit-button', event => {
      event.preventDefault();
      console.log('creat button slicks@');
      const title = $('.create-title').val();
      const url = $('.create-url').val();
      const description = $('.create-description').val();      
      const rating = $('.create-rating').val();
      
      // if (verifyFormSubmit(title,url,description,rating)) {
      // if(store.items){
      const formData = {
        'title': title,
        'url': url,
        'desc': description,
        'rating': rating
      };

      console.log(formData);    

      api.createBookmark(formData, () => {
        store.switchCreatingState();
        api.getItems(items => {
          store.items = [];                             
          items.forEach((item) => store.addItem(item));
          render();
        });          
      });        

      // } else {
      //   store.createFormChecker = false;
      //   render();
      // }     
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function filterByRating() {
    $('.container').on('click', '.select-rating-filter', event=> {
      console.log('filter selector clicked!!!');
      const filterValue = +$('.select-rating-filter option:selected').val();
      
      store.filterLevel = filterValue;
      console.log('Log from filerByRating fx',store.filterLevel);

      // store.filterRatingStore(filterValue);
      render();

    });
  }





  function bindEventListeners() {
    handleToggleCollapsed();
    getItemIdFromElement();
    handleDelete();
    handleCreateBookmark();
    generateCreateBookmarkForm();
    handleCreateFormSubmit();
    // verifyFormSubmit();
    filterByRating();    
   
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
} ());
