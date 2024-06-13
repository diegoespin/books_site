const apiKey = 'AIzaSyAU361J0P6HeugVVjSthzlX4_oEw5Dv460';
const input = document.querySelector('input');
const result = document.querySelector('.swiper-wrapper');
const bouton = document.querySelector('.btn-js');

const currentYear = new Date().getFullYear();
const publishedDate = currentYear.toString();
let page = 0; // initialize the page variable

function displaybook() {
  const url = `https://www.googleapis.com/books/v1/volumes?q=rentreelitteraire&publishedDate=${publishedDate}&orderBy=newest&key=${apiKey}&langRestrict=fr&maxResults=30&startIndex=${page * 10}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      result.innerHTML = ''; // clear the wrapper
      data.items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        // slide.dataset.bookid = item.id;
        // console.log(`Book ID: ${item.id}`);
        const { title, imageLinks, authors } = item.volumeInfo;
        const author = authors? authors.join(', ') : ''; 
        const cleanTitle = title.replace(/[:\-].*$/, '');
        slide.innerHTML = `
          <a href="singel.html"></a>
          <div class="img-book">
            ${imageLinks ? `<img src="${imageLinks.thumbnail.replace('&edge=curl', '')}&fife=w800" alt="${cleanTitle}">` : '<img src="img/no_found.jpg" alt="">'}
          </div>

          <div class="add-like">
          <div class="titre-lvr"><p> ${cleanTitle}</p></div>
          <div class="auteur-lvr">
              <p>${author} </p>
              <button type="button" title="ajouter aux favoris" class="add-to-fav">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          </div>
        `;
        result.appendChild(slide);


        // Ajout d'un événement click sur les éléments a

        slide.querySelector('.img-book').addEventListener('click', (e) => {
          sessionStorage.setItem('bookId', item.id);
          console.log(`Book ID: ${item.id}`);
          window.location.href = 'singel.html';
        });

      });
      // Initialize Swiper instance after HTML content is generated
        new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 5,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      page++; // increment the page variable

    })
    .catch(error => console.error(error));
}


// Call displaybook when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  displaybook();
});




const debouncedSearch = debounce(displaybook, 300);
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}