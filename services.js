document.addEventListener('DOMContentLoaded', () => {
    const musicSearchInput = document.getElementById('music-search-input');
    const musicSearchButton = document.getElementById('music-search-button');
    const musicResultsContainer = document.getElementById('music-results-container');
    const musicSpinner = document.getElementById('music-spinner');

    musicSearchButton.addEventListener('click', () => {
        const searchTerm = musicSearchInput.value.trim();
        if (searchTerm) {
            musicResultsContainer.innerHTML = '';
            musicSpinner.classList.remove('d-none');
            fetchMusicSuggestions(searchTerm);
        }
    });

    musicSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            musicSearchButton.click();
        }
    });

    async function fetchMusicSuggestions(query) {
        // Replace this with your actual API call to Spotify or a similar service
        // You'll need to handle authentication and data retrieval based on the API's documentation

        // Placeholder response for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        musicSpinner.classList.add('d-none');

        const suggestions = [
            { title: `"${query}" Party Mix 1`, link: '#' },
            { title: `Chill ${query} Vibes`, link: '#' },
            { title: `Top ${query} Dance Tracks`, link: '#' }
        ];

        if (suggestions.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('list-unstyled');
            suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = suggestion.link;
                a.textContent = suggestion.title;
                li.appendChild(a);
                ul.appendChild(li);
            });
            musicResultsContainer.appendChild(ul);
        } else {
            musicResultsContainer.textContent = 'No music suggestions found for your search.';
        }
    }
});