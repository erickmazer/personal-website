// ALL Japanese content is pre-validated. DO NOT modify kanji without consulting a reader of Japanese.

export interface Hero {
  name: string;
  tagline: string;
}

export interface Bio {
  text: string;
}

export interface Fatherhood {
  quote: string;
  attribution?: string;
}

export interface History {
  text: string;
}

export interface ThinkingNow {
  text: string;
}

export interface MediaItem {
  title: string;
  author?: string;
  director?: string;
  creator?: string;
}

export interface Media {
  favorites: {
    books: Array<{ title: string; author: string }>;
    movies: Array<{ title: string; director: string }>;
    series: Array<{ title: string; creator: string }>;
  };
  now: {
    reading: string;
    watching: string;
    listening: string;
  };
}

export interface Social {
  label: string;
  url: string;
  kanjiMarker?: string;
}

export interface Meta {
  title: string;
  description: string;
  ogImage: string;
}

export interface SectionMarker {
  char: string;
  reading: string;
  meaning: string;
}

export interface Haiku {
  ja: string;
  en: string;
  author: string;
  source: string;
}

export interface Japanese {
  sectionMarkers: {
    hero: SectionMarker;
    bio: SectionMarker;
    fatherhood: SectionMarker;
    history: SectionMarker;
    thinkingNow: SectionMarker;
    media: SectionMarker;
    social: SectionMarker;
  };
  haiku: Haiku;
}

export interface Content {
  hero: Hero;
  bio: Bio;
  fatherhood: Fatherhood;
  history: History;
  thinkingNow: ThinkingNow;
  media: Media;
  social: Social[];
  meta: Meta;
  japanese: Japanese;
}

export const content: Content = {
  hero: {
    name: "Erick Mazer Yamashita",
    tagline: "Present, patient, curious",
  },

  bio: {
    text: "I'm Erick. I live in São Paulo with my partner and our daughter, and I design things for a living. My best days are the slow ones — a walk, a long conversation, a problem solved by removing something rather than adding it. Most of what matters to me happens off the screen. But I keep coming back to design because it rewards attention, and attention is how I stay present.",
  },

  fatherhood: {
    quote: "Attention is the beginning of devotion.",
    attribution: "Mary Oliver, Upstream (2016)",
  },

  history: {
    text: "I started designing for the web back when designing for the web meant writing the HTML yourself. That grounding — treating craft as a form of attention — has never really left me.\n\nIn my early twenties I lived in Tokyo, studied character design and Japanese, and worked as a designer there. I came back to São Paulo with a way of looking at things that I haven't been able to shake.\n\nIn 2014 I joined Nubank when it was ten people in a small house. I stayed for eight years and helped take it from zero to seventy million customers — designing the bank account, internal tools, the design system, leading teams, and trying to make sense of what the company could become next. After Nubank I spent some time at Latitud working with Latin American founders, then taught for a while at Aprender Design and Miami Ad School.\n\nThese days I'm a full-time designer at a startup working at the intersection of AI and wealth management. On the side I advise and angel-invest in a few small companies whose teams I like. The rest of the time I try to be present.",
  },

  thinkingNow: {
    text: "Mostly, I'm paying attention to my daughter — what she notices, what she's afraid of, what makes her laugh at something twice. She teaches me how much I miss when I'm in a hurry.\n\nI'm sitting with a question that keeps coming back: where does AI quietly improve the craft, and where does it flatten it? I draw that line harder than I used to.\n\nI've been reading philosophy on the side for a few years now. It changes how I show up to almost everything else.",
  },

  media: {
    favorites: {
      books: [
        { title: "In Praise of Shadows", author: "Jun'ichirō Tanizaki" },
        { title: "Where the Wild Things Are", author: "Maurice Sendak" },
      ],
      movies: [
        { title: "My Neighbor Totoro", director: "Hayao Miyazaki" },
        { title: "Spirited Away", director: "Hayao Miyazaki" },
        { title: "Tekkonkinkreet", director: "Michael Arias" },
        { title: "Pan's Labyrinth", director: "Guillermo del Toro" },
        { title: "Interstellar", director: "Christopher Nolan" },
        { title: "The Killing of a Sacred Deer", director: "Yorgos Lanthimos" },
      ],
      series: [
        { title: "The Bear", creator: "Christopher Storer" },
        { title: "Mr. Robot", creator: "Sam Esmail" },
        { title: "Parks and Recreation", creator: "Michael Schur" },
      ],
    },
    now: {
      reading: "Thinking in Systems by Donella Meadows",
      watching: "Andor (finally catching up)",
      listening: "Radiolab and bedtime stories in equal measure",
    },
  },

  social: [
    { label: "GitHub", url: "https://github.com/erickmazer" },
    { label: "LinkedIn", url: "https://linkedin.com/in/erickmazer" },
    { label: "Email", url: "mailto:design@erickmazer.com" },
  ],

  meta: {
    title: "Erick Mazer Yamashita",
    description: "A small place on the internet. Designer, father, perpetual student — based in São Paulo.",
    ogImage: "/og-image.png",
  },

  japanese: {
    sectionMarkers: {
      hero: { char: '序', reading: 'jo', meaning: 'preface' },
      bio: { char: '己', reading: 'onore', meaning: 'self' },
      fatherhood: { char: '父', reading: 'chichi', meaning: 'father' },
      history: { char: '道', reading: 'michi', meaning: 'path' },
      thinkingNow: { char: '今', reading: 'ima', meaning: 'now' },
      media: { char: '愛', reading: 'ai', meaning: 'love' },
      social: { char: '繋', reading: 'tsunagu', meaning: 'to connect' },
    },
    haiku: {
      ja: '古池や\n蛙飛びこむ\n水の音',
      en: 'An old pond —\na frog jumps in,\nthe sound of water.',
      author: '松尾芭蕉 (Matsuo Bashō)',
      source: 'Haru no Hi (春の日), 1686',
    },
  },
};
