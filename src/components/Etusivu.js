import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import PopUp from './PopUp.js'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navigaatio from './Navigaatio.js';

export default function Etusivu() {
    
    const [kyselyt, setKyselyt] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        fetchKysely();
    }, []);

    const fetchKysely = () => {
        fetch('http://localhost:8080/kyselyt')
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt
            .then(res => res.json())
            .then(data => {
                setKyselyt(data)
            })
            .catch(err => console.error(err))
    }

    return (
            <div>
            <Navigaatio />
            <h1>Kyselyt</h1>
            {
                kyselyt.map((kysely, index) =>
                    /*<tr key={index}>
                        <td>{kysely.nimi}</td>
                        <td>{kysely.kuvaus}</td>
                        <td><Button color="success" variant="contained" href={`kysely/${kysely.id}`}>Kyselyyn</Button></td>
                        <td><Button color="primary" variant="contained" href={`vastaukset/${kysely.id}`}>Vastaukset</Button></td>
                    </tr>*/
                    <div key={kysely.id}>
                        <div>{kysely.nimi}</div>
                        <Link to={`/kysely/${kysely.id}`}>
                            <button value={kysely.id} color="success" variant="contained">Kyselyyn</button>
                        </Link>
                    </div>
                )
            }
            <div>
                <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
                </PopUp>
            </div>
        </div>
    )

}