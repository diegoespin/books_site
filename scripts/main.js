const apiKey = 'AIzaSyAU361J0P6HeugVVjSthzlX4_oEw5Dv460';
const input = document.querySelector('input');
const result = document.querySelector('.swiper-wrapper');
const bouton = document.querySelector('.btn-js');

function displayMoviez(searchTerm) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&langRestrict=fr`)
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
        slide.dataset.movieid = item.id;
        const { title, imageLinks } = item.volumeInfo;
        slide.innerHTML = `
          <h1>${title}</h1>
          <a href="singel.html">
            ${imageLinks ? `<img src="${imageLinks.thumbnail.replace('&edge=curl', '')}&fife=w800" alt="${title}">` : '<img src="img/no_found.jpg" alt="">'}
          </a>
        `;
        result.appendChild(slide);
      });
      // Initialize Swiper instance after HTML content is generated
      new Swiper(".mySwiper", {
        slidesPerView: 6,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    })
    .catch(error => console.error(error));
}

const debouncedSearch = debounce(displayMoviez, 300);

bouton.addEventListener('click', function() {
  debouncedSearch(input.value);
});

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}


