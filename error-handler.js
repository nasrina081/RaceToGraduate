(function() {
  var panelEl;

  function setup() {
    const style = document.createElement("style");
    style.innerText = ".error-panel { color: red; font: 18px Arial, sans-serif; font-weight: bold;}";
    document.head.insertBefore(style, document.head.firstChild);
    panelEl = document.createElement("div");
    panelEl.className = "error-panel";
    document.body.append(panelEl);
    window.onerror = handleError;
  }

  function handleError(message, source, lineno, colno, error) {
    const sourcePath = new URL(source).pathname;
    panelEl.innerHTML =
      "<div>" + sourcePath + ", line " + lineno + ", column: " + colno + "</div>" +
      "<code>" + message + "</code>";
  }

  setup();
})();
