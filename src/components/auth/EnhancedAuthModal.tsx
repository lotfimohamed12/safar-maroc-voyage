import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Chrome, Phone, Mail } from "lucide-react";

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMethod = 'select' | 'email' | 'phone' | 'google';
type AuthStep = 'method' | 'details' | 'otp';

export const EnhancedAuthModal = ({ isOpen, onClose }: EnhancedAuthModalProps) => {
  const { t } = useTranslation();
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const [method, setMethod] = useState<AuthMethod>('select');
  const [step, setStep] = useState<AuthStep>('method');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const resetForm = () => {
    setMethod('select');
    setStep('method');
    setIsSignUp(true);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setOtp('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome to DabaRide.ma!');
        handleClose();
      }
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const metadata = isSignUp ? {
        first_name: firstName,
        last_name: lastName,
        language: 'en'
      } : undefined;

      const { error } = isSignUp 
        ? await signUp(email, password, metadata)
        : await signIn(email, password);

      if (error) {
        toast.error(error.message);
      } else {
        if (isSignUp) {
          toast.success('Please check your email to verify your account');
        } else {
          toast.success('Welcome back to DabaRide.ma!');
        }
        handleClose();
      }
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    // TODO: Implement SMS OTP with Supabase Edge Function
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast.success('Verification code sent!');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    // TODO: Verify OTP and create/login user
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome to DabaRide.ma!');
      handleClose();
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0 && !digits.startsWith('212')) {
      return '+212 ' + digits;
    } else if (digits.startsWith('212')) {
      return '+' + digits;
    }
    return value;
  };

  const renderMethodSelection = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred authentication method
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center gap-3 h-12"
          onClick={handleGoogleAuth}
          disabled={isLoading}
        >
          <Chrome className="h-5 w-5" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center gap-3 h-12"
          onClick={() => {
            setMethod('email');
            setStep('details');
          }}
        >
          <Mail className="h-5 w-5" />
          Continue with Email
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center gap-3 h-12"
          onClick={() => {
            setMethod('phone');
            setStep('details');
          }}
        >
          <Phone className="h-5 w-5" />
          Continue with Phone (OTP)
        </Button>
      </div>

      <Separator />

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm"
        >
          {isSignUp 
            ? 'Already have an account? Sign In' 
            : "Don't have an account? Sign Up"
          }
        </Button>
      </div>
    </div>
  );

  const renderEmailForm = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          {isSignUp ? 'Create Account with Email' : 'Sign In with Email'}
        </h3>
      </div>

      {isSignUp && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <div className="space-y-2">
        <Button 
          onClick={handleEmailAuth}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </Button>
        
        <Button 
          variant="ghost"
          onClick={() => setStep('method')}
          className="w-full text-sm"
        >
          Back to methods
        </Button>
      </div>
    </div>
  );

  const renderPhoneForm = () => {
    if (step === 'details') {
      return (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Phone Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Moroccan phone number
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('auth.phoneNumber')}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('auth.enterPhone')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              className="text-left"
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleSendOTP}
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full"
            >
              {isLoading ? 'Sending...' : t('auth.sendOTP')}
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => setStep('method')}
              className="w-full text-sm"
            >
              Back to methods
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">{t('auth.verify')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('auth.enterOTP')}
          </p>
          <p className="text-sm font-medium">{phoneNumber}</p>
        </div>
        
        <div className="flex justify-center">
          <InputOTP value={otp} onChange={setOtp} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
            className="w-full"
          >
            {isLoading ? 'Verifying...' : t('auth.verify')}
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => setStep('details')}
            className="w-full text-sm"
          >
            {t('auth.resendOTP')}
          </Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (step === 'method') return renderMethodSelection();
    if (method === 'email') return renderEmailForm();
    if (method === 'phone') return renderPhoneForm();
    return renderMethodSelection();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Welcome to DabaRide.ma
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};