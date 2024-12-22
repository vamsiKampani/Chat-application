import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import { Chat } from './components/Chat';

function App() {
  const { user, loading } = useAuthStore();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      useAuthStore.setState({
        user: session?.user ?? null,
        loading: false,
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {user ? <Chat /> : <Auth />}
    </>
  );
}

export default App;