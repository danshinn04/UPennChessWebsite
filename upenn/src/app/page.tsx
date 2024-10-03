import { Boxes } from '@/components/ui/background-boxes';  // Adjust the import path if necessary

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Boxes */}
      <div className="relative mb-12">
        <Boxes />
      </div>


    </div>
  );
}
