// List of some common currencies
const currencyList = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'SGD', name: 'Singapore Dollar' }
];

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

// Populate dropdowns
function populateDropdowns() {
    currencyList.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency.code;
        option1.textContent = `${currency.code} - ${currency.name}`;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency.code;
        option2.textContent = `${currency.code} - ${currency.name}`;
        toCurrency.appendChild(option2);
    });
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }
    if (from === to) {
        resultDiv.textContent = 'Please select different currencies.';
        return;
    }

    resultDiv.textContent = 'Converting...';

    try {
        // Frankfurter API: https://www.frankfurter.app/docs/
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        const data = await response.json();
        if (data.rates && data.rates[to] !== undefined) {
            resultDiv.textContent = `${amount} ${from} = ${data.rates[to].toFixed(2)} ${to}`;
        } else {
            resultDiv.textContent = 'Conversion failed. Please try again.';
        }
    } catch (error) {
        resultDiv.textContent = 'Error fetching exchange rate.';
    }
}

convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('DOMContentLoaded', populateDropdowns);
