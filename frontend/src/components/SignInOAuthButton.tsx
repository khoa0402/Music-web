import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="w-full text-white h-9 text-xs"
    >
      <img src="/Google_icon.png" alt="Google icon" className="size-4" />
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButtons;
