import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Vérifie ton chemin d'import

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Connexion réussie
      navigate('/admin');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: 'rgba(2, 12, 27, 0.9)',
      padding: '80px 20px 20px 20px'
    }}>
      {/* Bouton Retour */}
      <Link to="/" className="mt-5" style={{
        position: 'absolute', top: '30px', left: '30px',
        color: '#fffefe', textDecoration: 'none', fontWeight: '600',
        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
      }}>
        <ArrowLeft size={18} color="#ffffff" /> BACK TO SITE
      </Link>

      <div style={{
        width: '100%', maxWidth: '450px',
        background: '#ffffff', padding: '50px 40px',
        borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0'
      }}>
        
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: '800', fontSize: '28px', color: '#1a1a1a' }}>
            Agent <span style={{ color: '#D4AF37' }}>Portal</span>
          </h2>
          <p className="text-muted mt-2" style={{ fontSize: '14px' }}>
            Please enter your credentials to manage properties.
          </p>
        </div>

        <form onSubmit={handleLogin} className="d-flex flex-column gap-4">
          
          {/* EMAIL FIELD */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
              Email Address
            </label>
            <div className="position-relative">
              <Mail size={18} color="#D4AF37" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@luxuryestate.cm" 
                className="form-control shadow-none"
                style={{ 
                  height: '55px', paddingLeft: '45px', borderRadius: '12px', 
                  border: '1px solid #eee', backgroundColor: '#f9f9f9', fontSize: '15px' 
                }}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <div className="d-flex justify-content-between">
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Password
              </label>
              <a href="#" style={{ fontSize: '12px', color: '#D4AF37', textDecoration: 'none', fontWeight: '600' }}>Forgot?</a>
            </div>
            <div className="position-relative">
              <Lock size={18} color="#D4AF37" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="form-control shadow-none"
                style={{ 
                  height: '55px', paddingLeft: '45px', paddingRight: '45px', borderRadius: '12px', 
                  border: '1px solid #eee', backgroundColor: '#f9f9f9', fontSize: '15px' 
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                  border: 'none', background: 'none', padding: 0, color: '#999' 
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn mt-2 d-flex align-items-center justify-content-center gap-2" 
            style={{
              backgroundColor: '#D4AF37', color: '#fff', height: '55px',
              borderRadius: '12px', fontWeight: '700', fontSize: '16px',
              border: 'none', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#B8860B'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#D4AF37'}
          >
            {loading ? <Loader2 className="spinner-border spinner-border-sm" /> : "SIGN IN"}
          </button>

        </form>

        <div className="text-center mt-5">
          <p style={{ fontSize: '13px', color: '#888' }}>
            Protected by <strong style={{ color: '#1a1a1a' }}>Supabase Security</strong>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;