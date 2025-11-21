import Link from 'next/link';
import { Calendar, MessageCircle, Sparkles, Clock, Shield, Heart } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 via-calm-50 to-spa-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-calm-900 mb-6">
              Your Journey to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-calm-600">
                Wellness
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-calm-600 mb-8 max-w-3xl mx-auto">
              Experience personalized beauty and wellness services powered by AI technology.
              Book appointments, chat with our assistant, and manage your treatments seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-calm-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-calm-600 max-w-2xl mx-auto">
              Our platform brings together scheduling, communication, and care management
              in one seamless experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                Easy Booking
              </h3>
              <p className="text-calm-600">
                Schedule appointments with just a few clicks. Choose your preferred
                services, dates, and times that work for you.
              </p>
            </Card>

            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                AI Assistant
              </h3>
              <p className="text-calm-600">
                Get instant answers to your questions. Our AI assistant is available
                24/7 to help with bookings, questions, and recommendations.
              </p>
            </Card>

            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                Personalized Care
              </h3>
              <p className="text-calm-600">
                Receive tailored treatment recommendations based on your intake
                forms and preferences.
              </p>
            </Card>

            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                Smart Reminders
              </h3>
              <p className="text-calm-600">
                Never miss an appointment with automated reminders sent one week
                and 24 hours before your visit.
              </p>
            </Card>

            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-calm-600">
                Your data is protected with industry-standard security. We take
                your privacy seriously.
              </p>
            </Card>

            <Card className="p-8" hover>
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-calm-900 mb-2">
                Holistic Approach
              </h3>
              <p className="text-calm-600">
                We focus on your complete wellness journey, combining beauty
                treatments with overall health and relaxation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-500 to-calm-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-xl text-sage-50 mb-8">
            Join hundreds of satisfied clients who trust us with their beauty and wellness needs.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-sage-700 hover:bg-spa-50">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-calm-900 text-calm-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-calm-500 rounded-lg" />
            <span className="text-xl font-display font-semibold text-white">
              Serene Spa
            </span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Serene Spa Portal. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-calm-400">
            Powered by AI technology for a seamless wellness experience.
          </p>
        </div>
      </footer>
    </div>
  );
}
