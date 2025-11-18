import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  bio?: string;
  birthdate?: string;
  gender?: string;
  // Creator/Vendor specific fields
  businessName?: string;
  productCategory?: string;
  country?: string;
  state?: string;
  city?: string;
  shopAddress?: string;
  landmark?: string;
  accountType?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  // Social media links
  tiktok?: string;
  instagram?: string;
  facebook?: string;
  snapchat?: string;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const STORAGE_KEY = '@user_profile';

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  React.useEffect(() => {
    // Load saved profile from storage
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (data) {
          try {
            setProfileState(JSON.parse(data));
          } catch (error) {
            console.error('Error parsing profile data:', error);
            // Clear corrupted data
            AsyncStorage.removeItem(STORAGE_KEY);
          }
        }
      })
      .catch((error) => {
        console.error('Error loading profile:', error);
      });
  }, []);

  const setProfile = async (newProfile: UserProfile) => {
    setProfileState(newProfile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const currentProfile = profile || {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
    };
    const updatedProfile = { ...currentProfile, ...updates };
    setProfileState(updatedProfile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
  };

  const clearProfile = async () => {
    setProfileState(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, updateProfile, clearProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}

