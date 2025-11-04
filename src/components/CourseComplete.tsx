import { motion } from 'motion/react';
import { Trophy, Star, Zap, TrendingUp, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface CourseCompleteProps {
  onContinue: () => void;
  earnedXP: number;
  courseName: string;
}

export function CourseComplete({ onContinue, earnedXP, courseName }: CourseCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/30 overflow-hidden">
          <div className="p-8 text-center">
            {/* Trophy Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-full shadow-2xl shadow-yellow-500/50">
                <Trophy className="w-20 h-20 text-white" />
              </div>
            </motion.div>

            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -100, 
                    x: Math.random() * window.innerWidth,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    rotate: 360,
                    opacity: 0
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: "linear"
                  }}
                  className={`absolute w-2 h-2 rounded-full ${
                    i % 4 === 0 ? 'bg-yellow-400' :
                    i % 4 === 1 ? 'bg-blue-400' :
                    i % 4 === 2 ? 'bg-green-400' :
                    'bg-purple-400'
                  }`}
                />
              ))}
            </div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-4xl text-white mb-2">Parabéns!</h2>
              <p className="text-xl text-slate-300 mb-6">Você concluiu o curso</p>
              <h3 className="text-2xl text-blue-400 mb-8">{courseName}</h3>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl text-white mb-1">+{earnedXP}</div>
                  <div className="text-sm text-slate-400">XP Ganho</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl text-white mb-1">5/5</div>
                  <div className="text-sm text-slate-400">Atividades</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl text-white mb-1">+1</div>
                  <div className="text-sm text-slate-400">Nível</div>
                </Card>
              </motion.div>
            </div>

            {/* New Achievement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400">Nova Conquista Desbloqueada!</div>
                  <div className="text-white">Comunicador Expert</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button
                onClick={onContinue}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                Continuar Aprendendo
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
