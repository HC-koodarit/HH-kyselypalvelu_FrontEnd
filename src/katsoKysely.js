import React, { useState, useEffect } from 'react';

function KatsoKysely() {
    const [listkysely, setListKysely] = useState([]);
    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        fetch('herokuosote??')
        .then(response => response.json())
        .then(responseData => {
            setListKysely(responseData.data)
        })
        .catch(err =>console.error(err))
    }, []);

    return(
        <div>
            <h1>Kyselyt - Front end</h1>
                {
                listkysely.map((person, index) => 
                    <ul key={index} >
                        <li>{person.first_name}</li>
                        <li>{person.last_name}</li>
                        <li>{person.email}</li>
                    </ul>
                    )
                }
        </div>
    )

}

export default KatsoKysely;