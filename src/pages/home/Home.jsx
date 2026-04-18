import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trees,
  Dog,
  ShieldPlus,
  Sparkles,
  Microscope,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  AlertCircle,
  Search,
} from "lucide-react";
import "./Home.css";
import { Link } from "react-router-dom";
import Vision from "../../components/Vision";
import LandsSection from "../Land/LandsSection";
import PropertyGrid from "../Land/LandsSection";



export default function Home() {
  const whatsappNumber = "237657484766";

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

            <span className="brand-badge mb-3 mt-4" style={{ color: "#FFD700" }}>
              Royal Real Estate Services Cameroun
            </span>

            <h1 className="hero-title-clean">
              Redefining the Standard of
              <span style={{ color: "#FFD700" }}> Premium Living</span>
            </h1>

            <p
              className="mx-auto mt-4"
              style={{ maxWidth: "750px", opacity: 0.9 }}
            >
              Expert guidance in securing titled land, luxury apartments, and
              modern homes across the most sought-after locations.
            </p>

            {/* DRAPEAU CENTRÉ ET RÉDUIT */}
            <div className="d-flex justify-content-center align-items-center  mb-4">
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
                  <div style={{ color: "#FCD116", fontSize: "6px" }}>★</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#FCD116" }}></div>
              </div>
            </div>

            {/* DOUBLE BOUTON */}
            <div
              className="search-container-premium mt-5"
              style={{
                background: "#ffffff",
                borderRadius: "100px", // Bordures très arrondies pour le côté moderne
                padding: "10px 15px 10px 30px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                maxWidth: "950px",
                margin: "0 auto",
                border: "1px solid rgba(212, 175, 55, 0.2)", // Bordure subtile Gold
              }}
            >
              <form className="d-flex align-items-center justify-content-between">
                {/* Section: Type de bien */}
                <div className="search-group" style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#D4AF37",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Property
                  </label>
                  <select
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
                      color: "#D4AF37",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Status
                  </label>
                  <select
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
                      color: "#D4AF37",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Where are you looking?"
                    className="form-control border-0 p-0 shadow-none"
                    style={{
                      fontSize: "15px",
                      color: "#333",
                      background: "transparent",
                    }}
                  />
                </div>

                {/* Bouton de recherche circulaire Gold */}
                <button
                  type="submit"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#fff",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%", // Bouton rond
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                    transition: "all 0.3s ease",
                    border: "none",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#B8860B";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#D4AF37";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Search size={22} />
                </button>
              </form>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Voilà */}
      <PropertyGrid />
      
    </div>
  );
}
