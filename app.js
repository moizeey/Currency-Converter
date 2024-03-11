let base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let option = document.createElement("option");
    option.className = "opt";
    option.innerText = currCode;
    option.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

let updateExchangeRate = async () => {
  let amount = document.querySelector(".input");
  let amtVal = amount.value;

  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amtVal = "1";
  }
  const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let newAmt = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${newAmt} ${toCurr.value}`;
};
window.addEventListener("load", updateExchangeRate());
