'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // Redirect based on role
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        if (session?.user?.role === 'customer') {
          router.push('/customer/dashboard');
        } else if (session?.user?.role === 'employee') {
          router.push('/employee/dashboard');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-50 via-calm-50 to-spa-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-calm-500 rounded-lg" />
            <h1 className="text-2xl font-display font-bold text-calm-900">
              Serene Spa
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-calm-900 mb-2">Welcome Back</h2>
          <p className="text-calm-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-calm-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-sage-600 hover:text-sage-700 font-medium">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-spa-200">
          <p className="text-xs text-calm-500 text-center">
            Demo Credentials:
          </p>
          <div className="mt-2 space-y-1 text-xs text-calm-600 text-center">
            <p>Customer: customer@example.com / customer123</p>
            <p>Employee: employee@example.com / employee123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
