import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Wallet, ArrowUpRight, Smartphone, CreditCard, User, 
  Zap, Receipt, Bell, PieChart, Landmark, 
  QrCode, ShoppingBag, Eye, EyeOff, TrendingUp, Fingerprint, 
  Briefcase, Globe, LayoutGrid, Award, Car, Wifi, X, 
  CheckCircle2, MapPin, Download, Sparkles, Store, 
  ShieldCheck, Ticket, HeartPulse, Droplets, Search, 
  History, SmartphoneNfc, Utensils, Coffee, Plus, Filter
} from 'lucide-react';

// --- Global Keyframes ---
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
    -webkit-font-smoothing: antialiased;
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
    { id: 4, title: 'Cafe de Paris', amount: -4.500, date: 'Monday', cat: 'Dining', icon: <Coffee size={18}/>, loc: 'Tunis' },
  ],
  unlock: () => set({ isLocked: false }),
  togglePrivacy: () => set(state => ({ isPrivate: !state.isPrivate })),
  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions],
    balance: state.balance + tx.amount 
  })),
}), { name: 'flouci-ultra-v20' }));

// --- Styled Components ---
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

const QRFrame = styled.div`
  width: 280px; height: 280px; background: #fff; border: 4px solid #3b82f6; 
  border-radius: 60px; margin: 0 auto; position: relative; overflow: hidden;
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

const Card = styled.div`
  background: white; padding: 25px; border-radius: 35px; border: 1px solid #f1f5f9;
  box-shadow: 0 10px 20px rgba(0,0,0,0.02);
`;

const BottomSheet = styled.div`
  background: white; width: 100%; border-top-left-radius: 40px; 
  border-top-right-radius: 40px; padding: 40px;
  animation: ${springUp} 0.4s ease;
`;

// --- Main App ---
export default function App() {
  const store = useStore();
  const [view, setView] = useState('home'); 
  const [activeTab, setActiveTab] = useState('home');
  const [targetMerchant, setTargetMerchant] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txDetails, setTxDetails] = useState(null);

  const formatTND = (val) => store.isPrivate ? "• • • •" : val.toFixed(3);

  const handleTransaction = (amount = 10.000) => {
    setIsProcessing(true);
    setTimeout(() => {
      store.addTransaction({
        id: Date.now(),
        title: targetMerchant || 'P2P Payment',
        amount: -Math.abs(amount),
        date: 'Today, ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        cat: 'General',
        icon: <Plus size={18}/>,
        loc: 'Tunis, TN'
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
        <BiometricRing><Fingerprint size={90} color="#3b82f6" /></BiometricRing>
        <h1 style={{fontWeight: 900, letterSpacing: -2, margin: 0, fontSize: '2.4rem'}}>FLOUCI</h1>
        <p style={{opacity:0.5, fontWeight: 600, marginTop: 15, letterSpacing: 1}}>AUTHORIZED ACCESS ONLY</p>
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
              <div style={{ width: 55, height: 55, borderRadius: '22px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>FF</div>
              <div><div style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 800, textTransform: 'uppercase' }}>Good Evening,</div><div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Foulen Fouleni</div></div>
            </div>
            <div style={{ display:'flex', gap: 15 }}>
               <div style={{ padding: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 18 }}><Search size={20} /></div>
               <div style={{ padding: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 18 }} onClick={() => setView('hub')}><Bell size={20} /></div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 45 }}>
              <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: 900, letterSpacing: 2 }}>VAULT BALANCE</span>
              <h1 style={{ fontSize: '3.8rem', margin: '8px 0', fontWeight: 900, letterSpacing: -4 }}>
                  {formatTND(store.balance)} 
                  <span style={{fontSize:'1.4rem', marginLeft: 10, letterSpacing: 0}}>{store.currency}</span>
              </h1>
              <div onClick={store.togglePrivacy} style={{ display: 'inline-flex', gap: 10, padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 30, cursor:'pointer', border:'1px solid rgba(255,255,255,0.1)', marginTop: 15 }}>
                   {store.isPrivate ? <Eye size={16}/> : <EyeOff size={16}/>} <span style={{fontSize:'0.75rem', fontWeight:800}}>Privacy Mode</span>
              </div>
          </div>
        </Header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '-45px 25px 40px' }}>
          <Card>
              <div style={{fontSize:'0.65rem', color:'#94a3b8', fontWeight:900, marginBottom: 8}}>SAVINGS GATE</div>
              <div style={{fontWeight:900, fontSize:'1.2rem'}}>{formatTND(store.vaultBalance)}</div>
          </Card>
          <Card>
              <div style={{fontSize:'0.65rem', color:'#94a3b8', fontWeight:900, marginBottom: 8}}>REWARD POINTS</div>
              <div style={{fontWeight:900, fontSize:'1.2rem'}}>{store.points.toLocaleString()} <Award size={18} color="#3b82f6" /></div>
          </Card>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 45 }}>
          <ActionCircle onClick={() => setView('transfer')}><div className="icon-box"><ArrowUpRight size={28}/></div><span>Transfer</span></ActionCircle>
          <ActionCircle onClick={() => setView('qr')}><div className="icon-box" style={{background:'#0f172a', color:'white'}}><QrCode size={28}/></div><span>Scan Pay</span></ActionCircle>
          <ActionCircle onClick={() => setView('bills')}><div className="icon-box"><Receipt size={28}/></div><span>Utilities</span></ActionCircle>
          <ActionCircle onClick={() => setView('hub')}><div className="icon-box"><LayoutGrid size={28}/></div><span>Explore</span></ActionCircle>
        </div>

        <div style={{ padding: '0 25px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20 }}>
            <h3 style={{fontWeight:900, margin: 0}}>Tunisian Marketplace</h3>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6' }}>View All</div>
          </div>
          <div style={{ display: 'flex', gap: 15, overflowX: 'auto', paddingBottom: 25 }} className="no-scrollbar">
              {[
                { name: 'Ooredoo', icon: <Smartphone color="#3b82f6"/>, sub: 'Top-up' },
                { name: 'STEG', icon: <Zap color="#eab308"/>, sub: 'Electric' },
                { name: 'Hammas', icon: <Store color="#10b981"/>, sub: 'Shop' },
                { name: 'SONEDE', icon: <Droplets color="#0ea5e9"/>, sub: 'Water' },
                { name: 'Péage', icon: <Car color="#ef4444"/>, sub: 'Roads' }
              ].map(m => (
                  <div key={m.name} onClick={() => { setTargetMerchant(m.name); setView('bills'); }} style={{ minWidth: 120, background:'white', padding: '25px 15px', borderRadius: 35, textAlign:'center', border:'1px solid #f1f5f9', cursor:'pointer' }}>
                      <div style={{marginBottom: 10}}>{m.icon}</div>
                      <div style={{fontSize:'0.85rem', fontWeight:900}}>{m.name}</div>
                      <div style={{fontSize:'0.6rem', color:'#94a3b8', fontWeight:700}}>{m.sub}</div>
                  </div>
              ))}
          </div>
        </div>

        <div style={{ padding: '20px 25px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20 }}>
            <h3 style={{fontWeight:900, margin: 0}}>Ledger History</h3>
            <Filter size={18} color="#94a3b8" />
          </div>
          {store.transactions.map(tx => (
            <div key={tx.id} onClick={() => setTxDetails(tx)} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '20px 0', borderBottom: '1px solid #f1f5f9', cursor:'pointer' }}>
               <div style={{ display:'flex', gap: 15, alignItems:'center' }}>
                  <div style={{ width: 48, height: 48, background:'white', borderRadius: 16, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #f1f5f9' }}>{tx.icon}</div>
                  <div><div style={{fontWeight:800}}>{tx.title}</div><div style={{fontSize:'0.75rem', color:'#94a3b8'}}>{tx.date}</div></div>
               </div>
               <div style={{ fontWeight:900, color: tx.amount > 0 ? '#10b981' : '#0f172a' }}>
                 {tx.amount > 0 ? '+' : ''}{formatTND(tx.amount)}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}
      {view !== 'home' && (
        <ModalOverlay>
            <div style={{ padding: '50px 25px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div onClick={() => {setView('home'); setTargetMerchant('');}} style={{ padding: 12, background:'#f1f5f9', borderRadius: 18, cursor:'pointer' }}><X size={22}/></div>
                <h3 style={{fontWeight:900, letterSpacing:3, fontSize:'0.75rem', color:'#64748b'}}>{view.toUpperCase()}</h3>
                <div style={{width: 46}} />
            </div>

            <div style={{ padding: 25, flex: 1, overflowY: 'auto' }}>
                {view === 'transfer' && (
                    <>
                        <FormInput><label>Destination RIB</label><input placeholder="00 000 00000000000000 00" /></FormInput>
                        <FormInput><label>Amount (TND)</label><input type="number" placeholder="0.000" /></FormInput>
                        <FormInput><label>Reference Note (Optional)</label><input placeholder="e.g. Rent payment" /></FormInput>
                        <button onClick={() => handleTransaction()} style={{ width:'100%', padding: 24, background:'#0f172a', color:'white', border:'none', borderRadius: 28, fontWeight:900, marginTop: 10 }}>
                          {isProcessing ? 'Verifying Identity...' : 'Confirm Transfer'}
                        </button>
                    </>
                )}
                {view === 'bills' && (
                    <>
                        <div style={{ background: '#3b82f6', padding: 25, borderRadius: 30, color:'white', marginBottom: 25 }}>
                            <div style={{ opacity: 0.7, fontSize: '0.7rem', fontWeight: 800 }}>PAYING TO</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{targetMerchant || 'Tunisian Gov'}</div>
                        </div>
                        <FormInput><label>{targetMerchant === 'Ooredoo' ? 'Phone Number' : 'Contract Number'}</label><input placeholder="Enter ID" /></FormInput>
                        <FormInput><label>Bill Reference</label><input placeholder="Optional" /></FormInput>
                        <FormInput><label>Amount to Settle</label><input type="number" placeholder="0.000" /></FormInput>
                        <button onClick={() => handleTransaction()} style={{ width:'100%', padding: 24, background:'#0f172a', color:'white', border:'none', borderRadius: 28, fontWeight:900 }}>
                          {isProcessing ? 'Connecting to Provider...' : 'Pay Securely'}
                        </button>
                    </>
                )}
                {view === 'hub' && (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
                        {[
                          { n: 'Stocks', i: <TrendingUp/>, c: '#3b82f6', s: 'Tunindex' },
                          { n: 'Security', i: <ShieldCheck/>, c: '#10b981', s: 'Insurance' },
                          { n: 'Tickets', i: <Ticket/>, c: '#f59e0b', s: 'Events' },
                          { n: 'Zakat', i: <HeartPulse/>, c: '#ef4444', s: 'Donate' },
                          { n: 'Food', i: <Utensils/>, c: '#8b5cf6', s: 'Coupons' },
                          { n: 'Tax', i: <Landmark/>, c: '#06b6d4', s: 'Jibaya' }
                        ].map(item => (
                            <Card key={item.n} style={{ textAlign:'center' }}>
                                <div style={{ color: item.c, marginBottom: 15 }}>{item.i}</div>
                                <div style={{fontWeight:900, fontSize:'0.9rem'}}>{item.n}</div>
                                <div style={{fontSize:'0.6rem', color:'#94a3b8', fontWeight:700, marginTop: 4}}>{item.s}</div>
                            </Card>
                        ))}
                    </div>
                )}
                {view === 'qr' && (
                    <div style={{textAlign:'center', marginTop: 30}}>
                        <QRFrame>
                           <QrCode size={160} strokeWidth={1} color="#0f172a"/>
                           <ScanLine />
                        </QRFrame>
                        <div style={{ marginTop: 40, padding: 25, background: 'white', borderRadius: 25, border: '1px solid #e2e8f0' }}>
                            <div style={{ color: '#94a3b8', fontWeight: 800, fontSize: '0.7rem', marginBottom: 10 }}>MY UNIQUE ID</div>
                            <div style={{ fontWeight: 900, letterSpacing: 1 }}>FLOUCI-TN-88291-P</div>
                        </div>
                    </div>
                )}
            </div>

            {isProcessing === 'success' && (
              <SuccessOverlay>
                  <CheckCircle2 size={100} />
                  <h2 style={{fontWeight: 900, marginTop: 25, letterSpacing: -1}}>Payment Dispatched</h2>
                  <p style={{color:'#94a3b8', fontWeight:600}}>Funds have left your vault</p>
              </SuccessOverlay>
            )}
        </ModalOverlay>
      )}

      {/* --- TRANSACTION DETAILS --- */}
      {txDetails && (
        <div style={{ position:'absolute', inset:0, background:'rgba(2,6,23,0.85)', zIndex: 4000, display:'flex', alignItems:'flex-end' }} onClick={() => setTxDetails(null)}>
           <BottomSheet onClick={e => e.stopPropagation()}>
              <div style={{textAlign:'center', marginBottom: 40}}>
                 <div style={{width: 50, height:6, background:'#f1f5f9', borderRadius: 10, margin: '0 auto 30px'}} />
                 <h1 style={{fontSize:'3.2rem', fontWeight: 900, margin:0, letterSpacing:-3}}>{formatTND(Math.abs(txDetails.amount))}</h1>
                 <p style={{color:'#94a3b8', fontWeight:800, fontSize:'1.1rem', marginTop: 5}}>{txDetails.title}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap: 20, marginBottom: 40 }}>
                 <div style={{ display:'flex', justifyContent:'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 15 }}><span style={{color:'#94a3b8', fontWeight:600}}>Timestamp</span><span style={{fontWeight:700}}>{txDetails.date}</span></div>
                 <div style={{ display:'flex', justifyContent:'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 15 }}><span style={{color:'#94a3b8', fontWeight:600}}>Terminal</span><span style={{fontWeight:700}}>{txDetails.loc}</span></div>
                 <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{color:'#94a3b8', fontWeight:600}}>Network Status</span><span style={{fontWeight:700, color:'#10b981'}}>Clearance Verified</span></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                  <button style={{ padding: 22, background:'#f8fafc', color:'#0f172a', border:'1px solid #e2e8f0', borderRadius: 25, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', gap: 10 }}>
                    <Download size={18}/> Receipt
                  </button>
                  <button style={{ padding: 22, background:'#0f172a', color:'white', border:'none', borderRadius: 25, fontWeight:900 }}>Support</button>
              </div>
           </BottomSheet>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, background: 'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 35, borderTop:'1px solid #f1f5f9', zIndex: 1000 }}>
        <div onClick={() => setActiveTab('home')} style={{ color: activeTab === 'home' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <Wallet size={24}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 6}}>Vault</div>
        </div>
        <div onClick={() => setActiveTab('stats')} style={{ color: activeTab === 'stats' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <PieChart size={24}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 6}}>Analysis</div>
        </div>
        <div onClick={() => setView('qr')} style={{ width: 72, height: 72, background:'#0f172a', borderRadius: 26, display:'flex', alignItems:'center', justifyContent:'center', color:'white', marginTop: -50, border:'6px solid #f8fafc', cursor:'pointer', boxShadow:'0 15px 30px rgba(15,23,42,0.25)' }}>
          <QrCode size={30}/>
        </div>
        <div onClick={() => setActiveTab('cards')} style={{ color: activeTab === 'cards' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <CreditCard size={24}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 6}}>Cards</div>
        </div>
        <div onClick={() => setActiveTab('profile')} style={{ color: activeTab === 'profile' ? '#3b82f6' : '#94a3b8', textAlign:'center', cursor:'pointer' }}>
          <User size={24}/><div style={{fontSize:'0.65rem', fontWeight:900, marginTop: 6}}>Security</div>
        </div>
      </nav>
    </AppContainer>
  );
}