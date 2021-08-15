import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './currency-service.js';

function clearFields() {
  $('#show-currency').val("");
  $('.show-errors').text("");
}

function displayResults(response) {
  if (response.main) {
    $('#show-currency').text(`The exchange rate is ${response}`);
  } else {
    $('.show-errors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#currency-exchange').click(function() {
    const currencyType = $('#country').val();
    const amount = $("#amount").val();
    console.log(currencyType);
    console.log(amount);
    clearFields();
    CurrencyExchangeService.getCurrency()
      .then(function(response) {
        displayResults(response);
      });
  });
});