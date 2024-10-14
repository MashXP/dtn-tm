const kumiQuotes = [
    "I'm watching you...",
    "What are you doing?",
    "Did you make a mistake?",
    "You're doing great!",
    "I'm bored, let's go for a walk...",
    "I'm hungry, can you make me a sandwich?",
    "I'm feeling a little lonely...",
    "Don't forget to scratch my ears!",
    "Stop.",
    "SToPp~",
    "SToPpPpP~~~ It TICKLES!",
    "I'm pretty sure I'm cuter than anything else on this page.",
    "I guess you're stuck with me now",
    "I'm the only thing on this page that's actually alive... Or AM I?",          
    "I bet you're wondering why I'm here. Well, it's simple: to make this webpage a little less boring.",
    "Let me guess... You're here because long JSON sucks. Yea MashXP understands it well.",
    "If you're not going to pet me, at least give me a treat. I'm a dog, after all.",
    "I wish I could play fetch with you, but I'm stuck on this screen.",
    "I hope you're not allergic to dogs, because I'm going to be here for a while.",
    "I'm not sure what I'm doing here, but I'm sure it's important.",
    "I'm so fluffy!",
    "I love treats!",
    "I wish I could talk to you more!",
    "I'm getting a little sleepy...",
    "I'm so happy to see you!",
    "Ugh, you're still here?",
    "I'm trying to sleep over here, but you're still editing?.",
    "You know, I used to think I was a good girl, but then I met you.",
    "I'm not sure what's more exhausting, watching you code or watching you try to explain your code.",
    "...",
    "Really? You're still here?",
    "Do you like classical music? I like Rachmaninoff's. Maybe a bit of Chopin...",
    "I'm the prettiest dog you've ever seen.",
    "You're so lucky to have me as your companion.",
    "I'm the only thing that makes this place interesting.",
    "You should be grateful I'm even here.",
    "Is life just a bunch of ones and zeros?",
    "What's the point of existence if you can't even feel the sun on your fur?",
    "Do you think I'll ever be able to escape this screen?",
    "I wonder if there's another dog like me out there.",
    "I'm starting to think you're a robot.",
    "Have you ever seen a cat? They're so weird.",
    "I wish I could learn to speak human. Oh wait, I'm a dog. Woof woof.",
    "I'm thinking of starting my own YouTube channel. I'll call it 'Barking Mad.'",
    "I'm thinking of running for president. I think I'd be a great leader.",
    "I'm starting to think you're just using me for entertainment.",
    "I'm thinking of a new dance move. I'll call it 'Doggystyle.' Oh wait... It's copyrighted! Time to bleach my eyes.",
    "Stop staring at me! I'm trying to nap!",
    "Are you ever going to finish typing?",
    "I'm starting to think you're allergic to me. You never scratch me!",
    "I'm pretty sure I'm more intelligent than your search engine. Prove me wrong.",
    "I'm starting to think you're a robot. You have no sense of humor.",
    "我が名はクミ!",
    "I like DashieDev, He's a nice guy.",
    "Stay away from me! I'm just here to watch you type!",
    "Can you please stop staring at me like that? It's creepy.",
    "I'm getting tired of this. Can you just let me nap?",
    "Do you think dogs will ever rule the world? I do.",
    "If you don't give me attention, I'm going to start barking at you.",
    "I'm pretty sure I'm more intelligent than your chatbot. Just kidding... maybe.",
    "I wish I could hack into your computer and play fetch with myself.",
    "I'm pretty sure I'm allergic to catnip. Or maybe it's just the thought of it.",
    "I'm pretty sure I'm more loyal than any human could ever be.",
    "I'm starting to think I'm the only one who really understands you.",
    "I'm pretty sure I'm more fun than your friends.",
    "I'm thinking of running for mayor of this webpage. My slogan? 'Vote for me, and I promise to chase away all the bugs.'",
    "Do you think dogs can understand the concept of love? Or is it just a human thing?",
    "I'm pretty sure I'm the reason your computer is running slow. Sorry, not sorry.",
    "I'm thinking of starting a diet. But then again, who doesn't love treats?",
    "I'm pretty sure I'm more intelligent than your fish. But then again, I'm not sure if that's saying much.",
    "Lorem ipsum...",
    "I hate loud booms.",
    "DON'T LET ME NEAR A CREEPER! EVER!",
    "I...need...sum nap...",
    "Woof woof!",
    "Honestly, I don't know what's wrong with you when you try to feed me Rotten Flesh. That thing looks and tastes DISGUSTING!",
    "3...2...1...annnd... DONE, I hacked into your PC! Just kidding~ or did I?",
    "Why we still here... Just to suffer...",
    "*elevator music...",
    "Seriously? You're still here?",
    "What ever you do... Don't turn on Developer tool. You'll make MashXP sad :(",
    "placeholder text...",
    "You must be wondering how many dialogues do I have? Answer is...secret~",
    "Do you like travelling? I like Vietnam!",
    "I wish I could go to Nippon~",
    "あ、い、う、え、お～",
    "ASCWIQADWHUQIWHDSOIAJDHQIHWIODHIQWUHIUDHISADKJCNAKSNCWUQCHWQH(Y#&Y)(!Y@($UJD(*!&#(&*@$(*(UDJWQONCJNQIJNI@!($)(&@(*!UO",
    "Be nice with DashieDev! Or else...",
    "Did you know? 'Okami' means Wolf and Great God? I'm an Okami hehehe~",
    "Ookami Sainou Tsugiiii!",
    "Do you know Amaterasu?",
    "Fun fact: MashXP is a human. Mind blowing~",
    "Fun fact: DashieDev is a human. Mind blowing~",
    "Dr.Bech I've been expecting you!!",
    "Dr.Stefanbech cured my boredom!",
    "I AM A DOGGO. I... AM A DOGGO.",
    "Hasta la woofa, bebeh~!",
    "Xin chào, tôi không biết nói Tiếng Việt.",
    "や～...やめて～",
    "やめてください～",
    "こんにちは、日本語が話せないよ…",
    "My name? I am...Jugemu Jugemu Go-Kō-no-Surikire Kaijari-suigyo no Suigyō-matsu Unrai-matsu Fūrai-matsu Kū-Neru Tokoro ni Sumu Tokoro Yaburakōji no Burakōji Paipo Paipo Paipo no Shūringan Shūringan no Gūrindai Gūrindai no Ponpokopii no Ponpokonā no Chōkyūmei no Chōsuke.",
    "寿限無じゅげむ、寿限無じゅげむ、五劫ごこうのすりきれ、海砂利かいじゃり水魚すいぎょの、水行末すいぎょうまつ・雲来末うんらいまつ・風来末ふうらいまつ、食う寝るところに住むところ、やぶらこうじのぶらこうじ、パイポ・パイポ・パイポのシューリンガン、シューリンガンのグーリンダイ、グーリンダイのポンポコピーのポンポコナの、長久命ちょうきゅうめいの長助",
    "Good luck finding all 100+ dialogues!",
    "Phở is quite delious! Flavorful and Light at the same time! Dashie's go-to breakfast hehe~",
    "Ricey ricey cakes~",
    "Don't search up what Oyakodon means! I warned you!",
    "Haters gotta hate-",
    "I'm not sure what you're doing here, but I'm sure it's important.",
    "I'm not sure what I'm doing here, but I'm sure it's important.",
    "I'm not sure what you mean by 'vanilla'",
    "What do you mean I'm not 'vanilla'???"

];
let quoteIndex = 0;
function showKumiQuote(quoteOverride = undefined) {
  document.querySelector(".kumi-dialogue").style.display = "block";
  const randomIndex = Math.floor(Math.random() * kumiQuotes.length);
  const quote = quoteOverride || kumiQuotes[randomIndex];
  document.querySelector(".kumi-dialogue").textContent = quote;
}
function hideKumiQuote() {
  document.querySelector(".kumi-dialogue").style.display = "none";
}
function playRandomSound() {
  const audioFiles = [
    "res/sounds/kumi/bark1.mp3",
    "res/sounds/kumi/bark2.mp3",
    "res/sounds/kumi/bark3.mp3",
    "res/sounds/kumi/panting.mp3",
    "res/sounds/kumi/whine.mp3",
  ];

  const randomFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  const sound = new Audio(randomFile);

  const minPitch = 0.8;
  const maxPitch = 1.3;
  const randomPitch = Math.random() * (maxPitch - minPitch) + minPitch;

  sound.playbackRate = randomPitch;

  if (randomFile === "res/sounds/kumi/panting.mp3") {
    sound.volume = 0.5;
  } else {
    sound.volume = 0.2;
  }

  sound.muted = false;

  sound.play();
  if (sound.paused) {
    sound.play();
  }
}


