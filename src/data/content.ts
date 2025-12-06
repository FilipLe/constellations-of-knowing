// src/data/content.ts

export type EraId = 'prologue' | 'pythagoras' | 'plato' | 'aristotle' | 'eratosthenes' | 'hipparchus' | 'ptolemy' | 'copernicus' | 'tycho' | 'galileo' | 'kepler' | 'newton' | 'epilogue';

export interface Era {
  id: EraId;
  title: string;
  year: string;
  poem: string[]; 
  visualMode: 'static-stars' | 'single-sphere' | 'concentric' | 'aristotle-physics' | 'eratosthenes-measurement' | 'hipparchus-catalog' | 'epicycles' | 'heliocentric' | 'hybrid' | 'galileo-telescope' | 'ellipses' | 'newton-laws' | 'epilogue-constellation';
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
    visualMode: 'single-sphere'
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
    visualMode: 'concentric'
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
    visualMode: 'aristotle-physics'
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
    visualMode: 'eratosthenes-measurement'
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
    visualMode: 'hipparchus-catalog'
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
    visualMode: 'epicycles'
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
    visualMode: 'heliocentric'
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
    visualMode: 'hybrid'
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
    visualMode: 'galileo-telescope'
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
    visualMode: 'ellipses'
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
    visualMode: 'newton-laws'
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
    visualMode: 'epilogue-constellation'
  }
];