import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Medal, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';

interface RankingScreenProps {
  onBack: () => void;
  currentUser: string;
}

export function RankingScreen({ onBack, currentUser }: RankingScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyRanking = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', points: 2850, xp: 15420, courses: 12, trend: 'up', position: 1, avatar: 'AS' },
    { id: 2, name: 'Carlos Santos', department: 'Vendas', points: 2720, xp: 14890, courses: 11, trend: 'up', position: 2, avatar: 'CS' },
    { id: 3, name: 'Maria Oliveira', department: 'RH', points: 2650, xp: 14230, courses: 10, trend: 'down', position: 3, avatar: 'MO' },
    { id: 4, name: 'João Pereira', department: 'TI', points: 2580, xp: 13950, courses: 10, trend: 'up', position: 4, avatar: 'JP' },
    { id: 5, name: 'Paula Costa', department: 'Financeiro', points: 2510, xp: 13620, courses: 9, trend: 'same', position: 5, avatar: 'PC' },
    { id: 6, name: 'Ricardo Alves', department: 'Operações', points: 2440, xp: 13280, courses: 9, trend: 'up', position: 6, avatar: 'RA' },
    { id: 7, name: 'Juliana Lima', department: 'Marketing', points: 2380, xp: 12950, courses: 8, trend: 'down', position: 7, avatar: 'JL' },
    { id: 8, name: 'Fernando Rocha', department: 'Vendas', points: 2320, xp: 12640, courses: 8, trend: 'up', position: 8, avatar: 'FR' },
    { id: 9, name: 'Camila Souza', department: 'TI', points: 2260, xp: 12310, courses: 7, trend: 'same', position: 9, avatar: 'CS' },
    { id: 10, name: 'Rafael Dias', department: 'RH', points: 2200, xp: 12000, courses: 7, trend: 'down', position: 10, avatar: 'RD' },
    { id: 11, name: 'Beatriz Martins', department: 'Financeiro', points: 2150, xp: 11720, courses: 7, trend: 'up', position: 11, avatar: 'BM' },
    { id: 12, name: 'Lucas Fernandes', department: 'Marketing', points: 2100, xp: 11450, courses: 6, trend: 'up', position: 12, avatar: 'LF' }
  ];

  const monthlyRanking = [
    { id: 1, name: 'Maria Oliveira', department: 'RH', points: 9850, xp: 52420, courses: 35, trend: 'up', position: 1, avatar: 'MO' },
    { id: 2, name: 'Ana Silva', department: 'Marketing', points: 9520, xp: 51230, courses: 33, trend: 'same', position: 2, avatar: 'AS' },
    { id: 3, name: 'Carlos Santos', department: 'Vendas', points: 9180, xp: 49850, courses: 31, trend: 'up', position: 3, avatar: 'CS' }
  ];

  const allTimeRanking = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', points: 45850, xp: 215420, courses: 142, trend: 'same', position: 1, avatar: 'AS' },
    { id: 2, name: 'João Pereira', department: 'TI', points: 42720, xp: 198890, courses: 128, trend: 'same', position: 2, avatar: 'JP' },
    { id: 3, name: 'Maria Oliveira', department: 'RH', points: 39650, xp: 184230, courses: 115, trend: 'same', position: 3, avatar: 'MO' }
  ];

  const getRankingData = () => {
    switch (selectedPeriod) {
      case 'month':
        return monthlyRanking;
      case 'alltime':
        return allTimeRanking;
      default:
        return weeklyRanking;
    }
  };

  const currentUserData = getRankingData().find(user => user.name === currentUser);
  const rankingData = getRankingData();

  const getMedalColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 to-yellow-600';
    if (position === 2) return 'from-slate-300 to-slate-400';
    if (position === 3) return 'from-orange-400 to-orange-600';
    return 'from-slate-600 to-slate-700';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              <div>
                <h2 className="text-2xl text-white">Ranking</h2>
                <p className="text-sm text-slate-400">Acompanhe sua posição e evolução</p>
              </div>
            </div>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Current User Position */}
        {currentUserData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Sua Posição Atual</div>
                      <div className="text-3xl text-white">#{currentUserData.position}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-slate-400">Pontos</div>
                        <div className="text-xl text-blue-400">{currentUserData.points}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">XP Total</div>
                        <div className="text-xl text-purple-400">{currentUserData.xp}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Cursos</div>
                        <div className="text-xl text-green-400">{currentUserData.courses}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Period Tabs */}
        <Tabs defaultValue="week" className="space-y-6" onValueChange={setSelectedPeriod}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="week" className="data-[state=active]:bg-blue-500">
              Semanal
            </TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-blue-500">
              Mensal
            </TabsTrigger>
            <TabsTrigger value="alltime" className="data-[state=active]:bg-blue-500">
              Geral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-3">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[2, 1, 3].map((pos) => {
                const user = rankingData.find(u => u.position === pos);
                if (!user) return null;
                
                return (
                  <motion.div
                    key={pos}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: pos * 0.1 }}
                    className={`${pos === 1 ? 'order-2' : pos === 2 ? 'order-1' : 'order-3'}`}
                  >
                    <Card className={`${pos === 1 ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/50' : 'bg-slate-800/50 border-slate-700'} text-center`}>
                      <div className={`p-6 ${pos === 1 ? 'pt-4' : 'pt-10'}`}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + pos * 0.1, type: "spring" }}
                          className={`mx-auto mb-3 w-16 h-16 rounded-full bg-gradient-to-br ${getMedalColor(pos)} flex items-center justify-center`}
                        >
                          {pos === 1 ? (
                            <Trophy className="w-8 h-8 text-white" />
                          ) : (
                            <Medal className="w-8 h-8 text-white" />
                          )}
                        </motion.div>
                        <div className={`text-4xl mb-2 ${pos === 1 ? 'text-yellow-400' : pos === 2 ? 'text-slate-300' : 'text-orange-400'}`}>
                          #{pos}
                        </div>
                        <Avatar className="mx-auto mb-2 w-12 h-12">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-white mb-1">{user.name}</div>
                        <div className="text-xs text-slate-400 mb-3">{user.department}</div>
                        <div className="flex items-center justify-center gap-2 text-blue-400">
                          <Trophy className="w-4 h-4" />
                          <span>{user.points} pts</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Rest of ranking */}
            {rankingData.filter(user => user.position > 3).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${user.name === currentUser ? 'bg-blue-500/10 border-blue-500/50' : 'bg-slate-800/50 border-slate-700'} hover:border-slate-600 transition-colors`}>
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.name === currentUser ? 'bg-blue-500' : 'bg-slate-700'
                      }`}>
                        <span className="text-white">{user.position}</span>
                      </div>
                      
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{user.name}</span>
                          {user.name === currentUser && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                              Você
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">{user.department}</div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        {getTrendIcon(user.trend)}
                        
                        <div>
                          <div className="text-sm text-slate-400">Pontos</div>
                          <div className="text-blue-400">{user.points}</div>
                        </div>

                        <div>
                          <div className="text-sm text-slate-400">XP</div>
                          <div className="text-purple-400">{user.xp}</div>
                        </div>

                        <div>
                          <div className="text-sm text-slate-400">Cursos</div>
                          <div className="text-green-400">{user.courses}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="month">
            {monthlyRanking.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors mb-3">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${getMedalColor(user.position)}`}>
                        <span className="text-white">{user.position}</span>
                      </div>
                      
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="text-white">{user.name}</div>
                        <div className="text-sm text-slate-400">{user.department}</div>
                      </div>

                      <div className="flex items-center gap-6">
                        {getTrendIcon(user.trend)}
                        
                        <div className="text-right">
                          <div className="text-sm text-slate-400">Pontos</div>
                          <div className="text-blue-400">{user.points}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-400">Cursos</div>
                          <div className="text-green-400">{user.courses}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="alltime">
            {allTimeRanking.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors mb-3">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${getMedalColor(user.position)}`}>
                        <span className="text-white">{user.position}</span>
                      </div>
                      
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="text-white">{user.name}</div>
                        <div className="text-sm text-slate-400">{user.department}</div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-slate-400">Pontos</div>
                          <div className="text-blue-400">{user.points}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-400">XP</div>
                          <div className="text-purple-400">{user.xp}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-400">Cursos</div>
                          <div className="text-green-400">{user.courses}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
