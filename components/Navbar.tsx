'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, Calendar, MessageCircle, FileText, LogOut, Home } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-spa-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-calm-500 rounded-lg" />
            <span className="text-xl font-display font-semibold text-calm-900">
              Serene Spa
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href={
                    session.user.role === 'customer'
                      ? '/customer/dashboard'
                      : '/employee/dashboard'
                  }
                  className="flex items-center space-x-2 text-calm-700 hover:text-sage-600 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                {session.user.role === 'customer' && (
                  <>
                    <Link
                      href="/customer/book"
                      className="flex items-center space-x-2 text-calm-700 hover:text-sage-600 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book</span>
                    </Link>
                    <Link
                      href="/customer/chat"
                      className="flex items-center space-x-2 text-calm-700 hover:text-sage-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat</span>
                    </Link>
                  </>
                )}

                {session.user.role === 'employee' && (
                  <>
                    <Link
                      href="/employee/schedule"
                      className="flex items-center space-x-2 text-calm-700 hover:text-sage-600 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule</span>
                    </Link>
                    <Link
                      href="/employee/events"
                      className="flex items-center space-x-2 text-calm-700 hover:text-sage-600 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Events</span>
                    </Link>
                  </>
                )}

                <div className="flex items-center space-x-3 pl-4 border-l border-spa-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-sage-700" />
                    </div>
                    <span className="text-sm text-calm-700">{session.user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
