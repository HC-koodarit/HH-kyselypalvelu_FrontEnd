import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';


function Kysely() {
    const [kyselyid, setKyselyid] = useState(0);
    const [nimi, setNimi] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setId(window.location.href.split('/').pop());
        fetch('http://localhost:8080/kyselyt/' + id)
        .then(res => res.json())
        .then(data => {
            setKyselyid(data.kyselyid)
            setNimi(data.nimi)
            setKuvaus(data.kuvaus)
        })
        .catch(err =>console.error(err))
    }, []);



    return(
        <div>

            <h1>Kyselyt - Front end {kyselyid} {nimi} {id}</h1>
            <p>{kuvaus}</p>

        </div>
    )
}

export default Kysely;