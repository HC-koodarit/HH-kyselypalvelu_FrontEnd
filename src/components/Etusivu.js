
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

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
            .catch(err => console.error(err))
    }, []);


    return (
        <div>
            <h1>ETUSIVU</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Nimi</th>
                        <th>Kuvaus</th>
                        <th>Vastaa</th>
                    </tr>
                    {
                        kyselyt.map((kysely, index) =>
                            <tr key={index}>
                                <td>{kysely.nimi}</td>
                                <td>{kysely.kuvaus}</td>
                                <td><Button color="success" variant="contained">Vastaa</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Kysely;
