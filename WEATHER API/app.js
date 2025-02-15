document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const city = document.querySelector('#city');
    const weatherOutput = document.querySelector('#weather-output');
    const checkWeatherBtn = document.querySelector('#check-weather-btn');  

    // Add event listener to the button
    checkWeatherBtn.addEventListener('click', (event) => {
        event.preventDefault();  

        const cityName = city.value.trim();
        
        if (!cityName) {
            alert('Please enter a valid city name!');
            return;
        }

        console.log(cityName);  

        weatherOutput.innerHTML = "Loading...";

        axios(`http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${cityName}&aqi=no`)
            .then(res => {
                // Extract weather information from response
                const temperature = res.data.current.temp_c;
                const condition = res.data.current.condition.text;
                const location = res.data.location.name;

                weatherOutput.innerHTML = `
                    <h3>Weather in ${location}</h3>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Condition: ${condition}</p>
                `;
            })
            .catch(err => {
                console.log('Error ==> ', err);
                alert('No city found or API error');
                weatherOutput.innerHTML = "Please try again.";
            });
    });
});
