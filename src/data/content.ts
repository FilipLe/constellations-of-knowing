// src/data/content.ts

export type EraId = 'prologue' | 'pythagoras' | 'plato' | 'aristotle' | 'eratosthenes' | 'hipparchus' | 'ptolemy' | 'copernicus' | 'tycho' | 'galileo' | 'kepler' | 'newton' | 'epilogue';

export interface Era {
  id: EraId;
  title: string;
  year: string;
  poem: string[]; 
  visualMode: 'static-stars' | 'single-sphere' | 'concentric' | 'aristotle-physics' | 'eratosthenes-measurement' | 'hipparchus-catalog' | 'epicycles' | 'heliocentric' | 'hybrid' | 'galileo-telescope' | 'ellipses' | 'newton-laws' | 'epilogue-constellation';
  explanation?: string;
}

export const eras: Era[] = [
  {
    id: 'prologue',
    title: 'Prologue — The Sky as Ledger',
    year: 'Pre-History',
    poem: [
      "We read the heavens like a page gone dark,",
      "placed points where wonder struck and questions sparked.",
      "A thousand lights became our earliest marks —",
      "a ledger built from fragments of the stars."
    ],
    visualMode: 'static-stars'
  },
  {
    id: 'pythagoras',
    title: 'Pythagoras — Spheres',
    year: 'c. 570 BC',
    poem: [
      "He named the circle sacred, perfect, whole,",
      "a harmony that held the world’s deep soul.",
      "If heaven’s form must be sublime and fair,",
      "the round earth must be center of that air."
    ],
    visualMode: 'single-sphere',
    explanation: 'Model: Geocentric\n\nAccording to Pythagoras, circle = perfect heaven forms. Since Earth was seen as perfect and the center of universe, Earth must been sphere.'
  },
  {
    id: 'plato',
    title: 'Plato & Eudoxus — Concentric Spheres',
    year: 'c. 370 BC',
    poem: [
      "Concentric orbs, each wheel in quiet spin,",
      "nested mathematics where motions begin.",
      "These circling paths retraced the planets' flight,",
      "their turning arcs mapped the sky with might."
    ],
    visualMode: 'concentric',
    explanation: 'Model: Geocentric\n\nPlato proposed a spheres within spheres model, where concentric spheres rotate in uniform circular motion.\n\nHis student, Eudoxus, mathematically reproduced this circular motion of planets.'
  },
  {
    id: 'aristotle',
    title: 'Aristotle — Physics of the Spheres',
    year: 'c. 350 BC',
    poem: [
      "He built those spheres into a weighty frame —",
      "a physics that could hold the cosmos' name.",
      "The heavens moved by purpose, not by chance;",
      "the world below bowed to the ordered dance."
    ],
    visualMode: 'aristotle-physics',
    explanation:'Model: Geocentric\n\nAristotle adopted the geocentric model of nested, crystalline spheres that Eudoxus proposed but refined it by adding more spheres (up to 55) to physically explain the complex motions of planets.\n\nAristotle also argued celestial bodies must move in perfect circles because they are perfect and divine.'
  },
  {
    id: 'eratosthenes',
    title: 'Eratosthenes — Measurer of Earth',
    year: 'c. 240 BC',
    poem: [
      "He set a shadow and measured dawn and noon,",
      "worked geometry that spoke in sand and rune.",
      "From two small sticks and sunlight's angled trace,",
      "he scaled Earth's radius, measured Earth's embrace."
    ],
    visualMode: 'eratosthenes-measurement',
    explanation:'Model: Geocentric\n\n Erasthothenes measured the circumference of Earth by comparing the angle of the rays from the Sun in two different cities, Syene and Alexandria, on the same day.\n\nSince he was able to determine the circumference, this was also evidence that earth ≠ flat but spherical and large.'
  },
  {
    id: 'hipparchus',
    title: 'Hipparchus — The Star-Mapper',
    year: 'c. 150 BC',
    poem: [
      "He keyed the heavens with points of plaintive light,",
      "a catalog of brightness, place, and height",
      "A wobble whispered in the constellations' dress —",
      "a subtle tilt, a slow precession's press."
    ],
    visualMode: 'hipparchus-catalog',
    explanation:'Model: Geocentric\n\nHipparchus cataloged stars based on their position & brightness.\n\nHe also discovered shift in stars (precesion) due to wobble of earth tilt.'
  },
  {
    id: 'ptolemy',
    title: 'Ptolemy — Epicycles',
    year: 'c. 150 AD',
    poem: [
      "Where motion bent and planets seemed to stall,",
      "he drew small circles on a larger ball.",
      "Epicycles scribed the stubborn retrograde,",
      "and for a thousand years his math held sway."
    ],
    visualMode: 'epicycles',
    explanation:'Model: Geocentric\n\nAccording to Ptolemy, planets rotate on epicycles whose center move on large deferents around earth.\n\nThis model mathematically accounted for retrograde motion, which made his model being accepted for over 1000 years.'
  },
  {
    id: 'copernicus',
    title: 'Copernicus — The Sun Ascends',
    year: '1543',
    poem: [
      "He moved the sun to center of the page,",
      "and loosed the Earth from its old anchored stage.",
      "The retrograde now read as passing streets —",
      "an orbital truth beneath mechanical beats."
    ],
    visualMode: 'heliocentric',
    explanation:'Model: Heliocentric\n\nCopernicus proposed Earth and other planets orbit the Sun.\n\nHis model of the universe simplified retrograde motion, simply Earth overtakes slower-orbiting planets.\n\nHis views were seen as controversial at the time because if his model was true, then Earth is no longer the center of the universe.'
  },
  {
    id: 'tycho',
    title: 'Tycho Brahe — A Hybrid Sky',
    year: '1588',
    poem: [
      "He kept the earth unmoving at the heart,",
      "yet let the planets circle sun and part.",
      "His iron sight forbade the parallax he sought,",
      "and in that doubt a richer data set was wrought."
    ],
    visualMode: 'hybrid',
    explanation: 'Model: Hybrid of Geocentric and Heliocentric.\n\nBrahe was aware of the heliocentric idea that Copernicus proposed but doubted it. If Earth moves around Sun, stars should shift position at different times (stellar parallax).\n\nBrahe, however, did not see this shift with his instruments. Since stars did not shift, Earth did not move in his eyes. Thus, he proposed a new model: earth fixed at center, sun orbits earth, planets orbit sun.'
  },
  {
    id: 'galileo',
    title: "Galileo — The Telescope's Proof",
    year: '1610',
    poem: [
      "He trained a lens and let the small be shown:",
      "moons that dance the Jupiter, each world its own",
      "Venus' phases spun the heliocentric thread —",
      "his glass made real what Copernicus had read."
    ],
    visualMode: 'galileo-telescope',
    explanation: 'Model: Heliocentric\n\nUsing a telescope, Galileo gained proof for the heliocentric model Copernicus advocated. Firstly, he saw the moons of Jupiter orbiting Jupiter, proving that not everything orbit Earth. Secondly, he saw different phases of Venus, which is only possible if Venus orbits the Sun. Galileo also saw spots on the Moon, which means the universe is not perfect. All of this suppport that Earth ≠ center.'
  },
  {
    id: 'kepler',
    title: 'Kepler — Ellipses & Laws',
    year: '1609',
    poem: [
      "Circles bowed to ellipses, curves that speak in speed:",
      "equal sweep, quick near flame, slow at the farthest reed.",
      "P² and a³ in quiet, stubborn rhyme —",
      "the clockwork tuned to measure out the time."
    ],
    visualMode: 'ellipses',
    explanation: 'Model: Heliocentric\n\nKepler used the data from Brahe to derive 3 laws.\n1) Planets orbit sun in ellipses not in circles. eccentricity = elongation of ellipse, semi major axis = longer radius of ellipse.\n2) Equal areas in equal times ==> planet move faster when closer to sun and slower when far from sun.\n3) p^2 = a^3, where P = orbital period in years and a = semimajor axis in AU.'
  },
  {
    id: 'newton',
    title: 'Newton — The Shoulders',
    year: '1687',
    poem: [
      "He wrote the laws that made the dance obey,",
      "unmasked the force that bends the planet's way.",
      "Inertia, force, reaction — set in three —",
      "these laws bound heaven's motions into key."
    ],
    visualMode: 'newton-laws',
    explanation: 'Model: Heliocentric\n\nNewton built on Kepler and dervied 3 laws:\n1st law = object will rest unless acted upon external force.\n2nd law = change of motion (acceleration) proportional to force acting on it.\n3rd law = for every action, there is an equal and opposite reaction.'
  },
  {
    id: 'epilogue',
    title: 'Epilogue — The Finished Constellation',
    year: 'Present',
    poem: [
      "Now click the lights — the network hums and threads;",
      "each stanza lights another path that spreads.",
      "We stand on shoulders, map the night afar",
      "and learn to name the sky through turning stars."
    ],
    visualMode: 'epilogue-constellation',
    explanation: 'Across centuries, each philosopher and astronomer added a new light to the sky of our understanding. Their ideas rarely stood alone. Instead, they rose from the insights, questions, and errors of those who came before. Each model opened the door for the next. Together, they form a constellation of thought: a chain of minds standing shoulder to shoulder, transforming wonder into understanding, and shaping the evolving map of the universe we trace today.'
  }
];