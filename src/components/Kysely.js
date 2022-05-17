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
    const [vastaukset, setVastaukset] = useState([]);

    let kIndex = 0;
    let ArrIndex = 0

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch(`http://localhost:8080/kyselyt/${kyselyId}`)
            .then(res => res.json())
            .then(data => {
                setKysymykset(data.kysymykset);
                //console.log(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    /*const monivalintaHandleChange = (e) => {
        setMoniVastaus({ vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } });
    }*/

    const HandleChange = (e, index) => {
        setTekstivastaus({ vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } });
        
        let newArr = [...vastaukset];
        newArr[index] = { vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } };
        setVastaukset(newArr);
        console.log(index);
        //ArrIndex = ArrIndex + 1;
        //console.log(ArrIndex);
        //console.log(tekstivastaus);
    }
    console.log(vastaukset);
    //console.log(tekstivastaus);

    /*const HandleTextSave = (e) => {
        let newArr = [...vastaukset];
        newArr[ArrIndex] = tekstivastaus;
        setVastaukset(newArr);
        ArrIndex = ArrIndex + 1;
        console.log(vastaukset);
        //console.log(tekstivastaus);
    }*/

    //console.log(tekstivastaus + "Tekstivastaus");
    //console.log(kysymykset);
    //console.log(kysymykset.kysymystyyppi)
   
    async function saveVastaukset () {
        const response = await fetch('http://localhost:8080/vastaukset', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(tekstivastaus)
            body: JSON.stringify(vastaukset)
        }).catch(err => console.error(err))
    
        if (response.status === 200) {
            alert(`Vastaus "${tekstivastaus}" tallennettu`, {
                appearance: 'vastaus tallennettu!',
            })
        } else {
            alert('Virhe vastauksen tallennuksessa', {
                appearance: 'virhe'
            })
        }
    }

    const monivalintaVaiTeksti = (k, index) => {
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
                        onChange = {(e) => HandleChange(e, index)}
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
                                        data-key={k.id}
                                        type="radio"
                                        name={kIndex}
                                        value={vaihtoehto.nimi}
                                        index={index}
                                        onChange = {(e) => HandleChange(e, index)}
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
                                        data-key={k.id}
                                        type="checkbox"
                                        name={kIndex}
                                        value={vaihtoehto.nimi}
                                        index={index}
                                        onChange = {(e) => HandleChange(e, index)}
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
                kysymykset.map((k, index) =>
                    <div key={k.id} index={index}>
                        {monivalintaVaiTeksti(k, index)}
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
