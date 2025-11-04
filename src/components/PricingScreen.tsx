import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, X, Users, BookOpen, BarChart3, Headphones, Award, Zap, Building2, HelpCircle, ChevronDown, Star, Shield, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { toast } from 'sonner';

interface PricingScreenProps {
  onBack: () => void;
}

export function PricingScreen({ onBack }: PricingScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'essential',
      name: 'Essencial',
      description: 'Ideal para pequenas equipes começando',
      icon: Shield,
      color: 'from-slate-500 to-slate-600',
      borderColor: 'border-slate-700',
      price: {
        monthly: 499,
        yearly: 4990
      },
      maxUsers: 50,
      features: [
        { name: 'Até 50 colaboradores', included: true, tooltip: 'Licenças para até 50 usuários ativos' },
        { name: 'Acesso a trilhas básicas', included: true, tooltip: 'Biblioteca com trilhas essenciais de capacitação' },
        { name: 'Relatórios mensais simples', included: true, tooltip: 'Relatórios básicos de progresso mensal' },
        { name: 'Suporte por e-mail', included: true, tooltip: 'Atendimento via e-mail em até 48h' },
        { name: 'Certificações inclusas', included: false },
        { name: 'Trilhas personalizadas', included: false },
        { name: 'Integração com sistemas', included: false },
        { name: 'Suporte dedicado', included: false }
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Profissional',
      description: 'Mais completo para empresas em crescimento',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500',
      price: {
        monthly: 1299,
        yearly: 12990
      },
      maxUsers: 200,
      features: [
        { name: 'Até 200 colaboradores', included: true, tooltip: 'Licenças para até 200 usuários ativos' },
        { name: 'Acesso a trilhas básicas', included: true, tooltip: 'Biblioteca completa de trilhas' },
        { name: 'Relatórios avançados e dashboards', included: true, tooltip: 'Dashboards em tempo real com métricas detalhadas' },
        { name: 'Suporte via chat + e-mail', included: true, tooltip: 'Atendimento prioritário via chat e e-mail' },
        { name: 'Certificações inclusas', included: true, tooltip: 'Certificados digitais para todos os cursos' },
        { name: 'Trilhas personalizadas', included: true, tooltip: 'Crie trilhas customizadas para sua empresa' },
        { name: 'Integração com sistemas', included: false },
        { name: 'Suporte dedicado', included: false }
      ],
      recommended: true
    },
    {
      id: 'corporate',
      name: 'Corporativo',
      description: 'Solução completa para grandes corporações',
      icon: Rocket,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500',
      price: {
        monthly: null,
        yearly: null
      },
      maxUsers: null,
      features: [
        { name: 'Colaboradores ilimitados', included: true, tooltip: 'Sem limite de usuários' },
        { name: 'Acesso a trilhas básicas', included: true, tooltip: 'Acesso total a todas as trilhas' },
        { name: 'Relatórios em tempo real', included: true, tooltip: 'Analytics avançado com BI integrado' },
        { name: 'Suporte dedicado', included: true, tooltip: 'Gerente de contas exclusivo' },
        { name: 'Certificações inclusas', included: true, tooltip: 'Certificados personalizados com sua marca' },
        { name: 'Trilhas personalizadas', included: true, tooltip: 'Desenvolvimento de conteúdo exclusivo' },
        { name: 'Integração com sistemas', included: true, tooltip: 'Integração via API com seus sistemas internos' },
        { name: 'Consultoria de implementação', included: true, tooltip: 'Suporte especializado na implementação' }
      ],
      recommended: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    setShowConfirmModal(false);
    toast.success('Plano selecionado com sucesso! 🎉', {
      description: `Nossa equipe entrará em contato para finalizar a contratação do plano ${plan?.name}.`
    });
    setSelectedPlan(null);
  };

  const faqs = [
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de cobrança.'
    },
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 14 dias de teste gratuito em todos os planos. Você pode cancelar a qualquer momento sem custos.'
    },
    {
      question: 'Os dados dos colaboradores ficam seguros?',
      answer: 'Sim, utilizamos criptografia de ponta a ponta e seguimos todas as diretrizes da LGPD para proteção de dados.'
    },
    {
      question: 'Posso adicionar mais colaboradores depois?',
      answer: 'Sim, você pode adicionar colaboradores conforme necessário. Caso exceda o limite do seu plano, faremos upgrade automático.'
    },
    {
      question: 'Existe desconto para pagamento anual?',
      answer: 'Sim! Ao optar pelo pagamento anual, você economiza aproximadamente 17% em relação ao pagamento mensal.'
    },
    {
      question: 'O que acontece se eu cancelar?',
      answer: 'Você pode cancelar a qualquer momento. Seus dados ficam disponíveis por 90 dias caso queira reativar.'
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const yearlyDiscount = 17;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20 md:pb-8">
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
                <h2 className="text-2xl text-white">Planos e Preços</h2>
                <p className="text-sm text-slate-400">Escolha o plano ideal para sua empresa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4">
              Planos especiais para empresas
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl mb-4 text-white"
          >
            Invista no crescimento da sua equipe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Capacite seus colaboradores com gamificação e aumente a retenção de talentos
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-lg transition-colors relative ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                -{yearlyDiscount}%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="relative"
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    ⭐ Mais Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`relative overflow-hidden ${
                plan.recommended 
                  ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500 shadow-xl shadow-blue-500/20' 
                  : 'bg-slate-800/50 border-slate-700'
              } hover:border-blue-500/50 transition-all duration-300 h-full`}>
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`bg-gradient-to-br ${plan.color} p-3 rounded-xl mb-4 inline-block`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                      <p className="text-sm text-slate-400">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price.monthly ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl text-white">
                            R$ {billingPeriod === 'monthly' 
                              ? plan.price.monthly.toLocaleString('pt-BR') 
                              : (plan.price.yearly! / 12).toFixed(0)}
                          </span>
                          <span className="text-slate-400">/mês</span>
                        </div>
                        {billingPeriod === 'yearly' && (
                          <p className="text-sm text-green-400 mt-2">
                            R$ {plan.price.yearly!.toLocaleString('pt-BR')} cobrado anualmente
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-2xl text-white">
                        Sob consulta
                      </div>
                    )}
                  </div>

                  {/* Users */}
                  <div className="flex items-center gap-2 mb-6 p-3 bg-slate-700/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-slate-300">
                      {plan.maxUsers ? `Até ${plan.maxUsers} colaboradores` : 'Colaboradores ilimitados'}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.slice(0, 6).map((feature, i) => (
                      <TooltipProvider key={i}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-3 cursor-help">
                              {feature.included ? (
                                <div className="bg-green-500/20 rounded-full p-1">
                                  <Check className="w-4 h-4 text-green-400" />
                                </div>
                              ) : (
                                <div className="bg-slate-700 rounded-full p-1">
                                  <X className="w-4 h-4 text-slate-500" />
                                </div>
                              )}
                              <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                                {feature.name}
                              </span>
                            </div>
                          </TooltipTrigger>
                          {feature.tooltip && (
                            <TooltipContent className="bg-slate-800 border-slate-700">
                              <p className="text-xs">{feature.tooltip}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {plan.price.monthly ? 'Selecionar plano' : 'Falar com vendas'}
                  </Button>

                  {plan.price.monthly && (
                    <p className="text-xs text-center text-slate-500 mt-3">
                      14 dias de teste grátis
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl mb-6 text-white text-center">Comparação Detalhada</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400">Funcionalidade</th>
                      {plans.map(plan => (
                        <th key={plan.id} className="text-center p-4">
                          <div className="text-white">{plan.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Número de colaboradores', values: ['50', '200', 'Ilimitado'] },
                      { name: 'Trilhas de aprendizado', values: ['Básicas', 'Básicas + Personalizadas', 'Todas + Customizadas'] },
                      { name: 'Relatórios', values: ['Mensais simples', 'Avançados em tempo real', 'BI completo'] },
                      { name: 'Certificações', values: ['✗', '✓', '✓ Personalizadas'] },
                      { name: 'Suporte', values: ['E-mail', 'Chat + E-mail', 'Dedicado'] },
                      { name: 'Integração API', values: ['✗', '✗', '✓'] },
                      { name: 'Consultoria', values: ['✗', '✗', '✓'] }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                        <td className="p-4 text-slate-300">{row.name}</td>
                        {row.values.map((value, j) => (
                          <td key={j} className="text-center p-4 text-slate-400">
                            {value.includes('✓') ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : value.includes('✗') ? (
                              <X className="w-5 h-5 text-slate-600 mx-auto" />
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6">
              <div className="text-center mb-8">
                <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl text-white mb-2">Perguntas Frequentes</h3>
                <p className="text-slate-400">Tire suas dúvidas sobre os planos</p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`item-${i}`}
                    className="bg-slate-700/30 border border-slate-700 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-white hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <div className="p-8">
              <h3 className="text-2xl text-white mb-2">Ainda tem dúvidas?</h3>
              <p className="text-slate-400 mb-6">
                Nossa equipe está pronta para ajudar você a escolher o melhor plano
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Headphones className="w-4 h-4 mr-2" />
                  Falar com vendas
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Agendar demonstração
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Confirmar Plano</DialogTitle>
            <DialogDescription className="text-slate-400">
              Revise as informações do plano selecionado
            </DialogDescription>
          </DialogHeader>

          {selectedPlanData && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div className={`bg-gradient-to-br ${selectedPlanData.color} p-3 rounded-xl`}>
                  <selectedPlanData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg text-white">{selectedPlanData.name}</h4>
                  <p className="text-sm text-slate-400">{selectedPlanData.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-400">Período de cobrança</span>
                  <span className="text-white">{billingPeriod === 'monthly' ? 'Mensal' : 'Anual'}</span>
                </div>

                {selectedPlanData.price.monthly && (
                  <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                    <span className="text-slate-400">Valor</span>
                    <span className="text-2xl text-blue-400">
                      R$ {billingPeriod === 'monthly' 
                        ? selectedPlanData.price.monthly.toLocaleString('pt-BR')
                        : selectedPlanData.price.yearly!.toLocaleString('pt-BR')
                      }
                      <span className="text-sm text-slate-400">/{billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-400">Colaboradores</span>
                  <span className="text-white">
                    {selectedPlanData.maxUsers ? `Até ${selectedPlanData.maxUsers}` : 'Ilimitado'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  14 dias de teste grátis - cancele quando quiser
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Voltar
            </Button>
            <Button
              onClick={handleConfirmPurchase}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              {selectedPlanData?.price.monthly ? 'Iniciar teste grátis' : 'Solicitar contato'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
