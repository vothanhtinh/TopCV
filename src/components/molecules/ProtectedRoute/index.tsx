'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import NoAccess from '../403';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: any) => state.userSlice.user);
  console.log(user);
  return user.role === 'HR' ? <>{children}</> : <NoAccess />;
}
