import { motion } from 'motion/react';
import { Home, Trophy, Award, User, Menu, X, DollarSign, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userStats: {
    name: string;
    level: number;
  };
  isManager?: boolean;
}

export function Navigation({ currentScreen, onNavigate, userStats, isManager = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'rewards', label: 'Recompensas', icon: Award },
    { id: 'profile', label: 'Perfil', icon: User },
    ...(isManager ? [
      { id: 'costs', label: 'Custos', icon: DollarSign },
      { id: 'pricing', label: 'Planos', icon: CreditCard }
    ] : [])
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <div className="hidden md:block border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/src/assets/max.png" 
                alt="Skillify Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl text-white" style={{ color: "#0074bd", fontWeight: 700 }}>SKILLIFY</h1>
                <p className="text-xs text-slate-400">Nível {userStats.level}</p>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentScreen === item.id ? 'default' : 'ghost'}
                  onClick={() => onNavigate(item.id)}
                  className={`${
                    currentScreen === item.id
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className={`grid ${isManager ? 'grid-cols-5' : 'grid-cols-4'} gap-1 p-2 overflow-x-auto`}>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                currentScreen === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-white">Skillify</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
