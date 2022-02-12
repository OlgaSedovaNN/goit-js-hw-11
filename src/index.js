import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './ApiService';
import LoadMoreBtn from './loadMoreBtn';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery')
    // btnMore: document.querySelector('.load-more')
}

const newApiService = new NewApiService();
const loadMoreBtn = new LoadMoreBtn('.load-more')

refs.form.addEventListener('submit', typeName)

async function typeName(evt) {
    evt.preventDefault();
    clearGallery()
   
        newApiService.searchQuery = evt.currentTarget.elements.searchQuery.value
        newApiService.resetPage()
        newApiService.fetchImages().then(hits => {
            createMarkup(hits)
            lastImageFinded()
        })
    
    
}

loadMoreBtn.btn.addEventListener('click', onLoadMore)


async function onLoadMore() {
     await newApiService.fetchImages().then(hits => {
         createMarkup(hits)
     })
    await lastImageFinded()
}
 
async function createMarkup(images) {
  let imagesMarkup = await images.map(image => {
                return `<div class="photo-card">
  <img src="${image.webformatURL}}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div>
</div>
  `
            }).join('')

 return await refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup)

}

async function lastImageFinded() {
  
    let totalImageElem = await refs.gallery.children
    if (newApiService.totalHits === totalImageElem.length) {
        loadMoreBtn.hide()
Notify.failure(" We are sorry, but you've reached the end of search results.")
    } else {
         loadMoreBtn.show()
    }
   
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}
