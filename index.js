'use strict'
const TASTEDIVE_SEARCH_URL = "https://tastedive.com/api/similar";

function getDataFromApi(searchTerm, callback) {
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

function renderResult(result) {
  console.log(result);
 return `<div>
      <h4>
      <span class="js-result-name">${result.Name}</span></h4>
      <p>${result.wTeaser}></br></p>
    </div>
  `;

}

function displayTasteDiveSearchData(data) {
  console.log("search data function loaded!");
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
    getDataFromApi(query, displayTasteDiveSearchData)
  });
}

$(watchSubmit);