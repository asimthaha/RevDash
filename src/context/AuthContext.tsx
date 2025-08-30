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
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error in initial auth check:", error);
        setUser(null); // If auth itself fails, clear user
        setProfile(null);
      }
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
      }
      setIsLoading(false);
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
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile(data);
      } else if (user.user_metadata?.full_name) {
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            full_name: user.user_metadata.full_name,
            email: user.email || "",
          })
          .select()
          .single();
        setProfile(newProfile);
      } else {
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            full_name: user.email || "",
            email: user.email || "",
          })
          .select()
          .single();
        setProfile(newProfile);
      }
    } catch (error) {
      console.error("Error fetching/creating profile:", error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = { user, isLoading, signIn, signUp, signOut, profile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
