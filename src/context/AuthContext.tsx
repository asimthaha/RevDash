import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import supabase from "@/utils/supabase";
import { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Master timeout - after 5 seconds, force isLoading to false
      const masterTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("❌ Error in initial auth check:", error);
        setUser(null); // If auth itself fails, clear user
        setProfile(null);
      }
      // Clear master timeout on normal completion
      clearTimeout(masterTimeout);
      setIsLoading(false);
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setUser(session?.user ?? null); // Keep user if session exists, even if profile fails
        setProfile(null);
      } finally {
        // Always ensure loading is false after auth state change completes
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    const { error } = await (supabase.auth.signUp as any)({
      email,
      password,
      data: metadata,
    });
    return { error: error?.message };
  };

  const fetchProfile = async (user: User) => {
    try {
      // Add timeout to prevent hanging
      const profilePromise = supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // Timeout after 3 seconds (faster for debugging)
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Profile fetch timed out after 3 seconds"));
        }, 3000);
      });

      const { data, error } = (await Promise.race([
        profilePromise,
        timeoutPromise,
      ])) as any;

      if (data) {
        setProfile(data);
      } else {
        let profileData;

        if (user.user_metadata?.full_name) {
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({
              user_id: user.id,
              full_name: user.user_metadata.full_name,
              email: user.email || "",
            })
            .select()
            .single();

          profileData = newProfile;
        } else {
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({
              user_id: user.id,
              full_name: user.email || "",
              email: user.email || "",
            })
            .select()
            .single();

          profileData = newProfile;
        }

        if (profileData) {
          setProfile(profileData);
        } else {
          console.warn("⚠️ Profile creation succeeded but no data returned");
        }
      }
    } catch (error) {
      console.error("❌ Unexpected error in fetchProfile:", error);
      // If we get here, isLoading might still be stuck, so ensure it's set to false
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    // Set loading state before sign out operation
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      }
      // Clear user state
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      // Still clear user state on error
      setUser(null);
      setProfile(null);
    }
    // Always set loading to false after operation completes
    setIsLoading(false);
  };
  const value = { user, isLoading, signIn, signUp, signOut, profile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
