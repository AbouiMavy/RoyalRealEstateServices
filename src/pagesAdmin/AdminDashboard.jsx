import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Search,
  Loader2,
  X,
  MapPin,
  BedDouble,
  Bath,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null); // Pour savoir si on modifie ou on crée

  // States for the form
  const [formData, setFormData] = useState({
    title: "",
    type: "Land",
    price: "",
    location: "",
    description: "",
    area: "",
    status: "Sale",
    beds: 0,
    baths: 0,
    is_hot: false,
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase.from("properties").select("*");
    // .order("created_at", { ascending: false });
    if (!error) setProperties(data);
  };

  const uploadAllImages = async () => {
    const urls = [];
    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("property-images")
        .upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [];

      // Si de nouvelles images sont sélectionnées, on les upload
      if (imageFiles.length > 0) {
        imageUrls = await uploadAllImages();
      } else if (editingId) {
        // Si on édite et qu'aucune nouvelle image n'est choisie, on garde les anciennes
        const current = properties.find((p) => p.id === editingId);
        imageUrls = current.images;
      } else {
        return alert("Please add at least one photo.");
      }

      const propertySpecs =
        formData.type === "Land"
          ? { document: "Titled" }
          : { beds: parseInt(formData.beds), baths: parseInt(formData.baths) };

      const payload = {
        title: formData.title,
        type: formData.type,
        price: parseInt(formData.price),
        location: formData.location,
        description: formData.description,
        area: parseFloat(formData.area),
        status: formData.status,
        images: imageUrls,
        specifications: propertySpecs,
        is_hot: formData.is_hot,
      };

      let error;
      if (editingId) {
        // UPDATE
        const { error: updateError } = await supabase
          .from("properties")
          .update(payload)
          .eq("id", editingId);
        error = updateError;
      } else {
        // INSERT
        const { error: insertError } = await supabase
          .from("properties")
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      alert(editingId ? "Updated successfully!" : "Published successfully!");
      setEditingId(null);
      resetForm();
      fetchProperties();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Land",
      price: "",
      location: "",
      description: "",
      area: "",
      status: "Sale",
      beds: 0,
      baths: 0,
    });
    setImageFiles([]);
    setActiveTab("list");
  };

  const handleEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      title: property.title,
      type: property.type,
      price: property.price,
      location: property.location,
      description: property.description,
      area: property.area,
      status: property.status,
      beds: property.specifications?.beds || 0,
      baths: property.specifications?.baths || 0,
      is_hot: property.is_hot || false,
    });
    // On ne peut pas "pré-remplir" les fichiers Input,
    // mais on garde les URLs actuelles si l'utilisateur ne change rien
    setActiveTab("add");
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (!error) fetchProperties();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 3)
      return alert("Maximum 3 photos allowed.");
    setImageFiles([...imageFiles, ...files]);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* STICKY HEADER */}
      <div
        className=" border-bottom py-3shadow-sm"
        style={{
          zIndex: 1000,
          backgroundColor: "#eddda9",
          paddingTop: "120px",
          paddingBottom: "25px",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <button
              onClick={() => setActiveTab("list")}
              className={`btn px-4 py-2 rounded-pill fw-bold fs-7 transition-all ${activeTab === "list" ? "bg-dark text-white" : "text-muted border-0"}`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`btn px-4 py-2 rounded-pill fw-bold fs-7 transition-all`}
              style={
                activeTab === "add"
                  ? {
                      backgroundColor: "#D4AF37",
                      color: "white",
                      border: "none",
                    }
                  : { border: "1px solid #1a1a1a", color: "#1a1a1a" }
              }
            >
              <Plus size={18} className="me-1" /> New Listing
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {activeTab === "list" ? (
          <div className="row g-4">
            <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
              <h4 className="fw-900 m-0">
                Properties Management ({properties.length})
              </h4>
              <div className="input-group w-25 shadow-sm rounded-pill overflow-hidden bg-white d-none d-md-flex">
                <span className="input-group-text bg-white border-0">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-0 p-2"
                  placeholder="Search..."
                />
              </div>
            </div>

            {properties.length === 0 && (
              <div className="text-center py-5 text-muted">
                No properties found in your database.
              </div>
            )}

            {properties.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100">
                  <div style={{ height: "200px", position: "relative" }}>
                    {/* Conteneur de scroll horizontal pour les images */}
                    <div
                      className="d-flex overflow-auto h-100 snap-x"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {p.images && p.images.length > 0 ? (
                        p.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            className="w-100 h-100 object-fit-cover flex-shrink-0"
                            style={{ scrollSnapAlign: "start" }}
                            alt=""
                          />
                        ))
                      ) : (
                        <img
                          src="https://via.placeholder.com/400x200"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      )}
                    </div>

                    {/* Indicateur de multi-images */}
                    {p.images?.length > 1 && (
                      <div className="position-absolute bottom-0 end-0 m-2 badge rounded-pill bg-dark opacity-75">
                        1 / {p.images.length}
                      </div>
                    )}

                    {/* Badges et Actions */}
                    {p.is_hot && (
                      <div
                        className="position-absolute top-0 start-0 m-2 badge rounded-pill shadow-sm"
                        style={{ backgroundColor: "#D4AF37", color: "#fff" }}
                      >
                        🔥 HOT
                      </div>
                    )}

                    <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="btn btn-light btn-sm rounded-circle shadow border-0 p-2"
                      >
                        <Plus
                          size={16}
                          style={{ transform: "rotate(45deg)" }}
                        />{" "}
                        {/* Icône Edit simple */}
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-danger btn-sm rounded-circle shadow border-0 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6
                        className="fw-bold m-0 text-truncate"
                        style={{ maxWidth: "70%" }}
                      >
                        {p.title}
                      </h6>
                      <span
                        style={{ color: "#D4AF37" }}
                        className="fw-bold text-nowrap"
                      >
                        {p.price?.toLocaleString()} <small>XAF</small>
                      </span>
                    </div>
                    <p className="text-muted small mb-3">
                      <MapPin size={12} className="me-1" /> {p.location}
                    </p>
                    <div className="d-flex gap-3 text-muted border-top pt-3">
                      {/* On n'affiche les lits et douches que si ce n'est pas un terrain */}
                      {p.type !== "Land" && (
                        <>
                          <span className="small d-flex align-items-center gap-1">
                            <BedDouble size={14} />{" "}
                            {p.specifications?.beds || 0}
                          </span>
                          <span className="small d-flex align-items-center gap-1">
                            <Bath size={14} /> {p.specifications?.baths || 0}
                          </span>
                        </>
                      )}

                      {/* Pour un terrain, on peut afficher une info spécifique si elle existe */}
                      {p.type === "Land" && p.specifications?.document && (
                        <span
                          className="small text-uppercase fw-bold"
                          style={{ fontSize: "10px", color: "#D4AF37" }}
                        >
                          {p.specifications.document}
                        </span>
                      )}

                      <span className="small fw-bold ms-auto">{p.area} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white rounded-4 shadow-sm border-0 p-4 p-md-5">
                <div className="mb-5 text-center">
                  <h3 className="fw-900 mb-2">
                    {editingId ? "Update Listing" : "Create New Listing"}
                  </h3>
                  <p className="text-muted">
                    Fill in the details to list your property on the main
                    portal.
                  </p>
                </div>

                <form className="row g-4" onSubmit={handleSubmit}>
                  <div className="col-md-8">
                    <label className="form-label fw-bold text-dark small">
                      PROPERTY TITLE
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g. Modern Villa with Pool"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark small">
                      CATEGORY
                    </label>
                    <select
                      className="form-select form-select-lg bg-light border-0 fw-bold text-muted"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="Land">Land</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Shop">Shop</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark small">
                      PRICE (XAF)
                    </label>
                    <input
                      type="number"
                      required
                      className="form-control form-control-lg bg-light border-0 fw-bold"
                      style={{ color: "#D4AF37" }}
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark small">
                      STATUS
                    </label>
                    <select
                      className="form-select form-select-lg bg-light border-0"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark small">
                      AREA (M²)
                    </label>
                    <input
                      type="number"
                      required
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                    />
                  </div>

                  {formData.type !== "Land" && (
                    <div className="col-12 bg-light p-4 rounded-4 d-flex gap-4 border border-white">
                      <div className="flex-grow-1">
                        <label className="form-label fw-bold small">
                          BEDROOMS
                        </label>
                        <input
                          type="number"
                          className="form-control border-0"
                          value={formData.beds}
                          onChange={(e) =>
                            setFormData({ ...formData, beds: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label className="form-label fw-bold small">
                          BATHROOMS
                        </label>
                        <input
                          type="number"
                          className="form-control border-0"
                          value={formData.baths}
                          onChange={(e) =>
                            setFormData({ ...formData, baths: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-12">
                    <label className="form-label fw-bold text-dark small">
                      LOCATION
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Yaoundé, Bastos Area"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-bold text-dark small">
                      DESCRIPTION
                    </label>
                    <textarea
                      rows="4"
                      className="form-control bg-light border-0"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the property's key features..."
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold text-dark small">
                      MEDIA (MAX 3 PHOTOS)
                    </label>
                    <div className="d-flex gap-3 flex-wrap">
                      {imageFiles.map((f, i) => (
                        <div
                          key={i}
                          className="position-relative"
                          style={{ width: "120px", height: "120px" }}
                        >
                          <img
                            src={URL.createObjectURL(f)}
                            className="w-100 h-100 object-fit-cover rounded-3 border"
                            alt=""
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setImageFiles(
                                imageFiles.filter((_, idx) => idx !== i),
                              )
                            }
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle m-1 p-0 border-0"
                            style={{ width: "22px", height: "22px" }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {imageFiles.length < 3 && (
                        <label
                          className="d-flex flex-column align-items-center justify-content-center bg-light border-dashed rounded-3 shadow-none"
                          style={{
                            width: "120px",
                            height: "120px",
                            border: "2px dashed #D4AF37",
                            cursor: "pointer",
                          }}
                        >
                          <Plus color="#D4AF37" />
                          <span className="small text-muted fw-bold">
                            Add Photo
                          </span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="d-none"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="form-check form-switch p-3 rounded-3 border d-flex align-items-center justify-content-between"
                      style={{
                        backgroundColor: formData.is_hot
                          ? "#fff9e6"
                          : "#f8f9fa",
                        borderColor: formData.is_hot ? "#D4AF37" : "#eee",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <label
                          className="form-check-label fw-bold d-block"
                          style={{ cursor: "pointer" }}
                        >
                          🔥 Set as Hot Offer
                        </label>
                        <small className="text-muted">
                          This property will be highlighted on the main page.
                        </small>
                      </div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{
                          width: "50px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        checked={formData.is_hot}
                        onChange={(e) =>
                          setFormData({ ...formData, is_hot: e.target.checked })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mt-5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn w-100 py-3 shadow-sm"
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "12px",
                        fontWeight: "800",
                      }}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : editingId ? (
                        "SAVE CHANGES"
                      ) : (
                        "CONFIRM & PUBLISH"
                      )}
                    </button>
                    {/* <button
                      type="submit"
                      disabled={loading}
                      className="btn w-100 py-3 shadow-sm"
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "12px",
                        fontWeight: "800",
                      }}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        "CONFIRM & PUBLISH LISTING"
                      )}
                    </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
