import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, MapPin, Utensils, Mountain, Landmark, Palette, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Suggestion {
  title: string;
  description: string;
  type: string;
}

interface CitySuggestionsProps {
  city: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  restaurant: <Utensils className="h-4 w-4" />,
  landmark: <Landmark className="h-4 w-4" />,
  activity: <MapPin className="h-4 w-4" />,
  nature: <Mountain className="h-4 w-4" />,
  culture: <Palette className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  restaurant: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  landmark: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  activity: 'bg-green-500/10 text-green-600 border-green-500/20',
  nature: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  culture: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

const CitySuggestions: React.FC<CitySuggestionsProps> = ({ city }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    if (!city) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('city-suggestions', {
        body: { city }
      });

      if (error) throw error;
      
      if (data?.suggestions) {
        setSuggestions(data.suggestions);
        setHasLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!city) return null;

  return (
    <Card className="mt-6 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Things to do in {city}
            </CardTitle>
            <CardDescription>
              AI-powered suggestions for your destination
            </CardDescription>
          </div>
          {!hasLoaded && (
            <Button 
              onClick={fetchSuggestions} 
              disabled={loading}
              size="sm"
              className="gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Get Suggestions
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      
      {hasLoaded && suggestions.length > 0 && (
        <CardContent className="pt-0">
          <div className="grid gap-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className={`p-2 rounded-md border ${typeColors[suggestion.type] || 'bg-muted text-muted-foreground'}`}>
                  {typeIcons[suggestion.type] || <MapPin className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchSuggestions}
            disabled={loading}
            className="mt-3 w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Get new suggestions
              </>
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default CitySuggestions;
