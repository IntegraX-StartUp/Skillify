import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Trophy, BookOpen, Target, Award } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const features = [
    { icon: Trophy, text: 'Conquiste troféus e badges' },
    { icon: BookOpen, text: 'Aprenda no seu ritmo' },
    { icon: Target, text: 'Estabeleça metas diárias' },
    { icon: Award, text: 'Certificações reconhecidas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white space-y-8 hidden lg:block"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <img 
                src="/src/assets/max.png" 
                alt="Skillify Logo" 
                width="150"
                className="object-contain"
              />
            </motion.div>
            <h1 className="text-5xl" style={{ color: "#0074bd", fontWeight: 700 }}>
              SKILLIFY
            </h1>
            <p className="text-xl text-slate-300">
              Transforme o aprendizado corporativo em uma jornada gamificada
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-slate-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-6 text-center">
            <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl text-white">Skillify</h2>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl text-white">
                {isSignUp ? 'Criar conta' : 'Bem-vindo de volta'}
              </h2>
              <p className="text-slate-400">
                {isSignUp 
                  ? 'Comece sua jornada de aprendizado' 
                  : 'Continue sua jornada de aprendizado'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">E-mail corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input type="checkbox" className="rounded border-slate-700" />
                    Lembrar-me
                  </label>
                  <button type="button" className="text-blue-400 hover:text-blue-300">
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30"
              >
                {isSignUp ? 'Criar conta' : 'Entrar'}
              </Button>
            </form>

            <div className="text-center text-sm text-slate-400">
              {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
              {' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 hover:text-blue-300"
              >
                {isSignUp ? 'Fazer login' : 'Criar conta'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
