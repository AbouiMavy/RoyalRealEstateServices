import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, Search, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient'; // Vérifie le chemin vers ton client

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    title: '', type: 'Land', price: '', location: '', description: '', area: '', status: 'Sale'
  });
  const [imageFile, setImageFile] = useState(null);

  // 1. Charger les données au démarrage
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      // .order('created_at', { ascending: false });
    if (!error) setProperties(data);
  };

  // 2. Gérer l'upload d'image
  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file);

    if (error) throw error;
    const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // 3. Soumettre le formulaire (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const { error } = await supabase.from('properties').insert([{
        ...formData,
        price: parseInt(formData.price),
        area: parseFloat(formData.area),
        images: imageUrl ? [imageUrl] : []
      }]);

      if (error) throw error;
      
      alert("Property published successfully!");
      setFormData({ title: '', type: 'Land', price: '', location: '', description: '', area: '', status: 'Sale' });
      setImageFile(null);
      setActiveTab('list');
      fetchProperties();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Supprimer une propriété (Delete)
  const handleDelete = async (id) => {
    if (window.confirm("Delete this property?")) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (!error) fetchProperties();
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#131415', paddingTop:"100px" }}>
      <div className="bg-white border-bottom py-3 sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 style={{ fontWeight: '800', fontSize: '20px', margin: 0 }}>
            Admin <span style={{ color: '#D4AF37' }}>Console</span>
          </h2>
          <div className="d-flex gap-2">
            <button onClick={() => setActiveTab('list')} className="btn px-4" style={{ borderRadius: '10px', fontWeight: '600', fontSize: '14px', backgroundColor: activeTab === 'list' ? '#D4AF37' : 'transparent', color: activeTab === 'list' ? '#fff' : '#666', border: activeTab === 'list' ? 'none' : '1px solid #eee' }}>Inventory</button>
            <button onClick={() => setActiveTab('add')} className="btn px-4" style={{ borderRadius: '10px', fontWeight: '600', fontSize: '14px', backgroundColor: activeTab === 'add' ? '#D4AF37' : 'transparent', color: activeTab === 'add' ? '#fff' : '#666', border: activeTab === 'add' ? 'none' : '1px solid #eee' }}><Plus size={18} className="me-1" /> Add Property</button>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {activeTab === 'list' ? (
          <div className="bg-white rounded-4 shadow-sm border overflow-hidden">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold">Manage Listings ({properties.length})</h5>
              <div className="position-relative" style={{ width: '300px' }}>
                <Search size={18} className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                <input type="text" className="form-control ps-5 border-0 bg-light" placeholder="Search..." style={{ borderRadius: '10px' }} />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 border-0 py-3 text-muted small">PROPERTY</th>
                    <th className="border-0 py-3 text-muted small">TYPE</th>
                    <th className="border-0 py-3 text-muted small">PRICE</th>
                    <th className="border-0 py-3 text-end pe-4 text-muted small">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <img src={p.images?.[0] || 'https://via.placeholder.com/45'} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                          <div><p className="m-0 fw-bold">{p.title}</p><small className="text-muted">{p.location}</small></div>
                        </div>
                      </td>
                      <td><span className="badge bg-light text-dark border">{p.type}</span></td>
                      <td className="fw-bold">{p.price.toLocaleString()} XAF</td>
                      <td className="text-end pe-4">
                        <button onClick={() => handleDelete(p.id)} className="btn btn-sm shadow-none"><Trash2 size={18} color="#dc3545" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm border p-5">
                <h4 className="fw-bold mb-4">New Listing Details</h4>
                <form className="row g-4" onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <label className="form-label fw-bold small text-muted">TITLE</label>
                    <input type="text" required className="form-control p-3 bg-light border-0" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Titled Land in Kribi" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">CATEGORY</label>
                    <select className="form-select p-3 bg-light border-0" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option>Land</option><option>House</option><option>Apartment</option><option>Shop</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">PRICE (XAF)</label>
                    <input type="number" required className="form-control p-3 bg-light border-0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">LOCATION</label>
                    <input type="text" required className="form-control p-3 bg-light border-0" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Yaoundé, Bastos" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">AREA (M²)</label>
                    <input type="number" required className="form-control p-3 bg-light border-0" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-bold small text-muted">DESCRIPTION</label>
                    <textarea className="form-control p-3 bg-light border-0" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-bold small text-muted">MEDIA</label>
                    <div className="border-dashed rounded-4 p-5 text-center" style={{ border: '2px dashed #eee', backgroundColor: '#fafafa', position: 'relative' }}>
                      <ImageIcon size={40} color="#D4AF37" className="mb-3" />
                      <p className="m-0 text-muted">{imageFile ? imageFile.name : "Click to upload image"}</p>
                      <input type="file" required className="position-absolute w-100 h-100 top-0 start-0 opacity-0" style={{ cursor: 'pointer' }} onChange={e => setImageFile(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="col-md-12 mt-5">
                    <button type="submit" disabled={loading} className="btn w-100 py-3" style={{ backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '15px', fontWeight: '700' }}>
                      {loading ? <Loader2 className="spinner-border spinner-border-sm" /> : "PUBLISH PROPERTY"}
                    </button>
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