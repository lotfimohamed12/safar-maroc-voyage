import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    
    // TODO: Integrate with Supabase Auth for SMS OTP
    // This would typically send OTP via your backend
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
    
    // TODO: Verify OTP with Supabase Auth
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome to DabaRide.ma!');
      onClose();
      // Reset form
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add +212 prefix if not present
    if (digits.length > 0 && !digits.startsWith('212')) {
      return '+212 ' + digits;
    } else if (digits.startsWith('212')) {
      return '+' + digits;
    }
    
    return value;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'phone' ? t('auth.login') : t('auth.verify')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {step === 'phone' ? (
            <div className="space-y-4">
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
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || !phoneNumber.trim()}
                className="w-full"
              >
                {isLoading ? 'Sending...' : t('auth.sendOTP')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
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
                  onClick={() => setStep('phone')}
                  className="w-full text-sm"
                >
                  {t('auth.resendOTP')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};