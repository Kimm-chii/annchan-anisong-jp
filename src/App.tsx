import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Music from "./components/Music";
import Community from "./components/Community";
import Footer from "./components/Footer";
import IntroSplash from "./components/IntroSplash";
import OpenGraphHead from "./components/OpenGraphHead";
import GrainOverlay from "./components/GrainOverlay";
import AmbientGlowBackground from "./components/AmbientGlowBackground";

export default function App() {
  return (
    <div className="min-h-screen text-gray-800 font-sans selection:bg-pink-200 selection:text-pink-900">
      <GrainOverlay />
      <AmbientGlowBackground />
      <OpenGraphHead />
      <IntroSplash />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
