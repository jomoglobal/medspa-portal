'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Select from '@/components/Select';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // In a real app, you would send this to your API
    // For demo purposes, we'll just redirect to login
    setTimeout(() => {
      router.push('/auth/login');
    }, 1000);
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
          <h2 className="text-3xl font-bold text-calm-900 mb-2">Create Account</h2>
          <p className="text-calm-600">Join us for your wellness journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            required
          />

          <Select
            label="Account Type"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'customer', label: 'Customer' },
              { value: 'employee', label: 'Employee' },
            ]}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="••••••••"
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-calm-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-sage-600 hover:text-sage-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-spa-200">
          <p className="text-xs text-calm-500 text-center">
            This is a demo. Use the login page with demo credentials to access the portal.
          </p>
        </div>
      </Card>
    </div>
  );
}
