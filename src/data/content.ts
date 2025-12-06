// src/data/content.ts

export type EraId = 'prologue' | 'pythagoras' | 'plato' | 'aristotle' | 'eratosthenes' | 'hipparchus' | 'ptolemy' | 'copernicus' | 'tycho' | 'galileo' | 'kepler' | 'newton' | 'epilogue';

export interface Era {
  id: EraId;
  title: string;
  year: string;
  poem: string[]; 
  visualMode: 'static-stars' | 'single-sphere' | 'concentric' | 'epicycles' | 'heliocentric' | 'hybrid' | 'ellipses';
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
    title: 'Plato & Eudoxus',
    year: 'c. 370 BC',
    poem: [
      "Concentric orbs, each wheel in quiet spin,",
      "nested mathematics where motions begin.",
      "These circling paths retraced the planets’ flight,",
      "their turning arcs mapped the sky with might."
    ],
    visualMode: 'concentric'
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
  }
];