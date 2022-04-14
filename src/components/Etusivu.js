
import React, { useState, useEffect } from 'react';

function Kysely() {
   const [listkysely, setListKysely] = useState([]);
   const [kysely, setKysely] = useState([]);

   useEffect(() => {
      fetch('http://localhost:8080/kyselyt')
      .then(res => res.json())
      .then(items => {
         setListKysely(items)
      })
      .catch(err =>console.error(err))
   }, []);

   return(
      <div>
         <h1>ETUSIVU</h1>
         <p>{listkysely.id}</p>
         <p>{listkysely.nimi}</p>
            {
            listkysely.map((kysely, index) =>
            <ul key={index}>{kysely.kysely.nimi}
            <li>{kysely.kysymysteksti}</li>
            </ul>
            )
            }
     </div>
    )
}

export default Kysely;

