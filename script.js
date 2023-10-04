const apiKey="3f4fb995521285ac2f1170e77b0424b1"
const searchInput=document.querySelector("#searchInput")
var searchButton=document.getElementById("searchButton")
const fivedayForecast=document.querySelector("#fivedayForecast")
const cityEl=document.querySelector("#selectedCity")
function searchCity(currentCity){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(weatherData){
        console.log(weatherData,"This is my city data")
        let todaysForecast=`
        <h2>${weatherData.name}</h2>
        <p>temp: ${weatherData.main.temp}</p>
        <p>humidity: ${weatherData.main.humidity}</p>
        <p>wind: ${weatherData.wind.speed}</p>
        
        `;
        cityEl.innerHTML=todaysForecast
        const lon=weatherData.coord.lon
        const lat=weatherData.coord.lat
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function(response){
            return response.json()
        })
        .then(function(weeklyWeather){
            console.log(weeklyWeather)
            let weeklyArray=weeklyWeather.list.filter(day=>day.dt_txt.includes("12:00:00"))
            let weekdayCard=""
            for(let i=0; i<weeklyArray.length; i++){
                let weekday=new Date(weeklyArray[i].dt_txt).toLocaleDateString().split(",")[0]
                let imgurl=weeklyArray[i].weather[0].icon
                let weekdayIcon=`<img src="http://openweathermap.org/img/wn/${imgurl}.png"/>`
                weekdayCard+=`
                <div>
                    <ul>
                        <li>${weekdayIcon}</li>
                        <li>${weekday}</li>
                        <li>temp: ${weeklyArray[i].main.temp}</li>
                        <li>humidity: ${weeklyArray[i].main.humidity}</li>
                    </ul>
                </div>
                `
                fivedayForecast.innerHTML=weekdayCard
            }
        })
    })
    console.log(currentCity)
}

searchButton.addEventListener("click", function(event){
event.preventDefault()
let currentCity=searchInput.value 
searchCity(currentCity)
})