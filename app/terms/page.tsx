import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="w-full flex justify-center p-10">
      <div className="w-full max-w-screen-md space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Chatbot (Where the fun is)
        </Link>
        <h1 className="text-3xl font-bold text-center">🚨 Terms of Capy 🚨</h1>
        <h2 className="text-2xl font-semibold text-center">
          The only thing more boring than this is waiting for a capybara to move out of your way 🦫
        </h2>
        
        <p className="text-center italic text-gray-600">
          TL;DR: Don’t take Capy too seriously, don’t blame Capy for anything, and if you get rich from Capy’s wisdom, a snack donation would be appreciated.
        </p>

        <ol className="list-decimal list-inside space-y-4">
          <li className="text-gray-700">
            <span className="font-semibold">🐾 You Agree to The Capy Code:</span> 
            By using Capy, you acknowledge that you are in the presence of supreme financial wisdom (and cuteness). If you don’t agree with these terms, just… don’t use Capy. Simple.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">📜 No Fancy Promises:</span> 
            Capy is provided “as is” and “as available,” just like a capybara’s willingness to move. No guarantees, no warranties—just vibes.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">💤 Availability? Maybe.</span> 
            Capy might be here. Capy might be napping. Capy might be pondering existential finances. Either way, no promises that Capy will always be around. 
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">⚠️ Capy Has No Insurance:</span> 
            If you take financial advice from a virtual capybara and it goes sideways, that’s on you. Capy does not cover damages, losses, or missing fingers due to reckless petting.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">🧐 Don’t Expect Legal or Financial Genius:</span> 
            Capy is here for fun, laughs, and questionable financial wisdom. If you make millions from Capy’s advice, consider sharing some grass or snacks in return.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">🚀 Use Responsibly:</span> 
            If you do something outrageous because Capy said so, that’s on you. Think before acting—unlike Capy when it sees an unguarded snack.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">🔐 Privacy? Eh, Not Really:</span> 
            Capy does not store your secrets. But, if you tell Capy something important, assume the squirrels are listening.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">🤝 You Promise to Keep Capy Happy:</span> 
            That means no suing Capy, no getting mad at Capy, and absolutely no attempts to train Capy to do taxes.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">🔄 Terms Might Change:</span> 
            Just like a capybara’s mood, these terms can change at any time. Keep up, or don’t—it’s your call.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">⚖️ Legal Stuff (Ugh, Fine):</span> 
            These terms follow the laws of the land, wherever that land is. Probably somewhere capybaras exist.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">📬 Need to Complain?</span> 
            Send a message to <a href="mailto:capy@askcapy.com" className="underline">capy@askcapy.com</a>. It may or may not be read (Capy is busy).
          </li>
        </ol>

        <p className="text-center text-gray-600 mt-6">
          🎵 Fun Fact: Capybaras can hold their breath for up to 5 minutes. You, however, cannot avoid these terms.  
        </p>
      </div>
    </div>
  );
}
