import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UserProvider } from '@/contexts/UserContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import NotFound from '@/pages/not-found';
import Landing from '@/pages/Landing';
import Onboarding from '@/pages/Onboarding';
import Discover from '@/pages/Discover';
import Profile from '@/pages/Profile';
import PersonProfile from '@/pages/PersonProfile';
import ProfileEdit from '@/pages/ProfileEdit';
import AIMatch from '@/pages/AIMatch';
import Messages from '@/pages/Messages';
import Rooms from '@/pages/Rooms';
import Settings from '@/pages/Settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/discover" component={Discover} />
      <Route path="/profile" component={Profile} />
      <Route path="/people/:id" component={PersonProfile} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/ai-match" component={AIMatch} />
      <Route path="/messages" component={Messages} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
