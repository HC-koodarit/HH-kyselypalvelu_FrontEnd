import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

function Kysely() {
    const [kyselyid, setKyselyid] = useState(0);
    const [nimi, setNimi] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [kysymykset, setKysymykset] = useState([]);
    const [id, setId] = useState(window.location.href.split('/').pop());
    const [vastaukset, setVastaukset] = useState([]);
    const [vastaus, setVastaus] = useState({vastausteksti: "", kysymys: ""});

    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
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

    const handleChange = (e, index, kysymysid) => {
        console.log(e.target.value);
        setVastaus({ vastausteksti: e.target.value, kysymys: { id: kysymysid } });
        console.log(vastaus);
        let newArr = [...vastaukset];
        newArr[index] = vastaus;
        setVastaukset(newArr);
    }

    function saveVastaukset() {
        fetch('http://localhost:8080/vastaukset', {

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vastaukset)

        })

    }

    return (
        <div>
            <h1>{nimi}</h1>
            <p>{kuvaus}</p>
            <table>
                <tbody>
                    <tr>
                        <th>Kysymysteksti</th>
                    </tr>
                    {
                        kysymykset.map((kysymys, index) =>
                            <tr key={index}>
                                <td>{kysymys.kysymysteksti}</td>
                                <td><input
                                    type="text"
                                    placeholder="Vastaa"
                                    value={vastaus.id}
                                    onChange={(e) => handleChange(e, index, kysymys.id)} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <Button
                    color="success" variant="contained"
                    onClick={() => {
                    saveVastaukset();
                    alert("Kysymyksiin vastattu!");
                    }}
                >Lähetä vastaukset</Button>
                <Button color="primary" variant="contained" href={`/`}>Etusivu</Button>
                <Button color="primary" variant="contained" href={`/vastaukset/${kyselyid}`}>Vastaukset</Button>
            </div>
        </div>
    )
}

export default Kysely;