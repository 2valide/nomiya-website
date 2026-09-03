/**
 * Carte du restaurant — 162 plats répartis en 15 catégories.
 *
 * Fichier généré depuis le prototype Claude Design
 * (design/project/Nomiya Commande.dc.html) puis figé ici. Dans une vraie mise en
 * production, ces données viendraient du back-office du restaurateur : la forme
 * des types ci-dessous est celle qu'attendrait le reste de l'app.
 */

export type OptionGroupType = "single" | "multi";

export type MenuOption = {
  /** Libellé de l'option, tel qu'affiché dans la fiche plat. */
  n: string;
  /** Supplément en euros. 0 = inclus. */
  p: number;
};

export type OptionGroup = {
  /** Clé courte, utilisée pour indexer la sélection en cours. */
  id: string;
  label: string;
  type: OptionGroupType;
  /** Nombre maximum de choix, pour les groupes `multi`. */
  max?: number;
  /** Groupe obligatoire : la première option est présélectionnée. */
  req?: boolean;
  opts: MenuOption[];
};

/** Groupes d'options réutilisables, référencés par les catégories. */
export const OPTION_GROUPS = {
  sushiX: { id: "sx", label: "Options", type: "multi", max: 3, opts: [{ n: "Wasabi frais râpé", p: 1.2 }, { n: "Gingembre en plus", p: 0.6 }, { n: "Sauce soja sucrée", p: 0.6 }, { n: "Sans wasabi", p: 0 }] },
  rizType: { id: "rz", label: "Riz", type: "single", req: true, opts: [{ n: "Riz vinaigré blanc", p: 0 }, { n: "Riz complet", p: 1 }, { n: "Sans riz (sashimi style)", p: 0 }] },
  pieces: { id: "pc", label: "Format", type: "single", req: true, opts: [{ n: "6 pièces", p: 0 }, { n: "12 pièces", p: 7.5 }, { n: "18 pièces", p: 14 }] },
  paire: { id: "pr", label: "Quantité", type: "single", req: true, opts: [{ n: "2 pièces", p: 0 }, { n: "4 pièces", p: 2.6 }, { n: "8 pièces", p: 5.9 }] },
  taille: { id: "tz", label: "Taille", type: "single", req: true, opts: [{ n: "Normale", p: 0 }, { n: "Grande (+30 %)", p: 2.5 }] },
  piment: { id: "sp", label: "Niveau de piment", type: "single", req: true, opts: [{ n: "Doux", p: 0 }, { n: "Moyen", p: 0 }, { n: "Fort", p: 0 }] },
  ramenX: { id: "rx", label: "Suppléments", type: "multi", max: 4, opts: [{ n: "Œuf mollet mariné", p: 1.5 }, { n: "Chashu de porc (2 tr.)", p: 3 }, { n: "Double nouilles", p: 2 }, { n: "Pousses de bambou", p: 1 }, { n: "Maïs doux", p: 1 }, { n: "Nori supplémentaire", p: 0.8 }] },
  base: { id: "bs", label: "Accompagnement", type: "single", req: true, opts: [{ n: "Riz blanc", p: 0 }, { n: "Riz vinaigré", p: 0.8 }, { n: "Nouilles soba", p: 2 }, { n: "Salade de chou", p: 1.2 }] },
  wokX: { id: "wx", label: "Suppléments", type: "multi", max: 3, opts: [{ n: "Bœuf émincé", p: 3.5 }, { n: "Crevettes (5)", p: 4 }, { n: "Tofu grillé", p: 2 }, { n: "Légumes croquants", p: 1.5 }] },
  cuisson: { id: "cu", label: "Cuisson", type: "single", req: true, opts: [{ n: "Saignant", p: 0 }, { n: "À point", p: 0 }, { n: "Bien cuit", p: 0 }] },
  sauceBro: { id: "sb", label: "Sauce", type: "single", req: true, opts: [{ n: "Tare (soja sucré)", p: 0 }, { n: "Sel & citron", p: 0 }, { n: "Piment yuzu", p: 0.5 }] },
  formule: { id: "fe", label: "Entrée incluse", type: "single", req: true, opts: [{ n: "Soupe miso", p: 0 }, { n: "Salade de chou", p: 0 }, { n: "Edamame", p: 0.5 }, { n: "Gyoza (3)", p: 2 }] },
  boisson: { id: "bo", label: "Boisson incluse", type: "single", req: true, opts: [{ n: "Thé vert glacé", p: 0 }, { n: "Coca 33 cl", p: 0 }, { n: "Ramune litchi", p: 1 }, { n: "Bière Asahi 33 cl", p: 2 }] },
  dessert: { id: "de", label: "Ajouter un dessert", type: "single", opts: [{ n: "Mochi glacé", p: 3.5 }, { n: "Cheesecake yuzu", p: 4.2 }, { n: "Perles de coco", p: 3.2 }] },
  couverts: { id: "cv", label: "Couverts", type: "single", req: true, opts: [{ n: "Baguettes", p: 0 }, { n: "Baguettes + couverts", p: 0 }, { n: "Aucun (zéro déchet)", p: 0 }] },
} satisfies Record<string, OptionGroup>;

export type OptionGroupKey = keyof typeof OPTION_GROUPS;

/** [id, nom, badge, groupes d'options, [ [nom, description, prix], … ] ] */
type RawCategory = [
  string,
  string,
  string,
  OptionGroupKey[],
  [string, string, number][],
];

const RAW_CATEGORIES: RawCategory[] = [
  [
    "pop",
    "Les + commandés",
    "TOP",
    ["sushiX"],
    [
      ["Plateau Nomiya 18 pièces", "Saumon, thon, crevette, avocat, california", 26.9],
      ["Chirashi saumon", "Riz vinaigré, saumon Label Rouge, avocat, tobiko", 17.9],
      ["Sushi saumon (2)", "Riz vinaigré, saumon tranché épais", 5.4],
      ["California avocat-crevette (6)", "Sésame blanc, mayonnaise japonaise", 8.9],
      ["Gyoza au porc (6)", "Grillés à la poêle, sauce ponzu", 7.5],
      ["Ramen tonkotsu", "Bouillon de porc 18 h, chashu, œuf mollet", 15.9],
      ["Poké bowl saumon", "Edamame, mangue, radis, sauce sésame", 14.9],
      ["Yakitori poulet-ciboule (2)", "Sauce tare, sésame torréfié", 5.9],
    ],
  ],
  [
    "men",
    "Menus & Formules",
    "-15%",
    ["formule", "boisson", "dessert"],
    [
      ["Menu Midi Sushi", "Entrée + 12 pièces + boisson", 18.9],
      ["Menu Midi Chaud", "Entrée + plat chaud + boisson", 17.5],
      ["Menu Ramen complet", "Gyoza (3) + ramen au choix + boisson", 22.9],
      ["Menu Chirashi", "Soupe miso + chirashi + boisson", 21.9],
      ["Menu Végétarien", "Edamame + maki légumes + boisson", 16.9],
      ["Formule Duo à partager", "2 entrées, 24 pièces, 2 boissons, 2 desserts", 49.9],
      ["Formule Izakaya", "5 petites assiettes + 2 boissons", 38.9],
      ["Plateau Famille (4 pers.)", "48 pièces, 2 entrées, 4 desserts", 89.9],
      ["Menu Enfant", "6 pièces au choix + jus + mochi", 12.9],
      ["Menu Découverte Chef", "7 services surprise du chef", 54.9],
    ],
  ],
  [
    "efr",
    "Entrées froides",
    "",
    ["sushiX"],
    [
      ["Edamame au sel de Guérande", "Fèves de soja vapeur", 4.9],
      ["Salade de chou au sésame", "Chou blanc, vinaigre de riz", 4.5],
      ["Salade wakame", "Algues marinées, sésame", 5.9],
      ["Tataki de thon (4 tr.)", "Croûte de sésame, ponzu", 12.9],
      ["Carpaccio de daurade", "Yuzu, huile d’olive, ciboulette", 13.5],
      ["Sunomono concombre", "Concombre mariné, vinaigre doux", 4.9],
      ["Tofu froid hiyayakko", "Soja soyeux, bonite séchée, ciboule", 6.5],
      ["Poulpe mariné au yuzu", "Poulpe tendre, zestes", 9.9],
      ["Salade d’avocat-crabe", "Chair de crabe, mayonnaise japonaise", 10.5],
      ["Kimchi de chou", "Fermenté maison, piment doux", 5.5],
    ],
  ],
  [
    "ech",
    "Entrées chaudes",
    "",
    ["pieces", "piment"],
    [
      ["Gyoza au porc (6)", "Grillés, sauce ponzu", 7.5],
      ["Gyoza aux légumes (6)", "Chou, carotte, gingembre", 7.2],
      ["Har gow crevettes (4)", "Pâte translucide vapeur", 7.9],
      ["Siu mai porc-crevette (4)", "Vapeur, tobiko", 7.5],
      ["Bao au porc laqué (2)", "Pain vapeur, concombre, cacahuètes", 8.9],
      ["Bao au poulet frit (2)", "Panure croustillante, mayo épicée", 8.9],
      ["Croquettes de crevette (5)", "Panko, sauce tartare japonaise", 8.5],
      ["Ailes de poulet karaage", "Marinées soja-gingembre", 8.9],
      ["Tempura de légumes (6)", "Pâte légère, sauce tentsuyu", 8.5],
      ["Tempura de crevettes (4)", "Grosses crevettes, sauce tentsuyu", 10.9],
      ["Soupe miso", "Tofu, wakame, ciboule", 3.9],
      ["Soupe won-ton", "Raviolis crevette, bouillon volaille", 8.9],
    ],
  ],
  [
    "sus",
    "Sushi à la pièce",
    "",
    ["paire", "rizType", "sushiX"],
    [
      ["Sushi saumon", "Saumon Label Rouge", 2.7],
      ["Sushi thon rouge", "Thon ligne", 3.4],
      ["Sushi daurade", "Daurade royale", 2.9],
      ["Sushi crevette", "Crevette marinée", 2.7],
      ["Sushi anguille laquée", "Unagi, sauce kabayaki", 3.9],
      ["Sushi saumon braisé", "Flambé, sauce miso", 3.1],
      ["Sushi thon blanc", "Germon, ciboulette", 3.1],
      ["Sushi omelette tamago", "Omelette sucrée", 2.3],
      ["Sushi avocat", "Avocat mûr, sésame", 2.2],
      ["Sushi Saint-Jacques", "Noix de Saint-Jacques", 3.9],
      ["Sushi maquereau", "Maquereau mariné", 2.6],
      ["Sushi poulpe", "Poulpe cuit, ponzu", 2.9],
      ["Sushi tobiko", "Œufs de poisson volant", 3.2],
      ["Sushi crabe-mayo", "Chair de crabe, mayo japonaise", 2.9],
      ["Sushi tofu inari", "Poche de tofu sucrée", 2.2],
      ["Sushi foie gras-anguille", "Édition limitée du chef", 5.9],
    ],
  ],
  [
    "sas",
    "Sashimi",
    "",
    ["pieces", "sushiX"],
    [
      ["Sashimi saumon (6)", "Tranché épais du jour", 11.9],
      ["Sashimi thon rouge (6)", "Thon ligne", 14.9],
      ["Sashimi daurade (6)", "Daurade royale", 12.5],
      ["Sashimi mixte (9)", "Saumon, thon, daurade", 16.9],
      ["Sashimi Saint-Jacques (5)", "Fraîches, fleur de sel", 15.9],
      ["Sashimi anguille (5)", "Laquée, tiède", 15.5],
      ["Sashimi maquereau (6)", "Mariné au vinaigre", 11.5],
      ["Sashimi thon blanc (6)", "Germon, huile de sésame", 12.9],
      ["Sashimi du chef (12)", "Sélection du marché", 26.9],
      ["Tartare de saumon", "Ciboule, sésame, yuzu", 12.9],
    ],
  ],
  [
    "mak",
    "Makis",
    "",
    ["pieces", "rizType", "sushiX"],
    [
      ["Maki saumon (6)", "Saumon, nori, riz vinaigré", 5.9],
      ["Maki thon (6)", "Thon rouge", 6.5],
      ["Maki concombre (6)", "Concombre croquant", 4.9],
      ["Maki avocat (6)", "Avocat mûr", 5.2],
      ["Maki saumon-avocat (6)", "Duo classique", 6.5],
      ["Maki thon épicé (6)", "Sauce sriracha, ciboule", 6.9],
      ["Maki crevette tempura (6)", "Croustillant, mayo", 7.5],
      ["Maki anguille-concombre (6)", "Unagi, sauce kabayaki", 8.5],
      ["Maki tamago (6)", "Omelette sucrée", 5.2],
      ["Maki radis mariné (6)", "Takuan croquant", 4.9],
      ["Maki poulet teriyaki (6)", "Poulet laqué, ciboule", 6.5],
      ["Maki cheese-saumon (6)", "Fromage frais, ciboulette", 6.9],
      ["Maki végétarien (6)", "Avocat, concombre, carotte", 5.5],
      ["Maki foie gras-figue (6)", "Édition limitée", 11.9],
    ],
  ],
  [
    "cal",
    "California & Spring",
    "",
    ["pieces", "sushiX"],
    [
      ["California saumon-avocat (6)", "Sésame blanc", 7.9],
      ["California crevette-avocat (6)", "Mayonnaise japonaise", 8.9],
      ["California thon-mangue (6)", "Fruité, sésame noir", 9.5],
      ["California crabe-concombre (6)", "Chair de crabe", 8.5],
      ["California poulet croustillant (6)", "Panko, sauce épicée", 8.5],
      ["California végétarien (6)", "Avocat, mangue, concombre", 7.5],
      ["Spring saumon-cheese (6)", "Roulé sans riz, feuille de soja", 8.9],
      ["Spring thon-avocat (6)", "Roulé sans riz", 9.5],
      ["Spring crevette-mangue (6)", "Frais, sans riz", 9.5],
      ["Spring végétarien (6)", "Légumes croquants, sans riz", 7.9],
      ["Dragon roll (8)", "Anguille, avocat, sauce kabayaki", 13.9],
      ["Rainbow roll (8)", "Assortiment de poissons crus", 14.5],
      ["Crispy roll saumon (6)", "Oignons frits, sauce épicée", 9.9],
      ["Flambé roll (6)", "Saumon flambé, miso", 10.5],
    ],
  ],
  [
    "bwl",
    "Chirashi & Poké",
    "",
    ["rizType", "sushiX"],
    [
      ["Chirashi saumon", "Riz vinaigré, saumon, avocat", 17.9],
      ["Chirashi thon", "Thon rouge, tobiko", 19.9],
      ["Chirashi mixte", "Saumon, thon, daurade", 21.5],
      ["Poké bowl saumon", "Edamame, mangue, radis", 14.9],
      ["Poké bowl thon épicé", "Sauce sriracha, avocat", 15.9],
      ["Poké bowl poulet teriyaki", "Poulet laqué, chou rouge", 13.9],
      ["Poké bowl tofu", "Tofu grillé, légumes marinés", 12.9],
      ["Sashimi don du chef", "Poissons du jour sur riz tiède", 24.9],
    ],
  ],
  [
    "pla",
    "Plateaux à partager",
    "PARTAGE",
    ["sushiX", "couverts"],
    [
      ["Plateau Découverte 12 p.", "Sushi, maki, california", 17.9],
      ["Plateau Nomiya 18 p.", "Best-sellers de la maison", 26.9],
      ["Plateau Saumon 24 p.", "Tout saumon", 31.9],
      ["Plateau Mixte 30 p.", "Sushi, maki, california, spring", 39.9],
      ["Plateau Prestige 36 p.", "Thon rouge, Saint-Jacques, anguille", 54.9],
      ["Plateau Végétarien 18 p.", "Légumes, tofu, avocat", 22.9],
      ["Plateau Sashimi 24 tr.", "Trois poissons du marché", 44.9],
      ["Plateau Duo 24 p.", "Pour deux, avec soupes miso", 34.9],
      ["Plateau Famille 48 p.", "Pour quatre, avec desserts", 79.9],
      ["Plateau Apéro froid", "Tataki, carpaccio, edamame", 29.9],
    ],
  ],
  [
    "yak",
    "Yakitori & Grillades",
    "",
    ["paire", "sauceBro"],
    [
      ["Yakitori poulet-ciboule", "Sauce tare, sésame", 5.9],
      ["Yakitori poulet-fromage", "Fondant, poivre", 6.5],
      ["Yakitori bœuf-fromage", "Bœuf fin roulé", 7.5],
      ["Yakitori porc-asperge", "Asperge verte croquante", 6.9],
      ["Yakitori crevette", "Grosses crevettes grillées", 8.5],
      ["Yakitori Saint-Jacques", "Beurre yuzu", 9.9],
      ["Yakitori champignon shiitake", "Végétarien", 5.5],
      ["Yakitori aubergine miso", "Miso sucré, sésame noir", 5.5],
      ["Brochette de bœuf wagyu", "Édition limitée, sel de Maldon", 14.9],
      ["Travers de porc laqués", "Miel, cinq-épices", 16.9],
      ["Poulet karaage grillé", "Mariné soja-gingembre", 12.9],
      ["Saumon grillé teriyaki", "Filet épais, sauce maison", 16.5],
    ],
  ],
  [
    "ram",
    "Ramen & Nouilles",
    "",
    ["taille", "ramenX", "piment"],
    [
      ["Ramen tonkotsu", "Bouillon de porc 18 h, chashu", 15.9],
      ["Ramen shoyu poulet", "Bouillon clair, poulet grillé", 14.5],
      ["Ramen miso épicé", "Miso rouge, huile de piment", 15.5],
      ["Ramen végétarien", "Bouillon de champignons, tofu", 13.9],
      ["Ramen fruits de mer", "Crevettes, moules, calamar", 17.9],
      ["Udon au bouillon dashi", "Nouilles épaisses, tempura", 13.5],
      ["Yakisoba porc", "Nouilles sautées, chou", 14.5],
      ["Yakisoba légumes", "Wok, gingembre rouge", 12.9],
      ["Soba froides zaru", "Sarrasin, sauce tsuyu", 11.9],
      ["Nouilles sautées crevettes", "Wok grand feu, ail", 15.9],
    ],
  ],
  [
    "riz",
    "Riz & Donburi",
    "",
    ["taille", "base", "wokX"],
    [
      ["Riz vapeur", "Riz japonais gohan", 3.5],
      ["Riz sauté aux légumes", "Wok, sauce soja", 8.9],
      ["Gyudon bœuf", "Bœuf mijoté, oignon doux", 14.9],
      ["Katsudon porc pané", "Panure croustillante, œuf", 15.5],
      ["Oyakodon poulet", "Poulet, œuf, dashi", 14.5],
      ["Curry japonais poulet", "Curry doux, riz blanc", 14.9],
      ["Curry japonais légumes", "Curry doux, légumes rôtis", 13.5],
      ["Bibimbap végétarien", "Légumes marinés, gochujang", 13.5],
    ],
  ],
  [
    "des",
    "Desserts",
    "",
    [],
    [
      ["Mochi glacé (3)", "Matcha, sésame noir, mangue", 6.5],
      ["Cheesecake yuzu", "Biscuit sésame, coulis", 6.9],
      ["Perles de coco (3)", "Haricot rouge, coco râpée", 5.5],
      ["Beignets de banane", "Miel, sésame", 5.9],
      ["Dorayaki", "Pancake fourré haricot rouge", 5.5],
      ["Glace thé matcha", "Deux boules", 5.5],
      ["Glace sésame noir", "Deux boules", 5.5],
      ["Salade d’ananas au gingembre", "Frais, citron vert", 5.2],
    ],
  ],
  [
    "boi",
    "Boissons",
    "",
    [],
    [
      ["Thé vert glacé maison 50 cl", "Sencha infusé à froid", 3.9],
      ["Thé vert chaud", "Théière pour deux", 4.5],
      ["Ramune litchi", "Limonade japonaise pétillante", 4.5],
      ["Ramune yuzu", "Limonade japonaise pétillante", 4.5],
      ["Coca-Cola 33 cl", "Canette fraîche", 2.9],
      ["Coca Zéro 33 cl", "Canette fraîche", 2.9],
      ["Eau plate 50 cl", "Source", 2.5],
      ["Eau pétillante 50 cl", "Finement pétillante", 2.9],
      ["Bière Asahi 33 cl", "Blonde japonaise", 5.5],
      ["Bière Kirin 33 cl", "Blonde japonaise", 5.5],
      ["Saké chaud 15 cl", "Junmai, servi tiède", 7.9],
      ["Umeshu glaçons 8 cl", "Liqueur de prune", 7.5],
    ],
  ],
];

/** Badges mis en avant sur les vignettes, par nom de plat. */
const BADGES: Record<string, string> = {
  "Plateau Nomiya 18 pièces": "N°1",
  "Chirashi saumon": "TOP 2",
  "Gyoza au porc (6)": "TOP 3",
  "Menu Midi Sushi": "-15%",
  "Menu Midi Chaud": "-15%",
  "Sushi foie gras-anguille": "LIMITÉ",
  "Maki foie gras-figue (6)": "LIMITÉ",
  "Brochette de bœuf wagyu": "LIMITÉ",
  "Plateau Famille 48 p.": "PARTAGE",
  "Bao au porc laqué (2)": "NOUVEAU",
  "Cheesecake yuzu": "NOUVEAU",
  "Ramen tonkotsu": "TOP",
  "Poké bowl saumon": "NOUVEAU",
};

export type Dish = {
  id: string;
  /** Nom du plat. */
  n: string;
  /** Description courte, deux lignes maximum à l'affichage. */
  d: string;
  /** Prix de base en euros, hors options. */
  p: number;
  /** Groupes d'options applicables. */
  g: OptionGroupKey[];
  /** Identifiant de la catégorie. */
  cat: string;
  /** Légende de l'emplacement photo, héritée des maquettes. */
  ph: string;
  badge: string;
  /** Preuve sociale affichée sous la description. */
  sold: string;
};

export type Category = {
  id: string;
  name: string;
  badge: string;
  dishes: Dish[];
};

let uid = 0;

export const CATEGORIES: Category[] = RAW_CATEGORIES.map(
  ([id, name, badge, g, items]) => ({
    id,
    name,
    badge,
    dishes: items.map(([n, d, p]) => {
      uid += 1;
      return {
        id: `d${uid}`,
        n,
        d,
        p,
        g,
        cat: id,
        ph: `photo ${n.toLowerCase().split(" ").slice(0, 2).join(" ")}`,
        badge: BADGES[n] ?? "",
        sold: `Vendu ${60 + ((uid * 37) % 780)} fois ce mois`,
      };
    }),
  }),
);

export const ALL_DISHES: Dish[] = CATEGORIES.flatMap((c) => c.dishes);

/** Nombre de plats affiché dans les placeholders de recherche et le héros. */
export const DISH_COUNT = ALL_DISHES.length;

export const dishByName = (n: string): Dish | undefined =>
  ALL_DISHES.find((d) => d.n === n);
