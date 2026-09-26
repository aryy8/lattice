export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: "google";
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  loginWithUser: (user: User) => void;
  logout: () => void;
  clientId: string;
}
