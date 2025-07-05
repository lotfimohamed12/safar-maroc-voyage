import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-muted sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇲🇦</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-desert-sunset bg-clip-text text-transparent">
              RihlaTi
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            Morocco Travel
          </Badge>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Search
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            My Bookings
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Help
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-desert-sunset">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};