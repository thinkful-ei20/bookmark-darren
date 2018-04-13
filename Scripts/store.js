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
