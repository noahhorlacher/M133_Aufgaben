// class for inventory keeping
class Cart {
    // prices in Rappen
    static priceScrew = 20
    static priceNut = 10
    static priceGrommet = 5

    #numScrews
    #numNuts
    #numGrommets

    get numScrews() {
        return this.#numScrews
    }

    set numScrews(value) {
        this.#numScrews = value
    }

    get numNuts() {
        return this.#numNuts
    }

    set numNuts(value) {
        this.#numNuts = value
    }

    get numGrommets() {
        return this.#numGrommets
    }

    set numGrommets(value) {
        this.#numGrommets = value
    }

    // in Francs
    calculatePrice() {
        return ((Cart.priceScrew * this.#numScrews +
            Cart.priceNut * this.#numNuts +
            Cart.priceGrommet * this.#numGrommets) / 100).toFixed(2)
    }
}

// shopping cart object
const CART = new Cart()

// display individual prices
document.querySelector('#price_screws').innerText = `Fr. ${(Cart.priceScrew / 100).toFixed(2)}/Stück`
document.querySelector('#price_nuts').innerText = `Fr. ${(Cart.priceNut / 100).toFixed(2)}/Stück`
document.querySelector('#price_grommets').innerText = `Fr. ${(Cart.priceGrommet / 100).toFixed(2)}/Stück`

// keep page from reloading after form submit
document.querySelector('form').addEventListener('submit', e => e.preventDefault())

// click on submit
document.querySelector('form input[type="submit"]').addEventListener('click', () => {
    // get order
    CART.numScrews = document.querySelector('#screws').value
    CART.numNuts = document.querySelector('#nuts').value
    CART.numGrommets = document.querySelector('#grommets').value

    // calculate total price
    const PRICE = CART.calculatePrice()

    // display total price
    document.querySelector('#txt_price').innerText = `Preis: Fr. ${PRICE}.—`
})