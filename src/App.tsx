import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandIntro from '@/components/BrandIntro';
import Services from '@/components/Services';
import FutureExperiences from '@/components/FutureExperiences';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import ScrollProgress from '@/components/animations/ScrollProgress';

export default function App() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <main>
          <Hero />
          <BrandIntro />
          <Services />
          <FutureExperiences />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
