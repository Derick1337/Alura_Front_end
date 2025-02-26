const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

async function requestApi(searchTerm) {
    try {
        const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        resultArtist.innerHTML = `<p>Erro ao carregar resultados. Tente novamente.</p>`;
        resultArtist.classList.remove('hidden');
    }
}

function displayResults(results) {
    resultPlaylist.classList.add("hidden");

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    artistName.innerText = '';
    artistImage.src = '';

    if (results.length > 0) {
        const firstResult = results[0];
        artistName.innerText = firstResult.name;
        artistImage.src = firstResult.urlImg;
    } else {
        artistName.innerText = 'Nenhum artista encontrado';
        artistImage.src = './src/assets/icons/default-artist.png';
    }

    resultArtist.classList.remove('hidden');
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    clearTimeout(searchInput.debounceTimeout);
    searchInput.debounceTimeout = setTimeout(() => {
        requestApi(searchTerm);
    }, 300);
});
