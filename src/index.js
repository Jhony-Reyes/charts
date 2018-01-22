import Inferno from "inferno";
import App from "./components/charts/";

const items = document.querySelectorAll(".chartApp");

function getItems(items) {
  items.forEach(element => {
    var id = element.getAttribute("data-chart");
    var type = element.getAttribute("data-type");
    var share = element.getAttribute("share");
    var href = element.getAttribute("href");
    Inferno.render(
      <App id={id} type={type} share={share} href={href} />,
      element
    );
  });
}
getItems(items);
