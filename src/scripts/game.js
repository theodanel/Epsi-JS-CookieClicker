import { ClickableArea } from "../scripts/clickable-area.js";

export class Game {
  cookies = 0;

  gameElement = null;
  scoreElement = null;

  clickableArea = null;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");
    
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );
  }

  start() {
    this.render();
  }

  render() {
    this.renderScore();
    this.clickableArea.render();
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
	this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.innerHTML = `
        <span>${this.cookies} cookies</span>
    `;
  }


  onClickableAreaClick = () => {
    this.cookies += 1;
  
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };
}
