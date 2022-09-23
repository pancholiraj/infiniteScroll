console.log("script loaded");
// console.clear();

// https://openlibrary.org/search.json?q=${userText}?page=${pageNumber++}

// selectors
const form = document.querySelector(".form");
const inputField = document.querySelector(".inputField");
const noInput = document.querySelector(".error");
const initialResult = document.querySelector(".initialResult");
const loading = document.querySelector(".loading");
const results = document.querySelector(".results");
const container = document.querySelector(".container");

// api calling and append to screen function

let pageNumber = 1;
let dataArr = [];
let firstTime = true;
let isScroll = true;

const apiData = () => {
  isScroll = false;
  if (firstTime) {
    const newUl = document.createElement("ul");
    results.append(newUl);
  }
  console.log("page", pageNumber);
  loading.classList.add("show");
  inputField.disabled = true;
  fetch(
    `https://openlibrary.org/search.json?q=${
      inputField.value
    }?page=${pageNumber++}`
  )
    .then((res) => res.json())
    .then((data) => {
      dataArr.push(...data.docs);
      const newUl = document.querySelector("ul");
      dataArr.map((item) => {
        const newLi = document.createElement("li");
        newLi.innerText = item.title;
        newUl.append(newLi);
        loading.classList.remove("show");
        firstTime = false;
        inputField.disabled = false;
      });
    })
    .catch((e) => {
      alert("api is not responding right now. Please try again later");
      loading.classList.remove("show");
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputField.value === "") {
    noInput.classList.add("noInput");
    initialResult.classList.remove("new");
    const newUl = document.querySelector("ul");
    if (newUl) {
      console.log("removing");
      results.removeChild(newUl);
      console.log("cleared");
      firstTime = true;
    }
    dataArr = [];
  } else {
    noInput.classList.remove("noInput");
    initialResult.classList.remove("new");
    const newUl = document.querySelector("ul");
    if (newUl) {
      console.log("removing");
      results.removeChild(newUl);
      console.log("cleared");
      firstTime = true;
    }
    dataArr = [];
    pageNumber = 1;
    apiData();
  }
});

window.addEventListener("scroll", (e) => {
  if (isScroll) {
    if (window.scrollY + window.innerHeight >= container.scrollHeight) {
      apiData();
      isScroll = false;
    }
  } else if (window.screenY + window.innerHeight <= container.scrollHeight) {
    isScroll = true;
  }
});
