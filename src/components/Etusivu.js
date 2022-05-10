
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import PopUp from './PopUp.js'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Etusivu() {
    const [kyselyt, setKyselyt] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        fetchKysely();
    }, []);

    const fetchKysely = () => {
        fetch('http://localhost:8080/kyselyt')
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt
            .then(res => res.json())
            .then(items => {
                setKyselyt(items)
            })
            .catch(err => console.error(err))
    }

    return (
        <div style={{
            backgroundColor: '#282c34',
          }}>
            <h1>ETUSIVU</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Nimi</th>
                        <th>Kuvaus</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        kyselyt.map((kysely, index) =>
                            <tr key={index}>
                                <td>{kysely.nimi}</td>
                                <td>{kysely.kuvaus}</td>
                                <td><Button color="success" variant="contained" href={`kysely/${kysely.id}`}>Kyselyyn</Button></td>
                                <td><Button color="primary" variant="contained" href={`vastaukset/${kysely.id}`}>Vastaukset</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button className="btn btn-outline-info" onClick={() => setButtonPopup(true)}>Album ID's here</button>
            <div>
                <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
                </PopUp>
            </div>
        </div>
    )

}

export default Etusivu;
