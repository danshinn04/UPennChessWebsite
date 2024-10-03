import { Boxes } from '@/components/ui/background-boxes';  // Adjust the import path if necessary
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Boxes */}
      <div className="relative mb-12">
        <Boxes />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-red-800 text-white p-6 w-1/4 min-h-screen">
          <div className="flex flex-col items-center">
            <Image
              src="/upenn-logo.png"  // Ensure your logo is placed in the public folder
              alt="UPenn Chess Club Logo"
              width={150}
              height={150}
              className="mb-6"
            />
            <nav>
              <ul className="space-y-4">
                <li><Link href="#executive-board">Executive Board</Link></li>
                <li><Link href="#team">Team</Link></li>
                <li><Link href="#events">Events</Link></li>
                <li><Link href="#facebook-group">Facebook Group</Link></li>
                <li><Link href="#chess-group">Chess.com Group</Link></li>
                <li><Link href="#contact">Contact</Link></li>
              </ul>
            </nav>
            <div className="mt-10 text-sm text-center">
              <p>We are always looking for new members!</p>
              <p>Email: upennchessclub@gmail.com</p>
              <p>Instagram: <a href="https://www.instagram.com/upennchess/" className="underline">UPenn Chess Club</a></p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to the UPenn Chess Club</h1>
            <p className="text-lg text-gray-700">Whether you're new to chess or a seasoned player, we welcome everyone to join us!</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Updates: Winter 2024</h2>
            <p>Weekly meetings return on 1/24 from 8-10 PM in Houston Market. Stay tuned for more information on events and tournaments!</p>
            <blockquote className="mt-6 italic text-gray-600">"The beauty of chess is it can be whatever you want it to be. It transcends language, age, and background." – Simon Williams</blockquote>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <p>Our leadership team is listed on the Executive Board tab, and all upcoming events will be posted under the Events tab. For inquiries, contact us through the Contact tab.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
