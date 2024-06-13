// Récupérer le bookId stocké dans le localStorage

const bookId = sessionStorage.getItem('bookId');
console.log(`Book ID: ${bookId}`);


if (!bookId) {
    console.error('Erreur : bookId est undefined');
    console.log('Arrêt de l\'exécution du code');
  } else{

      // Faire une requête API pour récupérer les informations du livre
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      fetch(url)
       .then(response => {
          console.log(response); // Log the response object here
          return response.json();
        })
       .then(data => {
          console.log(data); // Log the parsed JSON data
          if (!data ||!data.volumeInfo) {
            console.error('Erreur : données du livre introuvables');
            return;
          }
      
          const { title, imageLinks, authors, description, language, publisher } = data.volumeInfo;
          const cleanTitle = title.replace(/[:\-].*$/, '');
          const author = authors ? authors.join(', ') : '';
      
          // Afficher les informations du livre dans la page single.html
          document.querySelector('.lvr-intro h2').textContent = cleanTitle;
          document.querySelector('.edition .lang').textContent = language;
          document.querySelector('.edition .edit').textContent = publisher;
          document.querySelector('.lvr-img img').src = `${imageLinks.thumbnail.replace('&edge=curl', '')}&fife=w800`;
          document.querySelector('.lvr-intro .auteur').textContent = author;
        //   document.querySelector('.book-details').innerHTML = `
        //     <img src="${imageLinks.thumbnail.replace('&edge=curl', '')}&fife=w800" alt="${cleanTitle}">
        //     <h2>${cleanTitle}</h2>
        //     <p>Auteur : ${author}</p>
        //     <p>Description : ${description}</p>
        //   `;
        })
        .catch(error => console.error(error));
  }
