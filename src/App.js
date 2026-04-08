import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Smartphone, 
  CreditCard, User, Plus, ArrowLeft, Search, Zap, 
  Droplets, Receipt, ChevronRight, Bell, ShieldCheck, 
  PieChart, Target, Gift, Wifi, Building2, Landmark, 
  QrCode, ShoppingBag, Eye, EyeOff, TrendingUp, 
  Fingerprint, HelpCircle, Ticket, Share2, 
  Briefcase, Globe, BarChart3, HeartPulse,
  Users, Leaf, Lock, Percent, Copy, ExternalLink,
  Coffee, Utensils, Car, ShoppingCart, Activity
} from 'lucide-react';

// --- Animations ---
const springUp = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  70% { transform: translateY(-10px) scale(1.02); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; padding: 0;
    font-family: 'Inter', -apple-system, sans-serif;
    background-color: #020617;
    color: #1e293b;
    overflow: hidden;
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
`;

// --- Store ---
const useStore = create(persist((set) => ({
  balance: 1420.550,
  points: 1240,
  isPrivate: false,
  isLocked: true,
  currency: 'TND',
  vaultBalance: 85.000,
  transactions: [
    { id: 1, title: 'Ooredoo Recharge', amount: -10.000, date: 'Today', cat: 'Telecom', icon: <Smartphone size={18}/> },
    { id: 2, title: 'Highway Péage', amount: -20.000, date: 'Today', cat: 'Transport', icon: <Car size={18}/> },
    { id: 3, title: 'Salary Deposit', amount: 1500.000, date: 'Apr 01', cat: 'Income', icon: <Landmark size={18}/> },
    { id: 4, title: 'Jumia Market', amount: -85.200, date: 'Mar 28', cat: 'Shopping', icon: <ShoppingCart size={18}/> },
  ],
  unlock: () => set({ isLocked: false }),
  togglePrivacy: () => set(state => ({ isPrivate: !state.isPrivate })),
  setCurrency: (c) => set({ currency: c }),
}), { name: 'flouci-v9-foulen' }));

// --- Styled Components ---
const AppContainer = styled.div`
  max-width: 480px; margin: 0 auto; height: 100vh; background: #f8fafc;
  position: relative; display: flex; flex-direction: column;
`;

const LockScreen = styled.div`
  position: absolute; inset: 0; background: #020617; z-index: 9999;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: white; text-align: center;
`;

const BiometricCore = styled.div`
  padding: 35px; background: rgba(59, 130, 246, 0.1); border-radius: 50px; 
  margin-bottom: 30px; border: 1px solid rgba(59, 130, 246, 0.2);
  animation: ${css`${pulse} 2s infinite ease-in-out`}; color: #3b82f6;
`;

const Header = styled.div`
  background: #020617; color: white; padding: 40px 25px 85px;
  border-bottom-left-radius: 42px; border-bottom-right-radius: 42px;
`;

const BalanceText = styled.h1`
  font-size: 3.2rem; margin: 8px 0; font-weight: 900; letter-spacing: -2px;
  background: linear-gradient(90deg, #fff, #3b82f6, #fff); background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: ${css`${shimmer} 4s linear infinite`};
`;

const StatRow = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: -45px 25px 25px;
`;

const StatCard = styled.div`
  background: white; padding: 22px; border-radius: 30px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.06); border: 1px solid rgba(255,255,255,0.7);
  .label { font-size: 0.65rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; }
  .val { font-size: 1.15rem; font-weight: 900; margin-top: 6px; color: #020617; display: flex; align-items: center; gap: 5px; }
`;

const ScrollArea = styled.div`
  flex: 1; overflow-y: auto; padding-bottom: 110px;
  &::-webkit-scrollbar { display: none; }
`;

const ActionCircle = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer;
  .icon-box {
    width: 65px; height: 65px; background: white; border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04); color: #020617;
    transition: transform 0.2s;
  }
  &:active .icon-box { transform: scale(0.9); background: #020617; color: white; }
  span { font-size: 0.75rem; font-weight: 800; color: #475569; }
`;

const ModalOverlay = styled.div`
  position: absolute; inset: 0; background: white; z-index: 2000;
  padding: 40px 25px; animation: ${css`${springUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`};
`;

const FloatingNav = styled.nav`
  position: absolute; bottom: 0; width: 100%; height: 90px;
  background: rgba(255,255,255,0.9); backdrop-filter: blur(15px);
  display: flex; justify-content: space-around; align-items: center;
  border-top: 1px solid #f1f5f9; padding-bottom: 20px; z-index: 1000;
`;

const CurrencyTag = styled.div`
  display: flex; gap: 8px; margin-top: 20px; background: rgba(255,255,255,0.08); padding: 5px; border-radius: 14px;
`;

const TabButton = styled.button`
  flex: 1; padding: 10px; border-radius: 10px; border: none; font-size: 0.7rem;
  font-weight: 900; background: ${props => props.active ? '#3b82f6' : 'transparent'};
  color: white; cursor: pointer;
`;

export default function App() {
  const { balance, transactions, points, isPrivate, isLocked, currency, vaultBalance, unlock, togglePrivacy, setCurrency } = useStore();
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');

  const exchangeRates = { TND: 1, EUR: 0.29, USD: 0.32 };
  const displayBalance = (balance * exchangeRates[currency]).toFixed(currency === 'TND' ? 3 : 2);

  if (isLocked) {
    return (
      <LockScreen onClick={unlock}>
        <GlobalStyle />
        <BiometricCore><Fingerprint size={90} /></BiometricCore>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>FLOUCI SECURE</h1>
        <p style={{ opacity: 0.4 }}>Tap to authenticate Foulen El Fouleni</p>
      </LockScreen>
    );
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <ScrollArea>
        <Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: 50, height: 50, borderRadius: '18px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 900, fontSize: '1.1rem' }}>FF</div>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Asslema,</div>
                <div style={{ fontWeight: 900 }}>Foulen El Fouleni</div>
              </div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px' }}><Bell size={22}/></div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Current Balance</span>
            <BalanceText>
              {isPrivate ? '••••••' : displayBalance} 
              <span style={{ fontSize: '1.2rem', marginLeft: '12px', opacity: 0.9, color: 'white' }}>{currency}</span>
            </BalanceText>
            <div onClick={togglePrivacy} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 18px', background: 'rgba(255,255,255,0.1)', borderRadius: '25px', cursor: 'pointer' }}>
              {isPrivate ? <Eye size={15}/> : <EyeOff size={15}/>}
              <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Privacy Mask</span>
            </div>
          </div>

          <CurrencyTag>
            {['TND', 'EUR', 'USD'].map(curr => (
              <TabButton key={curr} active={currency === curr} onClick={() => setCurrency(curr)}>{curr}</TabButton>
            ))}
          </CurrencyTag>
        </Header>

        <StatRow>
          <StatCard>
            <div className="label">Wealth Vault</div>
            <div className="val">{vaultBalance.toFixed(3)} <small>TND</small></div>
          </StatCard>
          <StatCard>
            <div className="label">Points</div>
            <div className="val">{points} <Gift size={16} color="#3b82f6" /></div>
          </StatCard>
        </StatRow>

        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 25px 35px' }}>
          <ActionCircle onClick={() => setView('transfer')}>
            <div className="icon-box"><ArrowUpRight size={24} /></div>
            <span>Send</span>
          </ActionCircle>
          <ActionCircle onClick={() => setView('qr')}>
            <div className="icon-box" style={{background:'#020617', color:'white'}}><QrCode size={24} /></div>
            <span>Pay</span>
          </ActionCircle>
          <ActionCircle onClick={() => setView('invest')}>
            <div className="icon-box"><TrendingUp size={24} /></div>
            <span>Market</span>
          </ActionCircle>
          <ActionCircle onClick={() => setView('more')}>
            <div className="icon-box"><Plus size={24} /></div>
            <span>More</span>
          </ActionCircle>
        </div>

        <div style={{ padding: '0 25px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>Activity</h3>
          <Search size={20} color="#94a3b8" />
        </div>

        {transactions.map(tx => (
          <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 25px', background: 'white', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '16px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {tx.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>{tx.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tx.cat} • {tx.date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, color: tx.amount > 0 ? '#10b981' : '#1e293b' }}>
                {tx.amount > 0 ? '+' : ''}{isPrivate ? '***' : tx.amount.toFixed(3)}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800 }}>Settled</div>
            </div>
          </div>
        ))}
      </ScrollArea>

      {view !== 'home' && (
        <ModalOverlay>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div onClick={() => setView('home')} style={{ padding: '10px', background: '#f1f5f9', borderRadius: '14px', cursor: 'pointer' }}><ArrowLeft size={24} /></div>
            <h3 style={{ margin: 0, fontWeight: 900 }}>{view.toUpperCase()}</h3>
            <div style={{ width: 44 }} />
          </div>
          {view === 'transfer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px' }}>
                <input style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '1.1rem', outline: 'none' }} placeholder="Phone number or RIB" />
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px' }}>
                <input style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '2rem', textAlign: 'center', fontWeight: 900, outline: 'none' }} placeholder="0.000" type="number" />
              </div>
              <button style={{ padding: '22px', borderRadius: '25px', background: '#020617', color: 'white', border: 'none', fontWeight: 900 }}>Confirm Transaction</button>
            </div>
          )}
        </ModalOverlay>
      )}

      <FloatingNav>
        <div onClick={() => setActiveTab('home')} style={{ color: activeTab === 'home' ? '#3b82f6' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Wallet size={26}/><span style={{fontSize: '0.65rem', fontWeight: 900}}>Vault</span>
        </div>
        <div onClick={() => setActiveTab('market')} style={{ color: activeTab === 'market' ? '#3b82f6' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <BarChart3 size={26}/><span style={{fontSize: '0.65rem', fontWeight: 900}}>Market</span>
        </div>
        <div onClick={() => setView('qr')} style={{ width: 70, height: 70, background: '#020617', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginTop: '-50px', border: '4px solid white', cursor: 'pointer' }}>
          <QrCode size={32}/>
        </div>
        <div onClick={() => setActiveTab('cards')} style={{ color: activeTab === 'cards' ? '#3b82f6' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <CreditCard size={26}/><span style={{fontSize: '0.65rem', fontWeight: 900}}>Cards</span>
        </div>
        <div onClick={() => setActiveTab('profile')} style={{ color: activeTab === 'profile' ? '#3b82f6' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <User size={26}/><span style={{fontSize: '0.65rem', fontWeight: 900}}>Self</span>
        </div>
      </FloatingNav>
    </AppContainer>
  );
}