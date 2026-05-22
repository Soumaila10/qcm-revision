// Frontend questions database for offline mode / demo mode support

export const localQuestions = [
  // ANNALES FEDE
  {
    _id: "ann_1",
    category: "Annales",
    subcategory: "Gouvernance SI",
    difficulty: "Difficile",
    question: "Lors d'un audit de gouvernance selon COBIT 2019, quelle est la distinction fondamentale entre le 'Gouvernement' (Governance) et la 'Gestion' (Management) du SI ?",
    options: [
      "Le Gouvernement définit les objectifs stratégiques, évalue et surveille, tandis que la Gestion planifie, construit, exécute et surveille les activités (APO, BAI, DSS, MEA).",
      "Le Gouvernement s'occupe exclusivement de la conformité légale, tandis que la Gestion gère le budget opérationnel.",
      "Le Gouvernement est assuré par la DSI, tandis que la Gestion est assurée par le Conseil d'Administration.",
      "Il n'y a aucune différence technique, ce sont des synonymes dans le référentiel COBIT."
    ],
    correctAnswer: 0,
    explanation: "Dans COBIT 2019, la gouvernance évalue, oriente et surveille (EDM) pour s'assurer que les objectifs de l'entreprise sont atteints. La gestion (Management) planifie, construit, exécute et surveille (APO, BAI, DSS, MEA) les activités pour s'aligner sur les orientations de la gouvernance.",
    tags: ["COBIT", "Gouvernance", "Question Récurrente"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 90
  },
  {
    _id: "ann_2",
    category: "Annales",
    subcategory: "Gestion des Risques",
    difficulty: "Difficile",
    question: "Dans le cadre de la norme ISO 27005, quelle est la définition exacte du 'Risque Résiduel' ?",
    options: [
      "Le risque existant avant toute implémentation de mesures de sécurité ou de contrôles.",
      "Le risque qui subsiste après que le traitement du risque a été appliqué et que des mesures de sécurité ont été mises en œuvre.",
      "Le risque associé aux pannes matérielles uniquement.",
      "Le risque financier maximal encouru par l'organisation en cas de sinistre total."
    ],
    correctAnswer: 1,
    explanation: "Le risque résiduel est le niveau de risque restant après le traitement du risque, c'est-à-dire après l'application de mesures de sécurité. Il doit être accepté formellement par la direction générale.",
    tags: ["ISO 27005", "Sécurité", "Risques"],
    year: 2023,
    source: "FEDE 2023",
    isRecurrent: true,
    reoccurrenceProbability: 85
  },
  {
    _id: "ann_3",
    category: "Annales",
    subcategory: "Méthodologie Arpège",
    difficulty: "Moyen",
    question: "Selon la méthode Arpège, quel document formalise la fin de la phase de cadrage et valide l'opportunité de lancer la phase de conception ?",
    options: [
      "Le Cahier des Charges Fonctionnel (CDCF)",
      "La Charte de Projet",
      "Le Dossier d'Opportunité et de Cadrage (DOC)",
      "Le Procès-Verbal de Recette Provisoire"
    ],
    correctAnswer: 2,
    explanation: "La méthode Arpège (méthode de conduite de projet publique) utilise le Dossier d'Opportunité et de Cadrage (DOC) pour valider l'alignement stratégique et donner le go pour la phase de conception.",
    tags: ["Arpège", "Cadrage", "Gestion de Projet"],
    year: 2022,
    source: "FEDE 2022",
    isRecurrent: true,
    reoccurrenceProbability: 75
  },
  {
    _id: "ann_4",
    category: "Annales",
    subcategory: "Earned Value Management",
    difficulty: "Difficile",
    question: "Un projet informatique a une Valeur Acquise (EV) de 80 000 €, un Coût Réel (AC) de 90 000 € et une Valeur Planifiée (PV) de 75 000 €. Quelle est la situation du projet ?",
    options: [
      "Le projet est en avance sur le planning et en sous-budget.",
      "Le projet est en retard sur le planning et en dépassement de budget.",
      "Le projet est en avance sur le planning mais en dépassement de budget.",
      "Le projet est en retard sur le planning mais en sous-budget."
    ],
    correctAnswer: 2,
    explanation: "L'indice de performance des coûts (CPI = EV/AC = 80/90 = 0.88 < 1) indique un dépassement de budget. L'indice de performance de planification (SPI = EV/PV = 80/75 = 1.07 > 1) indique que le projet est en avance sur le planning.",
    tags: ["EVM", "Budget", "Calcul"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },
  {
    _id: "ann_5",
    category: "Annales",
    subcategory: "Cybersécurité",
    difficulty: "Difficile",
    question: "Dans une architecture Zero Trust, quel principe fondamental régit les accès réseau des utilisateurs ?",
    options: [
      "Faire confiance par défaut aux utilisateurs connectés via le VPN de l'entreprise.",
      "Ne jamais faire confiance, toujours vérifier (Never Trust, Always Verify), en authentifiant et autorisant continuellement chaque requête.",
      "Segmenter le réseau uniquement par des VLANs statiques.",
      "Chiffrer les données au repos sans contrôler les accès aux applications."
    ],
    correctAnswer: 1,
    explanation: "Le Zero Trust repose sur l'hypothèse qu'aucune session ou utilisateur ne doit être considéré comme digne de confiance par défaut, qu'il soit à l'intérieur ou à l'extérieur du réseau de l'entreprise. Chaque accès est authentifié, autorisé et chiffré.",
    tags: ["Zero Trust", "Cybersécurité", "Question Récurrente"],
    year: 2025,
    source: "FEDE 2025",
    isRecurrent: true,
    reoccurrenceProbability: 95
  },

  // MANAGEMENT DE PROJET
  {
    _id: "mgt_1",
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Facile",
    question: "Qui est le garant du respect du framework Scrum et de l'amélioration continue au sein d'une équipe de développement ?",
    options: [
      "Le Product Owner",
      "Le Scrum Master",
      "Le Directeur de Projet",
      "Le Lead Developer"
    ],
    correctAnswer: 1,
    explanation: "Le Scrum Master est un leader au service de l'équipe Scrum. Il l'aide à comprendre et appliquer la théorie, les pratiques, les règles et les valeurs de Scrum. Il facilite l'élimination des obstacles et promeut l'amélioration continue.",
    tags: ["Scrum", "Rôles", "Agile"]
  },
  {
    _id: "mgt_2",
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Moyen",
    question: "Dans Scrum, quel est l'objectif principal de la réunion de Rétrospective de Sprint ?",
    options: [
      "Présenter les fonctionnalités développées au client ou aux parties prenantes.",
      "Estimer la complexité des User Stories dans le Product Backlog.",
      "Analyser le fonctionnement du sprint écoulé sur le plan humain, technique et relationnel, et définir des actions d'amélioration.",
      "Planifier en détail les tâches techniques du prochain sprint."
    ],
    correctAnswer: 2,
    explanation: "La Rétrospective de Sprint a lieu à la fin de chaque Sprint. Son but est de faire le point sur la façon dont s'est déroulé le dernier Sprint en ce qui concerne les personnes, les relations, les processus et les outils, puis d'identifier les améliorations à apporter.",
    tags: ["Scrum", "Rétrospective", "Agile"]
  },
  {
    _id: "mgt_3",
    category: "Management de Projet",
    subcategory: "SAFe",
    difficulty: "Difficile",
    question: "Dans le framework SAFe, comment appelle-t-on le regroupement de 5 à 12 équipes agiles (50 à 125+ personnes) qui travaillent de manière synchronisée sur un produit ou système complexe ?",
    options: [
      "Le Solution Train",
      "L'Agile Release Train (ART)",
      "Le Value Stream Mapping",
      "Le Portfolio Management Office"
    ],
    correctAnswer: 1,
    explanation: "L'Agile Release Train (ART) est la structure organisationnelle centrale de SAFe au niveau 'Essential'. Il s'agit d'une équipe pluridisciplinaire et auto-organisée d'équipes agiles qui planifie, s'engage et exécute ensemble.",
    tags: ["SAFe", "ART", "Agile à l'échelle"]
  },
  {
    _id: "mgt_4",
    category: "Management de Projet",
    subcategory: "Prince2",
    difficulty: "Difficile",
    question: "Dans Prince2, quelle structure gère le projet au quotidien et rend compte directement au Comité de Pilotage ?",
    options: [
      "L'Assurance Projet",
      "Le Chef de Projet (Project Manager)",
      "Le Chargé de l'Appui Projet",
      "Le Chef d'Équipe"
    ],
    correctAnswer: 1,
    explanation: "Dans Prince2, le Chef de Projet gère le projet au jour le jour au nom du Comité de Pilotage. C'est lui qui orchestre les ressources opérationnelles tout en respectant les limites de tolérance accordées.",
    tags: ["Prince2", "Rôles", "Organisation"]
  },
  {
    _id: "mgt_5",
    category: "Management de Projet",
    subcategory: "PMP & PMBOK",
    difficulty: "Difficile",
    question: "Selon le PMBOK (7ème édition), quel document officiel autorise formellement l'existence d'un projet et donne au chef de projet l'autorité d'utiliser les ressources de l'organisation ?",
    options: [
      "Le Plan de Management de Projet",
      "La Charte de Projet (Project Charter)",
      "Le Registre des Parties Prenantes",
      "La Structure de Découpage du Projet (WBS)"
    ],
    correctAnswer: 1,
    explanation: "La Charte de Projet (Project Charter) est le document émis par le sponsor ou l'initiateur du projet qui autorise formellement le projet et attribue l'autorité au chef de projet pour mobiliser les ressources nécessaires.",
    tags: ["PMP", "Charte de Projet", "PMBOK"]
  },
  {
    _id: "mgt_6",
    category: "Management de Projet",
    subcategory: "ITIL",
    difficulty: "Moyen",
    question: "Dans le cadre d'ITIL v4, qu'est-ce qu'un 'SLA' (Service Level Agreement) ?",
    options: [
      "Un contrat de travail entre l'employé et la DSI.",
      "Un accord documenté entre un fournisseur de services et un client qui identifie les services requis et le niveau de performance attendu.",
      "Un rapport technique détaillé rédigé après une cyberattaque.",
      "Une méthodologie d'estimation de la vélocité Scrum."
    ],
    correctAnswer: 1,
    explanation: "Un SLA (Accord sur les Niveaux de Service) est un engagement écrit conclu entre un prestataire de services (généralement la DSI) et ses clients internes ou externes. Il définit des critères précis (temps de rétablissement, disponibilité...).",
    tags: ["ITIL", "SLA", "Qualité de Service"]
  },
  {
    _id: "mgt_7",
    category: "Management de Projet",
    subcategory: "PERT & CPM",
    difficulty: "Difficile",
    question: "Quelle est la définition du 'Chemin Critique' dans un réseau PERT ou PDM (Precedence Diagramming Method) ?",
    options: [
      "Le chemin reliant les tâches les plus faciles du projet.",
      "La séquence de tâches qui détermine la durée totale minimale du projet et sur laquelle les tâches ont une marge totale nulle.",
      "La liste des tâches critiques gérées par des sous-traitants.",
      "Le chemin qui consomme le plus de budget financier."
    ],
    correctAnswer: 1,
    explanation: "Le chemin critique est la suite d'activités qui détermine la durée totale du projet. Tout retard sur une activité du chemin critique entraîne un retard égal sur la date de fin du projet. La marge totale des tâches sur ce chemin est égale à zéro.",
    tags: ["PERT", "Chemin Critique", "CPM"]
  },

  // IT & CYBERSÉCURITÉ
  {
    _id: "it_1",
    category: "IT & Cybersécurité",
    subcategory: "Conteneurisation",
    difficulty: "Moyen",
    question: "Quelle est la différence fondamentale entre un conteneur Docker et une machine virtuelle (VM) classique ?",
    options: [
      "Le conteneur intègre son propre système d'exploitation complet (OS), tandis que la VM n'a pas d'OS.",
      "Le conteneur partage le noyau (kernel) du système d'exploitation de l'hôte, tandis que la VM s'exécute sur un hyperviseur avec son propre OS invité.",
      "Le conteneur est matériel, tandis que la machine virtuelle est purement logicielle.",
      "Les conteneurs ne fonctionnent que sous Windows, et les VM sous Linux."
    ],
    correctAnswer: 1,
    explanation: "Les machines virtuelles embarquent un OS complet et s'appuient sur un hyperviseur pour émuler le matériel. Les conteneurs partagent le noyau de l'OS hôte, ce qui les rend extrêmement légers, rapides à démarrer et économes en ressources.",
    tags: ["Docker", "Virtualisation", "Architecture"]
  },
  {
    _id: "it_2",
    category: "IT & Cybersécurité",
    subcategory: "Orchestration",
    difficulty: "Difficile",
    question: "Dans Kubernetes, quel type de ressource (ressource API) garantit qu'un ensemble de Pods spécifié fonctionne de manière continue, en remplaçant automatiquement tout Pod défaillant ?",
    options: [
      "Un Namespace",
      "Un Service",
      "Un ReplicaSet (ou Deployment)",
      "Un ConfigMap"
    ],
    correctAnswer: 2,
    explanation: "Un `ReplicaSet` (généralement géré via un `Deployment`) a pour rôle de maintenir un nombre constant de Pods stables s'exécutant à un moment donné. Si un Pod meurt, le ReplicaSet en replanifie automatiquement un nouveau.",
    tags: ["Kubernetes", "DevOps", "Pods"]
  },
  {
    _id: "it_3",
    category: "IT & Cybersécurité",
    subcategory: "Réseau",
    difficulty: "Difficile",
    question: "Comment appelle-t-on le standard réseau (IEEE 802.1Q) qui permet de faire transiter plusieurs réseaux locaux virtuels (VLAN) sur un seul lien physique de switch (trunking) ?",
    options: [
      "Le Tagging 802.1Q",
      "L'agrégation LACP",
      "Le protocole Spanning Tree (STP)",
      "Le NAT dynamique"
    ],
    correctAnswer: 0,
    explanation: "La norme IEEE 802.1Q spécifie l'intégration d'un tag de 4 octets dans l'en-tête de la trame Ethernet pour identifier le VLAN d'appartenance. Cela permet à un port de commutateur configuré en mode 'Trunk' de transporter les trames de plusieurs VLANs.",
    tags: ["VLAN", "802.1Q", "Réseau"]
  },
  {
    _id: "it_4",
    category: "IT & Cybersécurité",
    subcategory: "Cybersécurité",
    difficulty: "Moyen",
    question: "Quel système centralise la collecte de journaux d'événements (logs) de sécurité de l'ensemble du SI pour en faire de la corrélation et détecter des incidents en temps réel ?",
    options: [
      "Un Pare-feu applicatif (WAF)",
      "Un SIEM (Security Information and Event Management)",
      "Un serveur Proxy inverse",
      "Un HSM (Hardware Security Module)"
    ],
    correctAnswer: 1,
    explanation: "Un SIEM combine la gestion des informations de sécurité (SIM) et la gestion des événements (SEM). Il agrège des logs provenant de serveurs, routeurs, pare-feu et les analyse via des règles de corrélation pour identifier des comportements suspects.",
    tags: ["SIEM", "Logs", "Sécurité"]
  },
  {
    _id: "it_5",
    category: "IT & Cybersécurité",
    subcategory: "API & Sécurité",
    difficulty: "Moyen",
    question: "Quelles sont les trois parties distinctes qui composent la structure d'un jeton JSON Web Token (JWT) séparées par des points ?",
    options: [
      "User, Password, Salt",
      "Header, Payload, Signature",
      "Key, Secret, Alg",
      "Issuer, Subject, Expiration"
    ],
    correctAnswer: 1,
    explanation: "Un JWT se compose de trois parties encodées en Base64Url : le Header (type de jeton et algorithme de chiffrement), le Payload (les assertions ou claims sur l'utilisateur) et la Signature (qui garantit l'intégrité du jeton). Format : `xxxxx.yyyyy.zzzzz`.",
    tags: ["JWT", "Sécurité API", "Tokens"]
  }
];

// Let's write another 20 generated local questions to make the offline/local base richer
const extraLocal = [];
const subcats = [
  { name: "Scrum Master", detail: "gérer le processus, faciliter les rituels et éliminer les obstacles pour l'équipe", sub: "Agile & Scrum", cat: "Management de Projet" },
  { name: "Product Owner", detail: "définir la vision du produit, maximiser la valeur et gérer le Product Backlog", sub: "Agile & Scrum", cat: "Management de Projet" },
  { name: "Daily Scrum", detail: "se synchroniser quotidiennement, suivre l'avancée et lever les alertes", sub: "Agile & Scrum", cat: "Management de Projet" },
  { name: "Gantt", detail: "planifier visuellement les tâches et suivre l'avancée temporelle globale", sub: "Planification", cat: "Management de Projet" },
  { name: "PERT", detail: "analyser les interdépendances logiques entre tâches et tracer le chemin critique", sub: "PERT & CPM", cat: "Management de Projet" },
  { name: "Docker Image", detail: "servir de gabarit immuable contenant l'environnement d'exécution de l'application", sub: "Conteneurisation", cat: "IT & Cybersécurité" },
  { name: "Kubernetes Service", detail: "exposer de manière stable et équilibrée un ensemble de pods dynamiques", sub: "Orchestration", cat: "IT & Cybersécurité" },
  { name: "OSPF", detail: "router dynamiquement le trafic réseau en interne via le protocole Link-State", sub: "Réseau", cat: "IT & Cybersécurité" },
  { name: "Zero Trust", detail: "vérifier systématiquement l'identité et les autorisations pour chaque accès réseau", sub: "Cybersécurité", cat: "IT & Cybersécurité" },
  { name: "OAuth2", detail: "accorder des autorisations d'accès sécurisées à des tiers sans révéler ses identifiants", sub: "API & Sécurité", cat: "IT & Cybersécurité" }
];

subcats.forEach((t, i) => {
  extraLocal.push({
    _id: `local_extra_${i}_facile`,
    category: t.cat,
    subcategory: t.sub,
    difficulty: "Facile",
    question: `Selon le programme FEDE Master, quel est le but principal de l'outil ou du rôle '${t.name}' ?`,
    options: [
      `Permettre de ${t.detail}.`,
      `Chiffrer toutes les communications réseau avec une clé asymétrique unique.`,
      `Mesurer le taux d'erreur de transmission de données sur le port 443.`,
      `Générer de manière autonome des diagrammes d'architecture UML.`
    ],
    correctAnswer: 0,
    explanation: `La bonne réponse est que '${t.name}' sert à ${t.detail}. C'est une notion fondamentale à maîtriser.`,
    tags: [t.name, "Base", "Offline"],
    year: null,
    source: "Offline Mode",
    isRecurrent: false,
    reoccurrenceProbability: 35
  });

  extraLocal.push({
    _id: `local_extra_${i}_difficile`,
    category: t.cat,
    subcategory: t.sub,
    difficulty: "Difficile",
    question: `Dans le cadre d'un scénario d'examen FEDE, comment optimise-t-on l'usage de : '${t.name}' ?`,
    options: [
      `En veillant à ce que son utilisation soit alignée sur le besoin de ${t.detail}.`,
      `En l'utilisant exclusivement sous des environnements de serveur Linux Debian.`,
      `En désactivant les journaux système pour accélérer le processus de transaction.`,
      `En forçant tous les collaborateurs de l'entreprise à passer une certification formelle.`
    ],
    correctAnswer: 0,
    explanation: `Pour maximiser la réussite du projet informatique, '${t.name}' doit être implémenté pour ${t.detail} en s'adaptant au contexte organisationnel.`,
    tags: [t.name, "Expertise", "Offline"],
    year: 2024,
    source: "Offline Mode",
    isRecurrent: true,
    reoccurrenceProbability: 80
  });
});

export const frontendQuestionsList = [...localQuestions, ...extraLocal];
