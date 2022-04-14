
import React, { useState, useEffect } from 'react';

function Kysely() {
    const [listkysely, setListKysely] = useState([]);
    const [kysely, setKysely] = useState([]);
    const [kyselyt, setKyselyt] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kyselyt')
        .then(res => res.json())
        .then(items => {
            setKyselyt(items)
        })
        .catch(err =>console.error(err))
    }, []);


    return(
        <div>
            <h1>ETUSIVU</h1>
                {
                kyselyt.map((kysely, index) =>
                <ul key={index}>{kysely.nimi}
                <li>{kysely.kuvaus}</li>
                </ul>
                )
                }
            
        </div>
    )
}

export default Kysely;
