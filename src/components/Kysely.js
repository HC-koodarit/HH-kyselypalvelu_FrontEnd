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
    
    useEffect(() => {
        fetch('http://localhost:8080/kyselyt/' + id)
            .then(res => res.json())
            .then(data => {
                setKyselyid(data.kyselyid);
                setNimi(data.nimi);
                setKuvaus(data.kuvaus);
                setKysymykset(data.kysymykset);
            })
            .catch(err => console.error(err))
    }, []);


    const lahetaVastaukset = (e) => {
        /*
        setVastaus(e.target.value);
        console.log(vastaus);
        */
        setVastaukset({
            ...vastaukset,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
    }

    const paivitaVastaukset = (e) => {
        /*
        let newArr = [...vastaukset];
        newArr[index] = vastaus;
        setVastaukset(newArr);
        console.log(vastaus.id);
        */
        e.preventDefault()
        console.log(vastaukset);
   }

    return (
        <div>
            <h1>{nimi}</h1>
            <p>{kuvaus}</p>
            <p>testi</p>
            <table>
                <tbody>
                    <tr>
                        <th>Kysymysteksti</th>
                        <th>id</th>
                    </tr>
                    {
                        kysymykset.map((kysymys, index) =>
                            <tr key={index}>
                                <td>{kysymys.kysymysteksti}</td>
                                <td>{kysymys.kysymysid}</td>
                                <td><input        
                                    type="text"
                                    placeholder="Vastaa"
                                    value={vastaus.id}
                                    onChange={lahetaVastaukset} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <button onClick={paivitaVastaukset}>Lähetä vastaukset</button>
            </div>
        </div>
    )
}

export default Kysely;