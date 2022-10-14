"use strict";

//Button Selections
const formElement = document.querySelector(".form-container");
const userData = document.querySelector(".input-element");
const list = document.querySelector(".user-input");
const submitBtn = document.querySelector(".btn");
const successMsg = document.querySelector(".success-msg");
const errorMessage = document.querySelector(".error-msg");
const deleteMsg = document.querySelector(".del-msg");
const editMsg = document.querySelector(".edit-msg");
const clearBtn = document.querySelector(".clear-btn");

//Holding use values
let editElement;
let editFlag = false;
let editID = "";
let userInput = [];

//FUNCTIONS

//Display Text
const displayAlert = (text, action) => {
  errorMessage.textContent = text;
  errorMessage.style.visibility = "visible";
  errorMessage.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    errorMessage.textContent = "";
    errorMessage.style.visibility = "hidden";
    errorMessage.classList.remove(`alert-${action}`);
  }, 1000);
};

//Clear items
const clearItems = () => {
  const items = document.querySelectorAll(".input-data");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  clearBtn.classList.add("hidden");
  displayAlert("List cleared", "success");
  setBackToDefault();
  localStorage.removeItem("list");
};

// Delete Function
const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    clearBtn.classList.add("hidden");
  }
  displayAlert("item deleted successfully", "success");
  setBackToDefault();
  //Remove from local storage
  removeFromLocalStorage(id);
};
const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;

  //Set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;

  //Set form value
  userData.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset;
  submitBtn.textContent = "edit";
  //Edit local storage
  editLocalStorage(editID, value);
  setBackToDefault();
};
// Edit Function
//Set back to default
const setBackToDefault = () => {
  userData.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Submit";
};

//***********LOCAL STORAGE ************/
const addToLocalStorage = (id, value) => {
  const groceryItems = { id, value }; //Shorthand for writing {id:id, value:value}
  let items = getLocalStorage();

  items.push(groceryItems);
  localStorage.setItem("list", JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });

  localStorage.setItem("list", JSON.stringify(items));
};

const getLocalStorage = () => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
};

//Getting the list items to be rendered to the display
const createListItem = (id, value) => {
  //add class
  const element = document.createElement("div");
  element.classList.add("input-data");
  //add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <p>${value}</p>
  <div>
    <i class="fa-regular fa-pen-to-square edit-btn"></i>
    <i class="fa-solid fa-trash delete-btn"></i>
  </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
  //Append child
  list.appendChild(element);
};

//Set local storage
const setUpItems = () => {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
  }
};

const addItem = (e) => {
  e.preventDefault();
  const value = userData.value;
  console.log(value);
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    //Display Alert
    displayAlert("item added to the list", "success");
    //Show container
    clearBtn.classList.remove("hidden");
    //Add to Local Storage
    addToLocalStorage(id, value);
    // Set back to default
    setBackToDefault();
    // formElement.reset();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value edited", "success");
  } else {
    displayAlert("please enter a text", "danger");
  }
};

//EVENT LISTENERS
//submit form
formElement.addEventListener("submit", addItem);
//Clear items
clearBtn.addEventListener("click", clearItems);
// Load items
window.addEventListener("DOMContentLoaded", setUpItems);
