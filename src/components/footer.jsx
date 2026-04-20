import React from 'react';
import { Phone, MapPin, ArrowRight, Mail } from 'lucide-react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#020c1b', color: '#ffffff', paddingTop: '80px' }}>
      <div className="container">
        <Container className="row g-5">
          
          {/* 1. BRAND & VISION */}
          <div className="col-lg-4 col-md-6 me-4">
            <h3 style={{ fontWeight: '800', fontSize: '24px', marginBottom: '20px' }}>
              ROYALREAL<span style={{ color: '#D4AF37' }}>ESTATESERVICES</span>
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '15px', marginBottom: '25px' }}>
              Your premier partner for secure real estate investments in Cameroon. 
              We specialize in titled land, premium villas, and commercial spaces.
            </p>
            {/* <div className="d-flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', color: '#D4AF37',
                  transition: '0.3s', border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
                onMouseOver={(e) => {e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = '#fff'}}
                onMouseOut={(e) => {e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; e.currentTarget.style.color = '#D4AF37'}}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div><br />

          {/* 2. QUICK LINKS */}
          <div className="col-lg-2 col-md-6">
            <h5 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '25px', position: 'relative' }}>
              Explore
              <span style={{ position: 'absolute', bottom: '-8px', left: '0', width: '30px', height: '2px', backgroundColor: '#D4AF37' }}></span>
            </h5>
            <ul className="list-unstyled">
              {['Titled Lands', 'Modern Houses', 'Apartments', 'Commercial'].map((item) => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', transition: '0.3s' }}
                     onMouseOver={(e) => e.target.style.color = '#D4AF37'}
                     onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="col-lg-3 col-md-6">
            <h5 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '25px', position: 'relative' }}>
              Get in Touch
              <span style={{ position: 'absolute', bottom: '-8px', left: '0', width: '30px', height: '2px', backgroundColor: '#D4AF37' }}></span>
            </h5>
            <div className="d-flex align-items-start gap-3 mb-3">
              <MapPin size={20} color="#D4AF37" />
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>Limbe, Cameroon</p>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Phone size={20} color="#D4AF37" />
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>+237 681 149 809</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Mail size={20} color="#D4AF37" />
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>royalrealestateservicescmr@gmail.com</p>
            </div>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="col-lg-3 col-md-6">
            <h5 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '25px', position: 'relative' }}>
              Stay Updated
              <span style={{ position: 'absolute', bottom: '-8px', left: '0', width: '30px', height: '2px', backgroundColor: '#D4AF37' }}></span>
            </h5>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Subscribe to get the latest property deals.</p>
            <div className="position-relative">
              <input type="email" placeholder="Your Email" style={{
                width: '100%', padding: '15px', paddingRight: '50px', 
                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff'
              }} />
              <button style={{
                position: 'absolute', right: '5px', top: '5px', bottom: '5px',
                width: '40px', backgroundColor: '#D4AF37', border: 'none',
                borderRadius: '8px', color: '#fff', display: 'flex', 
                alignItems: 'center', justifyContent: 'center'
              }}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Container>

        {/* BOTTOM BAR */}
        <div style={{ 
          marginTop: '80px', padding: '25px 0', borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: '#64748b'
        }}>
          <p className="m-0">© {currentYear} ROYAL REAL ESTATE SERVICES. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;