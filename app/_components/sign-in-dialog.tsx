import Image from "next/image";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
    const handleLoginWithGoogleClick = async () => {
        try {
            const result = await signIn('google', {
                callbackUrl: window.location.origin,
                redirect: false
            })

            if (result?.error) {
                console.error('Sign-in error:', result.error)
                // Handle error appropriately
            }
        } catch (error) {
            console.error('Sign-in failed:', error)
            // Show user-friendly error message
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>Conecte-se usando sua conta do Google.</DialogDescription>

            </DialogHeader>

            <Button variant="outline" className="gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                <Image alt="Fazer login com Google" src="/google.svg" width={18} height={18} />
                Google
            </Button>

        </>
    )
}

export default SignInDialog;