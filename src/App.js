import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Wallet, ArrowUpRight, Smartphone, CreditCard, User, 
  Zap, Receipt, Bell, PieChart, Gift, Landmark, 
  QrCode, ShoppingBag, Eye, EyeOff, TrendingUp, Fingerprint, 
  Briefcase, Globe, LayoutGrid, Award, Car, Wifi, X, 
  CheckCircle2, MapPin, Download, Sparkles, Store, 
  ShieldCheck, Ticket, HeartPulse, Droplets
} from 'lucide-react';

// --- Animations ---
const springUp = keyframes`
  0% { transform: translateY(100%) scale(0.95); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const scanLineMove = keyframes`
  0% { top: 0%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const pulseScale = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
`;

const successPop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
`;

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0; 
    font-family: 'Inter', -apple-system, sans-serif; 
    background: #020617; 
    overflow: ${props => props.isModalOpen ? 'hidden' : 'auto'};
    color: #0f172a;
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
`;

// --- Store ---
const useStore = create(persist((set) => ({
  balance: 4250.750,
  points: 6120,
  isPrivate: false,
  isLocked: true,
  currency: 'TND',
  vaultBalance: 412.000,
  transactions: [
    { id: 1, title: 'Ooredoo Fiber', amount: -55.000, date: '15:05', cat: 'Telecom', icon: <Wifi size={18}/>, loc: 'Berges du Lac' },
    { id: 2, title: 'Architecture Payout', amount: 1200.000, date: '11:20', cat: 'Income', icon: <Briefcase size={18}/>, loc: 'Remote' },
    { id: 3, title: 'Monoprix Marsa', amount: -184.200, date: 'Yesterday', cat: 'Grocery', icon: <ShoppingBag size={18}/>, loc: 'La Marsa' },
  ],
  unlock: () => set({ isLocked: false }),
  togglePrivacy: () => set(state => ({ isPrivate: !state.isPrivate })),
  setCurrency: (c) => set({ currency: c }),
  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions],
    balance: state.balance + tx.amount 
  })),
}), { name: 'flouci-pro-v17' }));

// --- Animated Styled Components ---
const AppContainer = styled.div`
  max-width: 480px; margin: 0 auto; height: 100vh; background: #f8fafc;
  position: relative; display: flex; flex-direction: column; overflow: hidden;
`;

const LockScreen = styled.div`
  background: #020617; height: 100vh; display: flex; flex-direction: column; 
  align-items: center; justify-content: center; color: white; cursor: pointer;
`;

const BiometricRing = styled.div`
  padding: 45px; background: rgba(59, 130, 246, 0.1); border-radius: 60px; 
  margin-bottom: 30px; border: 1px solid rgba(59, 130, 246, 0.2);
  animation: ${pulseScale} 2.5s infinite ease-in-out;
`;

const ModalOverlay = styled.div`
  position: absolute; inset: 0; background: #f8fafc; z-index: 2000;
  display: flex; flex-direction: column; 
  animation: ${springUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const SuccessOverlay = styled.div`
  position: absolute; inset: 0; background: white; z-index: 3000;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  svg { animation: ${successPop} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); color: #10b981; }
`;

const QRScannerWrapper = styled.div`
  width: 300px; height: 300px; background: #fff; border: 3px solid #3b82f6; 
  border-radius: 50px; margin: 0 auto; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
`;

const ScanLine = styled.div`
  position: absolute; left: 0; width: 100%; height: 5px; 
  background: #3b82f6; box-shadow: 0 0 15px #3b82f6;
  animation: ${scanLineMove} 3s infinite linear;
`;

const Header = styled.div`
  background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
  color: white; padding: 55px 25px 95px; border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;
`;

const ActionCircle = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer;
  .icon-box {
    width: 68px; height: 68px; background: white; border-radius: 26px;
    display: flex; align-items: center; justify-content: center;
    transition: 0.3s; box-shadow: 0 8px 25px rgba(0,0,0,0.05); color: #0f172a;
  }
  &:active .icon-box { transform: scale(0.85); background: #3b82f6; color: white; }
  span { font-size: 0.75rem; font-weight: 800; color: #64748b; }
`;

const FormInput = styled.div`
  background: white; padding: 20px; border-radius: 25px; border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  label { font-size: 0.65rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; }
  input { width: 100%; border: none; font-size: 1.1rem; font-weight: 700; outline: none; margin-top: 6px; background: transparent; color: inherit; }
`;

export default function App() {
  const store = useStore();
  const [view, setView] = useState('home'); 
  const [activeTab, setActiveTab] = useState('home');
  const [targetMerchant, setTargetMerchant] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txDetails, setTxDetails] = useState(null);

  const handleAction = (type, amt = 45.000) => {
    setIsProcessing(true);
    setTimeout(() => {
      store.addTransaction({
        id: Date.now(),
        title: targetMerchant || 'P2P Transfer',
        amount: -Math.abs(amt),
        date: 'Just now',
        cat: 'Payment',
        icon: <Sparkles size={18}/>,
        loc: 'Tunis'
      });
      setIsProcessing('success');
      setTimeout(() => { 
        setIsProcessing(false); 
        setView('home'); 
        setTargetMerchant('');
      }, 2000);
    }, 1500);
  };

  if (store.isLocked) {
    return (
      <LockScreen onClick={store.unlock}>
        <GlobalStyle />
        <BiometricRing>
          <Fingerprint size={90} color="#3b82f6" />
        </BiometricRing>
        <h1 style={{fontWeight: 900, letterSpacing: -1.5, margin: 0}}>FLOUCI PRO</h1>
        <p style={{opacity:0.5, fontWeight: 500, marginTop: 10}}>Verify Identity to Continue</p>
      </LockScreen>
    );
  }

  return (
    <AppContainer>
      <GlobalStyle isModalOpen={view !== 'home' || txDetails} />
      
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }} className="no-scrollbar">
        <Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: 55, height: 55, borderRadius: '20px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>FF</div>
              <div><div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700 }}>ASSELMA,</div><div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Foulen El Fouleni</div></div>
            </div>
            <Bell size={26} onClick={() => setView('hub')} />
          </div>

          <div style={{ textAlign: 'center', marginTop: 45 }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 800, letterSpacing: 1.5 }}>MAIN VAULT</span>
              <h1 style={{ fontSize: '3.6rem', margin: '8px 0', fontWeight: 900, letterSpacing: -3 }}>
                  {store.isPrivate ? '••••••' : store.balance.toFixed(3)} 
                  <span style={{fontSize:'1.4rem', marginLeft: 10}}>{store.currency}</span>
              </h1>
              <div onClick={store.togglePrivacy} style={{ display: 'inline-flex', gap: 10, padding: '10px 22px', background: 'rgba(255,255,255,0.08)', borderRadius: 30, cursor:'pointer', border:'1px solid rgba(255,255,255,0.1)', marginTop: 15 }}>
                   {store.isPrivate ? <Eye size={16}/> : <EyeOff size={16}/>} <span style={{fontSize:'0.75rem', fontWeight:800}}>Shield Assets</span>
              </div>
          </div>
        </Header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '-45px 25px 40px' }}>
          <div style={{ background: 'white', padding: 25, borderRadius: 35, border:'1px solid #f1f5f9' }}>
              <div style={{fontSize:'0.65rem', color:'#94a3b8', fontWeight:900, marginBottom: 8}}>SAVINGS</div>
              <div style={{fontWeight:900, fontSize:'1.2rem'}}>{store.vaultBalance.toFixed(3)} TND</div>
          </div>
          <div style={{ background: 'white', padding: 25, borderRadius: 35, border:'1px solid #f1f5f9' }}>
              <div style={{fontSize:'0.65rem', color:'#94a3b8', fontWeight:900, marginBottom: 8}}>POINTS</div>
              <div style={{fontWeight:900, fontSize:'1.2rem'}}>{store.points.toLocaleString()} <Award size={18} color="#3b82f6" /></div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 45 }}>
          <ActionCircle onClick={() => setView('transfer')}><div className="icon-box"><ArrowUpRight size={28}/></div><span>Send</span></ActionCircle>
          <ActionCircle onClick={() => setView('qr')}><div className="icon-box" style={{background:'#0f172a', color:'white'}}><QrCode size={28}/></div><span>Pay</span></ActionCircle>
          <ActionCircle onClick={() => setView('bills')}><div className="icon-box"><Receipt size={28}/></div><span>Bills</span></ActionCircle>
          <ActionCircle onClick={() => setView('hub')}><div className="icon-box"><LayoutGrid size={28}/></div><span>Hub</span></ActionCircle>
        </div>

        <div style={{ padding: '0 25px' }}>
          <h3 style={{fontWeight:900, marginBottom: 20}}>Local Services</h3>
          <div style={{ display: 'flex', gap: 15, overflowX: 'auto', paddingBottom: 25 }} className="no-scrollbar">
              {[
                { name: 'Ooredoo', icon: <Smartphone color="#3b82f6"/> },
                { name: 'STEG', icon: <Zap color="#eab308"/> },
                { name: 'Hammas', icon: <Store color="#10b981"/> },
                { name: 'Péage', icon: <Car color="#ef4444"/> }
              ].map(m => (
                  <div key={m.name} onClick={() => { setTargetMerchant(m.name); setView('bills'); }} style={{ minWidth: 110, background:'white', padding: 25, borderRadius: 30, textAlign:'center', border:'1px solid #f1f5f9', cursor:'pointer' }}>
                      <div style={{marginBottom: 10}}>{m.icon}</div>
                      <span style={{fontSize:'0.8rem', fontWeight:900}}>{m.name}</span>
                  </div>
              ))}
          </div>
        </div>

        <div style={{ padding: '20px 25px' }}>
          <h3 style={{fontWeight:900, marginBottom: 20}}>Recent Activity</h3>
          {store.transactions.map(tx => (
            <div key={tx.id} onClick={() => setTxDetails(tx)} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '18px 0', borderBottom: '1px solid #f1f5f9', cursor:'pointer' }}>
               <div style={{ display:'flex', gap: 15, alignItems:'center' }}>
                  <div style={{ width: 45, height: 45, background:'white', borderRadius: 15, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #f1f5f9' }}>{tx.icon}</div>
                  <div><div style={{fontWeight:800}}>{tx.title}</div><div style={{fontSize:'0.75rem', color:'#94a3b8'}}>{tx.date}</div></div>
               </div>
               <div style={{ fontWeight:900 }}>{tx.amount.toFixed(3)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}
      {view !== 'home' && (
        <ModalOverlay>
            <div style={{ padding: '50px 25px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div onClick={() => {setView('home'); setTargetMerchant('');}} style={{ padding: 12, background:'#f1f5f9', borderRadius: 18, cursor:'pointer' }}><X size={22}/></div>
                <h3 style={{fontWeight:900, letterSpacing:2, fontSize:'0.9rem'}}>{view.toUpperCase()}</h3>
                <div style={{width: 46}} />
            </div>

            <div style={{ padding: 25, flex: 1 }}>
                {view === 'transfer' && (
                    <>
                        <FormInput><label>RIB / Phone Number</label><input placeholder="00 000 000..." /></FormInput>
                        <FormInput><label>Amount (TND)</label><input type="number" placeholder="0.000" /></FormInput>
                        <button onClick={() => handleAction('transfer')} style={{ width:'100%', padding: 24, background:'#0f172a', color:'white', border:'none', borderRadius: 28, fontWeight:900 }}>
                          {isProcessing ? 'Verifying...' : 'Authorize Transaction'}
                        </button>
                    </>
                )}
                {view === 'bills' && (
                    <>
                        <FormInput><label>Selected Service</label><input value={targetMerchant || "Select Merchant"} readOnly /></FormInput>
                        <FormInput><label>Reference / Client ID</label><input placeholder="Enter ID" /></FormInput>
                        <FormInput><label>Amount Due</label><input type="number" placeholder="0.000" /></FormInput>
                        <button onClick={() => handleAction('payment')} style={{ width:'100%', padding: 24, background:'#0f172a', color:'white', border:'none', borderRadius: 28, fontWeight:900 }}>
                          {isProcessing ? 'Connecting...' : 'Settle Now'}
                        </button>
                    </>
                )}
                {view === 'hub' && (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
                        {[
                          { n: 'Investing', i: <TrendingUp/> },
                          { n: 'Protection', i: <ShieldCheck/> },
                          { n: 'Tickets', i: <Ticket/> },
                          { n: 'Donations', i: <HeartPulse/> },
                          { n: 'Utilities', i: <Droplets/> },
                          { n: 'Government', i: <Landmark/> }
                        ].map(item => (
                            <div key={item.n} style={{ background:'white', padding: 25, borderRadius: 30, textAlign:'center', border:'1px solid #f1f5f9' }}>
                                <div style={{ color: '#3b82f6', marginBottom: 12 }}>{item.i}</div>
                                <div style={{fontWeight:900, fontSize:'0.9rem'}}>{item.n}</div>
                            </div>
                        ))}
                    </div>
                )}
                {view === 'qr' && (
                    <div style={{textAlign:'center', marginTop: 30}}>
                        <QRScannerWrapper>
                           <QrCode size={180} strokeWidth={1} color="#0f172a"/>
                           <ScanLine />
                        </QRScannerWrapper>
                        <p style={{marginTop: 30, color:'#94a3b8', fontWeight:700}}>Point camera at merchant QR</p>
                    </div>
                )}
            </div>

            {isProcessing === 'success' && (
              <SuccessOverlay>
                  <CheckCircle2 size={100} />
                  <h2 style={{fontWeight:900, marginTop: 20}}>Payment Verified</h2>
                  <p style={{color:'#94a3b8', fontWeight:600}}>Transaction is now complete</p>
              </SuccessOverlay>
            )}
        </ModalOverlay>
      )}

      {/* --- TRANSACTION SHEET --- */}
      {txDetails && (
        <div style={{ position:'absolute', inset:0, background:'rgba(2,6,23,0.8)', zIndex: 4000, display:'flex', alignItems:'flex-end' }} onClick={() => setTxDetails(null)}>
           <ModalOverlay style={{ position:'relative', height: 'auto', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 40 }} onClick={e => e.stopPropagation()}>
              <div style={{textAlign:'center', marginBottom: 40}}>
                 <div style={{width: 60, height:6, background:'#f1f5f9', borderRadius: 3, margin: '0 auto 30px'}} />
                 <h1 style={{fontSize:'2.8rem', fontWeight:900, margin:0}}>{txDetails.amount.toFixed(3)}</h1>
                 <p style={{color:'#94a3b8', fontWeight:800, fontSize:'1.1rem'}}>{txDetails.title}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap: 15, marginBottom: 40 }}>
                 <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{color:'#94a3b8', fontWeight:600}}>Location</span><span style={{fontWeight:700}}>{txDetails.loc}</span></div>
                 <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{color:'#94a3b8', fontWeight:600}}>Status</span><span style={{fontWeight:700, color:'#10b981'}}>Success</span></div>
              </div>
              <button style={{ width:'100%', padding: 22, background:'#f1f5f9', color:'#0f172a', border:'none', borderRadius: 25, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', gap: 10 }}>
                <Download size={20}/> Get PDF Receipt
              </button>
           </ModalOverlay>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, background: 'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 30, borderTop:'1px solid #f1f5f9', zIndex: 1000 }}>
        <div onClick={() => setActiveTab('home')} style={{ color: activeTab === 'home' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <Wallet size={26}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 4}}>Vault</div>
        </div>
        <div onClick={() => setActiveTab('stats')} style={{ color: activeTab === 'stats' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <PieChart size={26}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 4}}>Analysis</div>
        </div>
        <div onClick={() => setView('qr')} style={{ width: 75, height: 75, background:'#020617', borderRadius: 28, display:'flex', alignItems:'center', justifyContent:'center', color:'white', marginTop: -50, border:'6px solid #f8fafc', cursor:'pointer' }}>
          <QrCode size={30}/>
        </div>
        <div onClick={() => setActiveTab('cards')} style={{ color: activeTab === 'cards' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <CreditCard size={26}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 4}}>Cards</div>
        </div>
        <div onClick={() => setActiveTab('profile')} style={{ color: activeTab === 'profile' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <User size={26}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 4}}>Self</div>
        </div>
      </nav>
    </AppContainer>
  );
}