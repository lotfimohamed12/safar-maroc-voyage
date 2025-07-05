import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AuthModal } from "@/components/auth/AuthModal";

export const Header = () => {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-muted sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇲🇦</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-desert-sunset bg-clip-text text-transparent">
              {t('app.name')}
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            {t('app.tagline')}
          </Badge>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            {t('nav.search')}
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            {t('nav.bookings')}
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            {t('nav.help')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
            {t('nav.signIn')}
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-desert-sunset" onClick={() => setShowAuthModal(true)}>
            {t('nav.signUp')}
          </Button>
        </div>
      </div>
    </header>
    </>
  );
};