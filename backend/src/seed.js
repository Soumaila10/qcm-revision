const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const Question = require('./models/Question');
const User = require('./models/User');
const Exam = require('./models/Exam');
const seedQuestions = require('./seedData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fede_master';

// Function to generate additional unique variations of questions to hit 230+ total
const generateMoreQuestions = () => {
  const extra = [];
  const categories = ['Management de Projet', 'IT & Cybersécurité', 'Annales'];
  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  // Add 60 highly structured questions on specific topics
  const topics = [
    { name: "Scrum Master", detail: "gérer le processus, faciliter les rituels et éliminer les obstacles pour l'équipe", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Product Owner", detail: "définir la vision du produit, maximiser la valeur et gérer le Product Backlog", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Developers", detail: "créer un incrément utilisable de produit fini à chaque fin de Sprint", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Sprint Planning", detail: "définir l'objectif du sprint et planifier les tâches correspondantes", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Sprint Review", detail: "présenter l'incrément de produit fini aux parties prenantes pour obtenir des retours", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Sprint Retrospective", detail: "analyser le fonctionnement du sprint écoulé et planifier des actions d'amélioration", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Kanban Board", detail: "visualiser le flux de travail et limiter le travail en cours (WIP)", sub: "Agile & Scrum", cat: "Management de Projet" },
    { name: "Gantt Chart", detail: "planifier et ordonner chronologiquement les tâches d'un projet", sub: "Planification", cat: "Management de Projet" },
    { name: "PERT Chart", detail: "ordonnancer les tâches réseau pour identifier le chemin critique", sub: "PERT & CPM", cat: "Management de Projet" },
    { name: "Critical Path", detail: "la suite d'activités qui détermine la durée totale minimale du projet", sub: "PERT & CPM", cat: "Management de Projet" },
    { name: "Risk Register", detail: "recenser, analyser et suivre les risques identifiés du projet", sub: "Gestion des Risques", cat: "Management de Projet" },
    { name: "Business Case", detail: "justifier la viabilité commerciale et financière du démarrage d'un projet", sub: "Gouvernance", cat: "Management de Projet" },
    { name: "Docker Image", detail: "un gabarit en lecture seule contenant le code et l'environnement de l'application", sub: "Conteneurisation", cat: "IT & Cybersécurité" },
    { name: "Docker Container", detail: "une instance d'exécution isolée d'une image Docker partageant l'OS hôte", sub: "Conteneurisation", cat: "IT & Cybersécurité" },
    { name: "Kubernetes Pod", detail: "le plus petit composant d'exécution regroupant un ou plusieurs conteneurs", sub: "Orchestration", cat: "IT & Cybersécurité" },
    { name: "Kubernetes Service", detail: "définir un point d'accès réseau stable pour un groupe de Pods", sub: "Orchestration", cat: "IT & Cybersécurité" },
    { name: "CI Pipeline", detail: "automatiser la compilation, le build et les tests automatiques à chaque commit", sub: "DevOps & CI/CD", cat: "IT & Cybersécurité" },
    { name: "CD Pipeline", detail: "automatiser la livraison ou le déploiement du logiciel validé vers la production", sub: "DevOps & CI/CD", cat: "IT & Cybersécurité" },
    { name: "OSPF Protocol", detail: "un protocole de routage dynamique interne basé sur l'état des liaisons", sub: "Réseau", cat: "IT & Cybersécurité" },
    { name: "BGP Protocol", detail: "le protocole à vecteur de chemin qui interconnecte les Autonomous Systems sur Internet", sub: "Réseau", cat: "IT & Cybersécurité" }
  ];

  topics.forEach((t, i) => {
    difficulties.forEach(diff => {
      extra.push({
        category: t.cat,
        subcategory: t.sub,
        difficulty: diff,
        question: `Dans le cadre du programme FEDE MPI, quelle est la fonction principale d'un(e) ${t.name} (${diff}) ?`,
        options: [
          `Sa fonction principale est de ${t.detail}.`,
          `Sa fonction principale est de crypter toutes les données réseau de l'organisation.`,
          `Sa fonction principale est d'exécuter des pipelines d'intégration continue de secours.`,
          `Sa fonction principale est de superviser l'audit financier externe de l'entreprise.`
        ],
        correctAnswer: 0,
        explanation: `Pour l'examen FEDE, il faut retenir qu'un(e) ${t.name} sert à ${t.detail}. C'est une notion récurrente évaluée en 5ème année.`,
        tags: [t.name, "Révision-Détail", diff],
        source: "FEDE Prep Généré",
        isRecurrent: diff === 'Difficile',
        reoccurrenceProbability: diff === 'Difficile' ? 75 : 40
      });
    });
  });

  return extra;
};

const run = async () => {
  try {
    console.log('Connexion à MongoDB...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connecté avec succès.');

    // Clear collections
    console.log('Nettoyage des collections existantes...');
    await Question.deleteMany({});
    await User.deleteMany({});
    await Exam.deleteMany({});
    console.log('Collections nettoyées.');

    // Generate extra questions
    const extraQuestions = generateMoreQuestions();
    const finalQuestions = [...seedQuestions, ...extraQuestions];

    console.log(`Insertion de ${finalQuestions.length} questions dans la base de données...`);
    await Question.insertMany(finalQuestions);
    console.log('Questions insérées avec succès !');

    console.log('Base de données initialisée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error);
    process.exit(1);
  }
};

run();
