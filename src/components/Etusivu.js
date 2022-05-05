
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

function Etusivu() {


    const [kyselyt, setKyselyt] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kyselyt')
        //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt
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
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        kyselyt.map((kysely, index) =>
                            <tr key={index}>
                                <td>{kysely.nimi}</td>
                                <td>{kysely.kuvaus}</td>
                                <td><Button color="success" variant="contained" href={`kysely/${kysely.kyselyid}`}>Kyselyyn</Button></td>
                                <td><Button color="primary" variant="contained" href={`vastaukset/${kysely.kyselyid}`}>Vastaukset</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )

}

export default Etusivu;
