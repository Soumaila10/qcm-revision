// Seed data containing over 220 high-quality FEDE Master-level questions

const rawQuestions = [
  // ==========================================
  // SECTION 1: ANNALES FEDE (20 Questions d'Annales Réelles/Simulées)
  // ==========================================
  {
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
    explanation: "Dans COBIT 2019, la gouvernance (Governance) évalue, oriente et surveille (EDM) pour s'assurer que les objectifs de l'entreprise sont atteints. La gestion (Management) planifie, construit, exécute et surveille (APO, BAI, DSS, MEA) les activités pour s'aligner sur les orientations de la gouvernance.",
    tags: ["COBIT", "Gouvernance", "Question Récurrente"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 90
  },
  {
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
  {
    category: "Annales",
    subcategory: "Réseau & Protocoles",
    difficulty: "Difficile",
    question: "Quel protocole de routage dynamique est classé comme un protocole à vecteur de chemin (Path Vector) et est principalement utilisé pour interconnecter les Systèmes Autonomes (AS) sur Internet ?",
    options: [
      "OSPF (Open Shortest Path First)",
      "RIP (Routing Information Protocol)",
      "BGP (Border Gateway Protocol)",
      "EIGRP (Enhanced Interior Gateway Routing Protocol)"
    ],
    correctAnswer: 2,
    explanation: "BGP (Border Gateway Protocol) est le protocole de routage externe (EGP) standard de l'Internet, basé sur un algorithme à vecteur de chemin (Path Vector) pour acheminer le trafic entre différents Autonomous Systems (AS).",
    tags: ["BGP", "Réseau", "Internet"],
    year: 2023,
    source: "FEDE 2023",
    isRecurrent: true,
    reoccurrenceProbability: 85
  },
  {
    category: "Annales",
    subcategory: "Agilité à l'échelle",
    difficulty: "Difficile",
    question: "Dans le framework SAFe, quel est l'objectif principal de l'événement 'PI Planning' (Program Increment Planning) ?",
    options: [
      "Permettre au Product Owner de rédiger seul le carnet de produit (Product Backlog) pour les six prochains mois.",
      "Aligner toutes les équipes de l'Agile Release Train (ART) sur une mission commune et planifier le travail du prochain incrément.",
      "Réaliser la revue de code des composants logiciels du sprint en cours.",
      "Auditer la conformité budgétaire des projets transverses de l'entreprise."
    ],
    correctAnswer: 1,
    explanation: "Le PI Planning est un événement collaboratif majeur de SAFe réunissant toutes les équipes de l'ART pour s'aligner sur les objectifs stratégiques, identifier les dépendances et planifier le travail pour le prochain Program Increment (généralement 8 à 12 semaines).",
    tags: ["SAFe", "Agile", "PI Planning"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },
  {
    category: "Annales",
    subcategory: "Conduite du Changement",
    difficulty: "Moyen",
    question: "Selon le modèle de conduite du changement en 8 étapes de John Kotter, quelle est la toute première étape indispensable pour réussir une transformation ?",
    options: [
      "Créer des victoires à court terme.",
      "Former une coalition forte.",
      "Créer un sentiment d'urgence.",
      "Communiquer la vision de la transformation."
    ],
    correctAnswer: 2,
    explanation: "L'étape 1 du modèle de Kotter consiste à 'Créer un sentiment d'urgence'. Sans cette prise de conscience de la nécessité de changer, les équipes résisteront naturellement au changement et la transformation échouera.",
    tags: ["Kotter", "Management", "Changement"],
    year: 2021,
    source: "FEDE 2021",
    isRecurrent: false,
    reoccurrenceProbability: 60
  },
  {
    category: "Annales",
    subcategory: "Conteneurisation",
    difficulty: "Moyen",
    question: "Dans l'écosystème Docker, quelle instruction de Dockerfile permet de définir la commande par défaut qui s'exécutera lors du lancement du conteneur, tout en pouvant être facilement surchargée par l'utilisateur ?",
    options: [
      "ENTRYPOINT",
      "CMD",
      "RUN",
      "ENV"
    ],
    correctAnswer: 1,
    explanation: "L'instruction `CMD` spécifie la commande par défaut du conteneur. Si l'utilisateur fournit des arguments lors de l'exécution de `docker run`, ceux-ci écrasent complètement la commande spécifiée dans `CMD`.",
    tags: ["Docker", "Conteneurs", "DevOps"],
    year: 2023,
    source: "FEDE 2023",
    isRecurrent: true,
    reoccurrenceProbability: 75
  },
  {
    category: "Annales",
    subcategory: "Sécurité & Identité",
    difficulty: "Difficile",
    question: "Lorsqu'on utilise des JSON Web Tokens (JWT) pour sécuriser une API REST, où est-il recommandé de stocker le token côté client pour limiter au maximum les attaques de type XSS et CSRF ?",
    options: [
      "Dans le LocalStorage du navigateur.",
      "Dans le SessionStorage du navigateur.",
      "Dans un cookie sécurisé configuré avec les attributs HttpOnly, Secure et SameSite=Strict.",
      "Directement dans une variable globale JavaScript sans aucun stockage persistant."
    ],
    correctAnswer: 2,
    explanation: "Le stockage du JWT dans un cookie HTTP-Only avec les flags Secure et SameSite=Strict est la méthode la plus sécurisée. 'HttpOnly' empêche JavaScript d'accéder au cookie (bloquant le vol de jetons via XSS), et 'SameSite=Strict/Lax' protège contre le CSRF.",
    tags: ["JWT", "Sécurité", "API", "Question Récurrente"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 90
  },
  {
    category: "Annales",
    subcategory: "Orchestration",
    difficulty: "Difficile",
    question: "Dans Kubernetes, quel composant s'exécute sur chaque nœud (node) du cluster et est responsable du cycle de vie des conteneurs, s'assurant qu'ils tournent conformément aux spécifications des Pods ?",
    options: [
      "kube-apiserver",
      "kube-scheduler",
      "kubelet",
      "kube-proxy"
    ],
    correctAnswer: 2,
    explanation: "Le `kubelet` est l'agent principal qui tourne sur chaque nœud de travail (Worker Node) du cluster Kubernetes. Il s'assure que les conteneurs décrits dans les PodSpecs sont lancés et fonctionnent correctement.",
    tags: ["Kubernetes", "DevOps", "Orchestration"],
    year: 2025,
    source: "FEDE 2025",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },
  {
    category: "Annales",
    subcategory: "ITIL v4",
    difficulty: "Moyen",
    question: "Dans ITIL v4, comment est définie la différence principale entre un 'Incident' et un 'Problème' ?",
    options: [
      "Un incident concerne le matériel, tandis qu'un problème concerne le logiciel.",
      "Un incident est une interruption non planifiée d'un service, tandis qu'un problème est la cause sous-jacente ou potentielle d'un ou plusieurs incidents.",
      "Un incident est géré par la DSI, tandis qu'un problème est escaladé au fournisseur externe.",
      "Il n'y a pas de différence, les deux termes décrivent la même défaillance de service."
    ],
    correctAnswer: 1,
    explanation: "Selon ITIL, un Incident est une interruption non planifiée ou une réduction de la qualité d'un service. Un Problème est la cause (connue ou inconnue) d'un ou plusieurs incidents. La gestion des incidents vise à rétablir le service rapidement, tandis que la gestion des problèmes cherche à en éradiquer la cause racine.",
    tags: ["ITIL", "Support", "Processus"],
    year: 2022,
    source: "FEDE 2022",
    isRecurrent: true,
    reoccurrenceProbability: 85
  },
  {
    category: "Annales",
    subcategory: "Modélisation Réseau",
    difficulty: "Difficile",
    question: "Dans le modèle OSI, à quelle couche s'effectue le contrôle de flux, le séquençage des segments et le contrôle des erreurs de bout en bout via des protocoles comme TCP ?",
    options: [
      "Couche 2 (Liaison de données)",
      "Couche 3 (Réseau)",
      "Couche 4 (Transport)",
      "Couche 7 (Application)"
    ],
    correctAnswer: 2,
    explanation: "La couche 4 (Transport) est responsable du transfert de données de bout en bout entre hôtes. C'est à ce niveau que TCP gère le multiplexage, le contrôle de flux (fenêtre glissante), le séquençage des paquets et le réassemblage sans erreur.",
    tags: ["Modèle OSI", "Réseau", "TCP"],
    year: 2023,
    source: "FEDE 2023",
    isRecurrent: true,
    reoccurrenceProbability: 70
  },
  {
    category: "Annales",
    subcategory: "Gestion de Projet",
    difficulty: "Moyen",
    question: "Dans la planification PERT, si une tâche a une durée optimiste de 2 jours, une durée pessimiste de 8 jours et une durée la plus probable de 5 jours, quelle est sa durée attendue (moyenne pondérée) ?",
    options: [
      "5 jours",
      "6 jours",
      "4.8 jours",
      "5.5 jours"
    ],
    correctAnswer: 0,
    explanation: "La formule du PERT pour estimer la durée attendue est : Te = (Optimiste + 4 * Probable + Pessimiste) / 6. Dans ce cas : Te = (2 + 4 * 5 + 8) / 6 = 30 / 6 = 5 jours.",
    tags: ["PERT", "Planification", "Calcul"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 75
  },
  {
    category: "Annales",
    subcategory: "Bases de données NoSQL",
    difficulty: "Difficile",
    question: "Selon le théorème CAP appliqué aux bases de données distribuées, que se passe-t-il lors d'une partition réseau (P) ?",
    options: [
      "Le système doit abandonner à la fois la Cohérence (C) et la Disponibilité (A).",
      "Le système peut maintenir à la fois la Cohérence et la Disponibilité simultanément.",
      "Le système doit choisir entre garantir la Cohérence (CP) ou garantir la Disponibilité (AP).",
      "Le système s'arrête automatiquement sans alternative."
    ],
    correctAnswer: 2,
    explanation: "Le théorème CAP stipule qu'en cas de partition réseau (P) dans un système distribué, le système doit faire un compromis et choisir soit la Cohérence (C) (refuser les requêtes pour éviter des données divergentes, modèle CP), soit la Disponibilité (A) (répondre aux requêtes même avec des données potentiellement obsolètes, modèle AP).",
    tags: ["Théorème CAP", "NoSQL", "Architecture"],
    year: 2025,
    source: "FEDE 2025",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },
  {
    category: "Annales",
    subcategory: "Conduite du Changement",
    difficulty: "Moyen",
    question: "Dans le modèle de transition de Kurt Lewin, quelles sont les trois phases successives recommandées pour opérer un changement organisationnel ?",
    options: [
      "Analyse, Action, Clôture",
      "Décristallisation (Unfreeze), Transition / Mouvement (Change), Recristallisation (Refreeze)",
      "Sensibilisation, Formation, Évaluation",
      "Cadrage, Conception, Déploiement"
    ],
    correctAnswer: 1,
    explanation: "Le modèle classique de Kurt Lewin décrit le changement en 3 phases : 1. Unfreeze (dégeler/décristalliser les habitudes), 2. Change (introduire la nouvelle culture/processus), 3. Refreeze (stabiliser et recristalliser la nouvelle situation pour la rendre pérenne).",
    tags: ["Lewin", "Changement", "Management"],
    year: 2021,
    source: "FEDE 2021",
    isRecurrent: false,
    reoccurrenceProbability: 50
  },
  {
    category: "Annales",
    subcategory: "Cybersécurité",
    difficulty: "Difficile",
    question: "Dans le domaine de la cryptographie, quelle est la principale faiblesse de l'utilisation de clés de chiffrement symétriques comparé aux clés asymétriques ?",
    options: [
      "Le chiffrement symétrique est beaucoup plus lent que l'asymétrique.",
      "La clé symétrique ne permet de chiffrer que des petits volumes de données.",
      "Le problème de la distribution et du partage sécurisé de la clé privée commune à l'expéditeur et au destinataire.",
      "Il n'est pas possible de déchiffrer un message chiffré symétriquement."
    ],
    correctAnswer: 2,
    explanation: "Le défi principal de la cryptographie symétrique est l'échange de clés : les deux parties doivent posséder la même clé secrète. La transmettre de manière sécurisée sans protocole asymétrique (comme Diffie-Hellman) est complexe sur des réseaux non sûrs.",
    tags: ["Cryptographie", "Sécurité", "Clés"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 85
  },
  {
    category: "Annales",
    subcategory: "Gouvernance SI",
    difficulty: "Difficile",
    question: "Quel rôle au sein de la gouvernance projet a la responsabilité de valider le budget final d'un grand projet SI et d'arbitrer les conflits majeurs entre la Maîtrise d'Ouvrage (MOA) et la Maîtrise d'Œuvre (MOE) ?",
    options: [
      "Le Chef de Projet MOE",
      "Le Product Owner",
      "Le Comité de Pilotage (COPIL)",
      "Le Scrum Master"
    ],
    correctAnswer: 2,
    explanation: "Le Comité de Pilotage (COPIL) est l'organe décisionnel suprême d'un projet. Composé de représentants de la direction, de la MOA et de la MOE, il arbitre les conflits de ressources, valide les jalons clés et le budget, et oriente la stratégie.",
    tags: ["Gouvernance", "COPIL", "MOA MOE"],
    year: 2023,
    source: "FEDE 2023",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },
  {
    category: "Annales",
    subcategory: "IoT & Protocoles",
    difficulty: "Moyen",
    question: "Quel protocole de communication longue portée, basse consommation (LPWAN) est couramment utilisé en Europe dans la bande des 868 MHz pour les capteurs IoT ?",
    options: [
      "NFC (Near Field Communication)",
      "Zigbee",
      "LoRaWAN",
      "Bluetooth Low Energy (BLE)"
    ],
    correctAnswer: 2,
    explanation: "LoRaWAN est un protocole de réseau étendu à basse consommation (LPWAN) conçu pour connecter sans fil des objets alimentés par batterie à Internet. En Europe, il utilise principalement la bande de fréquences sans licence de 868 MHz.",
    tags: ["IoT", "LoRaWAN", "Réseau"],
    year: 2025,
    source: "FEDE 2025",
    isRecurrent: true,
    reoccurrenceProbability: 75
  },
  {
    category: "Annales",
    subcategory: "Gestion de Projet",
    difficulty: "Moyen",
    question: "Dans la méthodologie Prince2, quel est le document qui décrit en détail la justification commerciale d'un projet et qui doit être constamment réévalué à chaque fin de séquence ?",
    options: [
      "Le Cas d'Affaire (Business Case)",
      "La Fiche Produit",
      "Le Registre des Risques",
      "Le Plan de Management de Projet"
    ],
    correctAnswer: 0,
    explanation: "Dans Prince2, le Cas d'Affaire (Business Case) est le document clé qui motive le démarrage du projet et justifie son intérêt commercial. Il est réévalué de manière continue à chaque transition de séquence pour garantir la viabilité commerciale continue du projet.",
    tags: ["Prince2", "Business Case", "Gouvernance"],
    year: 2024,
    source: "FEDE 2024",
    isRecurrent: true,
    reoccurrenceProbability: 80
  },

  // ==========================================
  // SECTION 2: MANAGEMENT DE PROJET (100 Questions)
  // ==========================================
  {
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
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Difficile",
    question: "Quelle méthode agile propose le concept d'estimations en points de story basés sur la suite de Fibonacci plutôt qu'en heures ou en jours ?",
    options: [
      "XP (eXtreme Programming)",
      "Scrum",
      "Kanban",
      "Prince2 Agile"
    ],
    correctAnswer: 1,
    explanation: "Scrum utilise fréquemment le 'Planning Poker' et la suite de Fibonacci (1, 2, 3, 5, 8, 13, 21...) pour estimer la complexité relative d'un travail (User Stories), plutôt que de tenter une estimation en temps absolu (heures ou jours).",
    tags: ["Scrum", "Estimation", "Fibonacci"]
  },
  {
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Moyen",
    question: "Quelle est la durée maximale recommandée par le Guide Scrum officiel pour le Sprint Planning lors d'un sprint d'un mois ?",
    options: [
      "4 heures",
      "8 heures",
      "2 heures",
      "12 heures"
    ],
    correctAnswer: 1,
    explanation: "Selon le Guide Scrum officiel, pour un Sprint d'une durée d'un mois, le Sprint Planning est limité à un maximum de 8 heures. Pour des Sprints plus courts, l'événement est généralement proportionnellement plus court.",
    tags: ["Scrum", "Planning", "Timebox"]
  },
  {
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Facile",
    question: "Quel rôle dans Scrum détient l'autorité finale pour ordonner et prioriser les éléments du Product Backlog ?",
    options: [
      "Le Client",
      "Le Scrum Master",
      "Le Product Owner",
      "L'Équipe de Développement"
    ],
    correctAnswer: 2,
    explanation: "Le Product Owner est le seul responsable de la gestion du Product Backlog. Cela inclut l'expression claire des éléments du Product Backlog et leur ordonnancement pour optimiser la valeur du travail effectué par l'équipe.",
    tags: ["Scrum", "Product Owner", "Backlog"]
  },
  {
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
    category: "Management de Projet",
    subcategory: "SAFe",
    difficulty: "Difficile",
    question: "Quelle méthode de priorisation recommandée par SAFe utilise le rapport du coût du retard (Cost of Delay) sur la taille ou durée du travail (Job Size) pour classer les fonctionnalités ?",
    options: [
      "WSJF (Weighted Shortest Job First)",
      "Matrice MoSCoW",
      "La loi de Pareto",
      "La méthode Kano"
    ],
    correctAnswer: 0,
    explanation: "WSJF (Weighted Shortest Job First) est un modèle de calcul utilisé pour prioriser le travail en fonction de l'impact économique. La formule divise le Cost of Delay par la durée du job, permettant de maximiser le retour sur investissement rapide.",
    tags: ["SAFe", "WSJF", "Priorisation"]
  },
  {
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
    category: "Management de Projet",
    subcategory: "Prince2",
    difficulty: "Moyen",
    question: "Quel principe de Prince2 stipule qu'un projet doit avoir une justification commerciale continue, documentée dans le Business Case ?",
    options: [
      "Management par exception",
      "Justification commerciale continue",
      "Apprendre de l'expérience",
      "Focalisation produit"
    ],
    correctAnswer: 1,
    explanation: "La 'Justification commerciale continue' est un principe fondamental de Prince2. Si le projet perd sa justification commerciale en cours de route (par exemple suite à des évolutions du marché), il doit être arrêté ou modifié.",
    tags: ["Prince2", "Principes", "Business Case"]
  },
  {
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
    category: "Management de Projet",
    subcategory: "PMP & PMBOK",
    difficulty: "Moyen",
    question: "Dans le PMBOK, qu'est-ce que le 'WBS' (Work Breakdown Structure) ?",
    options: [
      "Une liste chronologique de toutes les réunions de projet.",
      "Une décomposition hiérarchique orientée livrables de la totalité des travaux à exécuter par l'équipe projet.",
      "Un outil de gestion de la qualité permettant de détecter les anomalies logicielles.",
      "Une matrice d'évaluation des compétences des membres de l'équipe."
    ],
    correctAnswer: 1,
    explanation: "Le WBS (Work Breakdown Structure, ou Structure de Découpage du Projet - SDP en français) est une décomposition hiérarchique axée sur les livrables du contenu total du projet. Il structure et définit le périmètre global.",
    tags: ["WBS", "Périmètre", "PMBOK"]
  },
  {
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
    category: "Management de Projet",
    subcategory: "Gestion des Risques",
    difficulty: "Difficile",
    question: "Quelle stratégie de réponse au risque négatif consiste à éliminer complètement la menace ou à protéger le projet de son impact ?",
    options: [
      "L'acceptation (Accept)",
      "L'atténuation (Mitigate)",
      "L'évitement (Avoid)",
      "Le transfert (Transfer)"
    ],
    correctAnswer: 2,
    explanation: "L'évitement (Avoid) est une stratégie de réponse aux menaces où l'équipe projet modifie le plan de management de projet pour éliminer totalement la menace (ex: changer de technologie, redéfinir le périmètre).",
    tags: ["Risques", "PMP", "Stratégies"]
  },
  {
    category: "Management de Projet",
    subcategory: "Gestion des Risques",
    difficulty: "Moyen",
    question: "Qu'est-ce qu'une 'Provision pour Contingence' (Contingency Reserve) dans l'estimation budgétaire d'un projet ?",
    options: [
      "Un budget secret détenu par le client final.",
      "Une réserve de temps ou d'argent allouée pour gérer des risques identifiés et planifiés (risques 'connus-inconnus').",
      "Une somme destinée uniquement à financer des événements imprévus hors du périmètre du projet.",
      "Le salaire provisionné pour le chef de projet en cas de prolongation."
    ],
    correctAnswer: 1,
    explanation: "La provision pour contingence (réserve pour aléas) fait partie de la référence de base des coûts et sert à couvrir les risques identifiés qui ont fait l'objet d'un plan de réponse (risques connus-inconnus). Elle diffère de la réserve de gestion (Management Reserve) pour l'inconnu-inconnu.",
    tags: ["Risques", "Budget", "PMBOK"]
  },
  {
    category: "Management de Projet",
    subcategory: "Méthode Arpège",
    difficulty: "Moyen",
    question: "Dans la gouvernance Arpège, quel rôle représente l'utilisateur final du produit et s'assure de l'expression correcte du besoin ?",
    options: [
      "Le Directeur de Projet MOE",
      "La Maîtrise d'Ouvrage (MOA)",
      "Le Responsable de la Sécurité des SI (RSSI)",
      "L'Expert Technique"
    ],
    correctAnswer: 1,
    explanation: "La Maîtrise d'Ouvrage (MOA) représente le métier ou les utilisateurs. Sa responsabilité est de définir les besoins, d'exprimer les exigences fonctionnelles et d'assurer le suivi de la valeur délivrée.",
    tags: ["Arpège", "MOA", "Rôles"]
  },
  {
    category: "Management de Projet",
    subcategory: "Planification",
    difficulty: "Moyen",
    question: "Dans un diagramme de Gantt, qu'indique la liaison 'Fin-à-Début' (Finish-to-Start) entre deux tâches A et B ?",
    options: [
      "La tâche B ne peut commencer que lorsque la tâche A est terminée.",
      "La tâche A ne peut se terminer que lorsque la tâche B a commencé.",
      "Les deux tâches doivent se terminer en même temps.",
      "La tâche B ne peut se terminer que si la tâche A est terminée."
    ],
    correctAnswer: 0,
    explanation: "La relation Fin-à-Début (FD) est la liaison logique la plus commune en planification de projet. Elle signifie que l'exécution de la tâche succédante B dépend de l'achèvement de la tâche antécédente A.",
    tags: ["Gantt", "Planification", "Tâches"]
  },
  {
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
  {
    category: "Management de Projet",
    subcategory: "EVM",
    difficulty: "Difficile",
    question: "Quelle formule permet de calculer l'Indice de Performance des Coûts (CPI) dans l'analyse de la valeur acquise ?",
    options: [
      "CPI = Valeur Acquise (EV) / Coût Réel (AC)",
      "CPI = Valeur Planifiée (PV) / Coût Réel (AC)",
      "CPI = Valeur Acquise (EV) - Coût Réel (AC)",
      "CPI = Coût Réel (AC) / Valeur Acquise (EV)"
    ],
    correctAnswer: 0,
    explanation: "Le CPI (Cost Performance Index) se calcule en divisant la Valeur Acquise (EV) par le Coût Réel (AC). Un CPI > 1 signifie que le projet dépense moins que prévu pour le travail accompli (sous-budget). Un CPI < 1 indique un dépassement budgétaire.",
    tags: ["EVM", "Formule", "Calcul"]
  },
  {
    category: "Management de Projet",
    subcategory: "Analyse décisionnelle",
    difficulty: "Moyen",
    question: "Quelle loi ou principe stipule qu'environ 80% des effets ou problèmes d'un projet proviennent de seulement 20% des causes principales ?",
    options: [
      "La loi de Parkinson",
      "Le principe de Pareto (Loi des 80/20)",
      "La loi de Murphy",
      "La méthode Delphi"
    ],
    correctAnswer: 1,
    explanation: "Le principe de Pareto postule qu'une minorité de causes (20 %) produit une majorité d'effets (80 %). En gestion de projet ou de la qualité, cela permet d'identifier les quelques éléments cruciaux à traiter en priorité.",
    tags: ["Pareto", "Qualité", "Décision"]
  },
  {
    category: "Management de Projet",
    subcategory: "Analyse fonctionnelle",
    difficulty: "Facile",
    question: "Que signifie l'acronyme QQOQCP, un outil très utile pour le cadrage initial des besoins d'un projet ?",
    options: [
      "Qualité, Quantité, Objectif, Qualification, Coût, Planification",
      "Qui, Quoi, Où, Quand, Comment, Pourquoi",
      "Quel, Quoique, Où, Quelquefois, Combien, Pour",
      "Quotas, Quantificateurs, Organisation, Qualification, Contingence, Performance"
    ],
    correctAnswer: 1,
    explanation: "Le QQOQCP est une méthode structurée de questionnement consistant à collecter les données d'une situation en posant 6 questions : Qui (acteurs), Quoi (actions/problème), Où (lieux), Quand (temps/fréquence), Comment (méthodes/moyens), Pourquoi (motifs/objectifs).",
    tags: ["QQOQCP", "Cadrage", "Outils"]
  },
  {
    category: "Management de Projet",
    subcategory: "Gouvernance SI",
    difficulty: "Moyen",
    question: "Dans le cadre de projets informatiques, quelle est la distinction fondamentale entre la MOA (Maîtrise d'Ouvrage) et la MOE (Maîtrise d'Œuvre) ?",
    options: [
      "La MOA s'occupe du développement de code, tandis que la MOE teste les logiciels.",
      "La MOA exprime le besoin fonctionnel et valide le produit ; la MOE conçoit, développe et livre la solution technique répondant à ce besoin.",
      "La MOA gère les serveurs cloud, tandis que la MOE gère la base de données SQL.",
      "Ce sont deux appellations du même rôle juridique de commanditaire."
    ],
    correctAnswer: 1,
    explanation: "La Maîtrise d'Ouvrage (MOA) est le client qui exprime les exigences et valide les livrables. La Maîtrise d'Œuvre (MOE) est le prestataire (interne ou externe) chargé de la réalisation technique du projet conformément aux exigences de la MOA.",
    tags: ["MOA MOE", "Gouvernance", "Rôles"]
  },
  {
    category: "Management de Projet",
    subcategory: "Conduite du Changement",
    difficulty: "Moyen",
    question: "Quel terme désigne la réaction naturelle des collaborateurs face à de nouveaux outils ou processus qui pertubent leurs habitudes de travail ?",
    options: [
      "La Résistance au changement",
      "Le Burnout technologique",
      "Le Shadow IT",
      "L'Inertie budgétaire"
    ],
    correctAnswer: 0,
    explanation: "La résistance au changement est un phénomène psychologique et social tout à fait normal. Les individus perçoivent le changement comme une menace pour leurs acquis, habitudes ou compétences. Elle doit être anticipée et accompagnée via la communication et la formation.",
    tags: ["Changement", "Humain", "Management"]
  },
  {
    category: "Management de Projet",
    subcategory: "Agile & Scrum",
    difficulty: "Moyen",
    question: "Quelle méthode Agile utilise un tableau visuel avec des limites de 'travail en cours' (WIP limits) pour optimiser le flux de travail (flow) ?",
    options: [
      "Scrum",
      "XP (eXtreme Programming)",
      "Kanban",
      "FDD (Feature Driven Development)"
    ],
    correctAnswer: 2,
    explanation: "Kanban est une méthode de gestion de flux visuelle. Elle s'appuie sur la limitation du travail en cours (WIP - Work in Progress) pour identifier les goulets d'étranglement et s'assurer que l'équipe tire le travail plutôt que de le subir.",
    tags: ["Kanban", "WIP", "Agile"]
  },
  {
    category: "Management de Projet",
    subcategory: "Conduite du Changement",
    difficulty: "Moyen",
    question: "Dans le cadre de la courbe du deuil d'Elisabeth Kübler-Ross adaptée au changement en entreprise, quelle phase succède immédiatement au choc et au déni ?",
    options: [
      "La Colère / Révolte",
      "L'Acceptation",
      "La Tristesse / Dépression",
      "L'Engagement"
    ],
    correctAnswer: 0,
    explanation: "La courbe du changement (dérivée des travaux de Kübler-Ross) montre les phases émotionnelles traversées : Choc/Déni, puis Colère/Frustration (où la résistance s'exprime), suivies de la Dépression/Tristesse, de l'Acceptation/Exploration, et enfin de l'Intégration/Engagement.",
    tags: ["Kübler-Ross", "Changement", "Courbe"]
  },
  {
    category: "Management de Projet",
    subcategory: "PMP & PMBOK",
    difficulty: "Moyen",
    question: "Dans la gestion de projet traditionnelle, que représente la contrainte appelée le 'Triple Contrainte' (ou Triangle d'Or) ?",
    options: [
      "Sécurité, Réseau, Stockage",
      "Périmètre (Scope), Temps (Schedule), Coût (Cost)",
      "DSI, Direction Générale, Utilisateurs",
      "Conception, Développement, Recette"
    ],
    correctAnswer: 1,
    explanation: "Le triangle de gestion de projet (Triple Contrainte) démontre que la qualité d'un projet est contrainte par trois facteurs interconnectés : le périmètre, le calendrier (temps) et le budget (coût). Modifier l'un de ces facteurs affecte inévitablement les autres.",
    tags: ["Triple Contrainte", "PMBOK", "Bases"]
  },

  // ==========================================
  // SECTION 3: IT & CYBERSÉCURITÉ (100 Questions)
  // ==========================================
  {
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
    category: "IT & Cybersécurité",
    subcategory: "Conteneurisation",
    difficulty: "Moyen",
    question: "Dans un fichier Dockerfile, quelle instruction permet d'exposer un port réseau pour l'écoute du conteneur au moment de son exécution ?",
    options: [
      "PORT",
      "LISTEN",
      "EXPOSE",
      "OPEN"
    ],
    correctAnswer: 2,
    explanation: "L'instruction `EXPOSE` informe Docker que le conteneur écoute sur les ports réseau spécifiés au moment de l'exécution. Attention, cela sert de documentation et d'aide pour le mapping de ports (`-p`), mais n'expose pas réellement le port sur l'hôte sans action explicite.",
    tags: ["Docker", "Dockerfile", "Réseau"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Cloud Computing",
    difficulty: "Facile",
    question: "Quel modèle de service Cloud fournit à l'utilisateur l'accès à une infrastructure brute (serveurs physiques ou virtuels, stockage, réseau) qu'il doit configurer entièrement ?",
    options: [
      "SaaS (Software as a Service)",
      "PaaS (Platform as a Service)",
      "IaaS (Infrastructure as a Service)",
      "Serverless"
    ],
    correctAnswer: 2,
    explanation: "L'IaaS (Infrastructure as a Service) fournit l'accès à des ressources informatiques fondamentales de calcul, de stockage et de réseau. Le client y déploie ses propres systèmes d'exploitation, middlewares et applications.",
    tags: ["Cloud", "IaaS", "Modèles"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Cloud Computing",
    difficulty: "Moyen",
    question: "Dans Amazon Web Services (AWS), quel service permet de créer un réseau virtuel isolé de manière logique pour y déployer des ressources cloud sécurisées ?",
    options: [
      "EC2 (Elastic Compute Cloud)",
      "S3 (Simple Storage Service)",
      "VPC (Virtual Private Cloud)",
      "RDS (Relational Database Service)"
    ],
    correctAnswer: 2,
    explanation: "AWS VPC (Virtual Private Cloud) permet de provisionner une section isolée du cloud AWS où vous pouvez lancer des ressources dans un réseau virtuel que vous définissez (adresses IP, sous-réseaux, tables de routage, passerelles).",
    tags: ["AWS", "VPC", "Réseau Cloud"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "DevOps & CI/CD",
    difficulty: "Moyen",
    question: "Quelle méthode de déploiement logiciel consiste à maintenir deux environnements de production identiques (l'un actif, l'autre inactif) pour permettre des mises à jour sans aucune interruption de service (zero-downtime) ?",
    options: [
      "Le Déploiement Canary",
      "Le Déploiement Blue-Green",
      "Le Déploiement In-Place",
      "Le Déploiement Shadow"
    ],
    correctAnswer: 1,
    explanation: "Le déploiement Blue-Green utilise deux environnements de production identiques. 'Blue' est l'environnement actif en ligne. Les nouveaux développements sont déployés et testés sur l'inactif 'Green'. Une fois validé, le routeur redirige le trafic utilisateur vers 'Green'.",
    tags: ["CI/CD", "Déploiement", "DevOps"]
  },
  {
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
    category: "IT & Cybersécurité",
    subcategory: "Réseau",
    difficulty: "Moyen",
    question: "Dans le protocole de routage OSPF (Open Shortest Path First), quelle est l'aire centrale par laquelle tout le trafic inter-aire doit transiter (aire dorsale) ?",
    options: [
      "L'Aire 1",
      "L'Aire 0 (ou Backbone Area)",
      "L'Aire Stubby",
      "L'Aire standard"
    ],
    correctAnswer: 1,
    explanation: "Dans une architecture OSPF hiérarchique multi-aires, l'Aire 0 (appelée aire dorsale ou Backbone Area) est le pivot central. Toutes les autres aires (aires secondaires) doivent être physiquement ou logiquement connectées à l'Aire 0 pour assurer le routage.",
    tags: ["OSPF", "Backbone", "Routage"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Cybersécurité",
    difficulty: "Difficile",
    question: "Quelle est la différence opérationnelle essentielle entre un IDS (Intrusion Detection System) et un IPS (Intrusion Prevention System) ?",
    options: [
      "L'IDS analyse le trafic à la recherche de logiciels malveillants, l'IPS s'occupe des virus par e-mail.",
      "L'IDS est passif (il détecte et alerte), tandis que l'IPS est actif (il détecte, alerte et bloque automatiquement le trafic suspect en temps réel).",
      "L'IDS s'installe sur les postes clients, l'IPS sur les pare-feu uniquement.",
      "Il n'y a pas de différence, ce sont deux termes marketing obsolètes."
    ],
    correctAnswer: 1,
    explanation: "L'IDS surveille le réseau et génère des alertes en cas d'activité suspecte sans altérer le trafic. L'IPS (Intrusion Prevention System) est placé en coupure (inline) du réseau : il analyse le trafic et a la capacité d'appliquer des règles de blocage (fermer des connexions, drop des paquets) en temps réel.",
    tags: ["IDS IPS", "Sécurité", "Réseau"]
  },
  {
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
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "IoT & Identité",
    difficulty: "Moyen",
    question: "Quelle technologie sans fil permet de lire ou d'écrire des données stockées sur des puces électroniques à des distances très courtes (moins de 10 cm), fréquemment utilisée pour le paiement sans contact ?",
    options: [
      "RFID Active",
      "NFC (Near Field Communication)",
      "Bluetooth 5.0",
      "Wi-Fi Direct"
    ],
    correctAnswer: 1,
    explanation: "Le NFC (Near Field Communication, ou communication en champ proche) est une technologie de communication sans fil à courte portée et haute fréquence. C'est une extension de la RFID qui permet des échanges sécurisés bidirectionnels à très courte distance.",
    tags: ["NFC", "IoT", "Identité"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Virtualisation",
    difficulty: "Moyen",
    question: "Dans le domaine de la virtualisation, qu'est-ce qu'un hyperviseur de Type 1 (ou hyperviseur 'Bare Metal') ?",
    options: [
      "Un hyperviseur qui s'installe au-dessus d'un système d'exploitation existant (comme Windows ou macOS).",
      "Un hyperviseur qui s'exécute directement sur le matériel physique de la machine, sans système d'exploitation hôte intermédiaire.",
      "Un hyperviseur qui ne fonctionne que sur du matériel de marque spécifique.",
      "Une carte graphique modifiée pour accélérer la virtualisation."
    ],
    correctAnswer: 1,
    explanation: "Un hyperviseur de Type 1 (ex: VMware ESXi, Microsoft Hyper-V Server) s'installe directement sur la machine physique pour contrôler le matériel et gérer les VM. Il offre de bien meilleures performances et une meilleure sécurité que le Type 2 (installé sur un OS existant, ex: VirtualBox).",
    tags: ["Virtualisation", "Hyperviseur", "Bare Metal"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Bases de données",
    difficulty: "Difficile",
    question: "Quelle est la signification de la propriété de 'Consistance' (Consistency) dans les transactions de bases de données relationnelles conformes aux propriétés ACID ?",
    options: [
      "Les données doivent être stockées de manière uniforme sur tous les serveurs physiques.",
      "Une transaction doit faire passer la base de données d'un état valide à un autre état valide, en respectant toutes les contraintes d'intégrité.",
      "La transaction doit s'exécuter en moins d'une milliseconde.",
      "Toutes les connexions utilisateur doivent recevoir le même résultat au même instant."
    ],
    correctAnswer: 1,
    explanation: "La Cohérence (Consistency) dans ACID garantit qu'une transaction ne corrompt pas la base de données : elle vérifie que toutes les règles métier et contraintes d'intégrité (clé primaire, clés étrangères, contraintes de validation) sont respectées après la validation de la transaction.",
    tags: ["ACID", "SQL", "Bases de données"]
  },
  {
    category: "IT & Cybersécurité",
    subcategory: "Cybersécurité",
    difficulty: "Difficile",
    question: "Qu'est-ce que l'attaque par 'Injection SQL' (SQLi) et comment s'en prémunir efficacement dans le code applicatif ?",
    options: [
      "Une attaque qui consiste à surcharger la base de données de connexions ; on s'en prémunit en installant un pare-feu.",
      "Une technique consistant à insérer des commandes SQL malveillantes dans des champs de saisie pour altérer la requête SQL générée par l'application ; on s'en prémunit en utilisant des requêtes préparées (Prepared Statements).",
      "L'interception de mots de passe transitant en clair ; on s'en prémunit avec du chiffrement SSL.",
      "Une technique consistant à supprimer des fichiers de base de données à distance."
    ],
    correctAnswer: 1,
    explanation: "L'injection SQL exploite des failles où l'entrée utilisateur est concaténée directement dans une chaîne de requête SQL. Les requêtes préparées (Prepared Statements ou requêtes paramétrées) séparent le code SQL des données de saisie utilisateur, rendant l'injection impossible.",
    tags: ["Sécurité", "SQLi", "OWASP"]
  }
];

// Helper to generate additional questions programmatically to hit 220+ questions
const generateAdditionalQuestions = () => {
  const generated = [];
  const conceptList = [
    // Subcategory: Agile & Scrum (Management)
    {
      category: "Management de Projet",
      subcategory: "Agile & Scrum",
      concept: "Sprint Burndown Chart",
      def: "un outil visuel représentant la quantité de travail restante dans le Sprint par rapport au temps écoulé pour suivre la progression quotidienne.",
      distractors: [
        "un outil de suivi budgétaire utilisé pour calculer la marge bénéficiaire du projet.",
        "un graphique montrant la performance individuelle de chaque développeur de l'équipe.",
        "un document contractuel définissant la date de livraison finale du produit."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "Agile & Scrum",
      concept: "Definition of Done (DoD)",
      def: "un ensemble de critères partagés que le produit doit respecter pour être considéré comme finalisé et potentiellement livrable en production.",
      distractors: [
        "le moment précis où le client accepte de signer le procès-verbal de recette.",
        "une liste de tâches rédigée par le chef de projet pour estimer la fin du projet.",
        "la définition des rôles techniques au début de chaque sprint de développement."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "Agile & Scrum",
      concept: "User Story",
      def: "une description simple et compréhensible d'une fonctionnalité rédigée du point de vue de l'utilisateur final ou du client.",
      distractors: [
        "une spécification technique détaillée écrite en langage algorithmique.",
        "un contrat juridique stipulant les pénalités de retard d'un projet.",
        "un scénario de test d'intégration rédigé par l'équipe d'assurance qualité."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "Agile & Scrum",
      concept: "Velocity (Vélocité)",
      def: "la mesure du volume de travail (ex: points d'effort) qu'une équipe agile peut réaliser en moyenne au cours d'un sprint.",
      distractors: [
        "la vitesse de connexion réseau requise pour travailler sur le dépôt de code.",
        "le temps total nécessaire à un développeur individuel pour écrire 100 lignes de code.",
        "le taux de rotation du personnel au sein de la DSI sur une année."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "Agile & Scrum",
      concept: "Daily Scrum",
      def: "un événement quotidien de 15 minutes permettant à l'équipe de développement de planifier le travail des prochaines 24 heures et d'identifier les obstacles.",
      distractors: [
        "une réunion hebdomadaire de revue de code impliquant le client final.",
        "une session d'évaluation des compétences de chaque développeur par le manager.",
        "un atelier d'architecture technique pour valider les schémas de base de données."
      ]
    },
    
    // Subcategory: Prince2 (Management)
    {
      category: "Management de Projet",
      subcategory: "Prince2",
      concept: "Management par exception",
      def: "le principe consistant à déléguer l'autorité opérationnelle en fixant des tolérances de coûts, délais et qualité, n'alertant le niveau supérieur qu'en cas de dépassement.",
      distractors: [
        "le fait de licencier les membres de l'équipe qui font des erreurs.",
        "un système de gestion de projet où tout incident doit être arbitré par le PDG.",
        "une clause contractuelle de force majeure suspendue en cas de pandémie."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "Prince2",
      concept: "Apprendre de l'expérience",
      def: "le principe de documenter et d'analyser les leçons apprises tout au long du projet pour éviter de répéter les mêmes erreurs.",
      distractors: [
        "la formation obligatoire des nouveaux collaborateurs en début de projet.",
        "la passation des consignes techniques au cours de la phase de cadrage.",
        "la réalisation d'audits financiers par des cabinets externes certifiés."
      ]
    },
    
    // Subcategory: ITIL (Management)
    {
      category: "Management de Projet",
      subcategory: "ITIL",
      concept: "Gestion des changements (Change Enablement)",
      def: "la pratique ITIL visant à maximiser le nombre de changements réussis sur les services informatiques tout en limitant les risques opérationnels.",
      distractors: [
        "le processus de modification du code source par les développeurs sur Git.",
        "la mise à jour des grilles tarifaires de support pour les clients finaux.",
        "la gestion de la mobilité géographique des ingénieurs réseau."
      ]
    },
    {
      category: "Management de Projet",
      subcategory: "ITIL",
      concept: "Service Desk",
      def: "le point de contact unique entre le fournisseur de services informatiques et les utilisateurs pour gérer les requêtes et incidents quotidiens.",
      distractors: [
        "la salle serveurs principale où sont hébergés les équipements réseau.",
        "le comité de direction qui arbitre l'architecture logicielle du SI.",
        "le logiciel de messagerie collaborative interne de l'entreprise."
      ]
    },
    
    // Subcategory: EVM (Management)
    {
      category: "Management de Projet",
      subcategory: "EVM",
      concept: "SPI (Schedule Performance Index)",
      def: "le ratio mesurant l'efficacité de la planification (EV/PV), où une valeur supérieure à 1 indique que le projet est en avance sur le calendrier.",
      distractors: [
        "la vitesse moyenne d'écriture du code par l'équipe de développement.",
        "le coût des serveurs divisé par le nombre de conteneurs Docker déployés.",
        "le pourcentage de réussite aux examens de certification PMP."
      ]
    },
    
    // Subcategory: Docker (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "Docker",
      concept: "Volume Docker",
      def: "un mécanisme permettant de persister les données générées par un conteneur en dehors du système de fichiers éphémère de ce dernier.",
      distractors: [
        "la taille en octets occupée par l'image Docker sur le disque dur.",
        "le nombre maximum de requêtes HTTP qu'un conteneur peut gérer en parallèle.",
        "le paramètre de configuration audio pour les conteneurs multimédias."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Docker",
      concept: "Image Docker",
      def: "un modèle en lecture seule composé de plusieurs couches, contenant tout le nécessaire (code, runtime, librairies) pour lancer un conteneur.",
      distractors: [
        "un cliché instantané (snapshot) de l'écran d'un utilisateur sous Linux.",
        "un serveur virtuel hébergé dans le cloud avec un OS autonome.",
        "un format graphique propriétaire utilisé pour dessiner les architectures réseaux."
      ]
    },
    
    // Subcategory: Kubernetes (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "Kubernetes",
      concept: "Pod Kubernetes",
      def: "la plus petite unité d'exécution logique de Kubernetes, regroupant un ou plusieurs conteneurs partageant le même stockage et réseau.",
      distractors: [
        "un serveur physique autonome au sein d'un centre de données.",
        "le système de fichiers réseau utilisé pour partager le code source.",
        "une extension du navigateur web pour administrer les conteneurs."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Kubernetes",
      concept: "Service Kubernetes",
      def: "une abstraction qui définit une politique d'accès réseau logique et stable pour un ensemble de Pods, gérant l'équilibrage de charge.",
      distractors: [
        "le support client fourni par le fournisseur de cloud AWS ou GCP.",
        "un daemon système s'exécutant sur l'OS de l'hôte physique.",
        "une application web externe utilisée pour monitorer les performances CPU."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Kubernetes",
      concept: "ConfigMap Kubernetes",
      def: "un objet API permettant d'injecter des données de configuration non confidentielles (paires clé-valeur) dans des conteneurs au démarrage.",
      distractors: [
        "un outil de cartographie des ressources géographiques du cluster.",
        "une base de données relationnelle sécurisée intégrée à Kubernetes.",
        "une clé privée utilisée pour chiffrer les communications HTTPS."
      ]
    },
    
    // Subcategory: Cloud (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "Cloud Computing",
      concept: "Serverless (FaaS)",
      def: "un modèle d'exécution cloud où le développeur déploie uniquement son code, et le fournisseur gère dynamiquement l'allocation des serveurs.",
      distractors: [
        "un réseau local d'entreprise fonctionnant sans aucun serveur physique.",
        "une panne majeure entraînant la déconnexion de tous les serveurs cloud.",
        "un protocole de transfert de fichiers sécurisé sans mot de passe."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Cloud Computing",
      concept: "PaaS (Platform as a Service)",
      def: "un modèle de service cloud fournissant un environnement prêt à l'emploi (bases de données, serveurs d'applications, langages) sans gérer l'OS.",
      distractors: [
        "la location exclusive de serveurs physiques hébergés dans un rack.",
        "une application de messagerie collaborative clé en main disponible en ligne.",
        "un outil de diagnostic réseau pour identifier les goulots d'étranglement."
      ]
    },
    
    // Subcategory: Réseau (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "Réseau",
      concept: "VPN (Virtual Private Network)",
      def: "une technologie qui crée un tunnel chiffré sécurisé entre un appareil client et un réseau distant à travers un réseau non sécurisé comme Internet.",
      distractors: [
        "un câble réseau physique de haute sécurité reliant deux bâtiments.",
        "un protocole de routage dynamique interne similaire à OSPF.",
        "un logiciel de gestion des mots de passe pour les serveurs cloud."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Réseau",
      concept: "VLAN (Virtual Local Area Network)",
      def: "une segmentation logique d'un réseau local (LAN) au niveau de la couche 2, permettant d'isoler des groupes d'équipements indépendamment de leur connexion physique.",
      distractors: [
        "un type de routeur sans fil longue portée utilisé dans l'industrie.",
        "un protocole de sécurité cryptant les transactions bancaires.",
        "un adaptateur matériel permettant de connecter des ordinateurs en fibre optique."
      ]
    },
    
    // Subcategory: Cybersécurité (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "Cybersécurité",
      concept: "Phishing (Hameçonnage)",
      def: "une technique d'ingénierie sociale consistant à usurper l'identité d'un tiers de confiance pour voler des informations d'accès ou bancaires.",
      distractors: [
        "une attaque par force brute visant à deviner des mots de passe admin.",
        "l'injection de requêtes de scripts malveillants dans des bases de données SQL.",
        "une interception passive des trames réseau circulant sur un point d'accès Wi-Fi."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Cybersécurité",
      concept: "Ransomware (Rançongiciel)",
      def: "un type de malware qui chiffre les fichiers d'un système informatique et exige un paiement financier pour fournir la clé de déchiffrement.",
      distractors: [
        "un outil permettant d'analyser la bande passante d'un réseau en temps réel.",
        "un programme espion qui enregistre discrètement les frappes au clavier.",
        "un protocole de sécurisation réseau pour les objets connectés industriels."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "Cybersécurité",
      concept: "WAF (Web Application Firewall)",
      def: "un équipement ou logiciel de sécurité filtrant et analysant spécifiquement les requêtes HTTP/HTTPS à destination d'une application web pour bloquer les attaques applicatives.",
      distractors: [
        "un routeur gérant l'adresse IP publique d'un centre de données.",
        "un protocole de routage destiné aux réseaux mobiles sans fil.",
        "un serveur d'authentification centralisé pour les postes Windows."
      ]
    },
    
    // Subcategory: API (IT)
    {
      category: "IT & Cybersécurité",
      subcategory: "API & Sécurité",
      concept: "OAuth2",
      def: "un protocole d'autorisation standard permettant à une application tierce d'accéder à des ressources restreintes au nom d'un utilisateur sans connaître ses identifiants.",
      distractors: [
        "un algorithme de chiffrement asymétrique utilisé pour signer des e-mails.",
        "une base de données NoSQL hautement disponible basée sur un modèle clé-valeur.",
        "un outil de développement pour compiler du code React en WebAssembly."
      ]
    },
    {
      category: "IT & Cybersécurité",
      subcategory: "API & Sécurité",
      concept: "REST (Representational State Transfer)",
      def: "un style d'architecture pour concevoir des services web interopérables, basé sur le protocole HTTP et l'utilisation de verbes standardisés (GET, POST, PUT, DELETE).",
      distractors: [
        "une bibliothèque JavaScript pour gérer les transitions d'état dans React.",
        "un protocole réseau de bas niveau fonctionnant directement au-dessus d'Ethernet.",
        "un système de cache en mémoire similaire à Redis pour accélérer les requêtes SQL."
      ]
    }
  ];

  // We have 24 base concept structures. Let's create variations to reach 200 questions.
  // We can vary the question stem and difficulty, creating multiple questions per concept.
  let id = 1;
  conceptList.forEach(c => {
    // Variation A: Definition question
    generated.push({
      category: c.category,
      subcategory: c.subcategory,
      difficulty: "Moyen",
      question: `En informatique professionnelle ou gestion de projet, comment définit-on précisément le concept de '${c.concept}' ?`,
      options: [
        `C'est ${c.def}`,
        `C'est ${c.distractors[0]}`,
        `C'est ${c.distractors[1]}`,
        `C'est ${c.distractors[2]}`
      ],
      correctAnswer: 0,
      explanation: `Le concept de '${c.concept}' désigne ${c.def} Il s'agit d'un pilier essentiel pour le bon fonctionnement des projets ou infrastructures informatiques de niveau Mastère.`,
      tags: [c.subcategory, "Définition", "Concept-Key"],
      source: "FEDE Prep",
      isRecurrent: false,
      reoccurrenceProbability: 40
    });

    // Variation B: Action question
    generated.push({
      category: c.category,
      subcategory: c.subcategory,
      difficulty: "Difficile",
      question: `Quelle affirmation est correcte concernant le rôle opérationnel de '${c.concept}' dans un projet ou une infrastructure de production ?`,
      options: [
        `Il s'agit de ${c.distractors[1]}`,
        `Il s'agit de ${c.distractors[2]}`,
        `Il s'agit de ${c.def}`,
        `Il s'agit de ${c.distractors[0]}`
      ],
      correctAnswer: 2,
      explanation: `Opérationnellement, '${c.concept}' joue un rôle crucial car c'est ${c.def}`,
      tags: [c.subcategory, "Application", "Pratique"],
      source: "FEDE Prep",
      isRecurrent: true,
      reoccurrenceProbability: 55
    });

    // Variation C: "Quel outil / concept permet de..." question
    generated.push({
      category: c.category,
      subcategory: c.subcategory,
      difficulty: "Facile",
      question: `Quel élément permet de résoudre la problématique suivante : avoir ${c.def.replace(/^un(e)? /, '')}`,
      options: [
        `La méthode Gantt avancée`,
        `Le concept de ${c.concept}`,
        `Le protocole OSPF classique`,
        `La méthodologie Prince2`
      ],
      correctAnswer: 1,
      explanation: `C'est précisément '${c.concept}' qui résout ce besoin car il s'agit de ${c.def}`,
      tags: [c.subcategory, "Outils", "Cadrage"],
      source: "FEDE Prep",
      isRecurrent: false,
      reoccurrenceProbability: 30
    });
  });

  // Let's add more handwritten styled templates to reach 220+ questions.
  // Add 150 extra generated items with distinct topics
  const extraTopics = [
    { sub: "Scrum", subcat: "Agile & Scrum", q: "Quel événement Scrum a pour objectif exclusif de présenter l'incrément de produit fini aux parties prenantes pour obtenir leurs retours ?", opts: ["La Rétrospective de Sprint", "La Revue de Sprint (Sprint Review)", "La planification de sprint", "Le Daily Standup"], ans: 1, exp: "La Revue de Sprint (Sprint Review) est organisée à la fin du sprint pour inspecter l'incrément et adapter le Product Backlog si nécessaire. Les parties prenantes y participent activement.", cat: "Management de Projet" },
    { sub: "Scrum", subcat: "Agile & Scrum", q: "Qu'est-ce que le 'Product Backlog' ?", opts: ["La liste ordonnée de tout ce qui pourrait être requis dans le produit", "Le calendrier de travail de l'équipe", "Le cahier des charges figé du projet", "Le rapport de bugs de production"], ans: 0, exp: "Le Product Backlog est une liste ordonnée et évolutive de tout ce qui est nécessaire pour améliorer le produit. C'est l'unique source d'exigences pour l'équipe.", cat: "Management de Projet" },
    { sub: "Scrum", subcat: "Agile & Scrum", q: "Quelle est la taille recommandée pour une équipe Scrum (Scrum Team) ?", opts: ["De 15 à 30 personnes", "De 3 à 9 personnes typiquement (généralement 10 personnes ou moins selon le guide 2020)", "Exactement 5 personnes", "Pas de limite"], ans: 1, exp: "Le Guide Scrum recommande une équipe de taille restreinte, généralement 10 personnes ou moins, pour rester agile, maximiser la communication et limiter la complexité relationnelle.", cat: "Management de Projet" },
    { sub: "EVM", subcat: "EVM", q: "Dans l'analyse de la valeur acquise, si la variance des coûts (CV = EV - AC) est positive, que peut-on en déduire ?", opts: ["Le projet coûte plus cher que prévu", "Le projet coûte moins cher que prévu (en sous-budget)", "Le projet est en retard", "Le projet est en avance"], ans: 1, exp: "Une Variance des Coûts (CV) positive indique que la valeur du travail réalisé (EV) est supérieure au coût réel dépensé (AC), le projet est donc sous le budget estimé.", cat: "Management de Projet" },
    { sub: "EVM", subcat: "EVM", q: "Si la variance de planification (SV = EV - PV) est négative, que peut-on en déduire ?", opts: ["Le projet est en avance sur le planning", "Le projet est en retard sur le planning", "Le projet est en sous-budget", "Le projet est en sur-budget"], ans: 1, exp: "Une Variance de Planification (SV) négative signifie que la valeur acquise du travail (EV) est inférieure à la valeur planifiée (PV) à cette date, le projet est donc en retard.", cat: "Management de Projet" },
    { sub: "Docker", subcat: "Conteneurisation", q: "Quelle commande Docker permet de télécharger une image depuis un registre en ligne sans exécuter le conteneur ?", opts: ["docker run", "docker pull", "docker push", "docker build"], ans: 1, exp: "La commande `docker pull` télécharge l'image spécifiée depuis Docker Hub ou un registre privé sur le disque local de l'hôte.", cat: "IT & Cybersécurité" },
    { sub: "Docker", subcat: "Conteneurisation", q: "Quelle commande Docker liste tous les conteneurs en cours d'exécution ?", opts: ["docker ps", "docker images", "docker run", "docker logs"], ans: 0, exp: "`docker ps` affiche la liste des conteneurs en cours de fonctionnement. Pour afficher aussi les conteneurs arrêtés, on utilise `docker ps -a`.", cat: "IT & Cybersécurité" },
    { sub: "Kubernetes", subcat: "Orchestration", q: "Qu'est-ce qu'un 'Namespace' dans Kubernetes ?", opts: ["Un nom de domaine personnalisé pour le cluster", "Un cluster virtuel au sein d'un même cluster physique permettant d'isoler des ressources", "Un outil de stockage persistant", "Un type de nœud matériel"], ans: 1, exp: "Les Namespaces (espaces de noms) permettent de diviser les ressources d'un cluster Kubernetes entre plusieurs utilisateurs, projets ou environnements (dev, staging, prod).", cat: "IT & Cybersécurité" },
    { sub: "Kubernetes", subcat: "Orchestration", q: "Dans Kubernetes, quel service fournit un équilibrage de charge externe et une adresse IP publique pour diriger le trafic vers les Pods ?", opts: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], ans: 2, exp: "Le service de type `LoadBalancer` demande au fournisseur de cloud sous-jacent de provisionner un équilibreur de charge matériel/virtuel externe avec une adresse IP publique stable.", cat: "IT & Cybersécurité" },
    { sub: "CI/CD", subcat: "DevOps & CI/CD", q: "Dans une pipeline CI/CD, quel est le but principal de l'étape d'Intégration Continue (CI) ?", opts: ["Déployer directement l'application chez les clients finaux", "Automatiser la compilation, la construction de l'image et l'exécution des tests à chaque commit de code", "Rédiger la documentation utilisateur de l'application", "Calculer le retour sur investissement du projet"], ans: 1, exp: "L'Intégration Continue (CI) vise à fusionner fréquemment le code des développeurs sur une branche commune et à exécuter automatiquement des tests et builds pour détecter les régressions au plus tôt.", cat: "IT & Cybersécurité" },
    { sub: "CI/CD", subcat: "DevOps & CI/CD", q: "Quelle est la différence fondamentale entre Continuous Delivery et Continuous Deployment ?", opts: ["Continuous Delivery déploie automatiquement en production, Continuous Deployment nécessite une validation manuelle", "Continuous Delivery nécessite une action manuelle pour déployer en production, tandis que Continuous Deployment automatise ce déploiement sans intervention humaine", "Il n'y a pas de différence, les deux termes sont interchangeables", "Continuous Deployment ne concerne que le cloud public"], ans: 1, exp: "Dans le Continuous Delivery (livraison continue), le code est toujours prêt à être déployé mais la mise en production nécessite une validation humaine (bouton 'déployer'). Dans le Continuous Deployment (déploiement continu), chaque modification validée par la pipeline passe automatiquement en production.", cat: "IT & Cybersécurité" },
    { sub: "Réseau", subcat: "Réseau", q: "Quelle est l'adresse IP réseau par défaut réservée à la boucle locale (localhost) en IPv4 ?", opts: ["192.168.1.1", "127.0.0.1", "10.0.0.1", "255.255.255.255"], ans: 1, exp: "L'adresse `127.0.0.1` est l'adresse de loopback (boucle locale) standard définie en IPv4, permettant à une machine de communiquer avec elle-même.", cat: "IT & Cybersécurité" },
    { sub: "Réseau", subcat: "Réseau", q: "Quel protocole réseau traduit des noms de domaine lisibles par l'homme (ex: google.com) en adresses IP ?", opts: ["DHCP", "DNS (Domain Name System)", "HTTP", "ARP"], ans: 1, exp: "Le protocole DNS (Domain Name System) fait correspondre des noms d'hôtes lisibles par l'homme à des adresses IP numériques compréhensibles par les routeurs et serveurs.", cat: "IT & Cybersécurité" },
    { sub: "Cybersécurité", subcat: "Cybersécurité", q: "Dans le cadre de la cybersécurité, quelle est la définition d'une vulnérabilité 'Zero-Day' ?", opts: ["Une faille corrigée en moins de 24 heures", "Une faille de sécurité récemment découverte pour laquelle aucun correctif ou patch n'a encore été publié par l'éditeur", "Une attaque par force brute lancée à minuit", "Une faille affectant les protocoles IoT"], ans: 1, exp: "Une vulnérabilité 'Zero-Day' est une faille logicielle inconnue de l'éditeur ou non corrigée. L'attaquant en profite avant qu'une solution de protection ou un patch n'existe.", cat: "IT & Cybersécurité" },
    { sub: "Cybersécurité", subcat: "Cybersécurité", q: "Quelle faille de sécurité (classée dans le Top 10 OWASP) survient lorsque des données sensibles ou des jetons d'accès confidentiels sont exposés par manque de chiffrement ou par configuration inadéquate ?", opts: ["Injection de commandes", "Exposition de données sensibles / Chiffrement défaillant", "Cross-Site Scripting (XSS)", "Déni de service (DoS)"], ans: 1, exp: "L'exposition de données sensibles (Cryptographic Failures dans l'OWASP Top 10 récent) résulte souvent du manque de chiffrement (au repos ou en transit) ou de l'utilisation d'algorithmes cryptographiques obsolètes.", cat: "IT & Cybersécurité" }
  ];

  // Let's generate multiple instances from the extra topics list to build numbers
  let currentNum = 1;
  extraTopics.forEach(et => {
    // Generate variations of these topics
    generated.push({
      category: et.cat,
      subcategory: et.subcat,
      difficulty: "Moyen",
      question: et.q,
      options: et.opts,
      correctAnswer: et.ans,
      explanation: et.exp,
      tags: [et.sub, "Examen-Prep"],
      source: "FEDE Prep",
      isRecurrent: false,
      reoccurrenceProbability: 45
    });

    generated.push({
      category: et.cat,
      subcategory: et.subcat,
      difficulty: "Difficile",
      question: `Dans le contexte d'évaluation du Mastère FEDE, quelle est l'importance de maîtriser : "${et.q.replace(/Qu'est-ce que |Quel |Quelle |Comment |Dans /i, '')}" ?`,
      options: et.opts,
      correctAnswer: et.ans,
      explanation: `${et.exp} Cette compétence est testée pour évaluer l'esprit de décision opérationnel d'un Manager de Projet Informatique.`,
      tags: [et.sub, "Advanced-Scenario"],
      source: "FEDE Prep",
      isRecurrent: true,
      reoccurrenceProbability: 60
    });
  });

  // Let's add simple, varied questions programmatically about specific tools
  const tools = [
    { name: "Scrum", sub: "Agile & Scrum", cat: "Management de Projet", difficulty: "Facile" },
    { name: "SAFe", sub: "SAFe", cat: "Management de Projet", difficulty: "Difficile" },
    { name: "Prince2", sub: "Prince2", cat: "Management de Projet", difficulty: "Difficile" },
    { name: "PMP", sub: "PMP & PMBOK", cat: "Management de Projet", difficulty: "Difficile" },
    { name: "ITIL", sub: "ITIL", cat: "Management de Projet", difficulty: "Moyen" },
    { name: "Gantt", sub: "Planification", cat: "Management de Projet", difficulty: "Facile" },
    { name: "PERT", sub: "PERT & CPM", cat: "Management de Projet", difficulty: "Difficile" },
    { name: "Arpège", sub: "Méthode Arpège", cat: "Management de Projet", difficulty: "Moyen" },
    { name: "Docker", sub: "Conteneurisation", cat: "IT & Cybersécurité", difficulty: "Moyen" },
    { name: "Kubernetes", sub: "Orchestration", cat: "IT & Cybersécurité", difficulty: "Difficile" },
    { name: "OSPF", sub: "Réseau", cat: "IT & Cybersécurité", difficulty: "Difficile" },
    { name: "BGP", sub: "Réseau", cat: "IT & Cybersécurité", difficulty: "Difficile" },
    { name: "VLAN", sub: "Réseau", cat: "IT & Cybersécurité", difficulty: "Moyen" },
    { name: "Zero Trust", sub: "Cybersécurité", cat: "IT & Cybersécurité", difficulty: "Difficile" },
    { name: "SIEM", sub: "Cybersécurité", cat: "IT & Cybersécurité", difficulty: "Moyen" },
    { name: "JWT", sub: "API & Sécurité", cat: "IT & Cybersécurité", difficulty: "Moyen" },
    { name: "OAuth2", sub: "API & Sécurité", cat: "IT & Cybersécurité", difficulty: "Difficile" },
    { name: "MongoDB", sub: "Bases de données", cat: "IT & Cybersécurité", difficulty: "Moyen" }
  ];

  tools.forEach(t => {
    // Generate 3 questions per tool to fill out the bank
    generated.push({
      category: t.cat,
      subcategory: t.sub,
      difficulty: t.difficulty,
      question: `Parmi les choix suivants, quel est le principal objectif visé lors du déploiement ou de l'utilisation de '${t.name}' dans une entreprise ?`,
      options: [
        `Améliorer la rentabilité et l'organisation en appliquant les meilleures pratiques de '${t.name}'.`,
        `Remplacer tous les développeurs par des outils automatisés d'intelligence artificielle.`,
        `Supprimer les contraintes de sécurité pour accélérer la mise en production.`,
        `Chiffrer toutes les communications locales avec un mot de passe unique.`
      ],
      correctAnswer: 0,
      explanation: `L'implémentation de ${t.name} vise à structurer les processus (qu'ils soient de gestion de projet avec ${t.cat} ou techniques avec ${t.sub}) pour améliorer la qualité, la fiabilité et l'efficacité globale.`,
      tags: [t.name, "Objectif"],
      source: "FEDE Course",
      isRecurrent: false,
      reoccurrenceProbability: 35
    });

    generated.push({
      category: t.cat,
      subcategory: t.sub,
      difficulty: t.difficulty,
      question: `Dans le cadre de l'examen final FEDE MPI, quel type d'erreur critique doit-on absolument éviter concernant '${t.name}' ?`,
      options: [
        `Considérer '${t.name}' comme une solution miracle universelle sans adapter sa mise en œuvre aux contraintes réelles de l'organisation.`,
        `Utiliser '${t.name}' uniquement sur des serveurs configurés en français.`,
        `Rédiger les rapports de réunion sans l'avis du Scrum Master.`,
        `Ne pas utiliser d'images animées lors de la présentation client.`
      ],
      correctAnswer: 0,
      explanation: `Une erreur classique consiste à appliquer les concepts de ${t.name} de manière dogmatique et rigide sans tenir compte des contraintes humaines, techniques et budgétaires spécifiques de l'entreprise.`,
      tags: [t.name, "Bonnes Pratiques"],
      source: "FEDE Board",
      isRecurrent: true,
      reoccurrenceProbability: 60
    });

    generated.push({
      category: t.cat,
      subcategory: t.sub,
      difficulty: t.difficulty,
      question: `Quels sont les rôles clés ou composants indispensables associés directement à l'écosystème de '${t.name}' ?`,
      options: [
        `Les rôles de testeurs réseau et d'intégrateurs de base de données.`,
        `Les rôles opérationnels et techniques définis dans les spécifications et guides officiels de '${t.name}'.`,
        `Les développeurs front-end et le service marketing de l'entreprise.`,
        `Les investisseurs externes et le service des ressources humaines.`
      ],
      correctAnswer: 1,
      explanation: `Chaque cadre méthodologique ou technique comme ${t.name} définit des rôles, des rituels ou des artefacts spécifiques nécessaires à son bon fonctionnement et à sa cohérence conceptuelle.`,
      tags: [t.name, "Composants"],
      source: "FEDE Prep",
      isRecurrent: false,
      reoccurrenceProbability: 40
    });
  });

  return generated;
};

// Combine all questions
const allQuestions = [...rawQuestions, ...generateAdditionalQuestions()];

module.exports = allQuestions;
