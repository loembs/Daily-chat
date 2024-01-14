let user;
let utilisateurConnecte;
// Utilisateurs avec des contacts
let utilisateurs = [
    {
        numero: "123456789",
        nom: "John",
        prenom: "Doe",
        mdp: "pass123",
        photo: '../images/téléchargement.jpeg',
        contacts: [
            { id: 'contact1', nom: 'Sami Rafi', lastActive: new Date(), photo: '../images/téléchargement.jpeg' },
            { id: 'contact2', nom: 'Hassan Agmir', lastActive: new Date(), photo: '../images/téléchargement.jpeg' },
            { id: 'contact3', nom: 'Jane', lastActive: new Date(), photo: '../images/téléchargement.jpeg' },
        ],
    },
    {
        numero: "987654321",
        nom: "Jane",
        prenom: "Doa",
        mdp: "pass456",
        photo: '../images/téléchargement.jpeg',
        contacts: [
            { id: 'contact4', nom: 'Abdou Chatabi', lastActive: new Date(), photo: '../images/téléchargement.jpeg' },
            { id: 'contact5', nom: 'John', lastActive: new Date(), photo: '../images/téléchargement.jpeg' },
           
        ],
    },
    
];


// Fonction de connexion
function seConnecter() {
    let username = prompt('Entrez votre username :');

    // Vérifie si l'username existe parmi les utilisateurs préenregistrés
    let user = utilisateurs.find(utilisateur => utilisateur.nom.toLowerCase() === username.toLowerCase());

    console.log('Username saisi :', username);
    console.log('Utilisateur trouvé :', user);

    if (user) {
        alert('Connexion réussie en tant que ' + user.nom);
        // Enregistrez l'utilisateur connecté
        utilisateurConnecte = user;
        // Mettez à jour l'interface utilisateur
        mettreAJourInterfaceUtilisateur();
        // Générez la liste des contacts
        genererListeContacts();
        // Rediriger vers la page de chat après la connexion réussie
        window.location.replace('chat.html');
        return false; // Ajouter cette ligne pour éviter l'envoi du formulaire après la redirection
    } else {
        alert('Username incorrect. Veuillez réessayer.');
        return false; // Ajouter cette ligne pour éviter l'envoi du formulaire en cas d'échec de connexion
    }
}



// Fonction pour charger les contacts
function chargerContacts() {
    // Vérifie si l'utilisateur est connecté
    if (!utilisateurConnecte) {
        window.location.replace('connexion.html');
        return;
    }

    let contactsList = document.querySelector('.contacts');
    contactsList.innerHTML = ''; // Nettoyer la liste des contacts

    // Parcourir la liste des contacts de l'utilisateur connecté
    utilisateurConnecte.contacts.forEach(contact => {
        // Créer des éléments pour chaque contact
        let contactItem = document.createElement('li');
        let contactLink = document.createElement('a');

        // Définir l'identifiant du contact en tant qu'attribut personnalisé
        contactLink.setAttribute('data-contact-id', contact.numero);
        contactLink.addEventListener('click', () => chargerContactActif(contact));

        let contactBlock = document.createElement('div');
        contactBlock.className = 'contacts_body';

        let imgContainer = document.createElement('div');
        imgContainer.className = 'img_cont';

        let userImg = document.createElement('img');
        userImg.src = getImageUrl(contact);
        userImg.className = 'rounded-circle user_img';

        let onlineIcon = document.createElement('span');
        onlineIcon.className = 'online_icon';

        let userInfo = document.createElement('div');
        userInfo.className = 'user_info';

        let userName = document.createElement('span');
        userName.textContent = contact.nom;

        let userStatus = document.createElement('p');
        userStatus.textContent = calculerDiffTemps(contact.lastActive);

        // Assembler les éléments
        imgContainer.appendChild(userImg);
        imgContainer.appendChild(onlineIcon);
        userInfo.appendChild(userName);
        userInfo.appendChild(userStatus);
        contactBlock.appendChild(imgContainer);
        contactBlock.appendChild(userInfo);
        contactLink.appendChild(contactBlock);
        contactItem.appendChild(contactLink);
        contactsList.appendChild(contactItem);
    });
}

// Fonction pour charger le contact actif
function chargerContactActif(contact) {
    // Mettre à jour l'interface avec le contact actif
    afficherDetailsContactActif(contact);

    // Vous pouvez effectuer d'autres opérations avec le contact actif ici
}

// Fonction pour afficher les détails du contact actif
function afficherDetailsContactActif(contact) {
    const detailsContact = document.querySelector('.details-contact');
    detailsContact.innerHTML = `<h2>Nom du Contact Actif: ${contact.nom}</h2>`;
    // Ajoutez d'autres éléments HTML avec les détails du contact selon vos besoins
}

// Fonction pour afficher la liste des contacts actifs
function afficherContactsActifs(contacts) {
    const listeContacts = document.querySelector('.liste_des_contacts');
    listeContacts.innerHTML = ''; // Nettoyer la liste des contacts

    // Ajoutez chaque contact à la liste
    contacts.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `<div>${contact.nom} - ${calculerDiffTemps(contact.lastActive)}</div>`;
        listeContacts.appendChild(contactItem);
    });
}

// Fonction pour obtenir les messages du contact actif
function getMessagesForContact(contact) {
    // Utilise un mécanisme de stockage pour récupérer les messages du contact actif
    const storedMessages = localStorage.getItem(`${contact.numero}_messages`);
    return storedMessages ? JSON.parse(storedMessages) : [];
}

// Fonction pour sauvegarder un message
function sauvegarderMessage(message, contact) {
    // Utilise un mécanisme de stockage pour sauvegarder le message
    const storedMessages = getMessagesForContact(contact);
    storedMessages.push(message);
    localStorage.setItem(`${contact.numero}_messages`, JSON.stringify(storedMessages));
}

// Fonction pour envoyer un message
function envoyerMessage() {
    const zoneSaisie = document.getElementById('zoneSaisie');
    const message = zoneSaisie.value.trim();

    if (message) {
        const nouveauMessage = document.createElement('div');
        nouveauMessage.className = 'bloc_contact';
        nouveauMessage.innerHTML = `
            <div class="msg_cotainer_send">
                ${message}
                <span class="msg_time_send">Now</span>
            </div>
        `;

        const chatBody = document.getElementById('chat-body');
        chatBody.appendChild(nouveauMessage);

        // Sauvegarde le message
        sauvegarderMessage({
            content: message,
            time: 'Now',
            isSent: true,
        }, contactActif);

        zoneSaisie.value = ''; // Efface la zone de saisie
    }
}

// Fonction pour charger le contact actif
function chargerContactActif(contact) {
    afficherDetailsContactActif(contact);
    // Autres opérations en fonction du contact sélectionné...
}

// Fonction pour trouver le contact par son identifiant
function trouverContactParId(contactId) {
    if (utilisateurConnecte && utilisateurConnecte.contacts) {
        return utilisateurConnecte.contacts.find(contact => contact.numero === contactId);
    } else {
        console.error("Utilisateur actif introuvable ou pas de contacts.");
        return null;
    }
}

// Fonction pour obtenir l'URL de l'image du contact
function getImageUrl(contact) {
    return contact && contact.photo ? contact.photo : 'url_par_defaut.jpg';
}

// Fonction pour mettre à jour l'interface utilisateur
function mettreAJourInterfaceUtilisateur() {
    if (utilisateurConnecte) {
        const photoUtilisateurElement = document.getElementById('photo-utilisateur');
        const nomUtilisateurElement = document.getElementById('nom-utilisateur');
        photoUtilisateurElement.src = utilisateurConnecte.photo || 'chemin/par/defaut.jpg';
        nomUtilisateurElement.textContent = utilisateurConnecte.nom;
    }
}

// Fonction pour générer la liste des contacts
function genererListeContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    let utilisateurActif = utilisateurConnecte;

    utilisateurActif.contacts.forEach(contact => {
        let contactItem = document.createElement('li');
        let contactLink = document.createElement('a');
        contactLink.href = '#';
        contactLink.dataset.contactId = contact.numero;
        contactLink.addEventListener('click', () => chargerContactActif(contact));
        contactItem.innerHTML = `
            <div class="bloc_contact">
                <div class="img_cont">
                    <img src="${getImageUrl(contact)}" class="rounded-circle user_img">
                    <span class="online_icon"></span>
                </div>
                <div class="user_info">
                    <span>${contact.nom}</span>
                    <p>${calculerDiffTemps(contact.lastActive)}</p>
                </div>
            </div>
        `;
        contactsList.appendChild(contactItem);
    });
}



