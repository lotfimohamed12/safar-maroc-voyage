import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import transportConfig from "@/config/transportModes.json";

interface TransportationModesProps {
  selectedModes: string[];
  onModeToggle: (mode: string) => void;
}

const avgTimes: Record<string, string> = {
  train: "2-4h",
  bus: "3-8h",
  flight: "1-2h",
  carpool: "Variable"
};

export const TransportationModes = ({ selectedModes, onModeToggle }: TransportationModesProps) => {
  const { t, i18n } = useTranslation();
  const transportModes = transportConfig.transportModes;
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
        {t('transport.title')}
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
                <h3 className="text-xl font-semibold text-foreground">{t(`transport.${mode.id}`)}</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {avgTimes[mode.id] || "Variable"}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {mode.providers.map((provider, idx) => (
                      <div key={provider.name} className="truncate">
                        {provider.name}
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
                  {isSelected ? t('transport.selected') : t('transport.select')}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};