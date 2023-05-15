const baseUrlWithEndpoint = "https://www.thecolorapi.com/scheme";

const colorInputEl = document.getElementById("input-color");
const colorSchemeEl = document.getElementById("color-scheme");
const numberOfColorsEl = document.getElementById("number-of-colors");
const getColorSchemeButtonEl = document.getElementById(
  "get-color-scheme-button"
);
const colorContainerEl = document.getElementById("colors-container");

getColorSchemeButtonEl.addEventListener("click", getColorScheme);

//grabs hex value of clicked color or text and copies to clipboard
document.addEventListener("click", (e) => {
  if (e.target.parentElement.className === `color-box`) {
    const targetColorBox = e.target.parentElement;
    const targetColorHex = targetColorBox.childNodes[3].innerText;
    navigator.clipboard.writeText(targetColorHex);
    alert(`Copied: ${targetColorHex}`);
  }
});

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

      colorContainerEl.innerHTML = getColorsHtml(colorsArray);
    });
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
