
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom"
import PopUp from './PopUp.js'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

function Etusivu() {
    const [kyselyt, setKyselyt] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        fetchKysely();
    }, []);

    const fetchKysely = () => {
        fetch('http://localhost:8080/kyselyt')
            //https://kyselypalvelu-hckoodarit.herokuapp.com/kyselyt
            .then(res => res.json())
            .then(items => {
                setKyselyt(items)
            })
            .catch(err => console.error(err))
    }

    return (
        <div style={{backgroundColor: '#282c34',}}>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Kyselypalvelu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Etusivu</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <h1>ETUSIVU</h1>
                    {
                        kyselyt.map((kysely, index) =>
                            /*<tr key={index}>
                                <td>{kysely.nimi}</td>
                                <td>{kysely.kuvaus}</td>
                                <td><Button color="success" variant="contained" href={`kysely/${kysely.id}`}>Kyselyyn</Button></td>
                                <td><Button color="primary" variant="contained" href={`vastaukset/${kysely.id}`}>Vastaukset</Button></td>
                            </tr>*/
                            <div key={kysely.id}>
                                <div>{kysely.nimi}</div>
                                <Link to={`/kysely/${kysely.id}`}>
                                    <Button value={kysely.id} color="success" variant="contained">Kyselyyn</Button>
                                </Link>
                            </div>
                        )
                    }
            <div>
                <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
                </PopUp>
            </div>
        </div>
    )

}

export default Etusivu;
