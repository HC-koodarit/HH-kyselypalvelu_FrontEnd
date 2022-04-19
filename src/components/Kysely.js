import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Kysely() {
    const [kysely, setKysely] = useState([]);
    const [id, setId] = useState("");


    useEffect(() => {
        setId(window.location.href.split('/').pop());
        fetch('http://localhost:8080/kyselyt' + id)
        .then(res => res.json())
        .then(items => {
            setKysely(items)
        })
        .catch(err =>console.error(err))
    }, []);

    return(
        <div>
            <h1>Kyselyt - Front end + {id}</h1>
        </div>
    )
}

export default Kysely;