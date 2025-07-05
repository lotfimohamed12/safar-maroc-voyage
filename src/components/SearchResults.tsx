import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";

interface TripOption {
  id: string;
  type: "flight" | "train" | "bus" | "carpool";
  provider: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  seats: number;
  rating?: number;
  amenities?: string[];
}

interface SearchResultsProps {
  results?: TripOption[];
  loading?: boolean;
}

const mockResults: TripOption[] = [
  {
    id: "1",
    type: "flight",
    provider: "Royal Air Maroc",
    from: "Casablanca",
    to: "Marrakech",
    departureTime: "08:30",
    arrivalTime: "09:15",
    duration: "45m",
    price: 450,
    currency: "MAD",
    seats: 12,
    rating: 4.2,
    amenities: ["WiFi", "Meal"]
  },
  {
    id: "2",
    type: "train",
    provider: "Al Boraq",
    from: "Casablanca",
    to: "Marrakech",
    departureTime: "10:00",
    arrivalTime: "12:20",
    duration: "2h 20m",
    price: 280,
    currency: "MAD",
    seats: 8,
    rating: 4.5,
    amenities: ["WiFi", "AC", "Cafe"]
  },
  {
    id: "3",
    type: "bus",
    provider: "CTM",
    from: "Casablanca",
    to: "Marrakech",
    departureTime: "14:30",
    arrivalTime: "17:45",
    duration: "3h 15m",
    price: 85,
    currency: "MAD",
    seats: 15,
    rating: 4.0,
    amenities: ["AC", "Restroom"]
  },
  {
    id: "4",
    type: "carpool",
    provider: "BlaBlaCar",
    from: "Casablanca",
    to: "Marrakech",
    departureTime: "16:00",
    arrivalTime: "19:00",
    duration: "3h",
    price: 120,
    currency: "MAD",
    seats: 3,
    rating: 4.8,
    amenities: ["Music", "Non-smoking"]
  }
];

const typeIcons = {
  flight: "✈️",
  train: "🚆",
  bus: "🚌",
  carpool: "🚗"
};

const typeColors = {
  flight: "atlas-blue",
  train: "moroccan-gold",
  bus: "moroccan-red",
  carpool: "accent"
};

export const SearchResults = ({ results = mockResults, loading = false }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
              <div className="h-10 bg-muted rounded w-20"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Available Trips ({results.length})
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Sort by Price
          </Button>
          <Button variant="outline" size="sm">
            Sort by Time
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((trip) => (
          <Card 
            key={trip.id} 
            className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 border-muted hover:border-primary/50 bg-gradient-to-r from-card to-sahara-sand/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{typeIcons[trip.type]}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{trip.provider}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}
                      </Badge>
                      {trip.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-moroccan-gold text-moroccan-gold" />
                          <span>{trip.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{trip.from}</span>
                    <span className="text-primary font-mono">{trip.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{trip.to}</span>
                    <span className="text-primary font-mono">{trip.arrivalTime}</span>
                  </div>
                </div>

                {trip.amenities && (
                  <div className="flex gap-2 flex-wrap">
                    {trip.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-right space-y-3">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {trip.price} {trip.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trip.seats} seats left
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-primary to-desert-sunset hover:opacity-90 transition-opacity">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};