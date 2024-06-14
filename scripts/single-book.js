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
      
          const { title, imageLinks, authors, description, publisher, industryIdentifiers} = data.volumeInfo;
          const cleanTitle = title.replace(/[:\-].*$/, '');
          const author = authors ? authors.join(', ') : '';
          const isbn = industryIdentifiers.find(identifier => identifier.type === 'ISBN_10' || identifier.identifier.type === 'ISBN_13').identifier;
          const cleanResum = description.replace(/<[^>]+>/g, '');
      
          // Afficher les informations du livre dans la page single.html
          document.querySelector('.lvr-intro h2').textContent = cleanTitle;
          document.querySelector('.edition .edit').textContent = publisher;
          document.querySelector('.lvr-img img').src = `${imageLinks.thumbnail.replace('&edge=curl', '')}&fife=w800`;
          document.querySelector('.lvr-intro .auteur').textContent = author;
          document.querySelector('.edition .isbn').textContent = isbn;
          document.querySelector('.resumer .resum').textContent = cleanResum;
        })
        .catch(error => console.error(error));
  }
