document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Simule les posts via JSON
    fetch('data/posts.json')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('feed-post');

            // Crée le HTML pour le post
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                ${post.image ? `<img src="${post.image}" alt="Photo de Cher Ami le pigeon héroïque" class="post-image" style="cursor: pointer;">` : ''}
                <p>${post.content}</p>
                <div class="reactions">
                    <button class="like-btn">Like</button>
                    <button class="love-btn">Love</button>
                    <button class="dislike-btn">Dislike</button>
                </div>
                <div class="comments-section">
                    <h3>Commentaires</h3>
                    <div class="comments-list"></div>
                    <textarea class="new-comment" placeholder="Ajouter un commentaire" name="commentaire"></textarea>
                    <button class="add-comment-btn">Commenter</button>
                </div>
            `;

            // Affichage en plein écran de la photo
            if (post.image) {
                const imgElement = postDiv.querySelector('.post-image');
                imgElement.addEventListener('click', () => {
                    const modal = document.createElement('div');
                    modal.classList.add('modal');
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <img src="${post.image}" alt="Post Image" class="full-image">
                        </div>
                    `;
                    document.body.appendChild(modal);

                    // Ferme la modale
                    modal.querySelector('.close-modal').addEventListener('click', () => {
                        modal.remove();
                    });
                });
            }

            // Ajoute un nouveau commentaire au post
            const commentsList = postDiv.querySelector('.comments-list');
            const newCommentTextArea = postDiv.querySelector('.new-comment');
            const addCommentBtn = postDiv.querySelector('.add-comment-btn');

            addCommentBtn.addEventListener('click', () => {
                const commentText = newCommentTextArea.value.trim();
                if (commentText) {
                    addComment(commentsList, commentText);
                    newCommentTextArea.value = ''; // Réinitialise le champ
                }
            });

            // Ajoute au feed
            feedContainer.appendChild(postDiv);

            // Ajoute des animations de particules lors des clics sur les réactions
            const likeBtn = postDiv.querySelector('.like-btn');
            const loveBtn = postDiv.querySelector('.love-btn');
            const dislikeBtn = postDiv.querySelector('.dislike-btn');

            // Fonction pour réinitialiser les couleurs de tous les boutons
            function resetButtonColors() {
                likeBtn.style.backgroundColor = '';
                loveBtn.style.backgroundColor = '';
                dislikeBtn.style.backgroundColor = '';
            }

            likeBtn.addEventListener('click', () => {
                if (likeBtn.style.backgroundColor === 'blue') {
                    // Si le bouton est déjà sélectionné, on réinitialise
                    resetButtonColors();
                } else {
                    // Sinon, on sélectionne ce bouton et réinitialise les autres
                    resetButtonColors();
                    likeBtn.style.backgroundColor = 'blue'; // Applique la couleur de fond
                    createParticles(likeBtn, 'blue'); // Ajoute les particules
                }
            });

            loveBtn.addEventListener('click', () => {
                if (loveBtn.style.backgroundColor === 'red') {
                    resetButtonColors();
                } else {
                    resetButtonColors();
                    loveBtn.style.backgroundColor = 'red';
                    createParticles(loveBtn, 'red');
                }
            });

            dislikeBtn.addEventListener('click', () => {
                if (dislikeBtn.style.backgroundColor === 'gray') {
                    resetButtonColors();
                } else {
                    resetButtonColors();
                    dislikeBtn.style.backgroundColor = 'gray';
                    createParticles(dislikeBtn, 'gray');
                }
            });
        });
    });

    // Fonction pour ajouter un commentaire
    function addComment(commentsList, commentText, isReply = false) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        if (isReply) {
            commentDiv.classList.add('reply');
        }

        commentDiv.innerHTML = `
            <p>${commentText}</p>
            <button class="reply-btn" style="display: none;">Répondre</button>
            <div class="reply-section" style="display: none;">
                <textarea class="new-reply" placeholder="Répondre"></textarea>
                <button class="add-reply-btn">Envoyer</button>
            </div>
            <div class="replies-list"></div>
        `;

        // Affiche le bouton "Répondre" après avoir ajouté un commentaire
        const replyBtn = commentDiv.querySelector('.reply-btn');
        replyBtn.style.display = 'block';  // Le bouton "Répondre" devient visible

        // Gére la réponse à un commentaire
        const replySection = commentDiv.querySelector('.reply-section');
        const repliesList = commentDiv.querySelector('.replies-list');
        const addReplyBtn = commentDiv.querySelector('.add-reply-btn');
        const newReplyTextArea = commentDiv.querySelector('.new-reply');

        // Affiche/Cache la section de réponse
        replyBtn.addEventListener('click', () => {
            replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
        });

        // Ajoute une réponse
        addReplyBtn.addEventListener('click', () => {
            const replyText = newReplyTextArea.value.trim();
            if (replyText) {
                addComment(repliesList, replyText, true);
                newReplyTextArea.value = ''; // Réinitialise le champ
            }
        });

        // Ajoute le commentaire ou la réponse à la liste
        commentsList.appendChild(commentDiv);
    }

    // Fonction basique pour créer et animer les particules (Heureusement que L'UI/UX n'est pas prioritaire)
    function createParticles(button, color) {
        const particleCount = 30;
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        button.appendChild(particleContainer);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.backgroundColor = color;
            particle.style.top = `${Math.random() * 100 - 50}%`;
            particle.style.left = `${Math.random() * 100 - 50}%`;
            particleContainer.appendChild(particle);

            // Animation de chaque particule
            setTimeout(() => {
                particle.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
                particle.style.opacity = 0;
            }, 5 * i);

            // Suppression de la particule après l'animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
});