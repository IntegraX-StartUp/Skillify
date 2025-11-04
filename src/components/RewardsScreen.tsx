import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Award, Star, Zap, Target, Crown, Flame, Book, Users, TrendingUp, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface RewardsScreenProps {
  onBack: () => void;
}

export function RewardsScreen({ onBack }: RewardsScreenProps) {
  const achievements = [
    {
      id: 1,
      title: 'Primeira Vitória',
      description: 'Complete seu primeiro curso',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      unlocked: true,
      date: '15 Out 2024',
      xp: 50
    },
    {
      id: 2,
      title: 'Sequência de 7 dias',
      description: 'Mantenha uma sequência de 7 dias',
      icon: Flame,
      color: 'from-orange-500 to-orange-600',
      unlocked: true,
      date: '20 Out 2024',
      xp: 100
    },
    {
      id: 3,
      title: '5 Cursos Concluídos',
      description: 'Complete 5 cursos',
      icon: Book,
      color: 'from-green-500 to-green-600',
      unlocked: true,
      date: '22 Out 2024',
      xp: 150
    },
    {
      id: 4,
      title: 'Estudante Dedicado',
      description: 'Estude por 10 horas',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      unlocked: true,
      date: '25 Out 2024',
      xp: 200
    },
    {
      id: 5,
      title: 'Top 10',
      description: 'Alcance o top 10 do ranking semanal',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      unlocked: true,
      date: '27 Out 2024',
      xp: 250
    },
    {
      id: 6,
      title: 'Relâmpago',
      description: 'Complete 3 cursos em um dia',
      icon: Zap,
      color: 'from-cyan-500 to-cyan-600',
      unlocked: false,
      progress: 66,
      current: 2,
      target: 3
    },
    {
      id: 7,
      title: 'Mestre',
      description: 'Complete uma trilha inteira',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      unlocked: false,
      progress: 65,
      current: 8,
      target: 12
    },
    {
      id: 8,
      title: 'Sequência de 30 dias',
      description: 'Mantenha uma sequência de 30 dias',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      unlocked: false,
      progress: 23,
      current: 7,
      target: 30
    },
    {
      id: 9,
      title: 'Perfeição',
      description: 'Complete 10 cursos com 100% de acertos',
      icon: Target,
      color: 'from-pink-500 to-pink-600',
      unlocked: false,
      progress: 30,
      current: 3,
      target: 10
    },
    {
      id: 10,
      title: 'Líder',
      description: 'Alcance o 1º lugar do ranking',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      unlocked: false,
      progress: 0
    },
    {
      id: 11,
      title: 'Colaborativo',
      description: 'Ajude 5 colegas',
      icon: Users,
      color: 'from-blue-400 to-blue-600',
      unlocked: false,
      progress: 40,
      current: 2,
      target: 5
    },
    {
      id: 12,
      title: 'Ascensão',
      description: 'Alcance o nível 20',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      unlocked: false,
      progress: 45,
      current: 9,
      target: 20
    }
  ];

  const badges = [
    { id: 1, name: 'Iniciante', level: 'Bronze', icon: '🥉', earned: true },
    { id: 2, name: 'Aprendiz', level: 'Prata', icon: '🥈', earned: true },
    { id: 3, name: 'Dedicado', level: 'Ouro', icon: '🥇', earned: true },
    { id: 4, name: 'Expert', level: 'Platina', icon: '💎', earned: false },
    { id: 5, name: 'Mestre', level: 'Diamante', icon: '💠', earned: false },
    { id: 6, name: 'Lenda', level: 'Lendário', icon: '👑', earned: false }
  ];

  const redeemableRewards = [
    { id: 1, title: 'Vale-presente Amazon R$50', points: 5000, available: true, icon: '🎁' },
    { id: 2, title: 'Dia de Home Office Extra', points: 3000, available: true, icon: '🏠' },
    { id: 3, title: 'Certificado Impresso Premium', points: 2000, available: true, icon: '📜' },
    { id: 4, title: 'Curso Externo de Especialização', points: 10000, available: false, icon: '🎓' },
    { id: 5, title: 'Mentoria Individual 1h', points: 4000, available: true, icon: '👨‍🏫' },
    { id: 6, title: 'Livro Técnico à Escolha', points: 1500, available: true, icon: '📚' }
  ];

  const stats = {
    totalAchievements: achievements.length,
    unlockedAchievements: achievements.filter(a => a.unlocked).length,
    totalXPFromAchievements: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + (a.xp || 0), 0),
    currentPoints: 2100,
    badgesEarned: badges.filter(b => b.earned).length,
    totalBadges: badges.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                <h2 className="text-2xl text-white">Recompensas</h2>
                <p className="text-sm text-slate-400">Conquistas, badges e prêmios</p>
              </div>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
              <div className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl text-white mb-1">{stats.unlockedAchievements}/{stats.totalAchievements}</div>
                <div className="text-sm text-slate-400">Conquistas</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
              <div className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-3xl text-white mb-1">{stats.totalXPFromAchievements}</div>
                <div className="text-sm text-slate-400">XP de Conquistas</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
              <div className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-3xl text-white mb-1">{stats.badgesEarned}/{stats.totalBadges}</div>
                <div className="text-sm text-slate-400">Badges</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
              <div className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-3xl text-white mb-1">{stats.currentPoints}</div>
                <div className="text-sm text-slate-400">Pontos Disponíveis</div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500">
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-blue-500">
              Badges
            </TabsTrigger>
            <TabsTrigger value="redeem" className="data-[state=active]:bg-blue-500">
              Resgatar
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${
                    achievement.unlocked
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-slate-900/30 border-slate-800'
                  } hover:border-slate-600 transition-colors h-full`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={achievement.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                          className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} ${
                            !achievement.unlocked && 'opacity-30 grayscale'
                          }`}
                        >
                          <achievement.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        {achievement.unlocked ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Desbloqueado
                          </Badge>
                        ) : (
                          <Lock className="w-5 h-5 text-slate-600" />
                        )}
                      </div>

                      <h4 className={`mb-2 ${achievement.unlocked ? 'text-white' : 'text-slate-600'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm mb-4 ${achievement.unlocked ? 'text-slate-400' : 'text-slate-700'}`}>
                        {achievement.description}
                      </p>

                      {achievement.unlocked ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Star className="w-4 h-4" />
                            <span>+{achievement.xp} XP</span>
                          </div>
                          <span className="text-xs text-slate-500">{achievement.date}</span>
                        </div>
                      ) : achievement.progress !== undefined ? (
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span>Progresso</span>
                            {achievement.current && achievement.target && (
                              <span>{achievement.current}/{achievement.target}</span>
                            )}
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      ) : (
                        <div className="text-xs text-slate-600">Bloqueado</div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <Card className={`${
                    badge.earned
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/50 border-slate-700'
                      : 'bg-slate-900/30 border-slate-800'
                  } hover:border-slate-600 transition-colors`}>
                    <div className="p-6 text-center">
                      <motion.div
                        whileHover={badge.earned ? { scale: 1.2, rotate: 10 } : {}}
                        className={`text-6xl mb-3 ${!badge.earned && 'opacity-20 grayscale'}`}
                      >
                        {badge.icon}
                      </motion.div>
                      <h4 className={`mb-1 ${badge.earned ? 'text-white' : 'text-slate-700'}`}>
                        {badge.name}
                      </h4>
                      <p className={`text-xs ${badge.earned ? 'text-slate-400' : 'text-slate-700'}`}>
                        {badge.level}
                      </p>
                      {!badge.earned && (
                        <Lock className="w-4 h-4 mx-auto mt-2 text-slate-700" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Redeem Tab */}
          <TabsContent value="redeem">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {redeemableRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${
                    reward.available && stats.currentPoints >= reward.points
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-slate-900/30 border-slate-800'
                  } hover:border-slate-600 transition-colors`}>
                    <div className="p-6">
                      <div className="text-5xl mb-4 text-center">{reward.icon}</div>
                      <h4 className="text-center mb-3 text-white">{reward.title}</h4>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl text-yellow-400">{reward.points}</span>
                        <span className="text-sm text-slate-400">pontos</span>
                      </div>

                      <Button
                        disabled={!reward.available || stats.currentPoints < reward.points}
                        className={`w-full ${
                          reward.available && stats.currentPoints >= reward.points
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                            : 'bg-slate-700 cursor-not-allowed'
                        }`}
                      >
                        {!reward.available
                          ? 'Indisponível'
                          : stats.currentPoints < reward.points
                          ? `Faltam ${reward.points - stats.currentPoints} pts`
                          : 'Resgatar'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-blue-500/10 border-blue-500/30 mt-6">
              <div className="p-6 text-center">
                <div className="text-sm text-slate-400 mb-2">Seus pontos disponíveis</div>
                <div className="text-4xl text-blue-400 mb-2">{stats.currentPoints}</div>
                <p className="text-sm text-slate-500">
                  Continue aprendendo para ganhar mais pontos e resgatar recompensas!
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
