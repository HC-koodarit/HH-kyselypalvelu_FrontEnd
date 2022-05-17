import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigaatio from './Navigaatio';

import '../App.css';

export default function Vastaukset() {
    const { id } = useParams();
    const kyselyId = id;

    const [kysymykset, setKysymykset] = useState([]);
    const [kysely, setKysely] = useState([]);
    const [vastaukset, setVastaukset] = useState([]);

    useEffect(() => {
        fetchVastaukset();
        fetchKysely();
    }, []);

    const fetchVastaukset = () => {
        fetch(`https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}/vastaukset`)
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}/vastaukset
            //http://localhost:8080/kyselyt/${kyselyId}/vastaukset
            .then(res => res.json())
            .then(data => {
                setVastaukset(data);
            })
            .catch(err => console.error(err))
    }

    const fetchKysely = () => {
        fetch(`https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}`)
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}
            //http://localhost:8080/kyselyt/${kyselyId}
            .then(res => res.json())
            .then(data => {
                setKysymykset(data.kysymykset);
                setKysely(data);
            })
            .catch(err => console.error(err))
    }

    const kysymyslista = kysymykset.map((kysymys) =>
        <div className="kysymyslistadiv">
            <h2>{kysymys.kysymysteksti}</h2>
            <div className="vastauksetdiv">{
                vastaukset.filter(vastaus => vastaus.kysymys.id === kysymys.id).map((kysymyksenVastaus) =>
                    <div>{kysymyksenVastaus.vastausteksti}</div>
                )
            }</div>
        </div>
    );
    
    return (
        <div>
            <Navigaatio />
            <h1 className='h1'>{kysely.nimi}</h1>
            <p>{kysely.kuvaus}</p>
            <h1>Vastaukset:</h1>
            <div>{kysymyslista}</div>
        </div>
    )
}