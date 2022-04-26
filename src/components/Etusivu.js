
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

function Kysely() {


    const [kyselyt, setKyselyt] = useState([]);

    useEffect(() => {
        fetch('https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt')
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
                    </tr>
                    {
                        kyselyt.map((kysely, index) =>
                            <tr key={index}>
                                <td>{kysely.nimi}</td>
                                <td>{kysely.kuvaus}</td>
                                <td><Button color="success" variant="contained" href={`kysely/${kysely.kyselyid}`}>Kyselyyn</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )

}

export default Kysely;
