import React, { useState, useEffect } from 'react';

function Kysely() {
    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kyselyt')
        .then(res => res.json())
        .then(items => {
            setKysely(items)
        })
        .catch(err =>console.error(err))
    }, []);

    return(
        <div>
            <h1>Kyselyt - Front end</h1>
            
        </div>
    )
}

export default Kysely;