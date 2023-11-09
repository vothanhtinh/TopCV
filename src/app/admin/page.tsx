'use client';
import ProtectedRoute from '@/components/molecules/ProtectedRoute';
import { useGetProfileAccount } from '@/queries/auth/useGetAccount';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Test() {
  const { data, isLoading } = useGetProfileAccount();
  return <ProtectedRoute>{JSON.stringify(data)}</ProtectedRoute>;
}
