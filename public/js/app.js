const rightSideBox = document.querySelector(".right-side-box");
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const cloudStateBtn = document.querySelector(".btn--cloud-state");
const cloudStateSvgUse = document.querySelector(
  ".btn--cloud-state .btn-icon use",
);
const windStateBtn = document.querySelector(".btn--wind-state");
const windStateSvgUse = document.querySelector(
  ".btn--wind-state .btn-icon use",
);
const cardHeaderIcon = document.querySelector(".header__icon use");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInput.value;
  rightSideBox.style.display = "inline-grid";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        searchInput.value = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        const forecastLower = data.forecast.toLowerCase();
        if (forecastLower.includes("cloudy")) {
          cloudStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud",
          );
          cardHeaderIcon.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud",
          );
          cloudStateBtn.lastChild.textContent = "Cloudy";
        } else if (
          forecastLower.includes("sunny") ||
          forecastLower.includes("clear")
        ) {
          cloudStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-sun",
          );
          cloudStateBtn.lastChild.textContent = "Sunny";
          cardHeaderIcon.setAttribute("xlink:href", "/svg/sprite.svg#icon-sun");
        } else if (forecastLower.includes("rain")) {
          cloudStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud-rain",
          );
          cardHeaderIcon.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud-rain",
          );
          cloudStateBtn.lastChild.textContent = "Rainy";
        }

        const windSpeed = +forecastLower
          .split("the wind speed is ")[1]
          .split(" km/h")[0];
        if (windSpeed < 10) {
          windStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-clouds",
          );
          windStateBtn.lastChild.textContent = "Calm";
        } else if (windSpeed < 30) {
          windStateBtn.lastChild.textContent = "Light Wind";
          windStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-wind",
          );
        } else if (windSpeed < 60) {
          windStateBtn.lastChild.textContent = "Windy";
          windStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud-wind",
          );
        } else {
          windStateBtn.lastChild.textContent = "Stormy";
          windStateSvgUse.setAttribute(
            "xlink:href",
            "/svg/sprite.svg#icon-cloud-lightning",
          );
        }
        searchInput.value = "";
      }
    });
  });
});
