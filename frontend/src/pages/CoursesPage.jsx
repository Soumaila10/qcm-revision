import React, { useEffect, useState } from 'react';
import { questionService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Network, Shield, GitBranch, Play, ChevronDown, ChevronUp, 
  FileText, Sparkles, CheckCircle2, Award, Clock, ArrowRight, Layers, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Theoretical course sheets content (Fiches de révision)
const COURSE_SHEETS = {
  'Management de Projet': [
    {
      id: 'agile_scrum',
      subcategory: 'Agile & Scrum',
      title: 'Agile & Scrum',
      icon: Layers,
      color: 'from-violet-500 to-purple-600',
      summary: 'Méthodologie itérative et incrémentale axée sur la collaboration, l\'adaptation et la livraison fréquente de valeur.',
      points: [
        'Rôles Scrum : Product Owner (vision, backlog), Scrum Master (facilitateur, coach), Developers (incrément technique).',
        'Rituels clés : Sprint Planning (planification), Daily Scrum (15min synchro), Sprint Review (démo et feedback), Sprint Retrospective (amélioration continue).',
        'Artefacts : Product Backlog (besoins ordonnés), Sprint Backlog (objectifs sprint), Incrément (produit fini et utilisable selon la DoD).',
        'Scrum vs Kanban : Scrum impose des itérations à durée fixe (Sprints), Kanban se concentre sur la gestion du flux continu avec des limites WIP (Work in Progress).'
      ]
    },
    {
      id: 'planification',
      subcategory: 'Planification',
      title: 'Planification & Jalons',
      icon: Clock,
      color: 'from-indigo-500 to-violet-600',
      summary: 'Structuration et organisation temporelle des livrables et activités pour garantir le respect des délais.',
      points: [
        'WBS (Work Breakdown Structure) : Décomposition hiérarchique du projet en lots de travaux (Work Packages). C\'est la base de toute estimation.',
        'Jalons (Milestones) : Événements clés sans durée représentant une décision majeure ou une livraison critique.',
        'Diagramme de Gantt : Représentation graphique du planning affichant les tâches, les durées, les chevauchements et les dépendances.',
        'Estimation des charges : Utilisation de techniques d\'estimation (Delphi, Planning Poker en agile, ou Abaque).'
      ]
    },
    {
      id: 'pert_cpm',
      subcategory: 'PERT & CPM',
      title: 'PERT & Chemin Critique (CPM)',
      icon: GitBranch,
      color: 'from-fuchsia-500 to-pink-600',
      summary: 'Méthode d\'ordonnancement réseau visant à déterminer les marges et la durée minimale du projet.',
      points: [
        'Réseau PERT : Diagramme de dépendance affichant les tâches (arcs ou nœuds) et les contraintes logiques d\'enchaînement.',
        'Dates au plus tôt / plus tard : Calculs itératifs pour chaque étape du réseau pour connaître la flexibilité.',
        'Chemin Critique : Chemin le plus long du réseau PERT où toutes les tâches ont une marge totale nulle. Tout retard décale le projet entier.',
        'Marge Libre vs Marge Totale : La marge totale est le retard possible sans décaler le projet. La marge libre est le retard possible sans décaler les tâches suivantes.'
      ]
    },
    {
      id: 'gestion_risques',
      subcategory: 'Gestion des Risques',
      title: 'Gestion des Risques & ISO 27005',
      icon: Shield,
      color: 'from-purple-500 to-pink-600',
      summary: 'Démarche d\'analyse et de traitement des menaces pouvant impacter la réussite du projet ou la sécurité des actifs.',
      points: [
        'Processus de gestion : Identification, analyse quantitative/qualitative (probabilité x gravité), puis planification du traitement.',
        'Options de traitement : Réduction (sécurisation), Transfert (assurance ou sous-traitance), Évitement (changement de plan), Acceptation.',
        'ISO 27005 : Cadre d\'analyse des risques de sécurité de l\'information (menaces, vulnérabilités, impacts sur la CIA/DIC).',
        'Risque Résiduel : Niveau de risque qui subsiste après application des contre-mesures. Il doit être accepté par la direction.'
      ]
    },
    {
      id: 'gouvernance_si',
      subcategory: 'Gouvernance',
      title: 'Gouvernance SI & COBIT 2019',
      icon: Award,
      color: 'from-violet-600 to-indigo-600',
      summary: 'Cadre stratégique alignant le Système d\'Information sur la stratégie globale de l\'entreprise.',
      points: [
        'Gouvernance vs Gestion (COBIT 2019) : La gouvernance évalue, oriente et surveille (EDM). Le management planifie, construit, exécute et surveille (APO, BAI, DSS, MEA).',
        'Objectifs de la gouvernance : Réalisation des bénéfices, optimisation des risques, et optimisation des ressources.',
        'ITIL 4 : Référentiel centré sur la gestion des services IT (Service Value System) et la co-création de valeur.',
        'Alignement Stratégique : S\'assurer que les investissements informatiques soutiennent directement les objectifs business de l\'entreprise.'
      ]
    }
  ],
  'IT & Cybersécurité': [
    {
      id: 'conteneurisation',
      subcategory: 'Conteneurisation',
      title: 'Conteneurisation Docker',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      summary: 'Technologie d\'isolation d\'applications partageant le noyau de l\'OS hôte, plus légère que la virtualisation traditionnelle.',
      points: [
        'Image Docker : Gabarit en lecture seule, composé de couches successives définies par un Dockerfile, contenant le code et les dépendances.',
        'Conteneur Docker : Instance d\'exécution isolée et modifiable d\'une image Docker.',
        'Volume : Mécanisme de persistance des données en dehors du cycle de vie du conteneur.',
        'Port Forwarding : Liaison de ports physiques de la machine hôte vers les ports exposés à l\'intérieur du conteneur.'
      ]
    },
    {
      id: 'orchestration',
      subcategory: 'Orchestration',
      title: 'Orchestration avec Kubernetes',
      icon: Network,
      color: 'from-blue-500 to-indigo-600',
      summary: 'Plateforme open-source pour automatiser le déploiement, la mise à l\'échelle et la gestion des conteneurs.',
      points: [
        'Pods : Le plus petit composant d\'exécution contenant un ou plusieurs conteneurs partageant le même réseau et stockage.',
        'Services Kubernetes : Point d\'accès réseau stable pour les Pods. Types: ClusterIP (interne), NodePort (externe via port hôte), LoadBalancer.',
        'Deployments : Déclaration de l\'état souhaité de l\'application (nombre de répliques, stratégie de mise à jour progressive rolling-update).',
        'Ingress : Contrôleur gérant les accès HTTP/HTTPS externes vers les services internes (faisant office de Reverse Proxy et SSL Termination).'
      ]
    },
    {
      id: 'devops_cicd',
      subcategory: 'DevOps & CI/CD',
      title: 'DevOps & Pipelines CI/CD',
      icon: GitBranch,
      color: 'from-cyan-600 to-teal-500',
      summary: 'Culture et ensemble de pratiques automatisant l\'intégration du code et le déploiement d\'applications en production.',
      points: [
        'Intégration Continue (CI) : Automatisation des tests et builds à chaque commit pour détecter les régressions le plus tôt possible.',
        'Livraison Continue (CD) : Pipeline automatisant le déploiement jusqu\'à la pré-production, nécessitant un déclenchement manuel pour la production.',
        'Déploiement Continu (CD) : Automatisation totale du passage en production de toute modification validée par les tests.',
        'Infrastructure as Code (IaC) : Gestion et provisionnement des infrastructures (serveurs, réseaux, bases de données) par du code (Terraform, Ansible).'
      ]
    },
    {
      id: 'reseau',
      subcategory: 'Réseaux & Protocoles',
      title: 'Réseau (OSPF & BGP)',
      icon: Network,
      color: 'from-sky-500 to-blue-600',
      summary: 'Protocoles de routage dynamique assurant l\'acheminement efficace des paquets à travers les infrastructures réseau.',
      points: [
        'OSPF (Open Shortest Path First) : Protocole de routage interne (IGP) à état de liaison. Utilise l\'algorithme de Dijkstra pour trouver le chemin le plus court.',
        'BGP (Border Gateway Protocol) : Protocole externe (EGP) à vecteur de chemin. C\'est le protocole qui gère le routage sur Internet entre les Autonomous Systems (AS).',
        'Modèle OSI : Modèle théorique à 7 couches (Physique, Liaison, Réseau, Transport, Session, Présentation, Application).',
        'TCP vs UDP : TCP est connecté, fiable et garantit l\'ordre de réception (ex: HTTP). UDP est non-connecté, rapide et orienté flux (ex: Streaming, DNS).'
      ]
    },
    {
      id: 'cybersecurite_zero_trust',
      subcategory: 'Cybersécurité & Zero Trust',
      title: 'Cybersécurité & Zero Trust',
      icon: Shield,
      color: 'from-teal-600 to-cyan-600',
      summary: 'Modèle de sécurité informatique moderne reposant sur la suppression de la confiance implicite.',
      points: [
        'Principe Zero Trust : "Never Trust, Always Verify" (Ne jamais faire confiance, toujours vérifier). Chaque requête est authentifiée et chiffrée.',
        'Défense en Profondeur : Superposition de mécanismes de sécurité (firewall, chiffrement, IAM, antivirus) pour retarder/bloquer une intrusion.',
        'CIA Triad (DIC en français) : Disponibilité (Availability), Intégrité (Integrity), Confidentialité (Confidentiality). Piliers de la sécurité.',
        'Chiffrement Symétrique vs Asymétrique : Symétrique utilise la même clé (ex: AES, très rapide). Asymétrique utilise un couple clé publique/clé privée (ex: RSA, signature).'
      ]
    }
  ]
};

export default function CoursesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Management de Projet');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  // Fetch all questions to build the interactive questions list dynamically
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Fetch all questions in the database
        const data = await questionService.getAll();
        setQuestions(data);
      } catch (err) {
        console.error('Erreur lors du chargement des questions pour les cours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Filter questions for a specific subcategory
  const getSubcategoryQuestions = (subcatName) => {
    // Standardize comparison because subcategory naming may slightly differ (e.g., 'Scrum' vs 'Agile & Scrum')
    return questions.filter(q => {
      const qSub = q.subcategory.toLowerCase();
      const targetSub = subcatName.toLowerCase();
      
      // Match if equal, or if one is contained in the other
      return qSub === targetSub || 
             (targetSub === 'agile & scrum' && qSub.includes('scrum')) ||
             (targetSub === 'gouvernance' && qSub.includes('gouvernance')) ||
             (targetSub === 'pert & cpm' && (qSub.includes('pert') || qSub.includes('cpm')));
    });
  };

  const handleStartPractice = (subcategory) => {
    // Route to QCM engine with parameters
    const encodedSubcat = encodeURIComponent(subcategory);
    navigate(`/qcm?type=Entraînement&category=${encodeURIComponent(activeTab)}&subcategory=${encodedSubcat}`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-violet-500" />
          Cours & Fiches de Révision
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Révisez les concepts théoriques fondamentaux du Mastère FEDE MPI et étudiez les annales et QCM corrigés par thématique.
        </p>
      </div>

      {/* Main Tabs Selection */}
      <div className="flex border-b border-slate-800/80">
        {['Management de Projet', 'IT & Cybersécurité'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setExpandedTopicId(null); // Reset accordions
            }}
            className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all relative ${
              activeTab === tab
                ? 'border-violet-500 text-white'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 shadow-md shadow-violet-500/20"
              />
            )}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="space-y-6">
        {COURSE_SHEETS[activeTab].map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          const topicQuestions = getSubcategoryQuestions(topic.subcategory);
          const IconComponent = topic.icon;

          return (
            <div
              key={topic.id}
              className="glass-card rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 overflow-hidden"
            >
              {/* Card Header (Clickable summary & action panel) */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-4 md:gap-5">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${topic.color} flex items-center justify-center text-white shrink-0 shadow-lg shadow-violet-500/10`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      {topic.title}
                      {topicQuestions.length > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 text-violet-400 rounded-full">
                          {topicQuestions.length} QCM dispos
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                      {topic.summary}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col lg:flex-row items-center gap-3 w-full md:w-auto shrink-0 self-end md:self-start">
                  <button
                    onClick={() => handleStartPractice(topic.subcategory)}
                    className="flex-1 md:w-full lg:w-auto px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/10 transition-all"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    S'entraîner
                  </button>
                  
                  <button
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="px-4 py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-850/80 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{isExpanded ? 'Fermer la fiche' : 'Consulter le cours'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Course & Questions Space */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-900/60 bg-slate-950/40 overflow-hidden"
                  >
                    <div className="p-6 md:p-8 space-y-8">
                      
                      {/* Course Content Details */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-violet-400 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Concepts théoriques à maîtriser pour l'examen
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topic.points.map((point, index) => (
                            <div 
                              key={index}
                              className="p-4 rounded-xl bg-slate-900/40 border border-slate-850 flex items-start gap-3 hover:border-slate-800 transition-colors"
                            >
                              <div className="mt-1 shrink-0 bg-violet-500/10 text-violet-400 p-0.5 rounded-full">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                                <span className="text-slate-100 font-bold">{point.split(' : ')[0]}</span>
                                {point.includes(' : ') ? ` : ${point.split(' : ')[1]}` : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Associated Questions Bank */}
                      <div className="space-y-4 pt-4 border-t border-slate-900/60">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-violet-400 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          Banque de Questions & Réponses Corrigées
                        </h4>

                        {loading ? (
                          <div className="text-center py-6 text-slate-500 text-xs animate-pulse">
                            Chargement des questions du cours...
                          </div>
                        ) : topicQuestions.length === 0 ? (
                          <div className="p-4 rounded-xl bg-slate-900/20 text-center text-xs text-slate-500 border border-dashed border-slate-850">
                            Aucune question configurée pour cette catégorie dans la base de données.
                          </div>
                        ) : (
                          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {topicQuestions.map((q, qIndex) => (
                              <div 
                                key={q._id} 
                                className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-800 transition-colors space-y-3"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <span className="text-[10px] font-black text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-850 uppercase">
                                    QCM {qIndex + 1}
                                  </span>
                                  {q.isRecurrent && (
                                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                      <Sparkles className="h-2 w-2" /> Récurrent
                                    </span>
                                  )}
                                </div>

                                <h5 className="text-xs font-bold text-slate-200 leading-normal">
                                  {q.question}
                                </h5>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                  {q.options.map((opt, optIdx) => {
                                    const isCorrect = optIdx === q.correctAnswer;
                                    return (
                                      <div 
                                        key={optIdx}
                                        className={`p-2.5 rounded-lg border ${
                                          isCorrect 
                                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 font-bold' 
                                            : 'bg-slate-950/50 border-slate-900 text-slate-400'
                                        }`}
                                      >
                                        <span className="mr-1 opacity-70 font-semibold">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg">
                                  <span className="text-[10px] font-black text-violet-400 uppercase tracking-wide block mb-0.5">Explication :</span>
                                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                                    {q.explanation}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
