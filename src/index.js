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

function parseCurrency (currencyType){ 
  if (currencyType === 1) {
    return ["EUR", "Euro", "European"];
  } else if (currencyType === 2) {
    return ["GBP", "Pound", "British"];
  } else if (currencyType === 3) {
    return ["CNY", "Yuan", "Chinese"];
  } else if (currencyType === 4) {
    return ["JPY", "Yen", "Japanese"];
  } else if (currencyType === 5) {
    return ["MXN", "Peso", "Mexican"];
  } else {
    return ["", "Unknown", "Unknown"];
  }
}


function displayResults(response, parsedCurrency, amount) {
  if (response.conversion_rates) {
    const conversion = (amount * response.conversion_rates[parsedCurrency[0]]).toFixed(2);
    //console.log(response.conversion_rates);
    $('#show-currency').text(`You entered ${amount.toFixed(2)} USD, if we convert that into ${parsedCurrency[1]}s, that is worth ${conversion} ${parsedCurrency[2]} ${parsedCurrency[1]}s`);
  } else {
    console.log(response.conversion_rates);
    $('.show-errors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#currency-exchange').submit(function() {
    event.preventDefault();
    clearFields();
    const currencyType = parseInt($("#currency-type").val());
    const amount = parseInt($("#amount").val());
    const parsedCurrency = parseCurrency(currencyType);
    if (validateInputs(currencyType, amount)) {
      CurrencyExchangeService.getExchangeRate()
        .then(function(response) {
          displayResults(response, parsedCurrency, amount);
        });
    }
  });
});