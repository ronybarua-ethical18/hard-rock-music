
// search by enter key 
document.getElementById("search-song")
.addEventListener("keypress", function(event) {
    if (event.key == 'Enter')
        document.getElementById('search-button').click();
});

const searchSongs = async () => {
    const searchSong = document.getElementById('search-song').value;
    
    try {
        
        const url = `https://api.lyrics.ovh/suggest/:${searchSong}`;
        toggleSpinner();
        const response =await fetch(url)
        const data = await response.json()
        displaySongs(data.data);   
    } catch (error) {
        displayError(error);
    }
}

const displaySongs = (songs) => {
    const songInfo = document.getElementById('song-info');
    songInfo.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = `single-result row align-items-center my-3 p-3`;
        songDiv.innerHTML = ` <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;
        songInfo.appendChild(songDiv);
        toggleSpinner();
    });
}

/* const getLyrics = async (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url)
    const data =  await response.json();
    displayLyrics(data.lyrics);
} */

// spinner
const toggleSpinner = () =>{
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-info');
    songs.classList.toggle('d-lg-none');
    spinner.classList.toggle('d-lg-none');
}

const getLyrics = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError('Something went wrong! check your code'));
}
const displayLyrics = (lyrics) =>{
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText=lyrics;

}

const displayError = (error) =>{
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}