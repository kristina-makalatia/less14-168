// localstroage value = string

let list = document.getElementById("todoitems");
let addBtn = document.getElementById("btn-add");

addBtn.addEventListener("click", handleclick);
document.addEventListener("DOMContentLoaded", loadToDos);

// 1.
function handleclick() {
  console.log(this); //button
  let getInputValue = this.previousElementSibling.value.trim();
  console.log(getInputValue); //input value

  if (getInputValue) {
    createToDo(getInputValue);
    saveToStorage(getInputValue);
    this.previousElementSibling.value = "";
  } else {
    alert("Input Field is empty");
  }
}

// 2.
function createToDo(text) {
  let li = document.createElement("li");
  li.innerText = text;

  list.appendChild(li);
}

// 3.
function saveToStorage(todo) {
  let todos = JSON.parse(localStorage.getItem("saveTask")) || [];
  console.log(todos);

  localStorage.setItem("saveTask", JSON.stringify([...todos, todo]));
}

// 4.
function loadToDos() {
  let todos = JSON.parse(localStorage.getItem("saveTask")); //['item1', 'item2']

  if (todos) {
    todos.forEach((element) => {
      // console.log(element); //titouli value
      createToDo(element);
    });
  }
}

// oop
const PersonInfo = function (fisrtName, birthYear) {
  this.fNameuser = fisrtName;
  this.birtYearUser = birthYear;
};

const userObj1 = new PersonInfo("anna", 2000);
const userObj2 = new PersonInfo("levani", 1994);

console.log(userObj1);
console.log(userObj2);
// 1. {}
// 2. this -> {}
// 3. prototype
// 4. abrunebs {}

//prototype
PersonInfo.prototype.getAge = function () {
  console.log(2024 - this.birtYearUser);
};

userObj1.getAge();
userObj2.getAge();

// classes
// const Person = class {

// }

class Person {
  constructor(userfirstName, userBirthYear) {
    this.fName2 = userfirstName;
    this.birtYear2 = userBirthYear;
  }
  printAge() {
    console.log(2024 - this.birtYear2);
  }
}

const user3 = new Person("lasha", 2002);
const user4 = new Person("nini", 2012);
console.log(user3);
console.log(user4);
user4.printAge();

// js destructuring
const cities = ["tbilisi", "paris", "berlin", "hamburg"];

const [tbilisiCity, ...otherCitities] = cities;
console.log(tbilisiCity);

console.log(otherCitities);

// object destructring
const nameUser = "anna";

const developer = {
  id: 1,
  nameUser: "nini",
  skills: ["html", "css", "js"],
  languages: {
    english: "A2",
    german: "b2",
    georgian: "native",
  },
};

const { nameUser: nameUserNew } = developer;
console.log(nameUserNew);

// practice promise.all

const toDoList = document.getElementById("todo-list");
let todos = [];
let users = [];

//5.
function getUserNames(userId) {
  const user = users.find((userInfo) => userInfo.id === userId);
  // console.log(user); //mtliani user obiekti - userebis linkidan
  return user.name;
}

// 4.
function printToDo(userObj) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${userObj.title} by <b> ${getUserNames(
    userObj.id
  )} </b> </span>`;

  toDoList.appendChild(li);
}

// 3.
function getData() {
  Promise.all([getAllToDos(), getAllUsers()]).then((values) => {
    // console.log(values);
    [todos, users] = values;
    // console.log(todos); //10 obiekti - array - mosuli info https://jsonplaceholder.typicode.com/todos?_limit=10
    // console.log(users); //10 obiekti - array - mosul iinfo https://jsonplaceholder.typicode.com/users

    todos.forEach((element) => {
      //   console.log(element); //titoeuli obiketi todos masividan
      printToDo(element);
    });
  });
}
getData();

// 1. - ვიღებთ todo ლისტებს
async function getAllToDos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await response.json();
  return data;
}

// 2. - ვიღებთ უსერებს
async function getAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const dataUsers = await response.json();
  return dataUsers;
}
