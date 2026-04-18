import React, { useState, useEffect } from 'react';
import { 
  MapPin, Maximize2, BedDouble, Bath, Store, 
  Home, TreePine, ChevronDown, ChevronUp, Loader2 
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const PropertyGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Land', 'House', 'Apartment', 'Shop'];

  // --- RECUPERATION DES DONNEES ---
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          // .order('created_at', { ascending: false });

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

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Land': return <TreePine size={18} />;
      case 'House': return <Home size={18} />;
      case 'Shop': return <Store size={18} />;
      default: return <BedDouble size={18} />;
    }
  };


  const handleWhatsAppClick = (item) => {
    const phoneNumber = "237681149809"; // Ton numéro
    const message = `Good morning Royal Estate Services, in need to know more concerning the following offer :
*Titre:* ${item.title}
*Type:* ${item.type}
*Prix:* ${Number(item.price).toLocaleString()} XAF
*Localisation:* ${item.location}
*Superficie:* ${item.area} m²
${item.beds ? `*Chambres:* ${item.beds}` : ""}
*Lien:* ${window.location.href}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };
  return (
    <section id="offers" className="py-5 bg-white">
      <div className="container">
        
        {/* --- SECTION HEADING --- */}
        <div className="text-center mb-5">
          <h6 style={{ color: '#D4AF37', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '12px', marginBottom: '10px' }}>
            Our Portfolio
          </h6>
          <h2 style={{ fontWeight: '800', color: '#1a1a1a', fontSize: '36px', position: 'relative', display: 'inline-block', paddingBottom: '15px' }}>
            Featured Property Offers
            <span style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '3px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
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
                  padding: "10px 25px", borderRadius: "50px", border: "none", fontSize: "14px", fontWeight: "600", transition: "0.3s",
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
              <Loader2 className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-muted fw-bold">Loading exclusive offers...</p>
            </div>
          ) : (
            properties
              .filter((p) => activeCategory === "All" || p.type === activeCategory)
              .map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div
                    className="property-card h-100"
                    style={{
                      background: "#fff", borderRadius: "25px", border: "1px solid #f2f2f2", overflow: "hidden",
                      boxShadow: expandedId === item.id ? "0 20px 40px rgba(0,0,0,0.1)" : "0 5px 15px rgba(0,0,0,0.02)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    {/* Image & Type Badge */}
                    <div style={{ position: "relative", height: "220px", backgroundColor: "#f8f9fa" }}>
                      <div style={{
                        position: "absolute", top: "20px", right: "20px", backgroundColor: "rgba(255,255,255,0.95)",
                        padding: "8px 15px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "8px",
                        fontSize: "12px", fontWeight: "bold", color: "#D4AF37", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", zIndex: 10
                      }}>
                        {getTypeIcon(item.type)} {item.type.toUpperCase()}
                      </div>
                      <img
                        src={item.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        alt={item.title}
                      />
                    </div>

                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#D4AF37", letterSpacing: "1.5px" }}>
                          FOR {item.status?.toUpperCase()}
                        </span>
                        <h5 style={{ margin: 0, fontWeight: "800", color: "#1a1a1a" }}>
                          {Number(item.price).toLocaleString()} <small style={{ fontSize: "10px" }}>XAF</small>
                        </h5>
                      </div>
                      
                      <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px", color: "#1a1a1a" }}>
                        {item.title}
                      </h4>
                      
                      <p className="text-muted d-flex align-items-center mb-4" style={{ fontSize: "13px" }}>
                        <MapPin size={14} className="me-1" color="#D4AF37" /> {item.location}
                      </p>

                      {/* --- ACCORDEON DETAILS --- */}
                      <div style={{
                        maxHeight: expandedId === item.id ? "200px" : "0", overflow: "hidden",
                        transition: "all 0.4s ease-in-out", borderTop: expandedId === item.id ? "1px solid #eee" : "1px solid transparent",
                        paddingTop: expandedId === item.id ? "15px" : "0",
                      }}>
                        <div className="row g-3 mb-3">
                          <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "13px", color: "#444" }}>
                            <Maximize2 size={16} color="#D4AF37" /> <strong>{item.area} m²</strong>
                          </div>
                          {item.beds > 0 && (
                            <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "13px", color: "#444" }}>
                              <BedDouble size={16} color="#D4AF37" /> <strong>{item.beds} Beds</strong>
                            </div>
                          )}
                          {item.baths > 0 && (
                            <div className="col-6 d-flex align-items-center gap-2" style={{ fontSize: "13px", color: "#444" }}>
                              <Bath size={16} color="#D4AF37" /> <strong>{item.baths} Baths</strong>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Toggle Button */}
                      <button
                        onClick={() => toggleAccordion(item.id)}
                        className="btn w-100 d-flex align-items-center justify-content-between px-0 shadow-none border-0 mt-2"
                        style={{ fontWeight: "700", fontSize: "12px", color: "#1a1a1a", letterSpacing: "0.5px" }}
                      >
                        {expandedId === item.id ? "SHOW LESS" : "VIEW SPECIFICATIONS"}
                        {expandedId === item.id ? <ChevronUp size={18} color="#D4AF37" /> : <ChevronDown size={18} color="#D4AF37" />}
                      </button>

                      <button
  onClick={() => handleWhatsAppClick(item)}
  className="btn w-100 d-flex align-items-center justify-content-center gap-2 mt-3 shadow-none"
  style={{
    backgroundColor: "#25D366",
    color: "#fff",
    borderRadius: "50px",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "800",
    border: "none",
    transition: "0.3s"
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
  WHATSAPP
</button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;