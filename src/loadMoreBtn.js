export default class LoadMoreBtn {
    constructor(selector) {
        this.btn = document.querySelector(selector)

    }
    async hide() {
await this.btn.classList.add('is-hidden')
    }
    async show() {
    await this.btn.classList.remove('is-hidden')
}


    
}