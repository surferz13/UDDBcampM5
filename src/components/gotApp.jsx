import React, { useEffect, useState } from 'react'

const gotApp = () => {
    const [regions, setRegions] = useState([]);
    const [houses, setHouses] = useState({});
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);

    useEffect(() => {
        fetch('https://anapioficeandfire.com/api/houses')
        .then(response => response.json())
        .then(data => {
        setHouses(data);
        groupByRegion(data);
      });
  }, []);

  const groupByRegion = (houses) => {
    const grouped = houses.reduce((acc, houses) => {
      const region = house.region;
      if (!acc[region]) acc[region] = [];
      acc[region].push(houses);
      return acc;
    }, {});
    setRegions(grouped);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedHouse(null);
  };

  const handleHouseClick = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div>
      <h1>Regiones de los 7 reinos</h1>
      <p></p>

        <div>
          {Object.keys(regions).map(region => (
            <button key={region} onClick={() => handleRegionClick(region)}>
              {region}
            </button>
          ))}
        </div>
        {selectedRegion && (
          <div>
            <h2>{selectedRegion}</h2>
            <ul>
              {regions[selectedRegion].map(house => (
                <li key={house.name}>
                  <button onClick={() => handleHouseClick(house)}>
                    {house.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      );
}
export default gotApp