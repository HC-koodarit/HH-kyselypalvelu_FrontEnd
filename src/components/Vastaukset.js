import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import '../App.css';

function Vastaukset() {
    const [kyselyid, setKyselyid] = useState(0);
    const [nimi, setNimi] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [kysymykset, setKysymykset] = useState([]);
    const [id, setId] = useState(window.location.href.split('/').pop());
    const [vastaukset, setVastaukset] = useState([]);

    useEffect(() => {
        fetchVastaukset();
        fetchKysely();
    }, []);

    const fetchVastaukset = () => {
        fetch('http://localhost:8080/kyselyt/' + id + '/vastaukset')
            .then(res => res.json())
            .then(data => {
                setVastaukset(data);
            })
            .catch(err => console.error(err))
    }

    const fetchKysely = () => {
        fetch('http://localhost:8080/kyselyt/' + id)
            .then(res => res.json())
            .then(data => {
                setKyselyid(data.id);
                setNimi(data.nimi);
                setKuvaus(data.kuvaus);
                setKysymykset(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    const kysymyslista = kysymykset.map((kysymys) =>
        <div>
            <h2>{kysymys.kysymysteksti}</h2>
            <ul className='nobullets'>{
                vastaukset.filter(vastaus => vastaus.kysymys.id == kysymys.id).map((kysymyksenVastaus) =>
                    <li>{kysymyksenVastaus.vastausteksti}</li>
                )
            }</ul>
        </div>
    );

    return (
        <div style={{
            backgroundColor: '#282c34',
          }}>
            <Button color="success" variant="contained" href={`/`}>Etusivu</Button>
            <h1>{nimi}</h1>
            <p>{kuvaus}</p>
            <h1>Vastaukset</h1>
            <div>{kysymyslista}</div>
        </div>
    )
}

export default Vastaukset;