import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Download, Calendar, Users, BookOpen, AlertCircle, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ManagerCostsScreenProps {
  onBack: () => void;
}

export function ManagerCostsScreen({ onBack }: ManagerCostsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Monthly spending data
  const monthlyData = [
    { month: 'Mai', value: 15420, courses: 45 },
    { month: 'Jun', value: 18650, courses: 52 },
    { month: 'Jul', value: 21330, courses: 58 },
    { month: 'Ago', value: 19850, courses: 54 },
    { month: 'Set', value: 23140, courses: 63 },
    { month: 'Out', value: 25680, courses: 68 }
  ];

  // Department breakdown
  const departmentData = [
    { name: 'Marketing', value: 6850, color: '#3b82f6' },
    { name: 'Vendas', value: 8420, color: '#8b5cf6' },
    { name: 'TI', value: 5230, color: '#10b981' },
    { name: 'RH', value: 3180, color: '#f59e0b' },
    { name: 'Financeiro', value: 2000, color: '#ef4444' }
  ];

  // Employee costs
  const employeeCosts = [
    { 
      id: 1, 
      name: 'Ana Silva', 
      department: 'Marketing', 
      coursesCompleted: 12, 
      hoursSpent: 42, 
      totalCost: 1250,
      avgCostPerCourse: 104,
      trend: 'up'
    },
    { 
      id: 2, 
      name: 'Carlos Santos', 
      department: 'Vendas', 
      coursesCompleted: 11, 
      hoursSpent: 38, 
      totalCost: 1180,
      avgCostPerCourse: 107,
      trend: 'up'
    },
    { 
      id: 3, 
      name: 'Maria Oliveira', 
      department: 'RH', 
      coursesCompleted: 10, 
      hoursSpent: 35, 
      totalCost: 950,
      avgCostPerCourse: 95,
      trend: 'same'
    },
    { 
      id: 4, 
      name: 'João Pereira', 
      department: 'TI', 
      coursesCompleted: 10, 
      hoursSpent: 40, 
      totalCost: 1100,
      avgCostPerCourse: 110,
      trend: 'up'
    },
    { 
      id: 5, 
      name: 'Paula Costa', 
      department: 'Financeiro', 
      coursesCompleted: 9, 
      hoursSpent: 32, 
      totalCost: 890,
      avgCostPerCourse: 99,
      trend: 'down'
    },
    { 
      id: 6, 
      name: 'Ricardo Alves', 
      department: 'Operações', 
      coursesCompleted: 9, 
      hoursSpent: 30, 
      totalCost: 820,
      avgCostPerCourse: 91,
      trend: 'same'
    },
    { 
      id: 7, 
      name: 'Juliana Lima', 
      department: 'Marketing', 
      coursesCompleted: 8, 
      hoursSpent: 28, 
      totalCost: 780,
      avgCostPerCourse: 98,
      trend: 'up'
    },
    { 
      id: 8, 
      name: 'Fernando Rocha', 
      department: 'Vendas', 
      coursesCompleted: 8, 
      hoursSpent: 26, 
      totalCost: 750,
      avgCostPerCourse: 94,
      trend: 'down'
    }
  ];

  // Summary stats
  const currentMonth = {
    totalCost: 25680,
    totalEmployees: 68,
    totalCourses: 235,
    avgCostPerEmployee: 378,
    avgCostPerCourse: 109,
    changeFromLastMonth: 10.9
  };

  const exportReport = () => {
    // Simular exportação
    const blob = new Blob(['Relatório de Custos - Skillify'], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-custos-skillify.csv';
    a.click();
  };

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
                <h2 className="text-2xl text-white">Gestão de Custos</h2>
                <p className="text-sm text-slate-400">Análise financeira de treinamentos</p>
              </div>
            </div>
            <Button
              onClick={exportReport}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="current-month">Mês Atual (Outubro)</SelectItem>
                <SelectItem value="last-month">Mês Anterior</SelectItem>
                <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
                <SelectItem value="last-6-months">Últimos 6 Meses</SelectItem>
                <SelectItem value="year">Ano Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="all">Todos os Setores</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Vendas</SelectItem>
                <SelectItem value="it">TI</SelectItem>
                <SelectItem value="hr">RH</SelectItem>
                <SelectItem value="finance">Financeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-blue-400" />
                  <Badge className={`${
                    currentMonth.changeFromLastMonth > 0 
                      ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    {currentMonth.changeFromLastMonth > 0 ? '+' : ''}{currentMonth.changeFromLastMonth}%
                  </Badge>
                </div>
                <div className="text-3xl text-white mb-1">
                  R$ {currentMonth.totalCost.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-slate-400">Custo Total Mensal</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl text-white mb-1">{currentMonth.totalEmployees}</div>
                <div className="text-sm text-slate-400">Colaboradores Ativos</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl text-white mb-1">{currentMonth.totalCourses}</div>
                <div className="text-sm text-slate-400">Cursos Concluídos</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl text-white mb-1">
                  R$ {currentMonth.avgCostPerEmployee}
                </div>
                <div className="text-sm text-slate-400">Custo Médio/Colaborador</div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg mb-4 text-white">Evolução Mensal de Custos</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Custo (R$)"
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Department Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg mb-4 text-white">Distribuição por Setor</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Courses per Month Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg mb-4 text-white">Cursos Concluídos por Mês</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="courses" fill="#10b981" name="Cursos" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Cost Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg mb-4 text-white">Insights e Alertas</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-red-400 mb-1">Aumento de Custos</div>
                      <p className="text-xs text-slate-400">
                        Custos aumentaram 10.9% em relação ao mês anterior. Considere revisar investimentos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-green-400 mb-1">Engajamento Alto</div>
                      <p className="text-xs text-slate-400">
                        +15% de cursos concluídos comparado ao mês passado. Ótimo engajamento!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-blue-400 mb-1">ROI Positivo</div>
                      <p className="text-xs text-slate-400">
                        Custo médio por curso em R$ 109 está dentro da meta estabelecida.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <Users className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-yellow-400 mb-1">Oportunidade</div>
                      <p className="text-xs text-slate-400">
                        Setor de Financeiro tem baixa adesão. Considere incentivar participação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Employee Costs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6">
              <h3 className="text-lg mb-4 text-white">Custos por Colaborador</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/30">
                      <TableHead className="text-slate-400">Colaborador</TableHead>
                      <TableHead className="text-slate-400">Setor</TableHead>
                      <TableHead className="text-slate-400 text-center">Cursos</TableHead>
                      <TableHead className="text-slate-400 text-center">Horas</TableHead>
                      <TableHead className="text-slate-400 text-right">Custo Total</TableHead>
                      <TableHead className="text-slate-400 text-right">Custo/Curso</TableHead>
                      <TableHead className="text-slate-400 text-center">Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeCosts.map((employee, index) => (
                      <TableRow 
                        key={employee.id} 
                        className="border-slate-700 hover:bg-slate-700/30 transition-colors"
                      >
                        <TableCell className="text-white">{employee.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {employee.department}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-slate-300">
                          {employee.coursesCompleted}
                        </TableCell>
                        <TableCell className="text-center text-slate-300">
                          {employee.hoursSpent}h
                        </TableCell>
                        <TableCell className="text-right text-white">
                          R$ {employee.totalCost.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right text-slate-300">
                          R$ {employee.avgCostPerCourse}
                        </TableCell>
                        <TableCell className="text-center">
                          {employee.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-400 mx-auto" />
                          ) : employee.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-red-400 mx-auto" />
                          ) : (
                            <div className="w-4 h-0.5 bg-slate-400 mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Department Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-6"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <div className="p-6">
              <h3 className="text-lg mb-4 text-white">Resumo por Setor</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentData.map((dept, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">{dept.name}</span>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                    </div>
                    <div className="text-2xl text-blue-400 mb-1">
                      R$ {dept.value.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-slate-400">
                      {((dept.value / departmentData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}% do total
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
