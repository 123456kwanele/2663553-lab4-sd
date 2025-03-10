document.getElementById('country-form').addEventListener('submit', function(event) {
    event.preventDefault();
  const countryName = document.getElementById('country-name').value.trim();
  const countryInfoSection = document.getElementById('country-info');
  const borderingCountriesSection = document.getElementById('bordering-countries');
  if (!countryName) {
        alert('Please enter a country name.');
        return;
    }

  

  
});
