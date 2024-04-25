import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=85ac1aee05255a869cffb94234769299`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  const translateWeatherDescription = (description) => {
    switch (description) {
      case 'Clouds':
        return 'Nuvens';
      default:
        return description;
    }
  };

  const handleCustomAlert = () => {
    // Implementar a lógica para configurar alertas personalizados
    alert('Configurar alerta personalizado...');
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Digite uma localidade"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{translateWeatherDescription(data.weather[0].main)}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Sensação Térmica</p>
            </div>
            <div className="humidade">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Umidade</p>
            </div>
            <div className="vento">
              {data.wind ? (
                <p className="bold">{(data.wind.speed * 1.60934).toFixed()} km/h</p>
              ) : null}
              <p>Velocidade do Vento</p>
            </div>
            <div className="custom-alert">
              <button onClick={handleCustomAlert}>Configurar Alerta Personalizado</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
