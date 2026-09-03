import { Hero } from "@/components/landing/Hero";
import { InfoStrip } from "@/components/landing/InfoStrip";
import { Maison } from "@/components/landing/Maison";
import { Signatures } from "@/components/landing/Signatures";
import { Services } from "@/components/landing/Services";
import { Gallery } from "@/components/landing/Gallery";
import { Reviews } from "@/components/landing/Reviews";
import { Infos } from "@/components/landing/Infos";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden bg-creme">
      <Hero />
      <InfoStrip />
      <main>
        <Maison />
        <Signatures />
        <Services />
        <Gallery />
        <Reviews />
        <Infos />
      </main>
      <Footer />
    </div>
  );
}
