// ============ DECLARING GLOBAL VARIABLES ==============

// Defining variables for the API query and setting the classification categories to search and display events from.
const SEARCH = "events";
const DISCOVERY = "stateCode";
const CITY = "city";
const DOMAIN = `https://app.ticketmaster.com/discovery/v2/${SEARCH}.json?`;
const API_KEY = "8dcrqNGbAz3pZiCLzRV0bxReOgbzOSDW";
const BASE_URL = `${DOMAIN}apikey=${API_KEY}`;

const form = document.querySelector("form");
const btnReset = document.querySelector("#reset");

const genreMusic = "Music";
const genreSport = "Sports";
const genreMisc = "Miscellaneous";
const genreIndividual = "Individual";
// Additional search genres available: 'Arts & Theatre' & 'Event Style'

const catMusic = document.querySelector(".music");
const catSport = document.querySelector(".sport");
const catMisc = document.querySelector(".misc");
const catIndividual = document.querySelector(".individual");

// ============ EVENT LISTENER - SEARCH RESULTS ==============

// Prompt to user for location values and present initial search results. Additional results detailed below. 
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const searchContainerMusic = document.querySelector('.music')
  const searchContainerSport = document.querySelector('.sport')
  const searchContainerMisc = document.querySelector('.misc')
  const searchContainerIndividual = document.querySelector('.individual')
  removePrevious(searchContainerMusic)
  removePrevious(searchContainerSport)
  removePrevious(searchContainerMisc)
  removePrevious(searchContainerIndividual)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const userCity = document.querySelector("#user-city-location");
  const userCityValue = userCity.value;
  if (userValue === '') {
    return
  }

  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}&${CITY}=${userCityValue}`;
  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  getLocation();
  
// Multiple API requests within one try/catch block. Perform a forEach loop on the requested data in order to append to DOM.
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
        const musicList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.music')
        .insertAdjacentHTML("afterbegin", musicList);
      });
      sportResults.forEach((result) => {
        const sportList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.sport')
        .insertAdjacentHTML("afterbegin", sportList);
      });
      miscResults.forEach((result) => {
        const miscList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.misc')
        .insertAdjacentHTML("afterbegin", miscList);
      });
      individualResults.forEach((result) => {
        const individualList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.individual')
        .insertAdjacentHTML("afterbegin", individualList);
        
      });
    } catch (error) {
      // Error messages displayed for invalid search results.
      const musicList = `Invalid Search`;
      document.querySelector('.music').insertAdjacentHTML("afterbegin", musicList);
      const sportList = `Invalid Search`;
      document.querySelector('.sport').insertAdjacentHTML("afterbegin", sportList);
      const miscList = `Invalid Search`;
      document.querySelector('.misc').insertAdjacentHTML("afterbegin", miscList);
      const individualList = `Invalid Search`;
      document.querySelector('.individual').insertAdjacentHTML("afterbegin", individualList);
      console.error(error);
    }
  }
});

// ============ EVENT LISTENER - DISPLAY MORE DETAIL ==============
// Provide additional event details for selected category. Results displayed in a modal.

// DETAIL - MUSIC
catMusic.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const userCity = document.querySelector("#user-city-location");
  const userCityValue = userCity.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}&${CITY}=${userCityValue}`;
  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMusic);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
  activateModel()
});

// DETAIL - SPORT
catSport.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const userCity = document.querySelector("#user-city-location");
  const userCityValue = userCity.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}&${CITY}=${userCityValue}`;
  const searchSize = "9"; // default size is 20
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlSport);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
  activateModel()
});

// DETAIL - MISC
catMisc.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const userCity = document.querySelector("#user-city-location");
  const userCityValue = userCity.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}&${CITY}=${userCityValue}`;
  const searchSize = "9"; // default size is 20
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMisc);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
  activateModel()
});

// DETAIL - INDIVIDUAL
catIndividual.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const userCity = document.querySelector("#user-city-location");
  const userCityValue = userCity.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}&${CITY}=${userCityValue}`;
  const searchSize = "9"; // default size is 20
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlIndividual);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
  activateModel()
});

// ========================== REMOVE PREVIOUS ELEMENTS =======================
// Removing previous search results before appending new results to DOM.

function removePrevious(parentElement) {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild)
  }
}
  
// ============================= MODAL CLICKS ================================
// Functionality for opening and closing the additional event detail modal.

const modalClick = document.querySelector('.result-container')
const overlayClick = document.querySelector('.overlay')

function activateModel() {
  modalClick.classList.add('active')
  overlayClick.classList.add('active')
  }

function deactivateModel() {
    modalClick.classList.remove('active')
    overlayClick.classList.remove('active')
  }

overlayClick.addEventListener('click', () => {
  if (modalClick.classList.contains('active') === true) {
    deactivateModel()
  }
})
    

