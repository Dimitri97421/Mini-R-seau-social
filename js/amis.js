document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('friends-list');
    const filterInput = document.getElementById('filter-input');
    let draggedItem = null;

    // Gestion du drag and drop
    list.addEventListener('dragstart', (e) => {
        // Vérifie si l'élément cliqué est un lien
        if (e.target.tagName === 'A') {
            draggedItem = e.target.parentElement; // On obtient le LI parent
            setTimeout(() => {
                draggedItem.style.opacity = '0'; // Cache l'élément en cours de drag
            }, 0);
        }
    });

    list.addEventListener('dragend', () => {
        if (draggedItem) {
            setTimeout(() => {
                draggedItem.style.opacity = '1'; // Réaffiche l'élément après le drag
            }, 0);
        }
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permet le drop
    });

    list.addEventListener('drop', (e) => {
        // Vérifie si l'élément sur lequel on dépose est un LI ou un A
        const targetElement = e.target.tagName === 'A' ? e.target.parentElement : e.target;
    
        if (targetElement.tagName === 'LI' && draggedItem) {
            // Insére l'élément droppé avant le prochain élément sibling
            list.insertBefore(draggedItem, targetElement.nextSibling);
        }
    });


    // Fonction de filtrage
    filterInput.addEventListener('input', (e) => {
        const filterValue = e.target.value.toLowerCase();
        const items = list.getElementsByTagName('li');
    
        Array.from(items).forEach((item) => {
            const friendName = item.textContent.toLowerCase();
            if (friendName.includes(filterValue)) {
                item.style.display = 'flex'; // Affiche les éléments qui correspondent
            } else {
                item.style.display = 'none';  // Cache ceux qui ne correspondent pas
            }
        });
    });
});
