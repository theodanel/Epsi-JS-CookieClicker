// game.js
import { ClickableArea } from "../scripts/clickable-area.js";
import { Shop } from "../scripts/shop.js";
import "../styles/game.css";


export class Game {
  cookies = 0;

  gameElement = null;
  scoreElement = null;
  gameAreaElement = null;
  shopElement = null;

  clickableArea = null;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");
  }

  start() {
    this.render();
  }

  render() {
    this.gameAreaElement = document.createElement("section");
    this.gameAreaElement.id = "game-area";
    this.gameElement.append(this.gameAreaElement);

    this.renderScore();
    this.renderShop();

    console.log('Création du shop avec game:', this);
    this.shop = new Shop(this); 
    this.shop.start();

    this.clickableArea = new ClickableArea(
        this.gameAreaElement,
        this.onClickableAreaClick
    );
    this.clickableArea.render();

    this.startProduction(); 
  }

  renderShop() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = "shop";
    this.gameElement.append(this.shopElement);
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameAreaElement.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    const production = this.shop ? this.shop.calculateProduction() : 0;
    this.scoreElement.innerHTML = `
        <span>${Math.floor(this.cookies)} cookies</span>
        <br>
        <small>par seconde : ${production.toFixed(1)}</small>
    `;
  }

  startProduction() {
    let lastTime = Date.now();
    
    const productionLoop = () => {
        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;
        
        const productionPerSecond = this.shop.calculateProduction();
        this.cookies += productionPerSecond * deltaTime;
        this.updateScore();
        
        requestAnimationFrame(productionLoop);
    };
    
    requestAnimationFrame(productionLoop);
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
  
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };
}