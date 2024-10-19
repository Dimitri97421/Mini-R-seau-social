document.addEventListener('DOMContentLoaded', () => {
    const conversationsContainer = document.getElementById('conversations');
    const messageDetailsContainer = document.getElementById('message-details');

    let conversations = []; // Stocke les conversations pour mise à jour

    // Simule les conversations via JSON
    fetch('data/messages.json')
        .then(response => response.json())
        .then(data => {
            conversations = data;
            renderConversations(); // Affiche les conversations
        });

    // Fonction pour afficher les conversations
    function renderConversations() {
        conversationsContainer.innerHTML = ''; // Réinitialise le contenu pour permettre la mise à jour

        conversations.forEach(conv => {
            const conversationDiv = document.createElement('div');
            conversationDiv.classList.add('conversation');

            conversationDiv.innerHTML = `
                <img src="${conv.profilePic}" alt="${conv.name}" class="profile-pic">
                <h2>${conv.name}</h2>
                <p>Dernier message : ${conv.lastMessage}</p>
            `;

            // Cliquer pour voir les détails de la conversation
            conversationDiv.addEventListener('click', () => {
                showConversationDetails(conv);
            });

            conversationsContainer.appendChild(conversationDiv);
        });
    }

    // Fonction pour afficher les détails de la conversation
    function showConversationDetails(conv) {
        conversationsContainer.style.display = 'none'; // Masque la liste des conversations
        messageDetailsContainer.innerHTML = ''; // Réinitialise le contenu pour mettre à jour la conversation détaillée

        const title = document.createElement('h2');
        title.textContent = `Conversation avec ${conv.name}`;
        messageDetailsContainer.appendChild(title);

        // Bouton retour
        const backButton = document.createElement('button');
        backButton.textContent = '← Retour';
        backButton.addEventListener('click', () => {
            messageDetailsContainer.innerHTML = ''; // Réinitialise le contenu pour revenir vers la messagerie en cachant la fenêtre de la conversation détaillée
            conversationsContainer.style.display = 'flex'; // Affiche à nouveau la liste des conversations
        });
        messageDetailsContainer.appendChild(backButton);

        // Affiche les messages
        conv.messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            const date = new Date(msg.timestamp);
            msgDiv.innerHTML = `
                <p><strong>${date.toLocaleString()}:</strong> ${msg.content}</p>
            `;
            messageDetailsContainer.appendChild(msgDiv);
        });

        // Formulaire pour envoyer un nouveau message
        const newMessageForm = document.createElement('div');
        newMessageForm.innerHTML = `
            <textarea id="new-message" placeholder="Écrivez votre message"></textarea>
            <button id="send-message">Envoyer</button>
        `;
        messageDetailsContainer.appendChild(newMessageForm);

        // Gére l'envoi de nouveaux messages
        const sendMessageBtn = document.getElementById('send-message');
        sendMessageBtn.addEventListener('click', () => {
            const newMessageContent = document.getElementById('new-message').value.trim();
            if (newMessageContent) {
                const newMessage = {
                    timestamp: new Date().toISOString(),
                    content: newMessageContent
                };

                // Ajoute le message à l'historique de la conversation
                conv.messages.push(newMessage);
                
                // Met à jour le dernier message
                conv.lastMessage = newMessageContent;
                
                // Met à jour la liste des conversations pour afficher le dernier message
                renderConversations();

                // Met à jour les détails de la conversation avec le/les dernier(s) message(s)
                showConversationDetails(conv); 
            }
        });
    }

    /* REMARQUE : La fonction de modification du fichier JSON pour l'envoi de nouveaux messages nécessiterait une API externe,
    ce qui n'est pas permis dans cet exercice. Donc, la persistance des données dans le JSON n'est pas implémentée.*/

});
