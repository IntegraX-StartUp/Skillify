import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { CourseScreen } from './components/CourseScreen';
import { RankingScreen } from './components/RankingScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CourseComplete } from './components/CourseComplete';
import { ManagerCostsScreen } from './components/ManagerCostsScreen';
import { PricingScreen } from './components/PricingScreen';
import { Navigation } from './components/Navigation';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Screen = 'login' | 'dashboard' | 'course' | 'course-complete' | 'ranking' | 'rewards' | 'profile' | 'costs' | 'pricing';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userStats, setUserStats] = useState({
    name: 'Lucas Fernandes',
    level: 9,
    xp: 1450,
    xpToNextLevel: 2000,
    streak: 7,
    totalPoints: 2100
  });
  const [courseXP, setCourseXP] = useState(0);
  const [isManager, setIsManager] = useState(true); // Simula se o usuário é gestor

  const handleLogin = () => {
    setCurrentScreen('dashboard');
    toast.success('Bem-vindo de volta ao Skillify! 🎉', {
      description: 'Continue sua jornada de aprendizado'
    });
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleCourseComplete = (earnedXP: number) => {
    setCourseXP(earnedXP);
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + earnedXP,
      totalPoints: prev.totalPoints + earnedXP
    }));
    setCurrentScreen('course-complete');
    
    toast.success('Curso concluído! 🎉', {
      description: `Você ganhou ${earnedXP} XP`
    });
  };

  const handleContinueAfterCourse = () => {
    setCurrentScreen('dashboard');
  };

  const isLoggedIn = currentScreen !== 'login';

  return (
    <div className="min-h-screen bg-slate-950">
      {isLoggedIn && currentScreen !== 'course' && currentScreen !== 'course-complete' && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate}
          userStats={userStats}
          isManager={isManager}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard 
          onNavigate={handleNavigate}
          userStats={userStats}
        />
      )}

      {currentScreen === 'course' && (
        <CourseScreen 
          onBack={() => setCurrentScreen('dashboard')}
          onComplete={handleCourseComplete}
        />
      )}

      {currentScreen === 'course-complete' && (
        <CourseComplete 
          onContinue={handleContinueAfterCourse}
          earnedXP={courseXP}
          courseName="Comunicação Assertiva"
        />
      )}

      {currentScreen === 'ranking' && (
        <RankingScreen 
          onBack={() => setCurrentScreen('dashboard')}
          currentUser={userStats.name}
        />
      )}

      {currentScreen === 'rewards' && (
        <RewardsScreen onBack={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen 
          onBack={() => setCurrentScreen('dashboard')}
          userStats={userStats}
        />
      )}

      {currentScreen === 'costs' && isManager && (
        <ManagerCostsScreen onBack={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'pricing' && isManager && (
        <PricingScreen onBack={() => setCurrentScreen('dashboard')} />
      )}

      <Toaster 
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#fff'
          }
        }}
      />
    </div>
  );
}
