import CookieIMG from "../assets/cookie.png";
import "../styles/style.css";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  render() {
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";
    this.clickableAreaElement.innerHTML = `
        <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
    `;
    this.clickableAreaElement.addEventListener("click", () => {
      window.requestAnimationFrame(() => {
        this.clickableAreaElement.classList.add("active");
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.clickableAreaElement.classList.remove("active");
          });
        }, 100);
      });
      this.onClick();
    });
 
    this.gameElement.append(this.clickableAreaElement);
}
}
