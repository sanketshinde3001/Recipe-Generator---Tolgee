import { getTranslate } from '@/tolgee/server';
import Recipes from './Recipes';
import { Navbar } from '@/components/Navbar';

export default async function IndexPage() {
  const t = await getTranslate();

  return (
    <div className="min-h-screen bg-[#0f1525]">
      <div className="container mx-auto py-4">
        <Navbar />
        <div className="mt-20">
          <Recipes />
        </div>
      </div>
    </div>
  );
}
