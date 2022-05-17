import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import '../App.css';

function Vastaukset() {
    const [kyselyid, setKyselyid] = useState(0);
    const [nimi, setNimi] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [kysymykset, setKysymykset] = useState([]);
    const [id, setId] = useState(window.location.href.split('/').pop());
    const [vastaukset, setVastaukset] = useState([]);

    useEffect(() => {
        fetchVastaukset();
        fetchKysely();
    }, []);

    const fetchVastaukset = () => {
        fetch('http://localhost:8080/kyselyt/' + id + '/vastaukset')
            .then(res => res.json())
            .then(data => {
                setVastaukset(data);
            })
            .catch(err => console.error(err))
    }

    const fetchKysely = () => {
        fetch('http://localhost:8080/kyselyt/' + id)
            .then(res => res.json())
            .then(data => {
                setKyselyid(data.id);
                setNimi(data.nimi);
                setKuvaus(data.kuvaus);
                setKysymykset(data.kysymykset);
            })
            .catch(err => console.error(err))
    }

    const kysymyslista = kysymykset.map((kysymys) =>
        <div>
            <h2>{kysymys.kysymysteksti}</h2>
            <ul className='nobullets'>{
                vastaukset.filter(vastaus => vastaus.kysymys.id == kysymys.id).map((kysymyksenVastaus) =>
                    <li>{kysymyksenVastaus.vastausteksti}</li>
                )
            }</ul>
        </div>
    );

    return (
        <div style={{
            backgroundColor: '#282c34',
        }}>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Kyselypalvelu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Etusivu</Nav.Link>
                            <Nav.Link href="/Statistiikka">Statistiikka</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className='h1'>{nimi}</h1>
            <p>{kuvaus}</p>
            <h1>Vastaukset</h1>
            <div>{kysymyslista}</div>
        </div>
    )
}

export default Vastaukset;