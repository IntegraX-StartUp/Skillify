import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Star, Flame, Award, Download, Calendar, Clock, TrendingUp, BookOpen, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ProfileScreenProps {
  onBack: () => void;
  userStats: {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    streak: number;
    totalPoints: number;
  };
}

export function ProfileScreen({ onBack, userStats }: ProfileScreenProps) {
  const completedCourses = [
    {
      id: 1,
      title: 'Fundamentos da Liderança',
      trail: 'Liderança e Gestão',
      completedDate: '15 Out 2024',
      score: 95,
      duration: '2h 30min',
      certificate: true
    },
    {
      id: 2,
      title: 'Gestão de Equipes',
      trail: 'Liderança e Gestão',
      completedDate: '18 Out 2024',
      score: 88,
      duration: '3h 15min',
      certificate: true
    },
    {
      id: 3,
      title: 'Introdução à IA',
      trail: 'Tecnologia e Inovação',
      completedDate: '22 Out 2024',
      score: 92,
      duration: '4h 00min',
      certificate: true
    },
    {
      id: 4,
      title: 'Gestão de Tempo',
      trail: 'Desenvolvimento Pessoal',
      completedDate: '25 Out 2024',
      score: 100,
      duration: '1h 45min',
      certificate: true
    }
  ];

  const learningStats = {
    totalHours: 22.5,
    coursesCompleted: 8,
    averageScore: 93,
    currentStreak: userStats.streak,
    longestStreak: 12,
    daysActive: 45
  };

  const weeklyActivity = [
    { day: 'Seg', xp: 120, active: true },
    { day: 'Ter', xp: 85, active: true },
    { day: 'Qua', xp: 150, active: true },
    { day: 'Qui', xp: 95, active: true },
    { day: 'Sex', xp: 110, active: true },
    { day: 'Sáb', xp: 65, active: true },
    { day: 'Dom', xp: 75, active: true }
  ];

  const maxXP = Math.max(...weeklyActivity.map(d => d.xp));

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
                <h2 className="text-2xl text-white">Meu Perfil</h2>
                <p className="text-sm text-slate-400">Seu histórico e conquistas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
                <div className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-blue-500">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl">
                      {userStats.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-2xl text-white mb-1">{userStats.name}</h3>
                  <p className="text-slate-400 mb-4">Marketing</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full">
                      <span className="text-white">Nível {userStats.level}</span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      <span>Progresso para Nível {userStats.level + 1}</span>
                      <span>{userStats.xp}/{userStats.xpToNextLevel} XP</span>
                    </div>
                    <Progress value={(userStats.xp / userStats.xpToNextLevel) * 100} className="h-2" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="p-6">
                  <h4 className="text-lg mb-4 text-white">Estatísticas Gerais</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg">
                          <Flame className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Sequência Atual</div>
                          <div className="text-white">{learningStats.currentStreak} dias</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                          <Trophy className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Pontos Totais</div>
                          <div className="text-white">{userStats.totalPoints}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-2 rounded-lg">
                          <BookOpen className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Cursos Concluídos</div>
                          <div className="text-white">{learningStats.coursesCompleted}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Horas de Estudo</div>
                          <div className="text-white">{learningStats.totalHours}h</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Média de Acertos</div>
                          <div className="text-white">{learningStats.averageScore}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-500/20 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Maior Sequência</div>
                          <div className="text-white">{learningStats.longestStreak} dias</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="p-6">
                  <h4 className="text-lg mb-4 text-white">Atividade Semanal</h4>
                  <div className="flex items-end justify-between gap-2 h-32">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.xp / maxXP) * 100}%` }}
                          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg min-h-[20px] relative group"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {day.xp} XP
                          </div>
                        </motion.div>
                        <span className="text-xs text-slate-400">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Certificates & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Certificates Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-white">Certificações</h3>
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {completedCourses.filter(c => c.certificate).map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600 hover:border-blue-500/50 transition-colors">
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-white mb-1">{course.title}</h4>
                                <p className="text-xs text-slate-400 mb-2">{course.trail}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>{course.completedDate}</span>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {course.score}%
                              </Badge>
                            </div>
                            
                            <Button
                              size="sm"
                              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Baixar Certificado
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Learning History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-white">Histórico de Aprendizado</h3>

                  <div className="space-y-4">
                    {completedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-white mb-1">{course.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {course.trail}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {course.completedDate}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl text-green-400 mb-1">{course.score}%</div>
                          {course.certificate && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Certificado
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-white">Conquistas Recentes</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Trophy, title: 'Primeira Vitória', color: 'from-blue-500 to-blue-600' },
                      { icon: Flame, title: '7 Dias', color: 'from-orange-500 to-orange-600' },
                      { icon: BookOpen, title: '5 Cursos', color: 'from-green-500 to-green-600' },
                      { icon: Star, title: 'Dedicado', color: 'from-yellow-500 to-yellow-600' }
                    ].map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                        className="text-center"
                      >
                        <div className={`bg-gradient-to-br ${achievement.color} p-4 rounded-xl mb-2 mx-auto w-16 h-16 flex items-center justify-center`}>
                          <achievement.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-xs text-slate-400">{achievement.title}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
