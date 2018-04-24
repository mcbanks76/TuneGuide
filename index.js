<<<<<<< HEAD
'use strict'

const TASTEDIVE_SEARCH_URL = "https://tastedive.com/api/similar";

function getDataFromAPI(searchTerm, callback) {
  const settings = {
    url: TASTEDIVE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      type:'music',
      info: 1,
      limit: 5,
      k: '305515-MuseFind-0SLSRF2Y',
    },
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function handleAppStart() {
  $('.js-start-container').on('click', '.startButton', function(event) {
    $('.js-start-container').hide();
    $('.js-search-container, .js-search-results, .js-selected-artist, .navbar').removeClass('sr-only');
  });
}

function handleSearchRestart() {
 $('.js-menu').on('click', '.js-restart-search', function(event) {
    $('.js-search-results, .js-selected-artist').empty();
  });
}

function renderResult(result) {
  return `
  <h4>Artist: ${result.Name}</h4></br>
  <div class ="accordion">

    <h5>Listen:</h5>
      <div class="js-video panel">
        <iframe class="video" width="420" height="315" src="${result.yUrl}" title="Video Link">
        </iframe>
      </div>

    <h5>Artist Bio:</h5>
      <div class="js-bio panel">
        <p>${result.wTeaser}</p>
      </div>

    <h5> More Info:</h5>
      <div class="js-info panel">
          <p><a href="${result.wUrl}" target="_blank">Wiki</a></p>
      </div>
  </div>
  `;
}

function renderSearchResult(result) {
return `
<div class="search-result">
  <p> Your Selection:</br><span class="result-name">${result.Name}</span></p>

  <p class="result-description">Based on your selection, here are your recommendations:</p>
</div>`
}

function displayUserSearchData(data) {
  const searchData = data.Similar.Info.map((item, index) => renderSearchResult(item));
  $('.js-selected-artist').html(searchData);
}

function displayTasteDiveSearchData(data) {
  const results = data.Similar.Results.map((item, index) => renderResult(item));
  if (results.length != 0) {
    $('.js-search-results').html(results);
    
    $('.accordion').accordion({
      collapsible: true
    });

    $('.accordion').accordion( "option", "active", false);
  
    $( ".selector" ).accordion("option", "heightStyle", "content");
  }

  else {
     $('.js-search-results').html("<p> Sorry! No Results Found. Please Search Again.</p>");
  }  
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displayUserSearchData);
    getDataFromAPI(query, displayTasteDiveSearchData);
  });
}

function createApp() {
  watchSubmit();
  handleAppStart();
  handleSearchRestart();
}

$( function() {

  createApp();
=======
'use strict'

const TASTEDIVE_SEARCH_URL = "https://tastedive.com/api/similar";

function getDataFromAPI(searchTerm, callback) {
  const settings = {
    url: TASTEDIVE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      type:'music',
      info: 1,
      limit: 5,
      k: '305515-MuseFind-0SLSRF2Y',
    },
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function handleAppStart() {
  $('.js-start-container').on('click', '.startButton', function(event) {
    $('.js-start-container').hide();
    $('.js-search-container, .js-search-results, .js-selected-artist, .navbar').removeClass('sr-only');
  });
}

function handleSearchRestart() {
 $('.js-menu').on('click', '.js-restart-search', function(event) {
    console.log ("navbar link clicked!");
    $('.js-search-results, .js-selected-artist').empty();
  });
}

function renderResult(result) {
  return `
  <h4>Artist: ${result.Name}</h4></br>
  <div class = "accordion">

    <h5>Listen:</h5>
      <div class="js-video panel">
        <iframe class="video" width="420" height="315" src="${result.yUrl}" title="Video Link">
        </iframe>
      </div>

    <h5>Artist Bio:</h5>
      <div class="js-bio panel">
        <p>${result.wTeaser}</p>
      </div>

    <h5> More Info:</h5>
      <div class="js-info panel">
          <p><a href="${result.wUrl}" target="_blank">Wiki</a></p>
      </div>
  </div>
  `;
}

function renderSearchResult(result) {
return `
<p> You Chose:</p>

<p class="result-name">${result.Name}</p></br>

<p class="result-description">Based on your selection, here are your recommendations:</p>`
}

function displayUserSearchData(data) {
  const searchData = data.Similar.Info.map((item, index) => renderSearchResult(item));
  $('.js-selected-artist').html(searchData);
}

function displayTasteDiveSearchData(data) {
  const results = data.Similar.Results.map((item, index) => renderResult(item));
  if (results.length != 0) {
    $('.js-search-results').html(results);
    
    $('.accordion').accordion({
      collapsible: true
    });

    $('.accordion').accordion( "option", "active", false);
  
    $( ".selector" ).accordion("option", "heightStyle", "content");
  }

  else {
     $('.js-search-results').html("<p> Sorry! No Results Found. Please Search Again.</p>");
  }  
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displayUserSearchData);
    getDataFromAPI(query, displayTasteDiveSearchData);
  });
}

function createApp() {
  watchSubmit();
  handleAppStart();
  handleSearchRestart();
}

$( function() {

  createApp();
>>>>>>> effc0acf07e4abbf47f7478ec9b427bd88a162b3
});