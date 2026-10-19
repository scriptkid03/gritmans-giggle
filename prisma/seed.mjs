import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JOKES = [
  {
    setup: 'Why did the Ghanaian trotro driver refuse to argue with the passenger?',
    punchline: 'He said, "My brother, petrol is 15 cedis per litre, I don’t have fuel for useless beef!"',
    category: 'Ghana',
    author: 'Kofi Driver',
    tags: ['trotro', 'accra', 'fuel', 'real-life'],
    featured: true,
    reactions: { smirk: 142, chuckle: 388, laugh: 924, finished: 1205 },
  },
  {
    setup: 'Why don’t African mothers ever ask for directions when they get lost?',
    punchline: 'Because admitting you are lost means the devil has won, and she will rather drive to Cairo than let Satan rejoice.',
    category: 'Ghana',
    author: 'Auntie Mary',
    tags: ['african-mom', 'family', 'relatable'],
    featured: false,
    reactions: { smirk: 89, chuckle: 215, laugh: 852, finished: 1430 },
  },
  {
    setup: 'I asked the gym trainer if there is any machine that can make me look attractive in 10 minutes.',
    punchline: 'He pointed outside and said, "The ATM across the street."',
    category: 'One-Liners',
    author: 'Gritman Himself',
    tags: ['gym', 'fitness', 'money', 'one-liner'],
    featured: false,
    reactions: { smirk: 312, chuckle: 412, laugh: 780, finished: 994 },
  },
  {
    setup: 'My girlfriend told me she wanted me to treat her like a princess for her birthday.',
    punchline: 'So I married her off to a French Duke to secure a military alliance with the Habsburg Empire.',
    category: 'Relationship',
    author: 'History Nerd Kwesi',
    tags: ['dating', 'princess', 'history', 'marriage'],
    featured: false,
    reactions: { smirk: 420, chuckle: 512, laugh: 1102, finished: 1650 },
  },
  {
    setup: 'What do you call a fake noodle?',
    punchline: 'An impasta! (Classic, apologize to your ancestors later).',
    category: 'Dad Jokes',
    author: 'Uncle Ekow',
    tags: ['dad-joke', 'pun', 'food'],
    featured: false,
    reactions: { smirk: 650, chuckle: 320, laugh: 180, finished: 95 },
  },
  {
    setup: 'Why do software engineers prefer dark mode on their computers?',
    punchline: 'Because light attracts bugs!',
    category: 'Work',
    author: 'Dev Yaw',
    tags: ['coding', 'tech', 'developer'],
    featured: false,
    reactions: { smirk: 210, chuckle: 380, laugh: 560, finished: 340 },
  },
  {
    setup: 'Teacher: "Whoever answers my next question can go home immediately."',
    punchline: 'Akpos threw his shoe at the chalkboard. Teacher screamed: "WHO THREW THAT?!" Akpos: "ME MA! BYE EVERYONE!"',
    category: 'School',
    author: 'Akpos Legend',
    tags: ['school', 'akpos', 'classroom'],
    featured: false,
    reactions: { smirk: 150, chuckle: 420, laugh: 980, finished: 1340 },
  },
  {
    setup: 'I told my doctor that I broke my arm in two places.',
    punchline: 'He advised me to stop going to those places.',
    category: 'One-Liners',
    author: 'Doc Nana',
    tags: ['doctor', 'hospital', 'one-liner'],
    featured: false,
    reactions: { smirk: 280, chuckle: 390, laugh: 410, finished: 210 },
  },
  {
    setup: 'Why do Ghanaian uncles never say goodbye on phone calls?',
    punchline: 'They just say "Yoo... yoo... right... ehen... okay..." and then silence until you hang up yourself.',
    category: 'Ghana',
    author: 'Uncle Joe',
    tags: ['uncles', 'phone', 'ghana'],
    featured: false,
    reactions: { smirk: 195, chuckle: 410, laugh: 870, finished: 1120 },
  },
  {
    setup: 'Why did the math book look so sad?',
    punchline: 'Because it had too many problems of its own.',
    category: 'Dad Jokes',
    author: 'Maths Sir',
    tags: ['maths', 'pun', 'dad-joke'],
    featured: false,
    reactions: { smirk: 340, chuckle: 220, laugh: 150, finished: 80 },
  },
];

const COMMENTS = [
  {
    stageName: 'Nana K. Rib-Buster',
    avatarColor: 'bg-amber-400 text-amber-950',
    comment: 'The trotro joke nearly made me choke on my waakye this morning! Gritmans is the only medicine I need for stress.',
    reaction: 'finished',
    likes: 42,
  },
  {
    stageName: 'Auntie Christy',
    avatarColor: 'bg-rose-400 text-white',
    comment: 'The African mother hot water remedy joke is 100% accurate! I literally told my daughter to drink tea for sprained ankle yesterday. 😂',
    reaction: 'laugh',
    likes: 38,
  },
  {
    stageName: 'Kwabena Chuckles',
    avatarColor: 'bg-sky-400 text-sky-950',
    comment: 'I sent this site to our family WhatsApp group. Now instead of forwarded morning prayers, we are having joke battles!',
    reaction: 'chuckle',
    likes: 29,
  },
  {
    stageName: 'Akua Glam',
    avatarColor: 'bg-pink-400 text-white',
    comment: 'My mascara ran down my face during the Jollof dilemma joke. You people will pay for my makeup wipe!',
    reaction: 'finished',
    likes: 54,
  },
  {
    stageName: 'Uncle D-Black',
    avatarColor: 'bg-purple-400 text-white',
    comment: 'Keep them coming! Every afternoon during office lunch hour, my colleagues gather around my desk for the daily dosage.',
    reaction: 'laugh',
    likes: 19,
  },
];

const GALLERY_ITEMS = [
  {
    title: 'The Unstoppable Waakye Queue at 7:00 AM',
    type: 'meme',
    category: 'Everyday Realities',
    description: 'When the lady opens the cooler and the steam hits your nostrils. Suddenly 45 minutes standing in line feels like meditation.',
    reactions: 1420,
    accentColor: '#FFDE00',
    badge: 'VIRAL',
    memeTextTop: '7:00 AM: "I will just buy 10 cedis quickly"',
    memeTextBottom: '7:45 AM: Still standing behind 23 soldiers and a pastor',
    visualDetail: 'Massive line stretching across red dirt road in front of colorful wooden food stall',
  },
  {
    title: 'Gritman Live: The Wedding MC Dilemma',
    type: 'video',
    category: 'Stand-Up & Skits',
    description: 'When the bride and groom hired you for a 2-hour program but the caterer arrived 4 hours late with cold fried rice.',
    reactions: 2840,
    accentColor: '#FF6B00',
    badge: 'TOP CLIP',
    duration: '02:45',
    visualDetail: 'Gritman on comic mic stage under warm yellow spotlight cracking jokes',
  },
  {
    title: 'The Great Jollof Showdown (Ghana vs Nigeria)',
    type: 'meme',
    category: 'Kitchen Chaos',
    description: 'A scientific breakdown of fire smoke levels, grain elegance, and why your cousin who studied abroad cannot be trusted to judge.',
    reactions: 3910,
    accentColor: '#FF2E93',
    badge: 'CLASSIC DEBATE',
    memeTextTop: 'NIGERIAN JOLLOF: "We have party smoke"',
    memeTextBottom: 'GHANAIAN JOLLOF: "We have actual flavor"',
    visualDetail: 'Two steaming metal cooking pots facing off with wrestling championship belts',
  },
];

async function main() {
  console.log('🌱 Starting MongoDB seed through Prisma...');

  // Seed jokes
  const jokesCount = await prisma.joke.count();
  if (jokesCount === 0) {
    console.log(`Seeding ${JOKES.length} jokes...`);
    for (const j of JOKES) {
      await prisma.joke.create({
        data: {
          setup: j.setup,
          punchline: j.punchline,
          category: j.category,
          author: j.author,
          tags: j.tags,
          featured: j.featured,
          reactions: {
            set: j.reactions,
          },
        },
      });
    }
    console.log('✅ Jokes seeded successfully.');
  } else {
    console.log(`ℹ️ Jokes collection already has ${jokesCount} documents. Skipping.`);
  }

  // Seed comments
  const commentsCount = await prisma.comment.count();
  if (commentsCount === 0) {
    console.log(`Seeding ${COMMENTS.length} comments...`);
    for (const c of COMMENTS) {
      await prisma.comment.create({
        data: c,
      });
    }
    console.log('✅ Comments seeded successfully.');
  } else {
    console.log(`ℹ️ Comments collection already has ${commentsCount} documents. Skipping.`);
  }

  // Seed gallery
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    console.log(`Seeding ${GALLERY_ITEMS.length} gallery items...`);
    for (const g of GALLERY_ITEMS) {
      await prisma.galleryItem.create({
        data: g,
      });
    }
    console.log('✅ Gallery items seeded successfully.');
  } else {
    console.log(`ℹ️ Gallery collection already has ${galleryCount} documents. Skipping.`);
  }

  console.log('🎉 MongoDB seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
