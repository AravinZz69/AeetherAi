import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useActivityLogger = () => {
  const { user } = useAuth();

  const logActivity = async (action: string, details?: any) => {
    if (!user) return;

    try {
      await supabase.from("activity_logs").insert({
        user_id: user.id,
        action,
        details,
      });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  const logSearch = async (searchType: string, searchQuery: string) => {
    if (!user) return;

    try {
      await supabase.from("search_history").insert({
        user_id: user.id,
        search_type: searchType,
        search_query: searchQuery,
      });
    } catch (error) {
      console.error("Error logging search:", error);
    }
  };

  return { logActivity, logSearch };
};
