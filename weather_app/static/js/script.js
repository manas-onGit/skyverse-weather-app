const apikey = "bda292d4622c06e95ae09163974feae5";

async function w() {
    const city = document.querySelector('#cityInput').value;
    
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "℃";
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('wind').innerHTML = data.wind.speed + " km/h";
        document.getElementById('humidity').innerHTML = data.main.humidity + "%";
    } catch (err) {
        console.error(err);
        alert("Error fetching data");
    }
}

document.getElementById("cityInput").addEventListener("input", async function() {
    const input = this.value;
    const list = document.getElementById("citySuggestions");
    list.innerHTML = "";

    if (input.length < 3) return;

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apikey}`;
    const res = await fetch(geoUrl);
    const cities = await res.json();

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;
        list.appendChild(option);
    });
});
