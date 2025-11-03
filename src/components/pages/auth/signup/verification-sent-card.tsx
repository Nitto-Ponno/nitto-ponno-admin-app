// components/VerificationSentCard.tsx
import { CheckCircle2, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function VerificationSentCard() {
  const userEmail = 'your.email@example.com'; // Replace with dynamic value

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verification Email Sent
          </CardTitle>
          <CardDescription className="mt-2">
            We&apos;ve sent a confirmation link to
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-lg font-medium">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="break-all">{userEmail}</span>
          </div>

          <p className="text-muted-foreground text-sm">
            Please check your inbox (and spam/junk folder) and click the link to
            verify your account.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <a href={`mailto:${userEmail}`}>
                <Mail className="mr-2 h-4 w-4" />
                Open Email App
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href="/support">
                <HelpCircle className="mr-2 h-4 w-4" />
                Need Help?
              </a>
            </Button>
          </div>

          <p className="text-muted-foreground text-xs">
            Didn’t receive it? Check your spam folder or{' '}
            <button
              onClick={() => alert('Resending email...')} // Replace with real logic
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              resend verification email
            </button>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
export default VerificationSentCard;
