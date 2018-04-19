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
    $('.js-search-container, .js-search-results, .js-menu').removeClass('hidden');
  });
}

function handleSearchRestart() {
  $('.js-menu').on('click', '.js-restart-search', function(event) {
    console.log ("navbar link clicked!");
    /*$('.js-start-container').hide();
    $('.js-search-container, .js-search-results').removeClass('hidden');*/
  });
}

function renderResult(result) {
  return `
  <div id="js-accordion-results" class="js-results">
    <h4>Artist: ${result.Name}</h4>

    <button class="accordion">Artist Bio:</button>
      <div class="js-bio panel">
        <p>${result.wTeaser}</p>
      </div>

    <button class="accordion">Listen:</button>
      <div class="js-video panel">
        <p>${result.yUrl}</p>
      </div>

    <button class="accordion"> More Info:</button>
      <div class="js-info panel">
          <p><a href="${result.wUrl}" target="_blank">Wiki</a></p>
    </div>
  `;
}


function displayTasteDiveSearchData(data) {
  const results = data.Similar.Results.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displayTasteDiveSearchData);
    $('.js-selected-artist').removeClass('hidden');
  });
}

function createApp() {
  watchSubmit();
  handleAppStart();
  handleSearchRestart();
}

$(createApp);
