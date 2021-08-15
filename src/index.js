import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './currency-service.js'

function clearFields() {
  $('#show-currency').val("");
  $('.showErrors').text("");
}

function displayResults(response) {
  if (response.main) {
    $('#show-currency').text(`The exchange rate is ${response}`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#currency-exchange').click(function() {
    const country = $('#country').val();
    const amount = $("#amount").val();
    clearFields();
    CurrencyExchangeService.getCurrency()
      .then(function(response) {
        displayResults(response);
      });
  });
});