// typings/next-auth-react.d.ts
declare module "next-auth/react" {
    export function useSession(): {
      data: any; // Session?
      status: "authenticated" | "unauthenticated" | "loading";
    };
    export function signOut(...args: any[]): void;
    export function signIn(...args: any[]): void;
    export const SessionProvider: (props: any) => any;
  }
  