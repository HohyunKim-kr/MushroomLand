
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DressroomDashboard from "./pages/DressroomDashboard";
import BulletinBoard from "./pages/BulletinBoard";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dressroom" element={<DressroomDashboard />} />
              <Route path="/bulletin" element={<BulletinBoard />} />
              <Route path="/bulletin/:postId" element={<PostDetail />} />
              <Route path="/bulletin/new" element={<PostForm />} />
              <Route path="/bulletin/edit/:postId" element={<PostForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
