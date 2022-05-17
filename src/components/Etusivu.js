import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Button } from '@mui/material';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navigaatio from './Navigaatio.js';

export default function Etusivu() {
    const [kyselyt, setKyselyt] = useState([]);

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
                    <div key={kysely.id} id="divwithmargin">
                        <div>{kysely.nimi}</div>
                        <Link to={`/kysely/${kysely.id}`}>
                            <Button value={kysely.id} color="success" variant="contained">Kyselyyn</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )

}