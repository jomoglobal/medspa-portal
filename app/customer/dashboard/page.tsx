'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Calendar, MessageCircle, FileText, Clock, CheckCircle } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function CustomerDashboard() {
  const { data: session } = useSession();

  // Mock data - replace with actual API calls
  const upcomingAppointments = [
    {
      id: '1',
      service: 'Facial Treatment',
      date: '2025-11-28',
      time: '2:00 PM',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Massage Therapy',
      date: '2025-12-05',
      time: '10:30 AM',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-calm-900 mb-2">
            Welcome back, {session?.user?.name}
          </h1>
          <p className="text-lg text-calm-600">
            Manage your appointments and wellness journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/customer/book">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Book</h3>
                  <p className="text-sm text-calm-600">New appointment</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/customer/chat">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Chat</h3>
                  <p className="text-sm text-calm-600">AI assistant</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/customer/intake">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Intake</h3>
                  <p className="text-sm text-calm-600">Medical form</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-sage-600" />
              </div>
              <div>
                <h3 className="font-semibold text-calm-900">{upcomingAppointments.length}</h3>
                <p className="text-sm text-calm-600">Upcoming</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-calm-900 mb-6">
            Upcoming Appointments
          </h2>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-sage-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-calm-900">
                          {appointment.service}
                        </h3>
                        <p className="text-calm-600">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {appointment.status === 'confirmed' ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-600">Confirmed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <span className="text-sm text-yellow-600">Pending</span>
                          </>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-spa-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-calm-900 mb-2">
                No upcoming appointments
              </h3>
              <p className="text-calm-600 mb-4">
                Book your first appointment to get started
              </p>
              <Link href="/customer/book">
                <Button>Book Now</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-calm-900 mb-6">
            Recent Activity
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 pb-4 border-b border-spa-200">
                <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-calm-900">Appointment confirmed</p>
                  <p className="text-sm text-calm-600">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pb-4 border-b border-spa-200">
                <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-calm-900">Intake form submitted</p>
                  <p className="text-sm text-calm-600">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-calm-900">Account created</p>
                  <p className="text-sm text-calm-600">2 weeks ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
