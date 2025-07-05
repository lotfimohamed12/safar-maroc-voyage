import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TransportationModesProps {
  selectedModes: string[];
  onModeToggle: (mode: string) => void;
}

const transportModes = [
  {
    id: "flight",
    icon: "✈️",
    name: "Flights",
    providers: ["Royal Air Maroc", "Air Arabia"],
    avgTime: "1-2h",
    color: "atlas-blue"
  },
  {
    id: "train",
    icon: "🚆",
    name: "Trains",
    providers: ["ONCF", "Al Boraq"],
    avgTime: "2-4h",
    color: "moroccan-gold"
  },
  {
    id: "bus",
    icon: "🚌",
    name: "Buses",
    providers: ["CTM", "Supratours"],
    avgTime: "3-8h",
    color: "moroccan-red"
  },
  {
    id: "carpool",
    icon: "🚗",
    name: "Carpool",
    providers: ["BlaBlaCar", "Local drivers"],
    avgTime: "Variable",
    color: "accent"
  }
];

export const TransportationModes = ({ selectedModes, onModeToggle }: TransportationModesProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
        Choose Your Transport
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {transportModes.map((mode) => {
          const isSelected = selectedModes.includes(mode.id);
          
          return (
            <Card 
              key={mode.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-elevated)] ${
                isSelected 
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-[var(--shadow-soft)]' 
                  : 'border-muted hover:border-primary/50 bg-gradient-to-br from-card to-sahara-sand/20'
              }`}
              onClick={() => onModeToggle(mode.id)}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">{mode.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{mode.name}</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {mode.avgTime}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {mode.providers.map((provider, idx) => (
                      <div key={provider} className="truncate">
                        {provider}
                        {idx < mode.providers.length - 1 && ", "}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={`w-full transition-all ${
                    isSelected 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'border-muted hover:border-primary hover:bg-primary/10'
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};