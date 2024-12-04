const searchBox = document.querySelector('.searchBox');
const mktCapBtn = document.querySelector('.mktCap');
const percentageBtn = document.querySelector('.Percentage');
const cryptoTable = document.querySelector('.cryptoTable');

// Function to fetch data using .then()
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch data using async/await
async function fetchDataWithAsync() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Initial fetch with async/await
fetchDataWithAsync();

// Function to render data in the table
function renderTable(data) {
  cryptoTable.innerHTML = ''; // Clear existing rows
  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}" width="30" /></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
      </tr>
    `;
    cryptoTable.innerHTML += row;
  });
}

// Search functionality
searchBox.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = Array.from(cryptoTable.querySelectorAll('tr'));
  rows.forEach(row => {
    const name = row.cells[1].innerText.toLowerCase();
    const symbol = row.cells[2].innerText.toLowerCase();
    row.style.display = (name.includes(searchTerm) || symbol.includes(searchTerm)) ? '' : 'none';
  });
});

// Sort by Market Cap
mktCapBtn.addEventListener('click', async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  const data = await response.json();
  const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

// Sort by Percentage Change (Assuming you have percentage change data)
percentageBtn.addEventListener('click', async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  const data = await response.json();
  const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
});
