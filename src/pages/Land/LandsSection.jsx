import React, { useState, useEffect } from "react";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Store,
  Home as HomeIcon, // Renommé pour éviter conflit avec le nom du composant parent
  TreePine,
  ChevronDown,
  ChevronUp,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const PropertyGrid = ({ filters }) => { // 1. Réception des filtres ici
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Land", "House", "Apartment", "Shop"];

  // --- RECUPERATION DES DONNEES ---
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("properties").select("*");
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Erreur de chargement:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // --- LOGIQUE DE FILTRAGE COMBINÉE ---
  const filteredProperties = properties.filter((p) => {
    // A. Filtre par catégorie (Boutons au-dessus de la grille)
    const matchesCategory = activeCategory === "All" || p.type === activeCategory;

    // B. Filtre par Type de bien (Barre de recherche)
    const matchesSearchType = !filters?.type || p.type?.toLowerCase() === filters.type.toLowerCase();

    // C. Filtre par Status (Sale/Rent)
    const matchesStatus = !filters?.status || p.status?.toLowerCase() === filters.status.toLowerCase();

    // D. Filtre par Localisation (Recherche textuelle)
    const matchesLocation = !filters?.location || 
      p.location?.toLowerCase().includes(filters.location.toLowerCase());

    return matchesCategory && matchesSearchType && matchesStatus && matchesLocation;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "Land": return <TreePine size={18} />;
      case "House": return <HomeIcon size={18} />;
      case "Shop": return <Store size={18} />;
      default: return <BedDouble size={18} />;
    }
  };

  const handleWhatsAppClick = (item) => {
    const phoneNumber = "237681149809";
    const message = `Good morning Royal Estate Services, in need to know more concerning the following offer :
*Titre:* ${item.title}
*Type:* ${item.type}
*Prix:* ${Number(item.price).toLocaleString()} XAF
*Localisation:* ${item.location}
*Superficie:* ${item.area} m²
${item.beds ? `*Chambres:* ${item.beds}` : ""}
*Lien:* ${window.location.href}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="offers" className=" bg-white pb-4">
      <div className="container">
        {/* --- SECTION HEADING --- */}
        <div className="text-center mb-5">
          <h6 style={{ color: "#D4AF37", fontWeight: "800", letterSpacing: "3px", textTransform: "uppercase", fontSize: "12px", marginBottom: "10px" }}>
            Our Portfolio
          </h6>
          <h2 style={{ fontWeight: "800", color: "#1a1a1a", fontSize: "36px", position: "relative", display: "inline-block", paddingBottom: "15px" }}>
            Featured Property Offers
            <span style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "60px", height: "3px", backgroundColor: "#D4AF37", borderRadius: "2px" }}></span>
          </h2>
        </div>

        {/* --- NAVIGATION CATEGORIES --- */}
        <div className="d-flex justify-content-md-center mb-5" style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "15px", scrollbarWidth: "none" }}>
          <div className="p-1 bg-light d-inline-flex gap-2" style={{ borderRadius: "50px", border: "1px solid #eee", padding: "5px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 25px",
                  borderRadius: "50px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "0.3s",
                  backgroundColor: activeCategory === cat ? "#D4AF37" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#666",
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID & LOADER --- */}
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-5">
              <Loader2 className="spinner-border text-warning" style={{ width: "3rem", height: "3rem" }} />
              <p className="mt-3 text-muted fw-bold">Loading exclusive offers...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div
                  className="property-card h-100"
                  style={{
                    background: "#fff",
                    borderRadius: "25px",
                    border: "1px solid #f2f2f2",
                    overflow: "hidden",
                    boxShadow: expandedId === item.id ? "0 20px 40px rgba(0,0,0,0.1)" : "0 5px 15px rgba(0,0,0,0.02)",
                    transition: "all 0.4s ease",
                  }}
                >
                  {/* CARROUSEL IMAGES */}
                  <div style={{ position: "relative", height: "220px", backgroundColor: "#000" }}>
                    <div className="d-flex overflow-auto h-100" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                      {item.images && item.images.length > 0 ? (
                        item.images.map((img, idx) => (
                          <img key={idx} src={img} style={{ width: "100%", height: "100%", objectFit: "cover", flexShrink: 0, scrollSnapAlign: "start" }} alt={`${item.title} - ${idx}`} />
                        ))
                      ) : (
                        <img src="https://via.placeholder.com/800x400" className="w-100 h-100 object-fit-cover" alt="No image" />
                      )}
                    </div>
                    {/* Badges */}
                    <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 10, display: "flex", gap: "5px" }}>
                      <div style={{ backgroundColor: "#000", color: "#e0a961", padding: "5px 12px", borderRadius: "50px", fontSize: "10px", fontWeight: "800", border: "1px solid #e0a961" }}>
                        {item.type?.toUpperCase()}
                      </div>
                      {item.is_hot && (
                        <div style={{ backgroundColor: "#e0a961", color: "#000", padding: "5px 12px", borderRadius: "50px", fontSize: "10px", fontWeight: "800" }}>
                          🔥 HOT
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: "11px", fontWeight: "800", color: "#e0a961", letterSpacing: "1.5px" }}>
                        FOR {item.status?.toUpperCase()}
                      </span>
                      <h5 style={{ margin: 0, fontWeight: "900", color: "#000" }}>
                        {Number(item.price).toLocaleString()} <small style={{ fontSize: "10px" }}>XAF</small>
                      </h5>
                    </div>

                    <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "5px", color: "#000" }}>
                      {item.title}
                    </h4>

                    <p className="text-muted d-flex align-items-center mb-3" style={{ fontSize: "12px" }}>
                      <MapPin size={13} className="me-1" color="#e0a961" /> {item.location}
                    </p>

                    {/* DESCRIPTION */}
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "15px", display: "-webkit-box", WebkitLineClamp: expandedId === item.id ? "unset" : "3", WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.6" }}>
                      {item.description}
                    </div>

                    {/* SPECS */}
                    <div style={{ maxHeight: expandedId === item.id ? "300px" : "0", overflow: "hidden", transition: "all 0.4s ease", borderTop: expandedId === item.id ? "1px solid #eee" : "1px solid transparent", paddingTop: expandedId === item.id ? "15px" : "0" }}>
                      <div className="row g-2 mb-3">
                        <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "12px", fontWeight: "600" }}>
                          <Maximize2 size={14} color="#e0a961" /> {item.area} m²
                        </div>
                        {item.type !== "Land" ? (
                          <>
                            <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "12px" }}>
                              <BedDouble size={14} color="#e0a961" /> {item.specifications?.beds || 0} Beds
                            </div>
                            <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "12px" }}>
                              <Bath size={14} color="#e0a961" /> {item.specifications?.baths || 0} Baths
                            </div>
                          </>
                        ) : (
                          <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "12px" }}>
                            <ShieldCheck size={14} color="#e0a961" /> {item.specifications?.document || "Titled"}
                          </div>
                        )}
                      </div>
                    </div>

                    <button onClick={() => toggleAccordion(item.id)} className="btn w-100 d-flex align-items-center justify-content-between px-0 shadow-none border-0 mt-1" style={{ fontWeight: "800", fontSize: "11px", color: "#000", letterSpacing: "0.5px" }}>
                      {expandedId === item.id ? "READ LESS" : "READ MORE & SPECS"}
                      {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button onClick={() => handleWhatsAppClick(item)} className="btn w-100 d-flex align-items-center justify-content-center gap-2 mt-3" style={{ backgroundColor: "#000", color: "#e0a961", borderRadius: "15px", padding: "12px", fontSize: "12px", fontWeight: "800", border: "1px solid #e0a961", transition: "0.3s" }}>
                      CONTACT ROYAL REAL ESTATE SERVICES
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No properties found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;