'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function(){

 

  const addItem = function(item) {
    item.collapsed = false;
    this.items.push(item);    
  };

  const toggleCollapsed = function(id) {
    let currentItem = this.items.find(bookmark => bookmark.id === id);
    currentItem.collapsed = !currentItem.collapsed;
    console.log(currentItem);
  };


















  return {
    items: [],
    addingState: false,
    filterLevel: null,
    createFormChecker: false, 


    addItem,
    toggleCollapsed,
    
    // bookmarkItems: [ {},{},{expanded: undefined} ],
    // addingState: T/F, // true --- hide “adding-false class” 
    //             // false--- unhide creatForm
    // filterLevel: null , 1,2,3,4,5,
    // createFormCheck: false,
      
      
  };
  
}());
