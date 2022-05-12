import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CenterFocusStrong } from '@mui/icons-material';

import '../App.css';

export default function Kysely(props) {
    const { id } = useParams();
    const kyselyId = id;

    const [kysymykset, setKysymykset] = useState([]);
    //const [monivastaus, setMoniVastaus] = useState({vastausteksti: "", kysymys: { id : null }});
    const [tekstivastaus, setTekstivastaus] = useState({vastausteksti: "", kysymys: { id : null }});

    let kIndex = 0;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch(`http://localhost:8080/kyselyt/${kyselyId}`)
            .then(res => res.json())
            .then(data => {
                setKysymykset(data.kysymykset);
                console.log(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    /*const monivalintaHandleChange = (e) => {
        setMoniVastaus({ vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } });
    }*/

    const HandleChange = (e) => {
        setTekstivastaus({ vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } });
    }

    //console.log(tekstivastaus);
    //console.log(kysymykset);
    //console.log(kysymykset.kysymystyyppi)
   
    async function saveVastaukset () {
        const response = await fetch('http://localhost:8080/vastaukset', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tekstivastaus)
        }).catch(err => console.error(err))
    
        if (response.status === 200) {
            alert(`Vastaus "${tekstivastaus.answerline}" tallennettu`, {
                appearance: 'vastaus tallennettu!',
            })
        } else {
            alert('Virhe vastauksen tallennuksessa', {
                appearance: 'virhe'
            })
        }
    }

    const monivalintaVaiTeksti = (k) => {
        if (k.kysymystyyppi.nimi === "Avoinkysymys") {
            kIndex = kIndex + 1;
            return (
                <div>
                    <h4>{k.kysymysteksti}</h4>
                    <input
                        className="form-control_teksti"
                        data-key={k.id}
                        type="text"
                        name={kIndex}
                        onChange={HandleChange}
                    />
                </div>
            )
        } else if (k.kysymystyyppi.nimi === "Valintanappikysymys") {
            kIndex = kIndex + 1;
            return (
                <div>
                    <h4>{k.kysymysteksti}</h4>
                    <div id="valintanappidiv">
                        {k.vaihtoehdot.map((vaihtoehto) =>
                            <div key={vaihtoehto.id}>
                                <div className="form-check_valintanappi">
                                    <input
                                        className="form-check-input_valintanappi"
                                        data-key={vaihtoehto.id}
                                        type="radio"
                                        name={kIndex}
                                        value={vaihtoehto.nimi}
                                        onChange={HandleChange}
                                    />
                                    {vaihtoehto.nimi}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else if (k.kysymystyyppi.nimi === "Monivalintakysymys") {
            kIndex = kIndex + 1;
            return (
                <div>
                    <h4>{k.kysymysteksti}</h4>
                    <div id="monivalintadiv">
                        {k.vaihtoehdot.map((vaihtoehto) =>
                            <div key={vaihtoehto.id} >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        data-key={vaihtoehto.id}
                                        type="checkbox"
                                        name={kIndex}
                                        value={vaihtoehto.nimi}
                                        onChange={HandleChange}
                                    />
                                    {vaihtoehto.nimi}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }

    
    return (
        <div>
            <h1 className="header">Kysymykset</h1>
            {
                kysymykset.map((k) =>
                    <div key={k.id}>
                        {monivalintaVaiTeksti(k)}
                    </div>
                )
            }
            <div>
                <Button color="success" variant="contained" onClick={saveVastaukset}>
                    Lähetä vastaukset
                </Button>
                <Link to={`/`}>
                    <Button color="primary" variant="contained" href={`/`}>
                        Etusivu
                    </Button>
                </Link>
                <Link to={`/vastaukset/${kyselyId}`}>
                    <Button color="primary" variant="contained">
                        Vastaukset
                    </Button>
                </Link>
            </div>
        </div>
    )
}
