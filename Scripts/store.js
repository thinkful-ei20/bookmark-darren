'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function(){

 

  const addItem = function(item) {
    item.collapsed = true;
    this.items.push(item);    
  };

  const toggleCollapsed = function(id) {
    let currentItem = this.items.find(bookmark => bookmark.id === id);
    currentItem.collapsed = !currentItem.collapsed;
    console.log('toggle collapesd ran!!!!!!!!!!!!!!!!');    
  };

  const deleteBookmarkStore = function(id) {
    let currentItem = this.items.find(bookmark => bookmark.id === id);    
    let currentIndex = this.items.indexOf(currentItem);
    this.items.splice(currentIndex,1);
  };

  const switchCreatingState = function() {
    console.log(this.creatingState);
    this.creatingState = !this.creatingState;
    console.log(this.creatingState);
  };

  // const filterRatingStore = function(ratings){
  //   console.log(this.items);
  //   let filteredItems = this.items.filter(item =>
      
  //   {console.log(item);
  //     console.log(ratings);
  //     console.log(item.rating >= ratings);
  //     return item.rating >= ratings;} 
  //   );
  //   console.log('filter ran from store');
  //   console.log(filteredItems);
  //   this.items = filteredItems;
  // };






  return {
    items: [],
    creatingState: false,
    filterLevel: 1,
    createFormChecker: true, 


    addItem,
    toggleCollapsed,
    deleteBookmarkStore,
    switchCreatingState, 
    // filterRatingStore,
    
  };  
}());
