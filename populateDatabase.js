#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, stocknum) {
  console.log(price + " " + stocknum);
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    stocknum: stocknum,
  });

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name} ${category}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Video Game",
      "A physical digital media storage which can be scanned by an electronic device to play video games"
    ),
    categoryCreate(
      1,
      "Trading Card Game",
      "An object that is part of trading card or board game"
    ),
    categoryCreate(
      2,
      "Video Game Console",
      "An electronic device that can play various video games"
    ),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Horizon Zero Dawn",
      "Earth is ours no more Horizon Zero Dawn™ an exhilarating new action role-playing game, developed by the award-winning Guerrilla Games, creators of PlayStation's venerated Killzone franchise. As Horizon Zero Dawn's main protagonist Aloy, a skilled hunter, explore a vibrant and lush world inhabited by mysterious mechanized creatures. Embark on a compelling, emotional journey and unravel mysteries of tribal societies, ancient artifacts and advanced technologies that will determine the fate of this planet, and of life itself. Features: A Lush Post-Apocalyptic World - How have machines dominated this world, and what is their purpose? What happened to the civilization here before? Scour every corner of a realm filled with ancient relics and mysterious buildings in order to uncover your past and unearth the many secrets of a forgotten land. Nature and Machines Collide - Horizon Zero Dawn juxtaposes two contrasting elements, taking a vibrant world rich with beautiful nature and filling it with awe-inspiring highly advanced technology. This marriage creates a dynamic combination for both exploration and gameplay. Defy Overwhelming Odds - The foundation of combat in Horizon Zero Dawn is built upon the speed and cunning of Aloy versus the raw strength and size of the machines. In order to overcome a much larger and technologically superior enemy, Aloy must use every ounce of her knowledge, intelligence, and agility to survive each encounter. Cutting Edge Open World Tech - Stunningly detailed forests, imposing mountains, and atmospheric ruins of a bygone civilization meld together in a landscape that is alive with changing weather systems and a full day/night cycle.",
      categories[0],
      80,
      10
    ),
    itemCreate(
      1,
      "Forespoken",
      "She Will Rise Mysteriously transported from New York City, Frey Holland finds herself trapped in the breathtaking land of Athia. A magical, sentient bracelet is inexplicably wrapped around her arm, and Frey discovers the ability to cast powerful spells and use magic to traverse the sprawling landscapes of Athia. Frey nicknames her new golden companion “Cuff” and sets off to find a way home. Frey soon learns this beautiful land once flourished under the reign of benevolent matriarchs, called Tantas, until a devastating blight relentlessly corrupted everything it touched. The Break transformed animals into beasts, men into monsters, and rich landscapes into four dangerous realms. At the center of their shattered domains, the Tantas now rule as maddened and evil sorceresses.",
      categories[0],
      19.95,
      5
    ),
    itemCreate(
      2,
      "Knack",
      "Mankind must turn to Knack, an unlikely hero, to protect them from a dangerous new threat. The unassuming Knack stands at a mere three feet tall, but thanks to the power of mysterious ancient relics, he can transform into a powerful brute or even a gigantic wrecking machine. Knack is mankind's only hope for turning the tide against the invading goblin army, but trying to harness the true power of the relics could threaten to put the whole world at risk. From Mark Cerny, one of the greatest minds in video games today, Knack is a fun-filled platforming adventure of colossal proportions that invites players to wield fantastic powers and discover a unique and vibrant world, available exclusively for PlayStation®4. Stunning graphics - Detailed characters and environments, 90 minutes of stunning cutscenes, and featuring a unique character that only the PS4 can bring to life. Old-school meets next-gen - Collect relics to power up and smash your way through hordes of goblins, robots, tanks and more! Fun for everyone - Action-packed gameplay features simple controls but challenging and varied enemy AI.Two-Player Co-op - A friend can join the fun at any time with drop-in/drop-out cooperative play",
      categories[0],
      25,
      50
    ),
    itemCreate(
      3,
      "Pokemon Sword & Shield Silver Tempest Booster Pack",
      "Pokemon Sword & Shield Silver Tempest Booster Pack Argent Adventure & Dazzling Discovery!An ominous rumble echoes in the distance, and Lugia VSTAR emerges from the ocean’s depths to answer its call! Uncharted territory lies waiting to be explored alongside Alolan Vulpix VSTAR, while Serperior, Unown, and Mawile join the expedition as Pokémon VSTAR, and a legendary battle awaits as Regieleki VMAX and Regidrago VSTAR awaken from slumber. Discover powerful partnerships in the Trainer Gallery and set a course for adventure with the Pokémon TCG: Sword & Shield—Silver Tempest expansion!",
      categories[1],
      25,
      50
    ),
    itemCreate(
      4,
      "PS5 Console",
      "The PS5® console unleashes new gaming possibilities that you never anticipated. Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio2, and an all-new generation of incredible PlayStation® games. Lightning Speed - Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation® console can do. Stunning Games - Marvel at incredible graphics and experience new PS5™ features. Play a back catalog of supported PS4® games. Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio2 technology. Includes: Console DualSense® Wireless controller 1TB SSD Disc Drive4 2 Horizontal Stand Feet HDMI® cable AC power cord USB cable Printed Materials ASTRO’s PLAYROOM (Pre-installed game) Features: Slim Design - With PS5®, players get powerful gaming technology packed inside a sleek and compact console design. 1TB of Storage - Keep your favourite games ready and waiting for you to jump in and play with 1TB of SSD storage built in. 3 Ultra-High Speed SSD - Maximize your play sessions with near-instant load times for installed PS5® games. Integrated I/O - The custom integration of the PS5® console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible. Ray Tracing - Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5® games. 4K-TV Gaming - Play your favorite PS5® games on your stunning 4K TV. Up to 120fps with 120Hz output - Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays. HDR Technology - With an HDR TV, supported PS5® games display an unbelievably vibrant and lifelike range of colours. Tempest 3D AudioTech - Immerse yourself in soundscapes where it feels as if the sound comes from every direction. Your surroundings truly come alive with Tempest 3D AudioTech2 in supported games. Haptic Feedback - Experience haptic feedback via the DualSense® wireless controller in select PS5® titles and feel the effects and impact of your in-game actions through dynamic sensory feedback. Adaptive Triggers - Get to grips with immersive adaptive triggers, featuring dynamic resistance levels which simulate the physical impact of in-game activities in select PS5® games. Includes ASTRO’S Playroom - Explore four worlds, each one showcasing innovative gameplay using the versatile features of the DualSense® wireless controller, in this game included for all PS5® console users. Backwards Compatibility & Game Boost - The PS5® console can play over 4,000 PS4® games. With the Game Boost feature, you can even enjoy faster and smoother frame rates in some of the PS4® console’s greatest games.",
      categories[2],
      750,
      50
    ),
    itemCreate(
      5,
      "MTG Commander Deck - Draconic Destruction",
      "The perfect introduction to Magic’s most popular format—join your friends in epic multiplayer battles with a ready-to-play MTG deck Each Starter Commander Deck set includes 1 ready-to-play deck of 100 Magic cards—with 1 foil-etched legendary commander card and 99 nonfoil cards, including lands—10 double-sided tokens, 1 deck box, punchout counters, 1 insert with strategy advice for the deck, a summary of the rules for playing Commander, and 1 reference card for guidance on what to do on your turn. Contents: 100-card Commander deck 1 Foil-Etched Legendary card + 99 nonfoil cards 10 double-sided tokens, punchout counters, strategy insert, and reference card Deck box",
      categories[1],
      40.5,
      50
    ),
  ]);
}
