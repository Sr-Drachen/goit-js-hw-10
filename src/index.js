import { fetchBreeds, fetchCatByBreed } from './js/fetch';
import './sass/index.scss';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

let selectData = [];
const select = new SlimSelect({
  select: '.breed-select',

  data: selectData,
});

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loadingMsgEl: document.querySelector('.loader'),
  errorMsgEl: document.querySelector('.error'),
  divEl: document.querySelector('.cat-info'),
};

refs.selectEl.addEventListener('change', handleCatSelect);

refs.errorMsgEl.style.display = 'none';
refs.loadingMsgEl.style.display = 'none';
refs.loadingMsgEl.textContent = '';

const errorMessage = refs.errorMsgEl.textContent;
let isFirstLoad = true;

function showLoader() {
  refs.loadingMsgEl.style.display = 'block';
}
function hideLoader() {
  refs.loadingMsgEl.style.display = 'none';
}
function notiflixCallErrorMessage() {
  Notiflix.Notify.failure(`${errorMessage}`);
}

showLoader();
fetchBreeds()
  .then(cats => {
    hideLoader();
    addListOfCatsToSelect(cats);
  })
  .catch(() => {
    notiflixCallErrorMessage();
  });

function addListOfCatsToSelect(cats) {
  cats.forEach(cat => {
    selectData.push({ text: cat.name, value: cat.id });
    const optionEl = document.createElement('option');
    optionEl.value = cat.id;
    optionEl.textContent = cat.name;
    refs.selectEl.append(optionEl);
  });
  select.setData(selectData);
}

function handleCatSelect() {
  if (isFirstLoad) {
    isFirstLoad = false;
    return;
  }
  const breedId = this.value;
  showLoader();
  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      const creatContent = createCatElements(catData);
      refs.divEl.innerHTML = creatContent;
    })
    .catch(() => {
      notiflixCallErrorMessage();
      refs.divEl.innerHTML = '';
    });
}

function createCatElements(catData) {
  return catData
    .map(({ url, breeds: [{ name, description, temperament }] }) => {
      return `
        <div class="cat-container">
            <img class="cat-image" src="${url}" alt="${name}">      
            <div class="cat-features">
                <h2 class="cat-title"><strong>${name}</strong></h2>
                <p class="cat-description">${description}</p>     
                <p class="cat-temparament"><strong>Temperament: </strong>${temperament}</p>
            </div>
        </div>`;
    })
    .join('');
}
