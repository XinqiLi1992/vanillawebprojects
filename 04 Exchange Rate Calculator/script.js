const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateInfo = document.getElementById('rate-info');
const swapButton = document.getElementById('swap-btn');

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  const amount_one = amountOne.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return null;
  }).then((info) => {
    if (info) {
      const rate = info.rates[currency_two];
      rateInfo.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountTwo.value = (amount_one * rate).toFixed(2);
    }
  })
}

function swap() {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swapButton.addEventListener('click', swap);

calculate();