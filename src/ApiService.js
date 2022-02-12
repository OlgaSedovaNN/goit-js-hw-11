import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class NewApiSrvice {
    constructor() { 
        this.searchQuery = ''
        this.page = 1;
        this.totalHits = '';
    }
    
    async fetchImages() {
        try {
            const MY_KEY = '25579746-a7ae080d785264dfa870330dc'
            const response = await fetch(`https://pixabay.com/api/?key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            const images = await response.json()
            const newPage = await this.incrementPage()
             
             this.totalHits= await images.totalHits 
    if (this.totalHits === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } 
          
            return images.hits
            
        }
        catch (error) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            
        }
    }
    resetPage() {
        this.page = 1
        
    }
    incrementPage() {
this.page += 1;
    }

}