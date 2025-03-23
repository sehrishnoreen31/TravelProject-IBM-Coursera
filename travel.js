let recommendations = [];

// Fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    recommendations = data.recommendations;
    console.log('Data fetched successfully:', recommendations);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Search recommendations based on keyword and category
function searchRecommendations() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  console.log('Search keyword:', keyword);

  if (!keyword) {
    alert('Please enter a search term.');
    return;
  }

  // Map keywords to categories
  const categoryMap = {
    beach: 'beach',
    beaches: 'beach',
    temple: 'temple',
    temples: 'temple',
    city: 'city',
    cities: 'city'
  };

  const category = categoryMap[keyword]; // Get the category based on the keyword

  if (!category) {
    alert('No matching category found. Try "beach", "temple", or "city".');
    return;
  }

  const results = recommendations.filter(item => item.category === category);
  console.log('Search results:', results);

  // Hide the home page and show the recommendations section
  document.getElementById('home').style.display = 'none';
  document.getElementById('recommendations').style.display = 'block';
  displayResults(results);
}

// Display search results
function displayResults(results) {
  const recommendationsSection = document.getElementById('recommendations');
  recommendationsSection.innerHTML = '';

  if (results.length === 0) {
    recommendationsSection.innerHTML = `<p>No recommendations found.</p>`;
    return;
  }

  results.forEach(item => {
    const recommendationDiv = document.createElement('div');
    recommendationDiv.className = 'recommendation';
    recommendationDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    recommendationsSection.appendChild(recommendationDiv);
  });
}

// Clear search results and show the home page
function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('recommendations').innerHTML = '';
  document.getElementById('recommendations').style.display = 'none'; // Hide recommendations section
  document.getElementById('home').style.display = 'block'; // Show home page
}

// Show specific section (Home, About, Contact)
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';

  // Show search bar only on the home page and recommendations section
  if (sectionId === 'home' || sectionId === 'recommendations') {
    document.getElementById('search-bar').style.display = 'flex';
  } else {
    document.getElementById('search-bar').style.display = 'none';
  }
}

// Add event listener for Enter key in the search input
document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchRecommendations(); // Trigger search when Enter is pressed
  }
});

// Fetch data when the page loads
fetchData();