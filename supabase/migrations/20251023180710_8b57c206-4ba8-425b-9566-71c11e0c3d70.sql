-- Force types regeneration by adding a comment to existing table
COMMENT ON TABLE public.profiles IS 'User profile information including contact details and location';
COMMENT ON TABLE public.user_roles IS 'User role assignments for authorization';
COMMENT ON TABLE public.activity_logs IS 'User activity tracking and audit logs';
COMMENT ON TABLE public.search_history IS 'User search query history';
COMMENT ON TABLE public.login_history IS 'User login activity tracking';

-- Verify all tables exist and are accessible
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
  AND tablename IN ('profiles', 'user_roles', 'activity_logs', 'search_history', 'login_history');