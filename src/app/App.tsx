import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { FlexLab } from "./components/FlexLab";
import { Statistics } from "./components/Statistics";
import { TimelineSection } from "./components/Timeline";
import { NewsSection } from "./components/NewsSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="overflow-clip w-full">
      <Header />
      <Hero />
      <Services />
      <FlexLab />
      <Statistics />
      <TimelineSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
