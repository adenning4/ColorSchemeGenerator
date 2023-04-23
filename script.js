const baseUrlWithEndpoint = "https://www.thecolorapi.com/scheme";

const getColorSchemeButtonEl = document.getElementById(
  "get-color-scheme-button"
);
const colorInputEl = document.getElementById("input-color");
const colorContainerEl = document.getElementById("colors-container");
const colorSchemeEl = document.getElementById("color-scheme");
const numberOfColorsEl = document.getElementById("number-of-colors");

getColorSchemeButtonEl.addEventListener("click", getColorScheme);

function getColorScheme() {
  const seedColorCleanHex = colorInputEl.value.substring(1);
  const colorSchemeSelection = colorSchemeEl.value.toLowerCase();
  const numberOfColors = numberOfColorsEl.value;
  const url = `${baseUrlWithEndpoint}?hex=${seedColorCleanHex}&mode=${colorSchemeSelection}&count=${numberOfColors}`;

  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      const colorsArray = [];
      data.colors.forEach((color) => {
        colorsArray.push(color.hex.value);
      });
      renderColors(colorsArray);
    });
}

function renderColors(colorsArray) {
  colorContainerEl.innerHTML = getColorsHtml(colorsArray);
}

function getColorsHtml(colorsArray) {
  let html = "";

  colorsArray.forEach((hex) => {
    html += `
        <div class="color-box">
            <div class="color" style="background:${hex}"></div>
            <p class="shown-color-hex">${hex}</p>
        </div>
    `;
  });

  return html;
}
