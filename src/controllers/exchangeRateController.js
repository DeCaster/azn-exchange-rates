const axios = require('axios');
const xml2js = require('xml2js');
const ExchangeRate = require('../models/ExchangeRate');
const SearchHistory = require('../models/SearchHistory');
const { handleError, handleNotFound } = require('../utils/errorHandler');
const saveSearchHistory = require('../utils/saveSearchHistory'); 


const getRates = async (req, res) => {
  let { date } = req.params;
  const userId = req.user.id;

  console.log(`Received request for rates on date: ${date}`);

  const dateParts = date.split('.');
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  try {
    const existingRates = await ExchangeRate.find({ date: formattedDate });
    if (existingRates.length) {
      console.log(`Found existing rates for date: ${formattedDate}`);
      await saveSearchHistory(userId, 'date', date);
      return res.json(existingRates);
    }
  } catch (err) {
    return handleError(res, err, 'Error checking existing rates');
  }

  try {
    console.log(`Fetching rates from external source for date: ${date}`);
    const response = await axios.get(`https://www.cbar.az/currencies/${date}.xml`);
    console.log(`Raw XML response: ${response.data}`);

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    console.log(`Parsed XML response: ${JSON.stringify(result)}`);

    if (result && result.ValCurs && result.ValCurs.ValType) {
      const rates = [];

      result.ValCurs.ValType.forEach(valType => {
        if (valType.Valute) {
          valType.Valute.forEach(currency => {
            rates.push({
              date: formattedDate,
              currency: currency.$.Code,
              rate: parseFloat(currency.Value[0])
            });
          });
        }
      });

      try {
        await ExchangeRate.insertMany(rates);
        console.log(`Rates fetched and saved to DB for date: ${formattedDate}`);
        await saveSearchHistory(userId, 'date', date); // Save search history
        res.json(rates);
      } catch (err) {
        return handleError(res, err, 'Error saving rates to DB');
      }
    } else {
      return handleError(res, null, 'Unexpected XML structure');
    }
  } catch (error) {
    return handleError(res, error, `Error fetching rates for date: ${date}`);
  }
};

const getRateByDateAndCurrency = async (req, res) => {
  const { date, currency } = req.params;
  const userId = req.user.id;

  try {
    const rate = await ExchangeRate.findOne({ date, currency });
    if (rate) {
      await saveSearchHistory(userId, 'date and currency', `${date} - ${currency}`);
      res.json(rate);
    } else {
      return handleNotFound(res, 'Rate not found');
    }
  } catch (error) {
    return handleError(res, error, 'Error fetching rate by date and currency');
  }
};

const getRatesByCurrency = async (req, res) => {
  const { currency } = req.params;
  const userId = req.user.id;

  try {
    const rates = await ExchangeRate.find({ currency });
    if (rates.length > 0) {
      await saveSearchHistory(userId, 'currency', currency);
      res.json(rates);
    } else {
      return handleNotFound(res, 'Rates not found');
    }
  } catch (error) {
    return handleError(res, error, 'Error fetching rates by currency');
  }
};

module.exports = { getRates, getRateByDateAndCurrency, getRatesByCurrency };
