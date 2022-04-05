import React, { useState, useEffect } from 'react';

export default function katsoKysely() {

    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        // katsoKysely kutsu, emt mikä se viel on
    }, []);

    const //katsoKysely = () => {
        fetch('herokuosote??')
        .then(respose => Response.json())
        .then()
        .catch(err => console.error(err))
    }

    return(
        <div>
            kysely tulee tänne
        </div>
    )

}

