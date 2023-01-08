const app_data = JSON.parse(
  document.getElementById("app").getAttribute("data-page")
);
if (!app_data.props.auth.user) {
  document.body.innerHTML = "";
  location.href = "http://arshfane.wwwnl1-ts7.a2hosted.com";
}
