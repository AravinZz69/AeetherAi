import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Activity, Search, Clock, ArrowLeft } from "lucide-react";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  created_at: string;
  details: any;
}

interface SearchLog {
  id: string;
  user_id: string;
  search_type: string;
  search_query: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAccess();
  const [users, setUsers] = useState<UserData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch activity logs
      const { data: activities } = await supabase
        .from("activity_logs")
        .select("id, user_id, action, created_at, details")
        .order("created_at", { ascending: false })
        .limit(50);

      // Fetch search history
      const { data: searches } = await supabase
        .from("search_history")
        .select("id, user_id, search_type, search_query, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      setActivityLogs(activities || []);
      setSearchLogs(searches || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none -z-10" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center glow-accent shadow-2xl">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-glow">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Consortium Management & Analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserAvatar />
            </div>
          </div>
          <div className="h-1 w-full gradient-primary rounded-full shadow-lg glow-secondary" />
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Activity Logs</CardTitle>
              <Activity className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activityLogs.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Search Queries</CardTitle>
              <Search className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{searchLogs.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2PM - 5PM</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="glass-card border-primary/20">
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            <TabsTrigger value="searches">Search History</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          {/* Activity Logs Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Real-time user activity across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activityLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 rounded-lg glass-card border border-border/30 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <Activity className="w-4 h-4 text-primary" />
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">
                              User: {log.user_id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {new Date(log.created_at).toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search History Tab */}
          <TabsContent value="searches" className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Search History</CardTitle>
                <CardDescription>Track all search queries made by users</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 rounded-lg glass-card border border-border/30 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <Search className="w-4 h-4 text-primary" />
                          <div>
                            <p className="font-medium">{log.search_query}</p>
                            <p className="text-sm text-muted-foreground">
                              {log.search_type} • User: {log.user_id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {new Date(log.created_at).toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Consortium Members</CardTitle>
                <CardDescription>Manage access for all consortium partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>User management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
