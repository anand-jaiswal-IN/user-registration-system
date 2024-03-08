if (document.getElementById("serverMessageCloseBtn")) {
  const serverMessageCloseBtn = document.getElementById("serverMessageCloseBtn");

  serverMessageCloseBtn.addEventListener("click", (e) => {
    serverMessageCloseBtn.parentElement.style.display = "none";
    const href = window.location.href;
    window.location.href = href.slice(0, href.indexOf("?"));
  });
}
