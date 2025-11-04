import { motion } from 'motion/react';
import { Trophy, Flame, Target, Star, Lock, CheckCircle2, Circle, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  userStats: {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    streak: number;
    totalPoints: number;
  };
}

export function Dashboard({ onNavigate, userStats }: DashboardProps) {
  const trails = [
    {
      id: 1,
      title: 'Liderança e Gestão',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      progress: 65,
      modules: 12,
      completedModules: 8,
      locked: false,
      courses: [
        { id: 1, title: 'Fundamentos da Liderança', status: 'completed', xp: 100 },
        { id: 2, title: 'Gestão de Equipes', status: 'completed', xp: 150 },
        { id: 3, title: 'Comunicação Assertiva', status: 'in-progress', xp: 75 },
        { id: 4, title: 'Tomada de Decisão', status: 'locked', xp: 0 },
        { id: 5, title: 'Resolução de Conflitos', status: 'locked', xp: 0 },
      ]
    },
    {
      id: 2,
      title: 'Tecnologia e Inovação',
      icon: '💡',
      color: 'from-purple-500 to-purple-600',
      progress: 30,
      modules: 10,
      completedModules: 3,
      locked: false,
      courses: [
        { id: 6, title: 'Introdução à IA', status: 'completed', xp: 120 },
        { id: 7, title: 'Transformação Digital', status: 'in-progress', xp: 60 },
        { id: 8, title: 'Cloud Computing', status: 'locked', xp: 0 },
      ]
    },
    {
      id: 3,
      title: 'Vendas e Negociação',
      icon: '📈',
      color: 'from-green-500 to-green-600',
      progress: 0,
      modules: 8,
      completedModules: 0,
      locked: false,
      courses: [
        { id: 9, title: 'Técnicas de Vendas', status: 'available', xp: 0 },
        { id: 10, title: 'Negociação Estratégica', status: 'locked', xp: 0 },
      ]
    },
    {
      id: 4,
      title: 'Desenvolvimento Pessoal',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
      progress: 20,
      modules: 15,
      completedModules: 3,
      locked: false,
      courses: [
        { id: 11, title: 'Gestão de Tempo', status: 'completed', xp: 90 },
        { id: 12, title: 'Inteligência Emocional', status: 'in-progress', xp: 45 },
      ]
    },
    {
      id: 5,
      title: 'Compliance e Ética',
      icon: '⚖️',
      color: 'from-red-500 to-red-600',
      progress: 0,
      modules: 6,
      completedModules: 0,
      locked: true,
      courses: []
    }
  ];

  const dailyGoal = {
    target: 50,
    current: 35
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header Stats */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-xl text-white">Olá, {userStats.name}! 👋</h2>
                <p className="text-sm text-slate-400">Continue aprendendo hoje</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-xl border border-orange-500/30"
              >
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-sm text-slate-400">Sequência</div>
                  <div className="text-orange-400">{userStats.streak} dias</div>
                </div>
              </motion.div>

              {/* XP */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/30"
              >
                <Star className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Nível {userStats.level}</div>
                  <div className="text-blue-400">{userStats.xp}/{userStats.xpToNextLevel} XP</div>
                </div>
              </motion.div>

              {/* Total Points */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30 cursor-pointer"
                onClick={() => onNavigate('rewards')}
              >
                <Trophy className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm text-slate-400">Pontos</div>
                  <div className="text-purple-400">{userStats.totalPoints}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Daily Goal Progress */}
          <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Meta diária</span>
              </div>
              <span className="text-sm text-slate-400">{dailyGoal.current}/{dailyGoal.target} XP</span>
            </div>
            <Progress value={(dailyGoal.current / dailyGoal.target) * 100} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Learning Trails - Main Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl text-white">Suas Trilhas de Aprendizado</h3>
              <Button
                variant="outline"
                onClick={() => onNavigate('ranking')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Ver Ranking
              </Button>
            </div>

            <div className="space-y-4">
              {trails.map((trail, index) => (
                <motion.div
                  key={trail.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`bg-gradient-to-br ${trail.color} p-3 rounded-xl text-2xl`}>
                            {trail.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg text-white">{trail.title}</h4>
                              {trail.locked && <Lock className="w-4 h-4 text-slate-500" />}
                            </div>
                            <p className="text-sm text-slate-400">
                              {trail.completedModules}/{trail.modules} módulos concluídos
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-blue-400">{trail.progress}%</div>
                        </div>
                      </div>

                      <Progress value={trail.progress} className="h-2 mb-4" />

                      {!trail.locked && trail.courses.length > 0 && (
                        <div className="space-y-2">
                          {trail.courses.slice(0, 3).map((course) => (
                            <motion.button
                              key={course.id}
                              onClick={() => course.status !== 'locked' && onNavigate('course')}
                              disabled={course.status === 'locked'}
                              whileHover={course.status !== 'locked' ? { scale: 1.02 } : {}}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                                course.status === 'locked'
                                  ? 'bg-slate-900/30 cursor-not-allowed'
                                  : course.status === 'completed'
                                  ? 'bg-green-500/10 hover:bg-green-500/20'
                                  : course.status === 'in-progress'
                                  ? 'bg-blue-500/10 hover:bg-blue-500/20'
                                  : 'bg-slate-700/30 hover:bg-slate-700/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {course.status === 'completed' ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : course.status === 'locked' ? (
                                  <Lock className="w-5 h-5 text-slate-600" />
                                ) : (
                                  <Circle className="w-5 h-5 text-blue-400" />
                                )}
                                <span className={`text-sm ${course.status === 'locked' ? 'text-slate-600' : 'text-slate-300'}`}>
                                  {course.title}
                                </span>
                              </div>
                              {course.xp > 0 && (
                                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                  <Star className="w-4 h-4" />
                                  {course.xp} XP
                                </div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      )}

                      {trail.locked && (
                        <div className="text-center py-4 text-slate-500 text-sm">
                          Complete trilhas anteriores para desbloquear
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
              <div className="p-6">
                <h4 className="text-lg mb-4 text-white">Estatísticas da Semana</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Cursos concluídos</span>
                    <span className="text-white">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Horas de estudo</span>
                    <span className="text-white">8.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">XP ganho</span>
                    <span className="text-blue-400">+450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Posição no ranking</span>
                    <span className="text-yellow-400">#12</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('profile')}
                  className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                >
                  Ver Perfil Completo
                </Button>
              </div>
            </Card>

            {/* Achievements Preview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg text-white">Conquistas Recentes</h4>
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Primeira Semana', icon: '🎯', color: 'from-blue-500 to-blue-600' },
                    { title: 'Sequência de 7 dias', icon: '🔥', color: 'from-orange-500 to-orange-600' },
                    { title: '5 Cursos Concluídos', icon: '🏆', color: 'from-yellow-500 to-yellow-600' }
                  ].map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className={`bg-gradient-to-br ${achievement.color} p-2 rounded-lg text-lg`}>
                        {achievement.icon}
                      </div>
                      <span className="text-sm text-slate-300">{achievement.title}</span>
                    </motion.div>
                  ))}
                </div>
                <Button
                  onClick={() => onNavigate('rewards')}
                  variant="outline"
                  className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Ver Todas
                </Button>
              </div>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg text-white">Top 3 Esta Semana</h4>
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Ana Silva', points: 2850, avatar: '👩' },
                    { name: 'Carlos Santos', points: 2720, avatar: '👨' },
                    { name: 'Maria Oliveira', points: 2650, avatar: '👩' }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-400' : 'bg-orange-600'
                      }`}>
                        {i + 1}
                      </div>
                      <span className="text-lg">{user.avatar}</span>
                      <div className="flex-1">
                        <div className="text-sm text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
