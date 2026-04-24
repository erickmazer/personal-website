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

export interface Japanese {}

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
    name: "Erick Mazer",
    tagline: "Building games, raising humans, finding beauty in the imperfect",
  },

  bio: {
    text: "I'm a game designer and creative technologist who believes the best work happens at the intersection of play, craft, and parenthood. I've spent years building interactive experiences that bring people together, and now I'm learning that raising children is the most challenging and rewarding design problem of all. When I'm not prototyping game mechanics or debugging React components, you'll find me reading picture books aloud, exploring parks, or trying to explain why the sky is blue.",
  },

  fatherhood: {
    quote: "In the garden of childhood, we are both the gardener and the soil—nurturing growth while being transformed by what takes root.",
    attribution: "Ancient proverb",
  },

  history: {
    text: "My journey started with a fascination for how things work and why people play. I studied computer science but found my calling in game design, where logic meets imagination. Over the years, I've worked on everything from mobile puzzle games to multiplayer experiences, always asking: what makes this fun? What makes it meaningful? Becoming a father shifted my perspective entirely. Suddenly, the questions weren't just about players—they were about people. How do we teach resilience? How do we model curiosity? How do we create space for wonder? These days, I'm building projects that reflect those values: thoughtful, human-centered, and a little bit playful.",
  },

  thinkingNow: {
    text: "Right now, I'm fascinated by the intersection of generative AI and creative tools—not as a replacement for human creativity, but as a collaborator. I'm exploring how we can build systems that amplify our ideas rather than automate them away. I'm also thinking a lot about wabi-sabi, the Japanese aesthetic of finding beauty in imperfection. It's a philosophy that applies to code, to design, and especially to parenting. Nothing is ever finished, and that's okay.",
  },

  media: {
    favorites: {
      books: [
        { title: "The Design of Everyday Things", author: "Don Norman" },
        { title: "A Pattern Language", author: "Christopher Alexander" },
        { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter" },
        { title: "The Timeless Way of Building", author: "Christopher Alexander" },
        { title: "Where the Wild Things Are", author: "Maurice Sendak" },
      ],
      movies: [
        { title: "Spirited Away", director: "Hayao Miyazaki" },
        { title: "The Grand Budapest Hotel", director: "Wes Anderson" },
        { title: "Blade Runner 2049", director: "Denis Villeneuve" },
        { title: "My Neighbor Totoro", director: "Hayao Miyazaki" },
      ],
      series: [
        { title: "The Bear", creator: "Christopher Storer" },
        { title: "Bluey", creator: "Joe Brumm" },
        { title: "Severance", creator: "Dan Erickson" },
        { title: "Adventure Time", creator: "Pendleton Ward" },
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
    { label: "Email", url: "mailto:hello@erickmazer.com" },
  ],

  meta: {
    title: "Erick Mazer — Game Designer, Creative Technologist, Father",
    description: "Building games, raising humans, finding beauty in the imperfect. A personal site exploring the intersection of play, craft, and parenthood.",
    ogImage: "/og-image.png",
  },

  japanese: {},
};
