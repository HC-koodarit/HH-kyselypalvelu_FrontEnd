import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import '../App.css';
import Navigaatio from './Navigaatio';

export default function Kysely(props) {
    
    const { id } = useParams();
    const kyselyId = id;

    const [kysymykset, setKysymykset] = useState([]);
    //const [monivastaus, setMoniVastaus] = useState({vastausteksti: "", kysymys: { id : null }});
    const [tekstivastaus, setTekstivastaus] = useState({ vastausteksti: "", kysymys: { id: null } });
    const [vastaukset, setVastaukset] = useState([]);

    const [checked, setChecked] = useState([]);

    let kIndex = 0;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch(`https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}`)
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt/${kyselyId}
            //http://localhost:8080/kyselyt/${kyselyId}
            .then(res => res.json())
            .then(data => {
                setKysymykset(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    //Monivalinta kysymyksien vastaukselle
    const handleCheck = (e, index) => {
        var kysymysid = e.target.getAttribute('data-key');
        var updatedList = [...checked];

        let newArr = [...vastaukset];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
            newArr[index] = { vastausteksti: updatedList.join(", "), kysymys: { id: kysymysid } };
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
            newArr[index] = { vastausteksti: updatedList.join(", "), kysymys: { id: kysymysid } };
        }
        setVastaukset(newArr);
        setChecked(updatedList);
    }

    //Avoin kysymys vastauksille
    const HandleChange = (e, index) => {
        setTekstivastaus({ vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } });

        let newArr = [...vastaukset];
        newArr[index] = { vastausteksti: e.target.value, kysymys: { id: e.target.getAttribute('data-key') } };
        setVastaukset(newArr);
    }
   
    //Save vastaukset funktio lähettää teksti vastaukset backendiin
    async function saveVastaukset () {
        const response = await fetch('https://kyselypalvelu-hckoodarit.herokuapp.com/vastaukset', {
            //https://kyselypalvelu-hckoodarit.herokuapp.com/vastaukset
            //http://localhost:8080/vastaukset
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vastaukset)
        }).catch(err => console.error(err))

        if (response.status === 200) {
            toast.success('Vastaukset tallennettu!')
        } else if (response.status === 500) {
            toast.error("Vastaa kaikkiin kysymyksiin")
        } else {
            toast.error("Virhe vastauksen tallennuksessan")
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
                        onChange={(e) => HandleChange(e, index)}
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
                                        onChange = {(e) => handleCheck(e, index)}
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
            <Navigaatio />
            <h1 className="header">Kysymykset</h1>
            {
                kysymykset.map((k, index) =>
                    <div key={k.id} index={index}>
                        {monivalintaVaiTeksti(k, index)}
                    </div>
                )
            }
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div>
                <Button color="success" variant="contained" id="buttonwithmargin" onClick={saveVastaukset}>
                    Lähetä vastaukset
                </Button>
                <Link to={`/`}>
                    <Button color="primary" variant="contained" id="buttonwithmargin">
                        Etusivu
                    </Button>
                </Link>
                <Link to={`/vastaukset/${kyselyId}`}>
                    <Button color="primary" variant="contained" id="buttonwithmargin">
                        Vastaukset
                    </Button>
                </Link>
                </div>
            </div>
        </div>
    )
}
