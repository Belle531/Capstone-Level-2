document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const imageResultsContainer = document.getElementById('image-results');
    const pexelsApiKey = 'YOUR_API_KEY'; // Replace with your actual Pexels API key
    const loadingSpinner = document.getElementById('loading-spinner');


    async function searchImages(query) {
        const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=15`; // Adjust per_page as needed
        imageResultsContainer.innerHTML = '';
        loadingSpinner.style.display = 'flex';

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: pexelsApiKey
                }
            });
            const data = await response.json();
             loadingSpinner.style.display = 'none';

            if (data.photos && data.photos.length > 0) {
                displayImages(data.photos);
            } else {
                imageResultsContainer.innerHTML = '<p class="text-center text-muted">No images found for your search.</p>';
            }
        } catch (error) {
            console.error('Error fetching images from Pexels:', error);
             loadingSpinner.style.display = 'none';
            imageResultsContainer.innerHTML = `
              <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> ${error.message}. Please try again later.
              </div>
            `;
        }
    }

    function displayImages(images) {
        imageResultsContainer.innerHTML = '';
        images.forEach(image => {
            const divElement = document.createElement('div');
            divElement.classList.add('col-md-4', 'mb-4');

            const imgElement = document.createElement('img');
            imgElement.src = image.src.medium;
            imgElement.alt = image.alt || 'Decoration Idea';
            imgElement.classList.add('img-fluid', 'rounded', 'shadow-sm');

            const linkElement = document.createElement('a');
            linkElement.href = image.url;
            linkElement.target = '_blank';
            linkElement.classList.add('d-block');

            linkElement.appendChild(imgElement);
            divElement.appendChild(linkElement);
            imageResultsContainer.appendChild(divElement);
        });
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchImages(searchTerm);
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    const modal = document.getElementById('promotionModal');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.close-button');
    const promotionForm = document.getElementById('promotionForm');
    const submissionMessage = document.getElementById('submissionMessage');
    let alertShown = false;


    function showModal() {
        modal.style.display = "block";
        overlay.style.display = "block";
    }


    function hideModal() {
        modal.style.display = "none";
        overlay.style.display = "none";
    }

    setTimeout(showModal, 3000);

    closeButton.addEventListener('click', function() {
        if (!alertShown) {
            alert("Don't miss out on our weekly decoration inspiration and exclusive offers! Sign up now!");
            alertShown = true;
        }
        hideModal();
    });

    overlay.addEventListener('click', hideModal);

    promotionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();



        console.log('Name:', name, 'Email:', email);


        submissionMessage.innerHTML = `<span style="color: green; font-size: 1.2em; font-weight: bold;">🎉 Hooray! 🎉</span> Thanks for signing up, ${name}! You'll be the first to know about our amazing promotions!`;
        submissionMessage.classList.remove('hidden');
        submissionMessage.classList.add('show');


        nameInput.style.display = 'none';
        emailInput.style.display = 'none';
        document.querySelector('label[for="name"]').style.display = 'none';
        document.querySelector('label[for="email"]').style.display = 'none';
        document.querySelector('.submit-button').style.display = 'none';
        document.querySelector('.pretty-text').style.display = 'none';
        document.querySelector('.fun-heading').textContent = 'Thank You!';


        setTimeout(hideModal, 3000);
    });
});

document.addEventListener('DOMContentLoaded', function() {


    const bannerText = document.querySelector('.banner-text');

    bannerText.addEventListener('animationend', () => {
        bannerText.style.transform = 'translateX(0%)';

    });
});
