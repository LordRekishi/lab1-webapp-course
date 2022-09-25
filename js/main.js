window.addEventListener("resize", removeMobileNav);
const nav = document.querySelector("#top-nav");
const main = document.querySelector("main");

function removeMobileNav() {
  if (screen.width > 820) {
    nav.style.display = "none";
    main.style.marginTop = "85px";
  }
}

function setupPage() {
  const p1 = document.querySelector("#p1");
  const p2 = document.querySelector("#p2");

  fetch("./json/index-info.json")
    .then((response) => response.json())
    .then((data) => {
      p1.textContent = data.p1;
      p2.textContent = data.p2;
    });
}

function openMenu() {
  if (nav.style.display === "flex") {
    nav.style.display = "none";
    main.style.marginTop = "85px";
  } else {
    nav.style.display = "flex";
    main.style.marginTop = "285px";
  }
}

const form = document.querySelector("#contact-form");
const textArea = document.querySelector("#message");
const remainingChars = document.querySelector("#remaining-chars");
const admin = document.querySelector("#admin-fieldset");
const retrieve = document.querySelector("#retrieve");
const output = document.querySelector("#output");
const output2 = document.querySelector("#output2");
const output3 = document.querySelector("#output3");
const MAX_CHARS = 250;

if (form !== null) {
  form.addEventListener("submit", sendForm);
  textArea.addEventListener("input", checkChars);
}

function checkChars(event) {
  const remaining = MAX_CHARS - textArea.value.length;
  const color = remaining < MAX_CHARS * 0.1 ? "red" : null;

  remainingChars.textContent = `${remaining} characters remaining`;
  remainingChars.style.color = color;

  event.preventDefault();
}

function sendForm(event) {
  event.preventDefault();

  let formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));

  localStorage.setItem(JSON.parse(json).name, json);

  admin.style.display = "block";
}

function retrieveJson(event) {
  event.preventDefault();

  let json = JSON.parse(localStorage.getItem(retrieve.value));

  output.textContent = json.gender + " " + json.name;
  output2.textContent = json.email;
  output3.textContent = json.message;
}

function hideAdmin(event) {
  event.preventDefault();

  admin.style.display = "none";
}
