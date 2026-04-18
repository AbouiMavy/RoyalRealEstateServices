import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, X, Phone } from "lucide-react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export default function OkandjoNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`okandjo-navbar ${scrolled ? "scrolled" : ""}`}
      expanded={expanded}
    >
      <Container>
        {/* LOGO & NOM */}
        <Navbar.Brand href="#home" className="nav-brand-container">
          <span className="nav-brand-text">
            <span style={{ color: "#FFD700" }}>Royal Real Estate Services</span>
          </span>
        </Navbar.Brand>

        {/* BOUTON MOBILE */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <X color="white" size={30} />
          ) : (
            <Menu color="white" size={30} />
          )}
        </Navbar.Toggle>

        {/* LIENS */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* Lien vers la page Accueil */}
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>

            {/* Lien vers l'ancre Secteurs (fonctionne depuis n'importe quelle page) */}
            <Nav.Link
              as={HashLink}
              smooth
              to="/#offers"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Offers
            </Nav.Link>

            {/* Bouton vers la page Assistance (ton bouton "Expertise" ou "Problème") */}
            <Nav.Link
              as={Link}
              to="/home/login"
              className="btn-nav-contact"
              onClick={() => setExpanded(false)}
            >
              Connexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}