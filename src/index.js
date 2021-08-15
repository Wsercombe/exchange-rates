import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './currency-service.js';

function clearFields() {
  $('#show-currency').text("");
  $('.show-errors').text("");
}

function validateInputs(currencyType, amount) {
  console.log(amount);
  if (!amount || amount < 0) {
    $('.show-errors').text("Please enter a number above 0");
    return false;
  }
  if (!(currencyType >= 0 && currencyType <= 5)) {
    $('.show-errors').text("Please enter a valid currency");
    return false;
  }
  return true;
}


function displayResults(response) {
  if (response.conversion_rates) {
    //console.log(response.conversion_rates);
    $('#show-currency').text(`The exchange rate is ${response}`);
  } else {
    console.log(response.conversion_rates);
    $('.show-errors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#currency-exchange').click(function() {
    event.preventDefault();
    clearFields();
    const currencyType = parseInt($("#currency-type").val());
    const amount = parseInt($("#amount").val());
    if (validateInputs(currencyType, amount)) {
      CurrencyExchangeService.getExchangeRate()
        .then(function(response) {
          displayResults(response);
        });
    }
  });
});