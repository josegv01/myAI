import { FOOTER_MESSAGE } from "@/configuration/ui";
import Link from "next/link";

export default function ChatFooter() {
  return (
    <div className="w-full text-xs flex pt-2 text-gray-500">
      <div className="flex-grow text-left">
        {/* Left Pane */}
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
      <div className="flex-grow text-center">
        {/* Center Pane */}
        {FOOTER_MESSAGE}
      </div>
      <div className="flex-grow text-right">
        {/* Right Pane */}
        {/* Capy was here!. */}
        <a
          href="http://www.askcapy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by one very smart capybara
        </a>
      </div>
    </div>
  );
}
