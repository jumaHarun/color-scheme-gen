const colorPicker = document.getElementById("colorPicker");
const colorSchemes = document.getElementById("colorSchemes");
const promptEl = document.getElementById("prompt");

document.getElementById("getScheme").addEventListener('click', getApi)

document.addEventListener("click", (e) => {
  if(e.target.dataset.hex) {
    copyOnClick(e.target.dataset.hex);
  }
});

function renderScheme(colors) {
  let html = "";

  colors.forEach(color => {
    const { hex } = color;
    html += `
    <div 
      class="color" 
      data-hex="${hex.clean}"
      style="background-color: ${hex.value};"
    >
      <div class="hex-code" data-hex="${hex.clean}">
        ${hex.value}
      </div>
    </div>
    `;
  })
  document.getElementById("colors").innerHTML = html
}

async function getApi() {
  const strippedHex = colorPicker.value.slice(1);
  const response = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${strippedHex}&mode=${colorSchemes.value}&count=6`
  );
  const data = await response.json();
  renderScheme(data.colors)
}

getApi()

function copyOnClick(hexValue) {
  navigator.clipboard.writeText(`#${hexValue}`)
  promptEl.textContent = `
  #${hexValue} copied to clipboard
  `;
  setTimeout(() => {
    promptEl.textContent = ''
  }, 1500);
}