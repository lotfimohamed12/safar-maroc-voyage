import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SearchForm, SearchData } from "@/components/SearchForm";
import { TransportationModes } from "@/components/TransportationModes";
import { SearchResults } from "@/components/SearchResults";
import heroImage from "@/assets/morocco-travel-hero.jpg";

const Index = () => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [selectedModes, setSelectedModes] = useState<string[]>(["flight", "train", "bus", "carpool"]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    setShowResults(true);
  };

  const handleModeToggle = (mode: string) => {
    setSelectedModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sahara-sand/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-atlas-blue/20" />
        
        <div className="relative container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t('hero.title')}
              <span className="block bg-gradient-to-r from-primary to-desert-sunset bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Transportation Modes */}
      <section className="py-16 px-4">
        <TransportationModes 
          selectedModes={selectedModes}
          onModeToggle={handleModeToggle}
        />
      </section>

      {/* Search Results */}
      {showResults && (
        <section className="py-16 px-4 bg-gradient-to-b from-sahara-sand/10 to-background">
          <div className="container mx-auto">
            <SearchResults destinationCity={searchData?.to} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-card to-sahara-sand/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose RihlaTi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-foreground">All Options</h3>
              <p className="text-muted-foreground">
                Compare flights, trains, buses, and carpools in one place
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-foreground">Best Prices</h3>
              <p className="text-muted-foreground">
                Find the most affordable travel options across Morocco
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-foreground">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book directly or get redirected to trusted providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇦</span>
                <h3 className="text-xl font-bold text-moroccan-gold">RihlaTi</h3>
              </div>
              <p className="text-sm opacity-80">
                Your gateway to exploring Morocco through every mode of transportation.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-moroccan-gold">Travel</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Flights</li>
                <li>Trains</li>
                <li>Buses</li>
                <li>Carpooling</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-moroccan-gold">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Booking Support</li>
                <li>Travel Tips</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-moroccan-gold">Languages</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>العربية</li>
                <li>Français</li>
                <li>English</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 RihlaTi. Made with ❤️ for Morocco travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;