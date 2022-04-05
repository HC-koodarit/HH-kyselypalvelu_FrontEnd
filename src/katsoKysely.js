import React, { useState, useEffect } from 'react';

export default function katsoKysely() {

    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        getKyselyt();
    }, []);

    const getKyselyt = () => {
        fetch('herokuosote??')
        .then(respose => Response.json())
        .then(data => setKysely(___))
        .catch(err => console.error(err))
    }

    return(
        <div>
            kysely tulee tänne
        </div>
    )

}

