import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import '../App.css';
import { CenterFocusStrong } from '@mui/icons-material';

export default function Kysely(props) {
    const kyselyId = props.match.params.id;

    const [kysymykset, setKysymykset] = useState([]);

    //const [vastaus, setVastaus] = useState({kayttajanvastaus: "", vastaus: { vastausid : null }});

    const [textvastaus, setTextvastaus] = useState({vastausrivi: "", kysymys: { kysymysid : null }});

    let qIndex = 0;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch(`http://localhost:8080/kyselyt/${kyselyId}`)
            .then(res => res.json())
            .then(data => {
                setKysymykset(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    /*const inputChanged = (e, index, kysymysid) => {
        
        setVastaus({ vastausteksti: e.target.value, kysymys: { id: kysymysid } });
        
        let newArr = [...vastaukset];
        newArr[index] = vastaus;
        setVastaukset(newArr);
        console.log(e.target.value);
        console.log(vastaus);
    }*/

    /*
    const inputChanged = (e) => {
        setVastaus({ kayttajanvastaus: e.target.value, vastaus: { vastausid: e.target.getAttribute('data-key') } });
    }*/

    const textInputChanged = (e) => {
        setTextvastaus({ vastausrivi: e.target.value, kysymys: { kysymysid: e.target.getAttribute('data-key') } });
    }

    function saveVastaukset() {
        fetch('http://localhost:8080/vastaukset', {

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(textvastaus)

        })
    }

    return (
        <div>
            <h1 className="header">Kysymykset</h1>
            {
                kysymykset.map((q) =>
                    <div key={q.kysymysid}>
                        <div>
                            <h4>{q.kysymysteksti}</h4>
                            <input
                            data-key={q.kysymysid}
                            type="text"
                            name={qIndex}
                            onChange={textInputChanged}
                            />
                        </div>
                    </div>
                )
            }
            <div>
                <Button
                    color="success" variant="contained"
                    onClick={() => {
                    saveVastaukset();
                    setTextvastaus("");
                    alert("Kysymyksiin vastattu!");
                    }}
                >Lähetä vastaukset</Button>
                <Button color="primary" variant="contained" href={`/`}>Etusivu</Button>
                <Button color="primary" variant="contained" href={`/vastaukset/${kyselyId}`}>Vastaukset</Button>
            </div>
        </div>
    )
}