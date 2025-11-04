import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, CheckCircle2, Circle, Play, Trophy, Flame, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface CourseScreenProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

export function CourseScreen({ onBack, onComplete }: CourseScreenProps) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [hearts, setHearts] = useState(5);
  const [earnedXP, setEarnedXP] = useState(0);

  const course = {
    title: 'Comunicação Assertiva',
    description: 'Aprenda técnicas eficazes de comunicação no ambiente corporativo',
    totalActivities: 5,
    xpPerActivity: 15,
    activities: [
      {
        id: 1,
        type: 'quiz',
        question: 'Qual é o principal objetivo da comunicação assertiva?',
        options: [
          'Impor suas ideias aos outros',
          'Expressar opiniões de forma clara e respeitosa',
          'Evitar conflitos a qualquer custo',
          'Sempre concordar com superiores'
        ],
        correctAnswer: 1,
        explanation: 'Comunicação assertiva é sobre expressar suas opiniões de forma clara, direta e respeitosa, respeitando também os direitos dos outros.'
      },
      {
        id: 2,
        type: 'quiz',
        question: 'Em uma situação de conflito, qual é a melhor abordagem assertiva?',
        options: [
          'Ignorar o problema',
          'Culpar a outra pessoa',
          'Usar "eu sinto" ao invés de "você sempre"',
          'Gritar para se fazer ouvir'
        ],
        correctAnswer: 2,
        explanation: 'Usar frases começando com "eu sinto" ou "eu penso" ajuda a expressar seus sentimentos sem atacar a outra pessoa, facilitando o diálogo.'
      },
      {
        id: 3,
        type: 'quiz',
        question: 'Qual característica NÃO representa comunicação assertiva?',
        options: [
          'Manter contato visual',
          'Falar com tom de voz firme',
          'Usar linguagem corporal agressiva',
          'Ouvir ativamente o interlocutor'
        ],
        correctAnswer: 2,
        explanation: 'Linguagem corporal agressiva contradiz os princípios da comunicação assertiva, que busca equilíbrio entre passividade e agressividade.'
      },
      {
        id: 4,
        type: 'quiz',
        question: 'Como dar feedback negativo de forma assertiva?',
        options: [
          'Ser vago para não magoar',
          'Focar no comportamento, não na pessoa',
          'Fazer em público para servir de exemplo',
          'Comparar com outros colegas'
        ],
        correctAnswer: 1,
        explanation: 'Feedback assertivo foca no comportamento específico que precisa mudar, não na pessoa, e é dado em particular de forma construtiva.'
      },
      {
        id: 5,
        type: 'quiz',
        question: 'Qual é um benefício da comunicação assertiva no trabalho?',
        options: [
          'Evitar todas as responsabilidades',
          'Construir relacionamentos mais saudáveis',
          'Nunca precisar negociar',
          'Sempre conseguir o que quer'
        ],
        correctAnswer: 1,
        explanation: 'A comunicação assertiva promove relacionamentos mais saudáveis e produtivos, baseados em respeito mútuo e transparência.'
      }
    ]
  };

  const currentActivityData = course.activities[currentActivity];
  const progressPercentage = ((completedActivities.length) / course.totalActivities) * 100;

  const handleSubmitAnswer = () => {
    const correct = parseInt(selectedAnswer) === currentActivityData.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      setHearts(Math.max(0, hearts - 1));
    } else {
      setEarnedXP(earnedXP + course.xpPerActivity);
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      setCompletedActivities([...completedActivities, currentActivity]);
    }
    
    if (currentActivity < course.totalActivities - 1) {
      setCurrentActivity(currentActivity + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      // Course completed
      onComplete(earnedXP);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>

            <div className="flex items-center gap-4">
              {/* Hearts */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-slate-700'}`}
                  />
                ))}
              </div>

              {/* Current XP */}
              <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">{earnedXP} XP</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{course.title}</span>
              <span className="text-slate-400">
                {completedActivities.length}/{course.totalActivities} atividades
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={currentActivity}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-8">
                {/* Activity Counter */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30 mb-4">
                    <span className="text-blue-400">Questão {currentActivity + 1} de {course.totalActivities}</span>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-2xl text-center mb-8 text-white">
                    {currentActivityData.question}
                  </h3>

                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {currentActivityData.options.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Label
                            htmlFor={`option-${index}`}
                            className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                              selectedAnswer === String(index)
                                ? 'bg-blue-500/20 border-2 border-blue-500'
                                : 'bg-slate-700/30 border-2 border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <RadioGroupItem value={String(index)} id={`option-${index}`} className="mr-4" />
                            <span className="flex-1 text-slate-200">{option}</span>
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 text-lg"
                >
                  Verificar Resposta
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`border-2 p-8 ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-red-500/10 border-red-500'
              }`}>
                {/* Feedback Icon */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block"
                  >
                    {isCorrect ? (
                      <div className="bg-green-500 rounded-full p-6 mb-4">
                        <CheckCircle2 className="w-16 h-16 text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-500 rounded-full p-6 mb-4">
                        <Circle className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </motion.div>
                  <h3 className={`text-3xl mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Excelente!' : 'Ops! Tente novamente'}
                  </h3>
                  {isCorrect && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                      <Star className="w-5 h-5" />
                      <span className="text-xl">+{course.xpPerActivity} XP</span>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                  <h4 className="mb-3 text-slate-300">Explicação:</h4>
                  <p className="text-slate-400 leading-relaxed">
                    {currentActivityData.explanation}
                  </p>
                </div>

                {/* Continue Button */}
                {isCorrect ? (
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 text-lg"
                  >
                    {currentActivity < course.totalActivities - 1 ? 'Continuar' : 'Concluir Curso'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setShowFeedback(false);
                      setSelectedAnswer('');
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg"
                  >
                    Tentar Novamente
                  </Button>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activity Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {course.activities.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                completedActivities.includes(index)
                  ? 'w-8 bg-green-500'
                  : index === currentActivity
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
