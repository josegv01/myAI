import { FOOTER_MESSAGE } from "@/configuration/ui";
import Link from "next/link";

export default function ChatFooter() {
  return (
    <div className="w-full text-xs flex pt-2 text-gray-500">
      <div className="flex-grow text-left">
        {/* Left Pane */}
        <Link href="/terms" className="hover:underline">
          Boring Legal Stuff
        </Link>
      </div>
      <div className="flex-grow text-center">
        {/* Center Pane */}
        {FOOTER_MESSAGE}
      </div>
      <div className="flex-grow text-right">
        {/* Right Pane */}
        {/* Sorry professor Ringerl! Capy was here and changed some stuff around!. */}
        <a
          href="www.askcapy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by one very smart capybara
        </a>
      </div>
    </div>
  );
}
