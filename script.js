const apiKey="3f4fb995521285ac2f1170e77b0424b1"
const searchInput=document.querySelector("#searchInput")
var searchButton=document.getElementById("searchButton")
const cityEl=document.querySelector("#selectedCity")
function searchCity(currentCity){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(weatherData){
        console.log(weatherData.wind,"This is my city data")
        let todaysForecast=`
        <h2>${weatherData.name}</h2>
        <p>temp: ${weatherData.main.temp}</p>
        <p>humidity: ${weatherData.main.humidity}</p>
        <p>wind: ${weatherData.wind.speed}</p>
        
        `;
        cityEl.innerHTML=todaysForecast
    })
    console.log(currentCity)
}

searchButton.addEventListener("click", function(event){
event.preventDefault()
let currentCity=searchInput.value 
searchCity(currentCity)
})