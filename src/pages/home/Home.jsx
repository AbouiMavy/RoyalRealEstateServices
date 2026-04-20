// import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react"; // Ajout de useState
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import "./Home.css";
import { Link } from "react-router-dom";
import PropertyGrid from "../Land/LandsSection";
import HotStories from "../hot/HotStories";

export default function Home() {
  // 1. Initialisation des filtres de recherche
  const [filters, setFilters] = useState({
    type: "",
    status: "sale",
    location: "",
  });

  // Fonction pour gérer les changements dans les inputs/selects
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
      <section className="hero-visual w-100 py-4">
        <Container>
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* LOGO DANS UN CERCLE */}
            <span
              className="brand-badge mb-3 mt-4"
              style={{ color: "#e0a961" }}
            >
              Royal Real Estate Services Cameroun
            </span>

            <h1 className="hero-title-clean">
              Redefining the Standard of
              <span style={{ color: "#e0a961" }}> Premium Living</span>
            </h1>

            <p
              className="mx-auto mt-4"
              style={{ maxWidth: "750px", opacity: 0.9 }}
            >
              Expert guidance in securing titled land, luxury apartments, and
              modern homes across the most sought-after locations.
            </p>

            {/* DRAPEAU CENTRÉ ET RÉDUIT */}
            <div className="d-flex justify-content-center align-items-center mb-4">
              <div
                style={{
                  width: "24px",
                  height: "16px",
                  borderRadius: "2px",
                  overflow: "hidden",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                  display: "flex",
                }}
              >
                <div style={{ flex: 1, backgroundColor: "#007A5E" }}></div>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#CE1126",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ color: "#e0a961", fontSize: "6px" }}>★</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#e0a961" }}></div>
              </div>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div
              className="search-container-premium mt-5"
              style={{
                background: "#ffffff",
                borderRadius: "100px",
                padding: "10px 15px 10px 30px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                maxWidth: "950px",
                margin: "0 auto",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              <form 
                className="d-flex align-items-center justify-content-between"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Section: Type de bien */}
                <div className="search-group" style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#e0a961",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Property
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="form-select border-0 p-0 shadow-none"
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      color: "#333",
                      background: "transparent",
                    }}
                  >
                    <option value="">Any Type</option>
                    <option value="land">Land / Plot</option>
                    <option value="house">House / Villa</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "35px",
                    background: "#eee",
                    margin: "0 25px",
                  }}
                ></div>

                {/* Section: Status */}
                <div className="search-group" style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#e0a961",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="form-select border-0 p-0 shadow-none"
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      color: "#333",
                      background: "transparent",
                    }}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "35px",
                    background: "#eee",
                    margin: "0 25px",
                  }}
                ></div>

                {/* Section: Location */}
                <div className="search-group" style={{ flex: 1.5 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#e0a961",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Where are you looking?"
                    className="form-control border-0 p-0 shadow-none"
                    style={{
                      fontSize: "15px",
                      color: "#333",
                      background: "transparent",
                    }}
                  />
                </div>

                {/* Bouton de recherche */}
                <button
                  type="button"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#fff",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    boxShadow: "0 4px 15px #e0a961",
                    transition: "all 0.3s ease",
                    border: "none",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e0a961";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#e0a961";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Search size={22} />
                </button>
              </form>
            </div>

            {/* BOUTON SELL PROPERTY */}
            <button
              onClick={() => {
                const phoneNumber = "237681149809";
                const message = encodeURIComponent(
                  "Hello Royal Real Estate Services Cameroon, I would like to sell a property.",
                );
                window.open(
                  `https://wa.me/${phoneNumber}?text=${message}`,
                  "_blank",
                );
              }}
              className=" mt-4"
              style={{
                backgroundColor: "#e0a961",
                color: "#fff",
                width: "280px",
                height: "55px",
                borderRadius: "100px",
                boxShadow: "0 10px 20px rgba(224, 169, 97, 0.2)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                border: "1.5px solid #e0a961",
                fontSize: "14px",
                fontWeight: "800",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a961";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 15px 25px rgba(224, 169, 97, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
                e.currentTarget.style.color = "#e0a961";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(224, 169, 97, 0.2)";
              }}
            >
              SELL A PROPERTY
            </button>
          </motion.div>
        </Container>
      </section>

      {/* SECTIONS SUIVANTES */}
      <HotStories />
      
      {/* 2. On passe les filtres au composant qui affiche les terres/maisons */}
      <PropertyGrid filters={filters} />
    </div>
  );
}

