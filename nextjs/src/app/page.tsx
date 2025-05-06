import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Shield,
  Users,
  Clock,
  FileText,
  BellRing,
  Brain
} from "lucide-react";
import AuthAwareButtons from "@/components/AuthAwareButtons";
import HomePricing from "@/components/HomePricing";

export default function Home() {
  const productName = process.env.NEXT_PUBLIC_PRODUCTNAME || "OrganizadaMente";

  const features = [
    {
      icon: Calendar,
      title: "OrganizadaMente",
      description:
        "Sistema completo de agendamento com visualização diária, semanal e mensal para organizar suas consultas",
      color: "text-green-600"
    },
    {
      icon: BellRing,
      title: "Lembretes Automáticos",
      description:
        "Envio automático de lembretes por e-mail e SMS para reduzir faltas e cancelamentos de última hora",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Gestão de Pacientes",
      description:
        "Cadastro completo de pacientes com histórico de consultas, anotações e documentos importantes",
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: "Controle de Horários",
      description:
        "Configure sua disponibilidade, intervalos entre sessões e bloqueie horários para compromissos pessoais",
      color: "text-teal-600"
    },
    {
      icon: FileText,
      title: "Prontuário Digital",
      description:
        "Registre evoluções de sessões com segurança e conformidade com normas de sigilo profissional",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description:
        "Dados criptografados e em conformidade com LGPD e normas do Conselho Federal de Psicologia",
      color: "text-blue-600"
    }
  ];

  const stats = [
    { label: "Psicólogos Ativos", value: "5K+" },
    { label: "Consultas Gerenciadas", value: "500K+" },
    { label: "Horas Economizadas", value: "10K+" },
    { label: "Satisfação", value: "98%" }
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {productName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900"
              >
                Funcionalidades
              </Link>

              <Link
                href="#pricing"
                className="text-gray-600 hover:text-gray-900"
              >
                Planos
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900"
              >
                Depoimentos
              </Link>

              <AuthAwareButtons variant="nav" />
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Simplifique sua agenda
              <span className="block text-primary-600">
                Foque no que importa: seus pacientes
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              O sistema de agendamento completo para psicólogos que automatiza
              tarefas administrativas, reduz faltas e organiza prontuários com
              total segurança e conformidade.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <AuthAwareButtons />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Tudo o que você precisa</h2>
            <p className="mt-4 text-xl text-gray-600">
              Desenvolvido especificamente para as necessidades de psicólogos
              clínicos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">O que dizem nossos usuários</h2>
            <p className="mt-4 text-xl text-gray-600">
              Psicólogos que transformaram sua prática clínica com o{" "}
              {productName}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">DR</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Dra. Renata Silva</h4>
                  <p className="text-sm text-gray-600">Psicóloga Clínica</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Reduzi minhas faltas em 70% com os lembretes automáticos. O
                sistema me economiza pelo menos 5 horas por semana em tarefas
                administrativas."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">CM</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Carlos Mendes</h4>
                  <p className="text-sm text-gray-600">Psicoterapeuta</p>
                </div>
              </div>
              <p className="text-gray-700">
                "O prontuário digital é excelente e me dá segurança sobre a
                confidencialidade dos dados. A interface é intuitiva e facilita
                muito meu dia a dia."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">JA</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Juliana Almeida</h4>
                  <p className="text-sm text-gray-600">Psicóloga Infantil</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Consigo gerenciar minha clínica com muito mais eficiência. Os
                pais dos meus pacientes adoram a facilidade para agendar e
                remarcar consultas."
              </p>
            </div>
          </div>
        </div>
      </section>

      <HomePricing />

      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Pronto para transformar sua prática clínica?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            Junte-se a milhares de psicólogos que economizam tempo e melhoram o
            atendimento com {productName}
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium hover:bg-primary-50 transition-colors"
          >
            Experimente Grátis por 14 dias
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-primary-200">
            Não é necessário cartão de crédito
          </p>
        </div>
      </section>

      {/* Seção de FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
            <p className="mt-4 text-xl text-gray-600">
              Tire suas dúvidas sobre o {productName}
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Meus dados e dos meus pacientes estão seguros?
              </h3>
              <p className="mt-2 text-gray-600">
                Absolutamente. Utilizamos criptografia de ponta a ponta e
                seguimos todas as diretrizes da LGPD e do Conselho Federal de
                Psicologia para garantir o sigilo profissional e a segurança dos
                dados.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Posso acessar o sistema de qualquer dispositivo?
              </h3>
              <p className="mt-2 text-gray-600">
                Sim, o {productName} funciona em qualquer dispositivo com acesso
                à internet - computadores, tablets e smartphones, permitindo que
                você gerencie sua agenda de onde estiver.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Como funciona o período de teste gratuito?
              </h3>
              <p className="mt-2 text-gray-600">
                Você tem acesso a todas as funcionalidades do plano Premium por
                14 dias, sem necessidade de cartão de crédito. Ao final do
                período, você pode escolher o plano que melhor atende suas
                necessidades.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Preciso instalar algum software?
              </h3>
              <p className="mt-2 text-gray-600">
                Não é necessário instalar nada. O {productName} é um sistema
                baseado em nuvem, acessível diretamente pelo navegador, sempre
                atualizado e sem ocupar espaço no seu dispositivo.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Como os pacientes recebem os lembretes de consulta?
              </h3>
              <p className="mt-2 text-gray-600">
                Os lembretes são enviados automaticamente por e-mail e/ou SMS
                (conforme sua configuração) 24 horas antes e 1 hora antes da
                consulta, reduzindo significativamente as faltas.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
              Comece agora mesmo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Integração */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold">
                Integração completa com seu fluxo de trabalho
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                O {productName} se integra com as ferramentas que você já usa,
                tornando sua transição simples e rápida.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Sincronização com Google Calendar e Outlook
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Exportação de relatórios em PDF e Excel
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Integração com plataformas de videoconferência
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    Conexão com sistemas de pagamento online
                  </p>
                </li>
              </ul>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Aqui você pode adicionar uma imagem ou vídeo demonstrativo */}
                  <div className="flex items-center justify-center h-full bg-primary-100 text-primary-700">
                    <p className="text-lg font-medium">Vídeo demonstrativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Produto</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Depoimentos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Recursos</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/suporte"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/lgpd"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    LGPD
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Contato</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="mailto:contato@psiagenda.com.br"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    contato@psiagenda.com.br
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+551199999999"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    (11) 9999-9999
                  </a>
                </li>
                <li className="flex space-x-4 mt-4">
                  <a
                    href="https://instagram.com/psiagenda"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/psiagenda"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/psiagenda"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} {productName}. Todos os direitos
              reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
