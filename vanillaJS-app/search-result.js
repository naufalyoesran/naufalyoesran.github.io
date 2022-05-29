const header = document.querySelector("header");
const div = document.querySelector("header > div");
const form = document.querySelector("header form");
const searchDiv = document.querySelector("#searchDiv");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const searchTerm = document.querySelector("#searchTerm");
const closeButton = document.querySelector("#close");

searchDiv.addEventListener("click", () => {
  div.classList.add("none");
  form.classList.remove("none");
  searchInput.value = "";
  closeButton.classList.add("none");
});

const submit = (e) => {
  e.preventDefault();

  div.classList.remove("none");
  form.classList.add("none");
  if (searchInput.value !== "") {
    searchTerm.innerHTML = searchInput.value;
  }
};

searchForm.addEventListener("click", submit);
form.addEventListener("submit", submit);

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    div.classList.remove("none");
    form.classList.add("none");
  }

  if (searchInput.value === "") {
    closeButton.classList.add("none");
  } else {
    closeButton.classList.remove("none");
  }
});

closeButton.addEventListener("click", (e) => {
  searchInput.value = "";
  closeButton.classList.add("none");
});
