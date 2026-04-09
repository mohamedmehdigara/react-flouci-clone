import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Wallet, ArrowUpRight, Smartphone, CreditCard, User, Plus, 
  ArrowLeft, Search, Zap, Droplets, Receipt, Bell, PieChart, 
  Gift, Landmark, QrCode, ShoppingBag, Eye, EyeOff, TrendingUp, 
  Fingerprint, Briefcase, Globe, BarChart3, Filter, LayoutGrid, 
  Award, Car, Wifi, ChevronRight, X
} from 'lucide-react';

// --- Animations ---
const springUp = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const scanAnim = keyframes`
  0% { top: 0%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const GlobalStyle = createGlobalStyle`
  body { margin: 0; font-family: 'Inter', sans-serif; background: #020617; overflow: hidden; }
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
    { id: 1, title: 'Ooredoo Fibre', amount: -55.000, date: '15:05', cat: 'Telecom', icon: <Wifi size={18}/> },
    { id: 2, title: 'Architecture Payout', amount: 1200.000, date: '11:20', cat: 'Income', icon: <Briefcase size={18}/> },
    { id: 3, title: 'Monoprix Marsa', amount: -184.200, date: 'Yesterday', cat: 'Grocery', icon: <ShoppingBag size={18}/> },
  ],
  unlock: () => set({ isLocked: false }),
  togglePrivacy: () => set(state => ({ isPrivate: !state.isPrivate })),
  setCurrency: (c) => set({ currency: c }),
}), { name: 'flouci-v14-interactive' }));

// --- Styled Components ---
const AppContainer = styled.div`
  max-width: 480px; margin: 0 auto; height: 100vh; background: #f8fafc;
  position: relative; display: flex; flex-direction: column;
`;

const Header = styled.div`
  background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
  color: white; padding: 50px 25px 90px; border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;
`;

const ActionCircle = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer;
  .icon-box {
    width: 65px; height: 65px; background: white; border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
    transition: 0.2s; box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  }
  &:active .icon-box { transform: scale(0.85); background: #3b82f6; color: white; }
  span { font-size: 0.8rem; font-weight: 800; color: #475569; }
`;

const ModalOverlay = styled.div`
  position: absolute; inset: 0; background: #f8fafc; z-index: 2000;
  display: flex; flex-direction: column; animation: ${css`${springUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`};
`;

const FormInput = styled.div`
  background: white; padding: 20px; border-radius: 25px; border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  label { font-size: 0.7rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; }
  input { width: 100%; border: none; font-size: 1.2rem; font-weight: 700; outline: none; margin-top: 5px; color: #020617; }
`;

export default function App() {
  const { balance, transactions, isPrivate, isLocked, currency, vaultBalance, unlock, togglePrivacy, setCurrency } = useStore();
  const [view, setView] = useState('home'); 
  const [activeTab, setActiveTab] = useState('home');
  const [targetMerchant, setTargetMerchant] = useState('');

  const navigateToBill = (merchant) => {
    setTargetMerchant(merchant);
    setView('bills');
  };

  if (isLocked) {
    return (
      <AppContainer style={{background:'#020617', justifyContent:'center', alignItems:'center', color:'white'}}>
        <GlobalStyle />
        <div onClick={unlock} style={{ textAlign:'center', cursor:'pointer' }}>
            <div style={{ padding: 40, background:'rgba(59,130,246,0.1)', borderRadius: 50, marginBottom: 20 }}>
                <Fingerprint size={80} color="#3b82f6" />
            </div>
            <h2 style={{fontWeight: 900}}>Secure Login</h2>
            <p style={{opacity:0.5}}>Tap to verify Foulen El Fouleni</p>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <GlobalStyle />
      
      {/* --- DASHBOARD VIEW --- */}
      {activeTab === 'home' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }} className="no-scrollbar">
          <Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: '18px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>FF</div>
                <div><div style={{ fontSize: '0.7rem', opacity: 0.6 }}>ASSELMA</div><div style={{ fontWeight: 800 }}>Foulen El Fouleni</div></div>
              </div>
              <Bell size={24} onClick={() => setView('hub')} />
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
                <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 900 }}>
                    {isPrivate ? '••••••' : balance.toFixed(3)} <span style={{fontSize:'1.2rem'}}>{currency}</span>
                </h1>
                <div onClick={togglePrivacy} style={{ display: 'inline-flex', gap: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 30, marginTop: 15, cursor:'pointer' }}>
                   {isPrivate ? <Eye size={16}/> : <EyeOff size={16}/>} <span style={{fontSize:'0.8rem', fontWeight:800}}>Shield Assets</span>
                </div>
            </div>
          </Header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '-40px 25px 30px' }}>
            <div style={{ background: 'white', padding: 20, borderRadius: 30, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{fontSize:'0.6rem', color:'#94a3b8', fontWeight:900}}>VAULT</div>
                <div style={{fontWeight:900, fontSize:'1.1rem'}}>{vaultBalance.toFixed(3)} TND</div>
            </div>
            <div style={{ background: 'white', padding: 20, borderRadius: 30, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{fontSize:'0.6rem', color:'#94a3b8', fontWeight:900}}>XP POINTS</div>
                <div style={{fontWeight:900, fontSize:'1.1rem'}}>6,120 <Gift size={14} color="#3b82f6" /></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 40 }}>
            <ActionCircle onClick={() => setView('transfer')}><div className="icon-box"><ArrowUpRight/></div><span>Send</span></ActionCircle>
            <ActionCircle onClick={() => setView('qr')}><div className="icon-box" style={{background:'#0f172a', color:'white'}}><QrCode/></div><span>Pay</span></ActionCircle>
            <ActionCircle onClick={() => setView('bills')}><div className="icon-box"><Receipt/></div><span>Bills</span></ActionCircle>
            <ActionCircle onClick={() => setView('hub')}><div className="icon-box"><LayoutGrid/></div><span>Hub</span></ActionCircle>
          </div>

          <div style={{ padding: '0 25px' }}>
            <h3 style={{fontWeight:900}}>Quick Pay</h3>
            <div style={{ display: 'flex', gap: 15, overflowX: 'auto', paddingBottom: 20 }} className="no-scrollbar">
                {['Ooredoo', 'STEG', 'SONEDE', 'Péage'].map(m => (
                    <div key={m} onClick={() => navigateToBill(m)} style={{ minWidth: 100, background:'white', padding: 20, borderRadius: 25, textAlign:'center', border:'1px solid #f1f5f9', cursor:'pointer' }}>
                        <div style={{marginBottom: 8}}>{m === 'STEG' ? <Zap color="#eab308"/> : <Smartphone color="#3b82f6"/>}</div>
                        <span style={{fontSize:'0.75rem', fontWeight:900}}>{m}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* --- CARDS VIEW --- */}
      {activeTab === 'cards' && (
        <div style={{ padding: 25 }}>
          <h2 style={{fontWeight:900, fontSize:'1.8rem'}}>My Cards</h2>
          <div style={{ width: '100%', height: 220, background: 'linear-gradient(135deg, #1e293b, #020617)', borderRadius: 30, padding: 30, color:'white', position:'relative', marginBottom: 30 }}>
            <div style={{fontSize:'0.8rem', opacity:0.6}}>Foulen El Fouleni</div>
            <div style={{marginTop: 60, fontSize:'1.4rem', letterSpacing: 4, fontWeight:700}}>**** **** **** 8824</div>
            <div style={{position:'absolute', bottom: 30, right: 30, fontWeight:900, fontSize:'1.2rem'}}>VISA</div>
          </div>
          <button style={{ width:'100%', padding: 20, borderRadius: 20, border:'2px dashed #cbd5e1', background:'transparent', fontWeight:800, color:'#64748b' }}>+ Request Virtual Card</button>
        </div>
      )}

      {/* --- INSIGHTS VIEW --- */}
      {activeTab === 'stats' && (
        <div style={{ padding: 25 }}>
          <h2 style={{fontWeight:900, fontSize:'1.8rem'}}>Spending Insights</h2>
          <div style={{ background:'white', padding: 25, borderRadius: 30, marginTop: 20 }}>
             <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 20 }}>
                <span style={{fontWeight:800}}>Food & Drinks</span>
                <span style={{fontWeight:900}}>452.000 TND</span>
             </div>
             <div style={{ height: 8, background:'#f1f5f9', borderRadius: 4, overflow:'hidden' }}>
                <div style={{ width:'65%', height:'100%', background:'#3b82f6' }} />
             </div>
          </div>
        </div>
      )}

      {/* --- MODAL ENGINE --- */}
      {view !== 'home' && (
        <ModalOverlay>
            <div style={{ padding: '50px 25px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div onClick={() => {setView('home'); setTargetMerchant('');}} style={{ padding: 12, background:'#f1f5f9', borderRadius: 15 }}><X size={20}/></div>
                <h3 style={{fontWeight:900, textTransform:'uppercase', letterSpacing:1}}>{view}</h3>
                <div style={{width: 44}} />
            </div>

            <div style={{ padding: 25, flex: 1 }}>
                {view === 'transfer' && (
                    <>
                        <FormInput><label>Recipient</label><input placeholder="RIB or Phone Number" /></FormInput>
                        <FormInput><label>Amount (TND)</label><input type="number" placeholder="0.000" /></FormInput>
                        <button style={{ width:'100%', padding: 22, background:'#020617', color:'white', border:'none', borderRadius: 25, fontWeight:900, marginTop: 20 }}>Send Money Now</button>
                    </>
                )}
                {view === 'bills' && (
                    <>
                        <div style={{ display:'flex', gap: 15, marginBottom: 30 }}>
                            {['Ooredoo', 'STEG', 'SONEDE'].map(b => (
                                <div key={b} onClick={() => setTargetMerchant(b)} style={{ flex:1, padding:15, borderRadius:15, background: targetMerchant === b ? '#3b82f6' : 'white', color: targetMerchant === b ? 'white' : '#020617', textAlign:'center', fontSize:'0.8rem', fontWeight:800, border:'1px solid #e2e8f0' }}>{b}</div>
                            ))}
                        </div>
                        <FormInput><label>Reference Number</label><input placeholder="Enter bill reference" /></FormInput>
                        <button style={{ width:'100%', padding: 22, background:'#020617', color:'white', border:'none', borderRadius: 25, fontWeight:900 }}>Pay {targetMerchant || 'Bill'}</button>
                    </>
                )}
                {view === 'qr' && (
                    <div style={{textAlign:'center'}}>
                        <div style={{ width: 300, height: 300, background:'#fff', border:'4px solid #3b82f6', borderRadius: 40, margin: '20px auto', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                           <QrCode size={180} strokeWidth={1}/>
                           <div style={{ position:'absolute', top:0, left:0, width:'100%', height:4, background:'#3b82f6', animation: css`${scanAnim} 3s infinite` }} />
                        </div>
                        <p style={{fontWeight:800, color:'#94a3b8'}}>Scan Merchant QR to Pay</p>
                    </div>
                )}
                {view === 'hub' && (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 15 }}>
                        {['Insurance', 'Vouchers', 'Travel', 'Savings', 'Charity', 'Stocks'].map(item => (
                            <div key={item} style={{ background:'white', padding: 25, borderRadius: 25, textAlign:'center', border:'1px solid #f1f5f9' }}>
                                <div style={{fontWeight:900}}>{item}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ModalOverlay>
      )}

      {/* --- BOTTOM NAVIGATION --- */}
      <nav style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, background: 'rgba(255,255,255,0.9)', backdropFilter:'blur(10px)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 25, borderTop:'1px solid #f1f5f9' }}>
        <div onClick={() => {setActiveTab('home'); setView('home');}} style={{ color: activeTab === 'home' ? '#3b82f6' : '#94a3b8', textAlign:'center' }}><Wallet/><div style={{fontSize:'0.6rem', fontWeight:900}}>Vault</div></div>
        <div onClick={() => {setActiveTab('stats'); setView('home');}} style={{ color: activeTab === 'stats' ? '#3b82f6' : '#94a3b8', textAlign:'center' }}><PieChart/><div style={{fontSize:'0.6rem', fontWeight:900}}>Stats</div></div>
        <div onClick={() => setView('qr')} style={{ width: 70, height: 70, background:'#020617', borderRadius: 25, display:'flex', alignItems:'center', justifyContent:'center', color:'white', marginTop: -50, border:'5px solid #f8fafc' }}><QrCode/></div>
        <div onClick={() => {setActiveTab('cards'); setView('home');}} style={{ color: activeTab === 'cards' ? '#3b82f6' : '#94a3b8', textAlign:'center' }}><CreditCard/><div style={{fontSize:'0.6rem', fontWeight:900}}>Cards</div></div>
        <div onClick={() => {setActiveTab('profile'); setView('home');}} style={{ color: activeTab === 'profile' ? '#3b82f6' : '#94a3b8', textAlign:'center' }}><User/><div style={{fontSize:'0.6rem', fontWeight:900}}>Self</div></div>
      </nav>
    </AppContainer>
  );
}