// ============ DECLARING GLOBAL VARIABLES ==============

const SEARCH = "events";
const DISCOVERY = "stateCode";
const DOMAIN = `https://app.ticketmaster.com/discovery/v2/${SEARCH}.json?`;
const API_KEY = "8dcrqNGbAz3pZiCLzRV0bxReOgbzOSDW";
const BASE_URL = `${DOMAIN}apikey=${API_KEY}`;

const btnSubmit = document.querySelector("#location-confirm");
const btnReset = document.querySelector("#reset");

const genreMusic = "Music";
const genreSport = "Sports";
const genreMisc = "Miscellaneous";
const genreIndividual = "Individual";
// const genreArt = 'Arts & Theatre'
// const genreEvent = 'Event Style'

const btnMusic = document.querySelector("#btn-music");
const btnSport = document.querySelector("#btn-sport");
const btnMisc = document.querySelector("#btn-misc");
const btnIndividual = document.querySelector("#btn-individual");
// const btnArt = document.querySelector('#btnArt')
// const btnEvent = document.querySelector('#btnEvent')

// ============ EVENT LISTENER - SEARCH RESULTS ==============

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault()
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  if (userValue === '') {
    // console.log("value is null")
    return
  }
  // const userValue = 'NY' // test value
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;

  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  // const urlArt = `${urlConcat}&classificationName=${genreArt}&size=${searchSize}`
  // const urlEvent = `${urlConcat}&classificationName=${genreEvent}&size=${searchSize}`

  getLocation();

  async function getLocation() {
    try {
      const musicQ = await axios.get(urlMusic);
      const sportQ = await axios.get(urlSport);
      const miscQ = await axios.get(urlMisc);
      const individualQ = await axios.get(urlIndividual);

      let musicResults = musicQ.data._embedded.events;
      let sportResults = sportQ.data._embedded.events;
      let miscResults = miscQ.data._embedded.events;
      let individualResults = individualQ.data._embedded.events;

      musicResults.forEach((result) => {
        let musicList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
          .querySelector("#btn-music")
          .insertAdjacentHTML("afterbegin", musicList);
      });

      sportResults.forEach((result) => {
        let sportList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
          .querySelector("#btn-sport")
          .insertAdjacentHTML("afterbegin", sportList);
      });

      miscResults.forEach((result) => {
        let miscList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
          .querySelector("#btn-misc")
          .insertAdjacentHTML("afterbegin", miscList);
      });

      individualResults.forEach((result) => {
        let individualList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
          .querySelector("#btn-individual")
          .insertAdjacentHTML("afterbegin", individualList);
      });
      // console.log(musicResults)
      // console.log(sportResults)
      // console.log(miscResults)
      // console.log(individualResults)
    } catch (error) {
      console.error(error);
    }
  }
});

// ============ EVENT LISTENER - DISPLAY MORE DETAIL ==============

// DETAIL - MUSIC

btnMusic.addEventListener("click", () => {
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  // const userValue = 'NY' // test value
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;

  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  // const urlArt = `${urlConcat}&classificationName=${genreArt}&size=${searchSize}`
  // const urlEvent = `${urlConcat}&classificationName=${genreEvent}&size=${searchSize}`

  displayMoreInfo();

  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMusic);

      let attachResults = moreInfo.data._embedded.events;

      attachResults.forEach((result) => {
        let appendToResultGrid = `
        <ul class="result-card">
        <li class="list-result" id="eventName">Event Name: ${result.name}</li>
        <a href="${result.url}">Event URL</a>
        <li class="list-result" id="eventDate">Event Date: ${result.dates.start.localDate
        }</li>
        <li class="list-result" id="eventTime">Event Time is ${
          result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
        }</li>
        </ul>
        `;
        document
          .querySelector(".result-container")
          .insertAdjacentHTML("afterbegin", appendToResultGrid);
      });
    } catch (error) {
      console.error(error);
    }
    // <a href="${result.seatmap.staticUrl}">Venue Seatmap URL</a>
  }
});

// DETAIL - SPORT
btnSport.addEventListener("click", () => {
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  // const userValue = 'NY' // test value
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;

  const searchSize = "9"; // default size is 20
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;

  displayMoreInfo();

  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlSport);

      let attachResults = moreInfo.data._embedded.events;

      attachResults.forEach((result) => {
        let appendToResultGrid = `
        <ul class="result-card">
        <li class="list-result" id="eventName">Event Name: ${result.name}</li>
        <a href="${result.url}">Event URL</a>
        <li class="list-result" id="eventDate">Event Date: ${
          result.dates.start.localDate
        }</li>
        <li class="list-result" id="eventTime">Event Time is ${
          result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
        }</li>
        </ul>
        `;
        document
          .querySelector(".result-container")
          .insertAdjacentHTML("afterbegin", appendToResultGrid);
      });
    } catch (error) {
      console.error(error);
    }
    // <a href="${result.seatmap.staticUrl}">Venue Seatmap URL</a>
  }
});

// DETAIL - MISC
btnMisc.addEventListener("click", () => {
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  // const userValue = 'NY' // test value
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;

  const searchSize = "9"; // default size is 20
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  displayMoreInfo();

  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMisc);

      let attachResults = moreInfo.data._embedded.events;

      attachResults.forEach((result) => {
        let appendToResultGrid = `
        <ul class="result-card">
        <li class="list-result" id="eventName">Event Name: ${result.name}</li>
        <a href="${result.url}">Event URL</a>
        <li class="list-result" id="eventDate">Event Date: ${
          result.dates.start.localDate
        }</li>
        <li class="list-result" id="eventTime">Event Time is ${
          result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
        }</li>
        </ul>
        `;
        document
          .querySelector(".result-container")
          .insertAdjacentHTML("afterbegin", appendToResultGrid);
      });
    } catch (error) {
      console.error(error);
    }
    // <a href="${result.seatmap.staticUrl}">Venue Seatmap URL</a>
  }
});

// DETAIL - INDIVIDUAL
btnIndividual.addEventListener("click", () => {
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  // const userValue = 'NY' // test value
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;

  const searchSize = "9"; // default size is 20
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  displayMoreInfo();

  async function displayMoreInfo() {
    try {
      // clearResults(attachResults)

      const moreInfo = await axios.get(urlIndividual);

      let attachResults = moreInfo.data._embedded.events;

      attachResults.forEach((result) => {
        let appendToResultGrid = `
        <ul class="result-card">
        <li class="list-result" id="eventName">Event Name: ${result.name}</li>
        <a href="${result.url}">Event URL</a>
        <li class="list-result" id="eventDate">Event Date: ${
          result.dates.start.localDate
        }</li>
        <li class="list-result" id="eventTime">Event Time is ${
          result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
        }</li>
        </ul>
        `;
        document
          .querySelector(".result-container")
          .insertAdjacentHTML("afterbegin", appendToResultGrid);

        // <a href="${result.seatmap.staticUrl}">Venue Seatmap URL</a>

        // ====== Couldn't display this as the background ========
        // <img src="${result.url}">
        // ====== Old code ======
        // <li class="list-result" id="eventUrl">Event URL</li>
        // <li class="list-result" id="venueUrl">Venue Seatmap: ${result.seatmap.staticUrl}</li>
      });
    } catch (error) {
      console.error(error);
    }
  }
});

// ========================== REMOVE ELEMENT =======================

function clearResults(cardsToRemove) {
  while (cardsToRemove.lastChild) {
    cardsToRemove.removeChild(result.lastChild);
  }
}

/*

// ===================== APPENDING RESULTS TO GRID IDS =============

show result 1 show name, url, date, time, venue,
result 2 & 3 show name, url & date, time
result 4 - 9 show name, url & date    

// ======= ISSUE: CANT PULL FROM THE EMBEDDED ARRAY ========
console.log(result.images) // `0: {url: ".jpg"` this is the default picture
console.log(result._embedded.venues) // `0: {name: "VenueName"` this is where the Venue is embedded
console.log(result._embedded.priceRanges) // `0: max` & `0: min`
sale status as well

*/
