import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserRole = 'user' | 'creator' | 'vendor';

interface UserRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

const STORAGE_KEY = '@user_role';

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('user');

  React.useEffect(() => {
    // Load saved role from storage
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setRoleState(data as UserRole);
      }
    });
  }, []);

  const setRole = async (newRole: UserRole) => {
    setRoleState(newRole);
    await AsyncStorage.setItem(STORAGE_KEY, newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}

