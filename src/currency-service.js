export default class CurrencyExchangeService {  
  static getExchangeRate() {
    //return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
    return fetch("https://v6.exchangerate-api.com/v6/f8c3252ce80635f309a437cd/latest/USD")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}