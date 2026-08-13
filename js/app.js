const { useState, useEffect, useRef, useMemo } = React;

// --- Initial Financial Data Models ---
const INITIAL_BANKS = [
  {
    id: 'maybank-1',
    bankName: 'Maybank',
    cardName: 'MAE / Maybank2u Visa',
    cardNumber: '4532 •••• •••• 9812',
    accountNumber: '1642 8829 9812',
    balance: 14250.50,
    cardType: 'maybank',
    cardHolder: 'AMIRUL ASHRAF',
    expiry: '08/28',
    colorClass: 'card-maybank',
    brandColor: '#F7C900',
    icon: 'credit-card',
    isDefault: true,
  },
  {
    id: 'cimb-1',
    bankName: 'CIMB Bank',
    cardName: 'CIMB OCTO Mastercard',
    cardNumber: '5412 •••• •••• 3410',
    accountNumber: '7051 4412 3410',
    balance: 8840.00,
    cardType: 'cimb',
    cardHolder: 'AMIRUL ASHRAF',
    expiry: '11/27',
    colorClass: 'card-cimb',
    brandColor: '#ED1C24',
    icon: 'landmark',
  },
  {
    id: 'bankislam-1',
    bankName: 'Bank Islam',
    cardName: 'Visa Debit-i Platinum',
    cardNumber: '4219 •••• •••• 4421',
    accountNumber: '1209 8812 4421',
    balance: 5310.20,
    cardType: 'bankislam',
    cardHolder: 'AMIRUL ASHRAF',
    expiry: '05/29',
    colorClass: 'card-bankislam',
    brandColor: '#008080',
    icon: 'shield-check',
  },
  {
    id: 'tng-1',
    bankName: "Touch 'n Go",
    cardName: 'TNG eWallet & RFID',
    cardNumber: '012 •••• •••• 8819',
    accountNumber: 'TNG-8819-2026',
    balance: 485.60,
    cardType: 'tng',
    cardHolder: 'AMIRUL ASHRAF',
    expiry: 'N/A',
    colorClass: 'card-tng',
    brandColor: '#0084E3',
    icon: 'smartphone',
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    title: 'Gaji Bulanan (GloverTech Ltd)',
    category: 'Gaji & Pendapatan',
    amount: 6500.00,
    type: 'income',
    bankId: 'maybank-1',
    bankName: 'Maybank',
    date: '2026-08-01',
    icon: 'arrow-down-left'
  },
  {
    id: 'tx-2',
    title: 'Village Grocer KLCC',
    category: 'Barang Dapur',
    amount: 245.80,
    type: 'expense',
    bankId: 'cimb-1',
    bankName: 'CIMB Bank',
    date: '2026-08-03',
    icon: 'shopping-cart'
  },
  {
    id: 'tx-3',
    title: 'Shell Petrol Bangsar South',
    category: 'Pengangkutan',
    amount: 80.00,
    type: 'expense',
    bankId: 'tng-1',
    bankName: "Touch 'n Go",
    date: '2026-08-05',
    icon: 'fuel'
  },
  {
    id: 'tx-4',
    title: 'Bil Elektrik Tenaga Nasional (TNB)',
    category: 'Utiliti & Bil',
    amount: 168.40,
    type: 'expense',
    bankId: 'bankislam-1',
    bankName: 'Bank Islam',
    date: '2026-08-07',
    icon: 'zap'
  },
  {
    id: 'tx-5',
    title: 'Zus Coffee Mid Valley',
    category: 'Makanan & Minuman',
    amount: 15.50,
    type: 'expense',
    bankId: 'tng-1',
    bankName: "Touch 'n Go",
    date: '2026-08-09',
    icon: 'coffee'
  },
  {
    id: 'tx-6',
    title: 'Pindahan ke Tabung Umrah',
    category: 'Simpanan',
    amount: 500.00,
    type: 'expense',
    bankId: 'maybank-1',
    bankName: 'Maybank',
    date: '2026-08-10',
    icon: 'piggy-bank'
  },
  {
    id: 'tx-7',
    title: 'Dividen Pelaburan ASB',
    category: 'Pelaburan',
    amount: 850.00,
    type: 'income',
    bankId: 'bankislam-1',
    bankName: 'Bank Islam',
    date: '2026-08-11',
    icon: 'trending-up'
  },
  {
    id: 'tx-8',
    title: 'Shopee Online Shopping',
    category: 'Beli-belah',
    amount: 120.00,
    type: 'expense',
    bankId: 'cimb-1',
    bankName: 'CIMB Bank',
    date: '2026-08-12',
    icon: 'shopping-bag'
  }
];

const INITIAL_SAVINGS_GOALS = [
  {
    id: 'goal-1',
    title: 'Tabung Umrah & Haji',
    targetAmount: 12000,
    currentAmount: 7500,
    category: 'Ibadah',
    color: 'from-emerald-500 to-teal-700',
    icon: 'moon'
  },
  {
    id: 'goal-2',
    title: 'Tabung Kecemasan (6 Bulan)',
    targetAmount: 20000,
    currentAmount: 15200,
    category: 'Keselamatan',
    color: 'from-cyan-500 to-blue-700',
    icon: 'shield-alert'
  },
  {
    id: 'goal-3',
    title: 'Deposit Rumah Pertama',
    targetAmount: 35000,
    currentAmount: 21000,
    category: 'Hartanah',
    color: 'from-amber-500 to-orange-600',
    icon: 'home'
  },
  {
    id: 'goal-4',
    title: 'Percutian Pulau Redang',
    targetAmount: 3000,
    currentAmount: 2400,
    category: 'Gaya Hidup',
    color: 'from-pink-500 to-rose-600',
    icon: 'palmtree'
  }
];

const AVAILABLE_BANKS_TO_CONNECT = [
  { id: 'maybank', name: 'Maybank (Maybank2u / MAE)', logo: 'M2U', color: '#F7C900', textColor: '#000000', type: 'maybank' },
  { id: 'cimb', name: 'CIMB Bank (OCTO / CIMB Clicks)', logo: 'CIMB', color: '#ED1C24', textColor: '#FFFFFF', type: 'cimb' },
  { id: 'bankislam', name: 'Bank Islam Malaysia', logo: 'BIMB', color: '#008080', textColor: '#FFFFFF', type: 'bankislam' },
  { id: 'tng', name: "Touch 'n Go eWallet", logo: 'TNG', color: '#0084E3', textColor: '#FFFFFF', type: 'tng' },
  { id: 'rhb', name: 'RHB Bank (RHB Now)', logo: 'RHB', color: '#0066B3', textColor: '#FFFFFF', type: 'generic' },
  { id: 'publicbank', name: 'Public Bank (PBEbank)', logo: 'PBB', color: '#D9251D', textColor: '#FFFFFF', type: 'generic' },
  { id: 'hongleong', name: 'Hong Leong Bank (HLB Connect)', logo: 'HLB', color: '#0A2540', textColor: '#FFFFFF', type: 'generic' }
];

// Helper Formatter
const formatRM = (val) => {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2
  }).format(val).replace('MYR', 'RM');
};

// --- Main App Component ---
function App() {
  // Theme & App State
  const [theme, setTheme] = useState('dark');
  const [showBalance, setShowBalance] = useState(true);
  const [walletViewMode, setWalletViewMode] = useState('holder'); // 'holder' or 'grid'
  const [activeCardId, setActiveCardId] = useState(INITIAL_BANKS[0].id);

  const [banks, setBanks] = useState(INITIAL_BANKS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState(INITIAL_SAVINGS_GOALS);
  const [selectedBankFilter, setSelectedBankFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Modals state
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState(null);

  // Bank Connection Wizard state
  const [connectStep, setConnectStep] = useState(1);
  const [selectedBankToConnect, setSelectedBankToConnect] = useState(AVAILABLE_BANKS_TO_CONNECT[0]);
  const [connectForm, setConnectForm] = useState({ username: '', password: '', accountNo: '', cardHolder: '' });
  const [otpCode, setOtpCode] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // New Transaction Form State
  const [txForm, setTxForm] = useState({
    title: '',
    category: 'Makanan & Minuman',
    amount: '',
    type: 'expense',
    bankId: INITIAL_BANKS[0].id
  });

  // Deposit Goal Form State
  const [depositAmount, setDepositAmount] = useState('');
  const [depositFromBankId, setDepositFromBankId] = useState(INITIAL_BANKS[0].id);

  // Budget Category Limits
  const [budgetLimits, setBudgetLimits] = useState({
    'Barang Dapur': { limit: 1000, spent: 245.80 },
    'Utiliti & Bil': { limit: 500, spent: 168.40 },
    'Pengangkutan': { limit: 400, spent: 80.00 },
    'Makanan & Minuman': { limit: 600, spent: 15.50 }
  });

  // Toast Helper
  const triggerToast = (message, title = 'Berjaya') => {
    setToast({ title, message, id: Date.now() });
    setTimeout(() => setToast(null), 3800);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Calculations
  const totalNetWorth = useMemo(() => {
    return banks.reduce((acc, bank) => acc + bank.balance, 0);
  }, [banks]);

  const totalMonthlyIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalMonthlyExpense = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  // Financial Health Score
  const healthScore = useMemo(() => {
    if (totalMonthlyIncome === 0) return 85;
    const savingsRatio = ((totalMonthlyIncome - totalMonthlyExpense) / totalMonthlyIncome) * 100;
    let score = 70 + Math.round(savingsRatio * 0.3);
    return Math.min(Math.max(score, 50), 98);
  }, [totalMonthlyIncome, totalMonthlyExpense]);

  // Active Selected Card Object
  const activeBankCard = useMemo(() => {
    return banks.find(b => b.id === activeCardId) || banks[0];
  }, [banks, activeCardId]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesBank = selectedBankFilter === 'all' || tx.bankId === selectedBankFilter;
      const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.bankName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBank && matchesSearch;
    });
  }, [transactions, selectedBankFilter, searchQuery]);

  // GSAP Animations Initialization
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();

    if (window.gsap) {
      gsap.fromTo('.gsap-hero-networth',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo('.gsap-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );
    }
  }, []);

  // Re-trigger lucide icons when state modal or cards change
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [isConnectModalOpen, isAddTxModalOpen, isDepositModalOpen, connectStep, banks, transactions, walletViewMode, activeCardId]);

  // Copy Card Details to Clipboard
  const handleCopyCard = (cardNum) => {
    navigator.clipboard?.writeText(cardNum.replace(/•/g, '0'));
    triggerToast(`Nombor kad ${cardNum} telah disalin ke papan klip!`, 'Nombor Kad Disalin');
  };

  // Handle Bank Connection Submit
  const handleConnectBank = (e) => {
    e.preventDefault();
    if (connectStep === 1) {
      setConnectStep(2);
    } else if (connectStep === 2) {
      if (!connectForm.username) {
        alert('Sila masukkan Nama Pengguna / No. Kad!');
        return;
      }
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        setConnectStep(3); // OTP Verification
      }, 1500);
    } else if (connectStep === 3) {
      if (!otpCode || otpCode.length < 4) {
        alert('Sila masukkan kod TAC / OTP 6-digit yang sah!');
        return;
      }
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);

        // Generate New Bank Card
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const randomAccount = Math.floor(1000000000 + Math.random() * 9000000000);
        const randomBalance = Math.floor(1500 + Math.random() * 8500);

        const newBank = {
          id: `${selectedBankToConnect.type}-${Date.now()}`,
          bankName: selectedBankToConnect.name.split(' (')[0],
          cardName: `${selectedBankToConnect.name.split(' (')[0]} Platinum Card`,
          cardNumber: `4${Math.floor(100 + Math.random() * 900)} •••• •••• ${randomDigits}`,
          accountNumber: `${randomAccount}`,
          balance: randomBalance,
          cardType: selectedBankToConnect.type,
          cardHolder: connectForm.cardHolder.toUpperCase() || 'AMIRUL ASHRAF',
          expiry: '12/30',
          colorClass: selectedBankToConnect.type === 'maybank' ? 'card-maybank'
            : selectedBankToConnect.type === 'cimb' ? 'card-cimb'
              : selectedBankToConnect.type === 'bankislam' ? 'card-bankislam'
                : selectedBankToConnect.type === 'tng' ? 'card-tng' : 'card-generic',
          brandColor: selectedBankToConnect.color,
          icon: 'credit-card'
        };

        setBanks(prev => [...prev, newBank]);
        setActiveCardId(newBank.id);
        triggerToast(`Akaun ${newBank.bankName} berjaya dimasukkan ke dalam Pemegang Kad! Saldo awal: ${formatRM(newBank.balance)}`, 'Kad Dimasukkan ke Card Holder');
        setIsConnectModalOpen(false);
        setConnectStep(1);
        setConnectForm({ username: '', password: '', accountNo: '', cardHolder: '' });
        setOtpCode('');
      }, 1800);
    }
  };

  // Handle Add Manual Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!txForm.title || !txForm.amount || parseFloat(txForm.amount) <= 0) {
      alert('Sila isi maklumat transaksi dengan betul!');
      return;
    }

    const targetBank = banks.find(b => b.id === txForm.bankId) || banks[0];
    const amountVal = parseFloat(txForm.amount);

    const newTx = {
      id: `tx-${Date.now()}`,
      title: txForm.title,
      category: txForm.category,
      amount: amountVal,
      type: txForm.type,
      bankId: targetBank.id,
      bankName: targetBank.bankName,
      date: new Date().toISOString().split('T')[0],
      icon: txForm.type === 'income' ? 'arrow-down-left' : 'arrow-up-right'
    };

    // Update bank balance
    setBanks(prev => prev.map(b => {
      if (b.id === targetBank.id) {
        const updatedBal = txForm.type === 'income' ? b.balance + amountVal : b.balance - amountVal;
        return { ...b, balance: Math.max(updatedBal, 0) };
      }
      return b;
    }));

    // Update budget category spent if expense
    if (txForm.type === 'expense' && budgetLimits[txForm.category]) {
      setBudgetLimits(prev => ({
        ...prev,
        [txForm.category]: {
          ...prev[txForm.category],
          spent: prev[txForm.category].spent + amountVal
        }
      }));
    }

    setTransactions(prev => [newTx, ...prev]);
    triggerToast(`Transaksi "${txForm.title}" (${formatRM(amountVal)}) telah direkodkan.`, 'Transaksi Baru');
    setIsAddTxModalOpen(false);
    setTxForm({ title: '', category: 'Makanan & Minuman', amount: '', type: 'expense', bankId: banks[0].id });
  };

  // Handle Deposit to Savings Goal
  const handleDepositToGoal = (e) => {
    e.preventDefault();
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Sila masukkan jumlah simpanan!');
      return;
    }

    const amountVal = parseFloat(depositAmount);
    const sourceBank = banks.find(b => b.id === depositFromBankId) || banks[0];

    if (sourceBank.balance < amountVal) {
      alert(`Baki akaun ${sourceBank.bankName} tidak mencukupi! (Baki: ${formatRM(sourceBank.balance)})`);
      return;
    }

    // Deduct from bank
    setBanks(prev => prev.map(b => {
      if (b.id === sourceBank.id) {
        return { ...b, balance: b.balance - amountVal };
      }
      return b;
    }));

    // Add to Goal
    setGoals(prev => prev.map(g => {
      if (g.id === selectedGoalForDeposit.id) {
        return { ...g, currentAmount: g.currentAmount + amountVal };
      }
      return g;
    }));

    // Record as transaction
    const newTx = {
      id: `tx-${Date.now()}`,
      title: `Deposit: ${selectedGoalForDeposit.title}`,
      category: 'Simpanan',
      amount: amountVal,
      type: 'expense',
      bankId: sourceBank.id,
      bankName: sourceBank.bankName,
      date: new Date().toISOString().split('T')[0],
      icon: 'piggy-bank'
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerToast(`Deposit ${formatRM(amountVal)} dari ${sourceBank.bankName} ke "${selectedGoalForDeposit.title}" berjaya!`, 'Tabung Diperkemas');
    setIsDepositModalOpen(false);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-400 selection:text-slate-950">

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/40 animate-bounce">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 dark:text-emerald-600">
            <i data-lucide="check-circle" className="w-5 h-5"></i>
          </div>
          <div>
            <p className="font-display font-bold text-sm">{toast.title}</p>
            <p className="text-xs opacity-80">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl emerald-gradient-bg flex items-center justify-center shadow-lg shadow-emerald-500/25 pulse-emerald">
              <i data-lucide="credit-card" className="w-6 h-6 text-slate-950"></i>
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Kawal <span className="emerald-gradient-text">Money</span>
              </span>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                Pemegang Kad Bank Peribadi
              </span>
            </div>
          </div>

          {/* Quick Stats Nav Badge */}
          <div className="hidden md:flex items-center space-x-6 px-4 py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Dalam Card Holder:</span>
              <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{banks.length} Kad</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center space-x-2">
              <i data-lucide="shield-check" className="w-4 h-4 text-emerald-500"></i>
              <span className="text-xs font-bold text-emerald-500">Enkripsi 256-bit</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Show/Hide Balance Toggle */}
            <button
              onClick={() => setShowBalance(!showBalance)}
              title={showBalance ? "Sembunyikan Baki" : "Paparkan Baki"}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
            >
              {showBalance ? <i data-lucide="eye" className="w-5 h-5"></i> : <i data-lucide="eye-off" className="w-5 h-5 text-emerald-500"></i>}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Tukar Tema Dark/Light"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
            >
              {theme === 'dark' ? <i data-lucide="sun" className="w-5 h-5 text-amber-400"></i> : <i data-lucide="moon" className="w-5 h-5"></i>}
            </button>

            {/* Connect Bank CTA */}
            <button
              onClick={() => {
                setConnectStep(1);
                setIsConnectModalOpen(true);
              }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
            >
              <i data-lucide="plus-circle" className="w-4 h-4"></i>
              <span>Hubung Kad Bank</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">

        {/* HERO SECTION: Financial Overview & Net Worth */}
        <section className="gsap-hero-networth rounded-3xl glass-panel p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Net Worth Main Numbers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <i data-lucide="sparkles" className="w-4 h-4"></i>
                <span>Jumlah Harta Bersih Dalam Card Holder</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Ringgit Malaysia (MYR)</p>
                <h1 className="font-mono text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {showBalance ? formatRM(totalNetWorth) : 'RM •••••••••'}
                </h1>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Jumlah keseluruhan dari <span className="font-bold text-slate-900 dark:text-white">{banks.length} kad bank</span> tersusun kemas dalam Card Holder.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setIsAddTxModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-md hover:scale-105 transition-all"
                >
                  <i data-lucide="plus" className="w-4 h-4"></i>
                  <span>Rekod Transaksi Baru</span>
                </button>

                <button
                  onClick={() => {
                    setConnectStep(1);
                    setIsConnectModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-display font-semibold text-xs hover:border-emerald-500 transition-colors"
                >
                  <i data-lucide="link-2" className="w-4 h-4 text-emerald-500"></i>
                  <span>Tambah Kad Dalam Slot</span>
                </button>
              </div>
            </div>

            {/* Income / Expense & Health Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Monthly Income Card */}
              <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/90 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Penerimaan Bulan Ini</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <i data-lucide="arrow-down-left" className="w-4 h-4"></i>
                  </div>
                </div>
                <p className="font-mono text-xl font-bold text-emerald-500">
                  {showBalance ? formatRM(totalMonthlyIncome) : 'RM ••••••'}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <i data-lucide="trending-up" className="w-3 h-3"></i> +12.4% berbanding bulan lepas
                </span>
              </div>

              {/* Monthly Expense Card */}
              <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/90 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Perbelanjaan Bulan Ini</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <i data-lucide="arrow-up-right" className="w-4 h-4"></i>
                  </div>
                </div>
                <p className="font-mono text-xl font-bold text-rose-500">
                  {showBalance ? formatRM(totalMonthlyExpense) : 'RM ••••••'}
                </p>
                <span className="text-[11px] text-slate-400 font-medium">
                  {transactions.filter(t => t.type === 'expense').length} Transaksi Direkodkan
                </span>
              </div>

              {/* Financial Health Score Gauge */}
              <div className="sm:col-span-2 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Pengurusan Kad Bank</span>
                  <h4 className="font-display font-bold text-sm">Skor Kesihatan Kewangan</h4>
                  <p className="text-xs text-slate-400">Status: <span className="text-emerald-400 font-semibold">Sangat Baik & Teratur</span></p>
                </div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-500/10 font-mono text-xl font-extrabold text-emerald-400 shadow-lg shadow-emerald-500/20">
                  {healthScore}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PHYSICAL CARD HOLDER SECTION (CARDS STACKED FROM BOTTOM TO TOP IN 1 HOLDER) */}
        <section className="gsap-section space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Physical Card Holder UI</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Susun Dari Bawah Ke Atas
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Pemegang Kad Bank <span className="emerald-gradient-text">(Card Holder)</span>
              </h2>
            </div>

            {/* View Mode Toggle: Card Holder vs Grid View */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-900 p-1 rounded-2xl border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setWalletViewMode('holder')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  walletViewMode === 'holder'
                    ? 'emerald-gradient-bg text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                <i data-lucide="credit-card" className="w-4 h-4"></i>
                <span>1 Pemegang Kad (Bottom-to-Top)</span>
              </button>
              <button
                onClick={() => setWalletViewMode('grid')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  walletViewMode === 'grid'
                    ? 'emerald-gradient-bg text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                <i data-lucide="layout-grid" className="w-4 h-4"></i>
                <span>Grid Bersisian</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: PHYSICAL CARD HOLDER (STACKED FROM BOTTOM TO TOP) */}
          {walletViewMode === 'holder' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Physical Card Holder Pocket (7 Cols) */}
              <div className="lg:col-span-7 card-holder-container space-y-4">
                
                {/* Holder Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <i data-lucide="wallet-cards" className="w-5 h-5"></i>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">Pemegang Kad (Card Holder)</h3>
                      <p className="text-[11px] text-slate-400">Pilih mana-mana kad dalam slot di bawah:</p>
                    </div>
                  </div>

                  {/* Quick One-Touch Bank Selector Tabs */}
                  <div className="flex flex-wrap gap-1.5">
                    {banks.map(bank => {
                      const isActive = bank.id === activeCardId;
                      return (
                        <button
                          key={bank.id}
                          onClick={() => setActiveCardId(bank.id)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1 ${
                            isActive
                              ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bank.brandColor }}></span>
                          <span>{bank.bankName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Staggered Vertical Card Holder Slots (Arranged Bottom to Top) */}
                <div className="space-y-[-100px] pt-4 pb-12">
                  {banks.map((bank, index) => {
                    const isSelected = bank.id === activeCardId;

                    return (
                      <div
                        key={bank.id}
                        onClick={() => setActiveCardId(bank.id)}
                        className={`holder-card-item rounded-3xl p-6 text-white shadow-2xl relative cursor-pointer transition-all duration-300 border ${bank.colorClass} ${
                          isSelected
                            ? 'translate-y-[-12px] z-40 ring-4 ring-emerald-400 shadow-emerald-500/40'
                            : 'hover:translate-y-[-18px] hover:z-30 opacity-95'
                        }`}
                        style={{ zIndex: isSelected ? 40 : 10 + index }}
                      >
                        {/* Card Slot Header Bar (Always Visible at Top of Slot) */}
                        <div className="flex items-center justify-between relative z-10 pb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <i data-lucide={bank.icon || 'credit-card'} className="w-4 h-4"></i>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-300">{bank.bankName}</span>
                              <h4 className="font-display text-sm font-extrabold">{bank.cardName}</h4>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-emerald-400">
                              {showBalance ? formatRM(bank.balance) : 'RM •••••'}
                            </span>
                            {isSelected && (
                              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                                Kad Dipilih ★
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Details Body */}
                        <div className="my-3 flex items-center justify-between relative z-10">
                          <p className="font-mono text-sm tracking-wider font-semibold opacity-90">
                            {bank.cardNumber}
                          </p>
                          <span className="text-[10px] font-mono opacity-80">TAMAT: {bank.expiry}</span>
                        </div>

                        {/* Card Footer Holder Info */}
                        <div className="flex items-center justify-between border-t border-white/15 pt-2 text-[11px] relative z-10">
                          <span className="font-display font-bold">{bank.cardHolder}</span>
                          <span className="text-[10px] text-white/70 italic">Klik untuk aktifkan kad</span>
                        </div>

                        {/* Glow Overlay */}
                        <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400 font-medium">
                  ✨ *Kad-kad disusun kemas dari bawah ke atas. Tajuk dan baki setiap kad sentiasa kelihatan untuk pemilihan mudah.*
                </div>
              </div>

              {/* Right Column: Selected Active Card Spotlight & Quick Actions (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-6 rounded-3xl glass-panel border border-emerald-500/40 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Kad Aktif Dalam Pemegang</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                      Tersambung & Aktif
                    </span>
                  </div>

                  {/* Active Card Visual Preview */}
                  <div className={`p-6 rounded-3xl text-white space-y-4 shadow-xl border ${activeBankCard.colorClass}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold tracking-widest opacity-90">{activeBankCard.bankName}</span>
                      <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <i data-lucide={activeBankCard.icon || 'credit-card'} className="w-4 h-4"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold">{activeBankCard.cardName}</h3>
                      <p className="font-mono text-sm opacity-90">{activeBankCard.cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/20 pt-3">
                      <div>
                        <span className="text-[9px] uppercase block text-white/70">Pemegang Kad</span>
                        <span className="font-bold text-xs">{activeBankCard.cardHolder}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase block text-white/70">Baki Akaun</span>
                        <span className="font-mono text-lg font-extrabold text-emerald-300">
                          {showBalance ? formatRM(activeBankCard.balance) : 'RM ••••••'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleCopyCard(activeBankCard.cardNumber)}
                      className="p-3 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-emerald-500 bg-white/50 dark:bg-slate-900 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
                    >
                      <i data-lucide="copy" className="w-4 h-4 text-emerald-500"></i>
                      <span>Salin No. Kad</span>
                    </button>

                    <button
                      onClick={() => {
                        setTxForm(prev => ({ ...prev, bankId: activeBankCard.id }));
                        setIsAddTxModalOpen(true);
                      }}
                      className="p-3 rounded-xl emerald-gradient-bg text-slate-950 text-xs font-bold flex items-center justify-center space-x-2 shadow-md hover:scale-105 transition-all"
                    >
                      <i data-lucide="plus" className="w-4 h-4"></i>
                      <span>Guna Kad Ini</span>
                    </button>
                  </div>

                  {/* Transactions Ledger Preview for Active Card */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Transaksi Kad Ini:</span>
                      <span className="text-[10px] text-slate-400 font-mono">{activeBankCard.accountNumber}</span>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {transactions.filter(t => t.bankId === activeBankCard.id).length === 0 ? (
                        <p className="text-xs text-slate-500 py-2">Tiada transaksi direkodkan untuk kad ini lagi.</p>
                      ) : (
                        transactions.filter(t => t.bankId === activeBankCard.id).slice(0, 4).map(tx => (
                          <div key={tx.id} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950">
                            <span className="font-semibold text-slate-900 dark:text-white truncate">{tx.title}</span>
                            <span className={`font-mono font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {tx.type === 'income' ? '+' : '-'}{formatRM(tx.amount)}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            /* VIEW MODE 2: GRID VIEW (SIDE BY SIDE) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {banks.map(bank => (
                <div
                  key={bank.id}
                  onClick={() => setActiveCardId(bank.id)}
                  className={`gsap-card-item rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden bank-card-hover min-h-[220px] cursor-pointer ${bank.colorClass} ${
                    bank.id === activeCardId ? 'ring-4 ring-emerald-400 shadow-emerald-500/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{bank.bankName}</span>
                      <h3 className="font-display text-base font-extrabold tracking-wide">{bank.cardName}</h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <i data-lucide={bank.icon || 'credit-card'} className="w-5 h-5"></i>
                    </div>
                  </div>

                  <div className="my-4 space-y-2 relative z-10">
                    <div className="w-8 h-6 rounded bg-amber-400/80 border border-amber-200/50 flex items-center justify-center opacity-90">
                      <div className="w-5 h-4 border-y border-slate-950/40"></div>
                    </div>
                    <p className="font-mono text-sm tracking-wider font-semibold opacity-90">
                      {bank.cardNumber}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-white/15 pt-3 relative z-10">
                    <div>
                      <span className="text-[9px] uppercase font-semibold text-white/70 block">Pemegang Akaun</span>
                      <span className="font-display text-xs font-bold tracking-wider">{bank.cardHolder}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-semibold text-white/70 block">Baki Akaun</span>
                      <span className="font-mono text-base font-extrabold text-white">
                        {showBalance ? formatRM(bank.balance) : 'RM •••••'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BUDGETING & SAVINGS GOALS (TABUNG) */}
        <section className="gsap-section grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Tabung Simpanan (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Perancangan Masa Depan</span>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Tabung Simpanan & Matlamat
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">{goals.length} Tabung Aktif</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map(goal => {
                const progressPct = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
                return (
                  <div
                    key={goal.id}
                    className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                          <i data-lucide={goal.icon || 'target'} className="w-5 h-5"></i>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{goal.title}</h4>
                          <span className="text-[10px] text-slate-500">{goal.category}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        {progressPct}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-700`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                        <span>{showBalance ? formatRM(goal.currentAmount) : 'RM •••'}</span>
                        <span>Sasaran: {formatRM(goal.targetAmount)}</span>
                      </div>
                    </div>

                    {/* Deposit CTA */}
                    <button
                      onClick={() => {
                        setSelectedGoalForDeposit(goal);
                        setIsDepositModalOpen(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-slate-950 dark:bg-slate-900 dark:hover:bg-emerald-500 font-display text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                    >
                      <i data-lucide="arrow-up-right-circle" className="w-4 h-4"></i>
                      <span>Tambah Simpanan</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Category Spending Limits (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Kawalan Perbelanjaan</span>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Had Bajet Bulanan
              </h3>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-5">
              {Object.entries(budgetLimits).map(([catName, data]) => {
                const pct = Math.min(Math.round((data.spent / data.limit) * 100), 100);
                const isWarning = pct >= 80;

                return (
                  <div key={catName} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">{catName}</span>
                      <span className="font-mono text-slate-500">
                        <strong className={isWarning ? "text-rose-500" : "text-slate-900 dark:text-white"}>{formatRM(data.spent)}</strong> / {formatRM(data.limit)}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isWarning ? 'bg-rose-500' : 'emerald-gradient-bg'}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Status Bajet Keseluruhan:</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <i data-lucide="check-circle-2" className="w-4 h-4"></i> Terkawal (Terus Kekalkan)
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* RECENT TRANSACTIONS LEDGER */}
        <section className="gsap-section space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Sejarah Kewangan</span>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Transaksi Terkini
              </h3>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative">
                <i data-lucide="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none w-48 sm:w-60"
                />
              </div>

              {/* Bank Filter Select */}
              <select
                value={selectedBankFilter}
                onChange={(e) => setSelectedBankFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">Semua Akaun Bank</option>
                {banks.map(b => (
                  <option key={b.id} value={b.id}>{b.bankName}</option>
                ))}
              </select>

              {/* Add Transaction Button */}
              <button
                onClick={() => setIsAddTxModalOpen(true)}
                className="px-4 py-2 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-1"
              >
                <i data-lucide="plus" className="w-4 h-4"></i>
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {/* Transactions List Table */}
          <div className="rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-[11px] uppercase tracking-wider font-bold text-slate-500">
                    <th className="py-4 px-6">Butiran Transaksi</th>
                    <th className="py-4 px-6">Kad Bank</th>
                    <th className="py-4 px-6">Kategori</th>
                    <th className="py-4 px-6">Tarikh</th>
                    <th className="py-4 px-6 text-right">Jumlah (RM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-medium">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">
                        Tiada transaksi dijumpai mengikut carian anda.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2.5 rounded-xl ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                              <i data-lucide={tx.icon || 'dollar-sign'} className="w-4 h-4"></i>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white text-sm">{tx.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-[11px]">
                            {tx.bankName}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-500">{tx.category}</td>
                        <td className="py-4 px-6 text-slate-400 font-mono">{tx.date}</td>
                        <td className={`py-4 px-6 text-right font-mono font-bold text-sm ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                          {tx.type === 'income' ? '+' : '-'}{showBalance ? formatRM(tx.amount) : 'RM •••'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 py-10 bg-slate-100/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-xl emerald-gradient-bg flex items-center justify-center">
              <i data-lucide="credit-card" className="w-4 h-4 text-slate-950"></i>
            </div>
            <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white">Kawal Money</span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Sistem pengurusan kewangan peribadi termaju Malaysia. Hak Cipta Terpelihara © 2026 Kawal Money Inc. Data dienkripsi dengan piawaian keselamatan perbankan 256-bit SSL.
          </p>
        </div>
      </footer>

      {/* MODAL 1: CONNECT BANK WIZARD */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl emerald-gradient-bg flex items-center justify-center">
                  <i data-lucide="link-2" className="w-5 h-5 text-slate-950"></i>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Tambah Kad Ke Card Holder</h3>
                  <p className="text-xs text-slate-500">Langkah {connectStep} daripada 3</p>
                </div>
              </div>
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            {/* STEP 1: SELECT BANK */}
            {connectStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Pilih Institusi Perbankan atau eWallet Malaysia:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                  {AVAILABLE_BANKS_TO_CONNECT.map(bankItem => (
                    <button
                      key={bankItem.id}
                      onClick={() => setSelectedBankToConnect(bankItem)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                        selectedBankToConnect.id === bankItem.id
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl font-display font-extrabold text-xs flex items-center justify-center shadow-md"
                        style={{ backgroundColor: bankItem.color, color: bankItem.textColor }}
                      >
                        {bankItem.logo}
                      </div>
                      <div>
                        <p className="font-display font-bold text-xs text-slate-900 dark:text-white">{bankItem.name}</p>
                        <span className="text-[10px] text-emerald-500 font-semibold">Integrasi API Selamat</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setConnectStep(2)}
                  className="w-full py-3.5 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Teruskan Kebenarannya</span>
                  <i data-lucide="arrow-right" className="w-4 h-4"></i>
                </button>
              </div>
            )}

            {/* STEP 2: CREDENTIALS INPUT */}
            {connectStep === 2 && (
              <form onSubmit={handleConnectBank} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-500 flex items-center space-x-2">
                  <i data-lucide="lock" className="w-4 h-4 flex-shrink-0"></i>
                  <span>Log masuk portal {selectedBankToConnect.name} (Simulasi Keselamatan Encrypted).</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Pengguna / No. Telefon eWallet</label>
                  <input
                    type="text"
                    required
                    value={connectForm.username}
                    onChange={(e) => setConnectForm({ ...connectForm, username: e.target.value })}
                    placeholder="Contoh: amirul_maybank"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Pemegang Kad (Seperti di Kad)</label>
                  <input
                    type="text"
                    required
                    value={connectForm.cardHolder}
                    onChange={(e) => setConnectForm({ ...connectForm, cardHolder: e.target.value })}
                    placeholder="AMIRUL ASHRAF"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kata Laluan Perbankan</label>
                  <input
                    type="password"
                    required
                    value={connectForm.password}
                    onChange={(e) => setConnectForm({ ...connectForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setConnectStep(1)}
                    className="w-1/3 py-3 rounded-xl border border-slate-300 dark:border-slate-800 font-display text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="w-2/3 py-3 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                  >
                    {isSyncing ? <span>Pengesahan API...</span> : <span>Minta Kod TAC / OTP</span>}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: OTP VERIFICATION */}
            {connectStep === 3 && (
              <form onSubmit={handleConnectBank} className="space-y-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <i data-lucide="key-round" className="w-6 h-6"></i>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">Pengesahan Keselamatan TAC / OTP</h4>
                  <p className="text-xs text-slate-500">Kod 6-digit telah dihantar ke telefon pintar anda (+6012-***8819).</p>
                </div>

                <div>
                  <input
                    type="text"
                    maxLength="6"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="8 8 2 9 1 0"
                    className="w-48 mx-auto text-center font-mono text-xl tracking-[0.5em] px-4 py-3 rounded-xl border border-emerald-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-extrabold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSyncing}
                  className="w-full py-3.5 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  {isSyncing ? <span>Memasukkan Kad...</span> : <span>Sahkan & Masukkan Kad</span>}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* MODAL 2: ADD TRANSACTION */}
      {isAddTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Rekod Transaksi Baru</h3>
              <button onClick={() => setIsAddTxModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tajuk / Nama Transaksi</label>
                <input
                  type="text"
                  required
                  value={txForm.title}
                  onChange={(e) => setTxForm({ ...txForm, title: e.target.value })}
                  placeholder="Contoh: Lotus Grocery / Zus Coffee"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jenis Transaksi</label>
                  <select
                    value={txForm.type}
                    onChange={(e) => setTxForm({ ...txForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="expense">Perbelanjaan (-)</option>
                    <option value="income">Penerimaan (+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jumlah (RM)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={txForm.amount}
                    onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
                    placeholder="85.50"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kad Bank Terlibat</label>
                <select
                  value={txForm.bankId}
                  onChange={(e) => setTxForm({ ...txForm, bankId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {banks.map(b => (
                    <option key={b.id} value={b.id}>{b.bankName} — ({b.cardName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                <select
                  value={txForm.category}
                  onChange={(e) => setTxForm({ ...txForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Makanan & Minuman">Makanan & Minuman</option>
                  <option value="Barang Dapur">Barang Dapur</option>
                  <option value="Pengangkutan">Pengangkutan</option>
                  <option value="Utiliti & Bil">Utiliti & Bil</option>
                  <option value="Beli-belah">Beli-belah</option>
                  <option value="Gaji & Pendapatan">Gaji & Pendapatan</option>
                  <option value="Simpanan">Simpanan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg hover:scale-[1.02] transition-all"
              >
                Simpan Transaksi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DEPOSIT TO SAVINGS GOAL */}
      {isDepositModalOpen && selectedGoalForDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Tambah Simpanan</h3>
                <p className="text-xs text-emerald-500 font-semibold">{selectedGoalForDeposit.title}</p>
              </div>
              <button onClick={() => setIsDepositModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <form onSubmit={handleDepositToGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pindahkan dari Kad Dalam Card Holder</label>
                <select
                  value={depositFromBankId}
                  onChange={(e) => setDepositFromBankId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {banks.map(b => (
                    <option key={b.id} value={b.id}>{b.bankName} (Baki: {formatRM(b.balance)})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jumlah Simpanan (RM)</label>
                <input
                  type="number"
                  step="10"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Contoh: 250.00"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-base font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Terkini:</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">{formatRM(selectedGoalForDeposit.currentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selepas Deposit:</span>
                  <span className="font-mono text-emerald-500 font-bold">
                    {formatRM(selectedGoalForDeposit.currentAmount + (parseFloat(depositAmount) || 0))}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl emerald-gradient-bg text-slate-950 font-display font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
              >
                <i data-lucide="check" className="w-4 h-4"></i>
                <span>Sahkan Pindahan Simpanan</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
