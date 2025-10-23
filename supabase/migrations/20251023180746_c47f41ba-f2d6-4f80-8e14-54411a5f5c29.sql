-- Create a temporary table to force types regeneration
CREATE TABLE IF NOT EXISTS public._types_refresh_trigger (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now()
);

-- Drop it immediately
DROP TABLE IF EXISTS public._types_refresh_trigger;

-- Refresh the publication for realtime (this sometimes triggers types refresh)
ALTER PUBLICATION supabase_realtime SET (publish = 'insert, update, delete, truncate');

-- Grant necessary permissions on all tables to ensure types generation works
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT SELECT ON public.user_roles TO anon, authenticated;
GRANT SELECT ON public.activity_logs TO anon, authenticated;
GRANT SELECT ON public.search_history TO anon, authenticated;
GRANT SELECT ON public.login_history TO anon, authenticated;