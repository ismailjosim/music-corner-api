// Todo: Get element by id name :
const getElementId = (elementId) => {
  const element = document.getElementById(elementId);
  return element;
};

// Todo: Get element by id name :
const handleSearch = () => {
  const keyword = getElementId("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${ keyword.value }`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data.artists));

};

// Todo: Show artist function :
const showArtists = (data) => {
  const artistContainer = getElementId("artists");
  artistContainer.innerHTML = '';
  data.forEach(artist => {

    const div = document.createElement("div");
    div.classList.add("artist-card");

    div.innerHTML = `
          <div class="image-container">
            <div class="image-container-inner">
                <img src="${ artist.strArtistThumb ? artist.strArtistThumb : artist.strArtistLogo }" />
            </div>
          </div>
          <div class="info-container">
              <h2 class="fw-bold">${ artist.strArtist }</h2>
              <p>Country: ${ artist.strCountry }</p>
              <p>Style: ${ artist.strGenre }</p>
          </div>
          <button class="album-button">
              <i class="fa-solid fa-compact-disc"></i>
              <p onclick="loadAlbums('${ artist.idArtist }')" class="button-title pt-3">Albums</p>
          </button>`;

    artistContainer.appendChild(div);

  });
};

handleSearch();


// Todo: Load artist all Albums :
const loadAlbums = (albumId) => {
  const url = (`https://theaudiodb.com/api/v1/json/2/album.php?i=${ albumId }`);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = getElementId("artists");
  artistContainer.innerHTML = "";
};

//Todo: show album data :
const showAlbum = (data) => {
  const allAlbums = data.album;

  const albumContainer = getElementId("albums");
  albumContainer.innerHTML = "";

  console.log(allAlbums[0]);

  for (const album of allAlbums) {

    // destructure
    // const { strDescriptionEN } = album;

    // console.log(strDescriptionEN);
    const albumDescription = album?.strDescriptionEN?.slice(0, 200) + "...<a>Read More</a>";

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="card">
                    <img src="${ album.strAlbumThumb }" class="card-img-top" alt="Thumbnail Image">
                    <div class="card-body">
                      <h5 class="card-title">Album Label: ${ album.strLabel }</h5>
                      <div class="d-flex justify-content-between align-items-center">
                        <p>Rating: <span class="text-info fw-bold">${ album.intScore }</span></p>
                        <p>Released Year: <span class="text-info fw-bold">${ album.intYearReleased }</span></p>
                        <p>Artist: <span class="text-info fw-bold">${ album.strArtist }</span></p>
                      </div>
                      <p class="card-text" style="text-align: justify;">${ albumDescription }</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center pt-3">
                      <p class="fw-semibold">Total Sales: <span class="text-danger fw-bold">${ album.intSales } Copies</span></p>
                      <p class="fw-semibold">Genre: <span class="text-danger fw-bold">${ album.strGenre } </span></p>
                    </div>
                </div>`;

    albumContainer.appendChild(div);
  }
};
