// shop.js
export class Shop {
    items = [
        { id : 1, basePrice: 10, name: "Cursor", production: 0.1},
        { id : 2, basePrice: 45, name: "Grandma", production: 1 },
        { id : 3, basePrice: 100, name: "Farm", production: 8 },
        { id : 4, basePrice: 500, name: "Mine", production: 20 },
    ];

    ownedItems = {};

    constructor(game) {
        this.game = game;
        this.shopElement = document.querySelector("#shop");
    }

    start() {
        this.render();
    }

    render() {
        const itemsHtml = this.items.map(item => `
            <div class="shop-item" data-item-id="${item.id}">
                <strong>${item.name}</strong><br>
                Prix : ${Math.round(this.newItemsPrice(item.id))} cookies<br>
                Possédés : ${this.ownedItems[item.id] || 0}<br>
                <small>+${item.production}/sec</small>
            </div>
        `).join("");

        this.shopElement.innerHTML = `
            <h2>Boutique à cookies</h2>
            ${itemsHtml}
        `;

        this.shopElement.querySelectorAll('.shop-item').forEach(itemElement => {
            itemElement.addEventListener('click', () => {
                const itemId = parseInt(itemElement.dataset.itemId);
                this.onBuyingItem(itemId);
            });
        });
    }

    onBuyingItem(itemId) {
        const price = this.newItemsPrice(itemId);
        console.log('Prix:', price, 'Cookies disponibles:', this.game.cookies);

        if (this.game.cookies >= price) {
            this.game.cookies -= price;
            this.ownedItems[itemId] = (this.ownedItems[itemId] || 0) + 1;
            this.game.updateScore();
            this.render();
        } 
    }

    newItemsPrice(itemsId) {
        const item = this.items.find(element => element.id === itemsId);
        let number = this.ownedItems[itemsId] || 0;
        const basePrice = item.basePrice;
        let newPrice = basePrice * Math.pow(1.15, number);
        return newPrice;
    }

    calculateProduction() {
        let totalProduction = 0;
        
        for (let itemId in this.ownedItems) {
            const quantity = this.ownedItems[itemId];
            const item = this.items.find(i => i.id === parseInt(itemId));
            if (item) {
                totalProduction += item.production * quantity;
            }
        }
        
        return totalProduction;
    }
}