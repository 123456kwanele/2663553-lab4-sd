document.getElementById('country-form').addEventListener('submit', function(event) {
    event.preventDefault();
  const countryName = document.getElementById('country-name').value.trim();
  if (!countryName) {
        alert('Please enter a country name.');
        return;
    }
    fetchCountryName(countryName);  
});
async function fetchCountryData(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    try{
        const response = await fetch(url);
        if(!reponse.ok){
            throw new Error("Country not found, please try your best");
        }
        const countryInfo = await response.json();
        displayCountryInfo(countryInfo[0]);
        catch (error) {
        console.error(error.message);
    }
}
async function displayCountryInfo(country) {
    const countryInfoSection = document.getElementById('country-info');
    const borderingCountriesSection = document.getElementById('bordering-countries');

    countryInfoSection.innerHTML = '';
    borderingCountriesSection.innerHTML = '';

    const capital = country.capital ? country.capital[0] : "N/A";
    const population = country.population.toLocaleString();
    const region = country.region;
    const flag = country.flags.png;

    countryInfoSection.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
        <img src="${flag}" alt="Flag of ${country.name.common}" width="150">
    `;
    if (country.borders) {
        const borderCountries = country.borders;
        if (borderCountries.length > 0) {
            let bordersHTML = '<h3>Bordering Countries:</h3>';
            for (const border of borderCountries) {
                try {
                    const borderCountry = await fetchBorderCountryData(border);
                    bordersHTML += `
                        <p>
                            ${borderCountry.name.common}
                            <img src="${borderCountry.flags.png}" alt="Flag of ${borderCountry.name.common}" width="50">
                        </p>
                    `;
                    borderingCountriesSection.innerHTML = bordersHTML;
                } catch (error) {
                    console.error("Error fetching bordering country data:", error);
                }
            }
        } else {
            borderingCountriesSection.innerHTML = '<p>No bordering countries available.</p>';
        }
    } else {
        borderingCountriesSection.innerHTML = '<p>No bordering countries available.</p>';
    }
}
async function fetchBorderCountryData(borderCode) {
    const borderApiUrl = `https://restcountries.com/v3.1/alpha/${borderCode}`;
    
    const response = await fetch(borderApiUrl);
    if (!response.ok) {
        throw new Error("Unable to fetch bordering country data.");
    }
    
    const data = await response.json();
    return data[0];
}




