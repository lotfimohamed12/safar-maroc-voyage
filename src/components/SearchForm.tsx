import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, ArrowRightLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  from: string;
  to: string;
  date: Date;
  passengers: number;
}

const moroccanCities = [
  "Casablanca", "Rabat", "Fès", "Marrakech", "Agadir", "Tanger", 
  "Meknès", "Oujda", "Tétouan", "Salé", "Kénitra", "El Jadida",
  "Beni Mellal", "Khemisset", "Nador", "Settat"
];

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { t } = useTranslation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = useState(1);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const handleSwapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      onSearch({ from, to, date, passengers });
    }
  };

  const filterCities = (query: string) => {
    return moroccanCities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-card to-sahara-sand/30 shadow-[var(--shadow-elevated)] border-0">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From City */}
          <div className="md:col-span-4 relative">
            <label className="block text-sm font-medium mb-2 text-foreground">{t('search.from')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => setShowFromSuggestions(true)}
                placeholder="Casablanca"
                className="pl-10 h-12 border-muted focus:border-primary transition-colors"
              />
              {showFromSuggestions && from && (
                <div className="absolute top-full left-0 right-0 bg-card border border-muted rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filterCities(from).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setFrom(city);
                        setShowFromSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-sahara-sand/50 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSwapCities}
              className="h-12 w-12 rounded-full border-muted hover:border-primary hover:bg-primary/10 transition-all"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* To City */}
          <div className="md:col-span-4 relative">
            <label className="block text-sm font-medium mb-2 text-foreground">{t('search.to')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setShowToSuggestions(true);
                }}
                onFocus={() => setShowToSuggestions(true)}
                placeholder="Marrakech"
                className="pl-10 h-12 border-muted focus:border-primary transition-colors"
              />
              {showToSuggestions && to && (
                <div className="absolute top-full left-0 right-0 bg-card border border-muted rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filterCities(to).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setTo(city);
                        setShowToSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-sahara-sand/50 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-foreground">{t('search.departure')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-muted hover:border-primary",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMM dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Passengers */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-foreground">{t('search.passengers')}</label>
            <Input
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              className="h-12 border-muted focus:border-primary transition-colors"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-primary to-desert-sunset hover:opacity-90 transition-opacity text-lg font-medium"
          disabled={!from || !to}
        >
          {t('search.searchButton')}
        </Button>
      </form>
    </Card>
  );
};