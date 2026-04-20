import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, ChevronLeft, ChevronRight, MessageCircle, Flame } from 'lucide-react';

const HotStories = () => {
  const [hotOffers, setHotOffers] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); // L'offre active dans la modale
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const fetchHotOffers = async () => {
      const { data } = await supabase.from('properties').select('*').eq('is_hot', true);
      if (data) setHotOffers(data);
    };
    fetchHotOffers();
  }, []);

  // Logique de navigation dans la story
  const nextImg = () => {
    if (currentImgIdx < selectedStory.images.length - 1) {
      setCurrentImgIdx(prev => prev + 1);
    } else {
      closeStory();
    }
  };

  const prevImg = () => {
    if (currentImgIdx > 0) setCurrentImgIdx(prev => prev - 1);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentImgIdx(0);
  };

  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="d-flex align-items-center mb-3 px-2">
          <Flame size={20} color="#e0a961" className="me-2" />
          <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: '1px', fontSize: '14px' }}>
            HOT DEALS <span style={{ color: '#e0a961' }}>NOW</span>
          </h5>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          className="d-flex gap-3 overflow-auto pb-2 px-2" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {hotOffers.map((item) => (
            <div key={item.id} className="text-center flex-shrink-0" style={{ width: '85px' }} 
                 onClick={() => setSelectedStory(item)}>
              <div className="rounded-circle p-[2px] mb-2" style={{ border: '2px solid #e0a961',border: `2px solid #e0a961`,
                  padding: '3px',
                  display: 'inline-block' }}>
                <div className="rounded-circle overflow-hidden" style={{ width: '65px', height: '65px', border: '2px solid #fff' }}>
                  <img src={item.images?.[0]} className="w-100 h-100 object-fit-cover" alt="" />
                </div>
              </div>
              <p className="m-0 fw-bold" style={{ fontSize: '10px', color: '#000' }}>{item.location.split(',')[0]}</p>
            </div>
          ))}
          
        </div>
      </div>

      {/* --- MODALE FULLSCREEN STYLE RÉSEAUX --- */}
      {selectedStory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column'
        }}>
          {/* Progress Bar */}
          <div className="d-flex gap-1 p-2 position-absolute top-0 w-100" style={{ zIndex: 10001 }}>
            {selectedStory.images.map((_, i) => (
              <div key={i} style={{
                height: '2px', flex: 1, backgroundColor: i <= currentImgIdx ? '#e0a961' : 'rgba(255,255,255,0.3)',
                borderRadius: '2px', transition: '0.3s'
              }} />
            ))}
          </div>

          {/* Header Story */}
          <div className="d-flex justify-content-between align-items-center p-3 mt-2 text-white" style={{ zIndex: 10001 }}>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle overflow-hidden" style={{ width: '32px', height: '32px', border: '1px solid #e0a961' }}>
                <img src={selectedStory.images[0]} className="w-100 h-100 object-fit-cover" alt="" />
              </div>
              <span className="fw-bold small">{selectedStory.title}</span>
            </div>
            <X onClick={closeStory} style={{ cursor: 'pointer' }} />
          </div>

          {/* Image Display */}
          <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative">
            <img 
              src={selectedStory.images[currentImgIdx]} 
              className="w-100 h-100 object-fit-contain" 
              alt="" 
            />
            
            {/* Zones de clic invisibles (Gauche / Droite) */}
            <div onClick={prevImg} style={{ position: 'absolute', left: 0, width: '30%', height: '80%', cursor: 'pointer' }} />
            <div onClick={nextImg} style={{ position: 'absolute', right: 0, width: '70%', height: '80%', cursor: 'pointer' }} />
          </div>

          {/* Footer & CTA */}
          <div className="p-4 bg-gradient-dark text-white text-center" style={{ background: 'linear-gradient(transparent, #000)' }}>
            <h5 className="fw-bold" style={{ color: '#e0a961' }}>{selectedStory.price.toLocaleString()} XAF</h5>
            <p className="small opacity-75">{selectedStory.location}</p>
            <a 
              href={`https://wa.me/237681149809?text=I am interested in: ${selectedStory.title}`}
              className="btn w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#e0a961', color: '#000', borderRadius: '50px', fontWeight: '800' }}
            >
              <MessageCircle size={18} /> CONTACT ON WHATSAPP
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotStories;
// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabaseClient';
// import { Flame } from 'lucide-react';

// const HotStories = () => {
//   const [hotOffers, setHotOffers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotOffers = async () => {
//       const { data, error } = await supabase
//         .from('properties')
//         .select('*')
//         .eq('is_hot', true)
//         // .order('created_at', { ascending: false });

//       if (!error) setHotOffers(data);
//       setLoading(false);
//     };

//     fetchHotOffers();
//   }, []);

//   if (loading) return null;

//   return (
//     <div className="bg-white py-4">
//       <div className="container">
//         <div className="d-flex align-items-center mb-3 px-2">
//           <Flame size={20} color="#e0a961" className="me-2" />
//           <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: '1px', fontSize: '14px' }}>
//             HOT DEALS <span style={{ color: '#e0a961' }}>NOW</span>
//           </h5>
//         </div>

//         {/* Horizontal Scroll Container */}
//         <div 
//           className="d-flex gap-3 overflow-auto pb-2 px-2" 
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {hotOffers.map((item) => (
//             <div 
//               key={item.id} 
//               className="text-center flex-shrink-0" 
//               style={{ width: '85px', cursor: 'pointer' }}
//               onClick={() => window.location.href = `/property/${item.id}`}
//             >
//               {/* Outer Ring (Story Style) */}
//               <div 
//                 className="rounded-circle p-[2px] mb-2" 
//                 style={{ 
//                   border: `2px solid #e0a961`,
//                   padding: '3px',
//                   display: 'inline-block'
//                 }}
//               >
//                 <div 
//                   className="rounded-circle overflow-hidden" 
//                   style={{ width: '70px', height: '70px', border: '2px solid #000' }}
//                 >
//                   <img 
//                     src={item.images?.[0] || 'https://via.placeholder.com/70'} 
//                     alt={item.title}
//                     className="w-100 h-100 object-fit-cover"
//                   />
//                 </div>
//               </div>
              
//               {/* Label */}
//               <p 
//                 className="text-dark small fw-semibold text-truncate m-0" 
//                 style={{ fontSize: '11px' }}
//               >
//                 {item.location.split(',')[0]}
//               </p>
//               <p 
//                 className="fw-bold m-0" 
//                 style={{ color: '#e0a961', fontSize: '10px' }}
//               >
//                 {item.price.toLocaleString()} <small>XAF</small>
//               </p>
//             </div>
//           ))}

//           {hotOffers.length === 0 && (
//             <p className="text-muted small ps-2">No hot offers available today.</p>
//           )}
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         ::-webkit-scrollbar { display: none; }
//       `}} />
//     </div>
//   );
// };

// export default HotStories;

