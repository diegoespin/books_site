Intégration du code dans WordPress pour afficher le livre cliqué sur une page single

Pour intégrer ce code dans WordPress et afficher le livre cliqué sur une page single, vous devrez suivre les étapes suivantes :

Étape 1 : Créer une page single pour les livres

Dans WordPress, créez une nouvelle page single pour les livres en ajoutant un fichier single-book.php dans le répertoire wp-content/themes/your-theme/ (remplacez your-theme par le nom de votre thème).

Étape 2 : Ajouter le code JavaScript

Ajoutez le code JavaScript que vous avez fourni dans un fichier script.js et placez-le dans le répertoire wp-content/themes/your-theme/js/. Ensuite, ajoutez une balise <script> dans le fichier single-book.php pour inclure le fichier script.js :Intégration du code dans WordPress pour afficher le livre cliqué sur une page single

Pour intégrer ce code dans WordPress et afficher le livre cliqué sur une page single, vous devrez suivre les étapes suivantes :

Étape 1 : Créer une page single pour les livres

Dans WordPress, créez une nouvelle page single pour les livres en ajoutant un fichier single-book.php dans le répertoire wp-content/themes/your-theme/ (remplacez your-theme par le nom de votre thème).

Étape 2 : Ajouter le code JavaScript

Ajoutez le code JavaScript que vous avez fourni dans un fichier script.js et placez-le dans le répertoire wp-content/themes/your-theme/js/. Ensuite, ajoutez une balise <script> dans le fichier single-book.php pour inclure le fichier script.js :

-------------------
<?php
/* single-book.php */

// ...

wp_enqueue_script( 'script', get_template_directory_uri() . '/js/script.js', array('jquery') );

// ...
---------

Étape 3 : Récupérer l'ID du livre cliqué

Dans le fichier single-book.php, vous devrez récupérer l'ID du livre cliqué à l'aide de la fonction get_query_var() :


---------------------
<?php
/* single-book.php */

// ...

$book_id = get_query_var('book_id');

// ...

--------------------------

Étape 4 : Afficher les détails du livre

Dans le fichier single-book.php, vous pouvez maintenant afficher les détails du livre en utilisant l'ID récupéré à l'étape 3. Vous pouvez utiliser les fonctions WordPress pour récupérer les informations du livre, comme get_post_meta() pour récupérer les métadonnées du livre.

Par exemple, vous pouvez afficher le titre et la couverture du livre comme ceci :


----------------------

<?php
/* single-book.php */

// ...

$book_title = get_post_meta($book_id, 'title', true);
$book_cover = get_post_meta($book_id, 'cover', true);

// ...

<div class="book-details">
  <h2><?php echo $book_title; ?></h2>
  <img src="<?php echo $book_cover; ?>" alt="<?php echo $book_title; ?>">
</div>

// ...
------------------------


Étape 5 : Intégrer le code JavaScript avec WordPress

Dans le fichier script.js, vous devrez modifier le code pour utiliser les fonctions WordPress pour récupérer les informations du livre. Par exemple, vous pouvez utiliser ajax pour récupérer les informations du livre à l'aide de la fonction wp_ajax_nopriv_ :


------------------------

// ...

function displayBook() {
  const bookId = <?php echo $book_id; ?>;

  // ...

  $.ajax({
    type: 'POST',
    url: '<?php echo admin_url('admin-ajax.php'); ?>',
    data: {
      action: 'get_book_details',
      book_id: bookId
    },
    success: function(data) {
      // ...
    }
  });
}

// ...

---------------------------

Ensuite, dans le fichier functions.php de votre thème, vous devrez ajouter une fonction pour gérer la requête AJAX :


-------------------------

<?php
/* functions.php */

// ...

add_action('wp_ajax_nopriv_get_book_details', 'get_book_details_callback');

function get_book_details_callback() {
  $book_id = $_POST['book_id'];

  // Récupérez les informations du livre à l'aide de l'ID
  $book_title = get_post_meta($book_id, 'title', true);
  $book_cover = get_post_meta($book_id, 'cover', true);

  // ...

  wp_send_json(array(
    'title' => $book_title,
    'cover' => $book_cover
  ));

  die();
}

// ...


-------------------------


Enfin, vous devrez modifier le code JavaScript pour afficher les détails du livre à l'aide des informations récupérées à l'aide de la requête AJAX.

J'espère que cela vous aidera à intégrer votre code dans WordPress et à afficher le livre cliqué sur une page single.