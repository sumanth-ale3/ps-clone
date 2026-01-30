import React, { useState, useEffect } from "react";
import { MapPin, Coffee, Star, RefreshCcw } from "lucide-react";

interface AdventureStoryProps {
  onNext: () => void;
}

const AdventureStory: React.FC<AdventureStoryProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedChoices = localStorage.getItem("storyChoices");
    const savedStep = localStorage.getItem("storyStep");

    if (savedChoices) setChoices(JSON.parse(savedChoices));
    if (savedStep) setCurrentStep(Number(savedStep));
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("storyChoices", JSON.stringify(choices));
    localStorage.setItem("storyStep", String(currentStep));
  }, [choices, currentStep]);

  const storySteps = [
    {
      title: "How Our Date Begins",
      question: "I pick you up where's our first stop?",
      options: [
        { icon: "☕", text: "A cozy café to warm up", value: "cafe" },
        { icon: "🌳", text: "A stroll through the park", value: "park" },
        { icon: "🛍️", text: "Wandering cute little shops", value: "shops" },
      ],
    },
    {
      title: "A Fun Little Moment",
      question: "We find something spontaneous to do… what's your pick?",
      options: [
        { icon: "🎨", text: "Painting or pottery together", value: "art" },
        { icon: "🎯", text: "Arcade or games challenge", value: "arcade" },
        {
          icon: "📷",
          text: "Taking silly photo booth pictures",
          value: "photos",
        },
      ],
    },
    {
      title: "Something Sweet",
      question: "Time for a treat! What's making you smile?",
      options: [
        { icon: "🍦", text: "Ice cream in the sunshine", value: "icecream" },
        {
          icon: "🧋",
          text: "Bubble tea with extra pearls",
          value: "bubbletea",
        },
        { icon: "🍰", text: "A shared slice of cake", value: "cake" },
      ],
    },
    {
      title: "Golden Hour Magic",
      question: "The sun is setting… what should we do?",
      options: [
        { icon: "🏖️", text: "Walk along the beach", value: "beach" },
        { icon: "🏞️", text: "Watch from a scenic hill", value: "hill" },
        { icon: "🌆", text: "Find a rooftop view", value: "rooftop" },
      ],
    },
    {
      title: "The Perfect Ending",
      question: "How does our day together end?",
      options: [
        { icon: "🌌", text: "Laying under the stars", value: "stars" },
        { icon: "🔥", text: "By a warm fireplace", value: "fireplace" },
        { icon: "🍷", text: "Late-night deep talks", value: "deeptalk" },
      ],
    },
  ];

  const makeChoice = (choice: string) => {
    const newChoices = [...choices, choice];
    setChoices(newChoices);

    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetStory = () => {
    setChoices([]);
    setCurrentStep(0);
    localStorage.removeItem("storyChoices");
    localStorage.removeItem("storyStep");
  };

    type StartChoice = "cafe" | "park" | "shops";
  type FunChoice = "art" | "arcade" | "photos";
  type TreatChoice = "icecream" | "bubbletea" | "cake";
  type SunsetChoice = "beach" | "hill" | "rooftop";
  type EndingChoice = "stars" | "fireplace" | "deeptalk";

  const getStoryEnding = (
    choices: [StartChoice, FunChoice, TreatChoice, SunsetChoice, EndingChoice]
  ) => {
    const [start, fun, treat, sunset, ending] = choices;

    const startScenes: Record<StartChoice, string> = {
      cafe: "We'd start in the warm glow of a little café, the smell of coffee wrapping around us like a hug, our smiles as cozy as the mugs in our hands.",
      park: "We'd begin in the park, walking slowly beneath the trees, the sound of leaves and laughter filling the air between us.",
      shops:
        "We'd wander through cute little shops, our fingers brushing as we pointed out silly trinkets and shared quiet smiles.",
    };

    const funScenes: Record<FunChoice, string> = {
      art: "Then, we'd sit side-by-side, painting or making pottery, secretly glancing at each other more than the work in front of us.",
      arcade:
        "Then, we'd hit the arcade your laugh would be the best prize I'd win all day, even if you totally beat me at every game.",
      photos:
        "Then, we'd squeeze into a photo booth, making goofy faces until we both couldn't stop laughing, saving a strip of memories to keep forever.",
    };

    const treatScenes: Record<TreatChoice, string> = {
      icecream:
        "After that, we'd share an ice cream, you stealing the first bite with that mischievous grin I'd pretend to protest.",
      bubbletea:
        "After that, bubble tea in hand, we'd debate who got more pearls and tease each other over the silliest things.",
      cake: "After that, we'd share a slice of cake you'd get the first forkful, of course, because seeing you happy is sweeter than dessert.",
    };

    const sunsetScenes: Record<SunsetChoice, string> = {
      beach:
        "As the sun dipped low, we'd walk along the shore, the waves matching the rhythm of our steps.",
      hill: "As the sun dipped low, we'd sit on a quiet hill, the sky painting a masterpiece just for us.",
      rooftop:
        "As the sun dipped low, we'd find a rooftop view, city lights flickering on like they knew something magical was happening.",
    };

    const endingScenes: Record<EndingChoice, string> = {
      stars:
        "And when night finally fell, we'd lay under the stars, your hand in mine, feeling like the universe had quietly agreed we belonged here.",
      fireplace:
        "And when night finally fell, we'd curl up by the fireplace, the soft crackle of the flames echoing the warmth in my chest.",
      deeptalk:
        "And when night finally fell, we'd stay up talking about everything and nothing, our words slowly turning into sleepy smiles.",
    };

    return {
      title: "Our Perfect Day Together 💖",
      story: `${startScenes[start]} ${funScenes[fun]} ${treatScenes[treat]} ${sunsetScenes[sunset]} ${endingScenes[ending]}`,
      emoji: "💖",
    };
  };

  if (currentStep >= storySteps.length) {
    const ending = getStoryEnding(choices as [
      "cafe" | "park" | "shops",
      "art" | "arcade" | "photos",
      "icecream" | "bubbletea" | "cake",
      "beach" | "hill" | "rooftop",
      "stars" | "fireplace" | "deeptalk"
    ]);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-4 pointer-events-none">
            <img src="https://pngfre.com/wp-content/uploads/nobita-nobi-27.png" alt="Nobita" className="w-24 h-24 object-contain" />
            <img src="https://e7.pngegg.com/pngimages/529/496/png-clipart-shizuka-minamoto-doraemon-cartoon-nobita-nobi-cartoon-doraemon-child-hand.png" alt="Shizuka" className="w-24 h-24 object-contain" />
          </div>
        <div className="max-w-sm w-full mt-4">
          <div className="text-6xl mb-6 animate-bounce">{ending.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-pacifico">
            {ending.title}
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <p className="text-gray-700 leading-relaxed">{ending.story}</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={onNext}
              className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
            >
              Continue Our Story →
            </button>
            <button
              onClick={resetStory}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium w-full"
            >
              <RefreshCcw className="w-4 h-4" /> Pick a Different Story 🌸
            </button>
          </div>
        </div>
      </div>
    );
  }

  const step = storySteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full">
        {/* Progress */}
        <div className="flex justify-center mb-6">
          {storySteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index <= currentStep ? "bg-blue-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
   <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-4 pointer-events-none">
            <img src="https://pngfre.com/wp-content/uploads/nobita-nobi-27.png" alt="Nobita" className="w-24 h-24 object-contain" />
            <img src="https://e7.pngegg.com/pngimages/529/496/png-clipart-shizuka-minamoto-doraemon-cartoon-nobita-nobi-cartoon-doraemon-child-hand.png" alt="Shizuka" className="w-24 h-24 object-contain" />
          </div>
        
  <div className="text-center mb-5">
  <h2 className="text-lg font-semibold text-gray-800">
    {step.title}
  </h2>
  <p className="text-sm text-gray-500 mt-1">
    {step.question}
  </p>
</div>

<div className="space-y-3">
  {step.options.map((option, index) => (
    <button
      key={index}
      onClick={() => makeChoice(option.value)}
      className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-left
                 transition-colors hover:border-blue-300 hover:bg-blue-50"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-500">
        {typeof option.icon === "string" ? (
          <span className="text-lg">{option.icon}</span>
        ) : (
          <option.icon className="w-5 h-5" />
        )}
      </div>

      <span className="text-sm font-medium text-gray-700">
        {option.text}
      </span>
    </button>
  ))}
</div>


        {/* Choices preview + Reset */}
        {choices.length > 0 && (
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Your choices: {choices.join(" + ")} ✨
            </p>
            <button
              onClick={resetStory}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium mx-auto"
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventureStory;
