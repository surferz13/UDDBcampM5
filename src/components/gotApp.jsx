import React, { useEffect, useState } from 'react';

const GotApp = () => {
    const [regions, setRegions] = useState({});
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);

    useEffect(() => {
        fetch('https://anapioficeandfire.com/api/houses')
            .then(response => response.json())
            .then(data => {
                const houses = Array.isArray(data) ? data : data.results;
                groupByRegion(houses);
            });
    }, []);

    const groupByRegion = (houses) => {
        const grouped = houses.reduce((acc, house) => {
            const region = house.region || 'Unknown Region';
            if (!acc[region]) acc[region] = [];
            acc[region].push(house);
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
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Regiones de los 7 reinos</h1>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {Object.keys(regions).map(region => (
                    <button 
                        key={region} 
                        onClick={() => handleRegionClick(region)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        {region}
                    </button>
                ))}
            </div>
            {selectedRegion && (
                <div>
                    <h2 className="text-2xl font-semibold mb-2">{selectedRegion}</h2>
                    <ul className="list-disc pl-5">
                        {regions[selectedRegion].map(house => (
                            <li key={house.name} className="mb-1">
                                <button 
                                    onClick={() => handleHouseClick(house)} 
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                    {house.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GotApp;

