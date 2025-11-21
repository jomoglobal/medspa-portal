'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Calendar, FileText, Settings, Users, Clock, CheckCircle } from 'lucide-react';
import Card from '@/components/Card';

export default function EmployeeDashboard() {
  const { data: session } = useSession();

  // Mock stats
  const stats = [
    {
      label: 'Today\'s Appointments',
      value: '8',
      icon: Calendar,
      color: 'sage',
    },
    {
      label: 'Pending Confirmations',
      value: '3',
      icon: Clock,
      color: 'calm',
    },
    {
      label: 'Active Clients',
      value: '42',
      icon: Users,
      color: 'sage',
    },
    {
      label: 'Completed This Week',
      value: '27',
      icon: CheckCircle,
      color: 'calm',
    },
  ];

  const todaysAppointments = [
    {
      id: '1',
      time: '9:00 AM',
      client: 'Sarah Johnson',
      service: 'Facial Treatment',
      status: 'confirmed',
    },
    {
      id: '2',
      time: '10:30 AM',
      client: 'Michael Chen',
      service: 'Botox Consultation',
      status: 'confirmed',
    },
    {
      id: '3',
      time: '2:00 PM',
      client: 'Emily Davis',
      service: 'Laser Hair Removal',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-spa-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-calm-900 mb-2">
            Welcome back, {session?.user?.name}
          </h1>
          <p className="text-lg text-calm-600">
            Employee Dashboard - Manage appointments and operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-calm-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-calm-900">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/employee/schedule">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Schedule</h3>
                  <p className="text-sm text-calm-600">View all appointments</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/employee/events">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Events</h3>
                  <p className="text-sm text-calm-600">Digital twin logs</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/employee/settings">
            <Card className="p-6 cursor-pointer" hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-calm-900">Settings</h3>
                  <p className="text-sm text-calm-600">Configure system</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Today's Schedule */}
        <div>
          <h2 className="text-2xl font-bold text-calm-900 mb-6">
            Today&apos;s Schedule
          </h2>

          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-calm-600">Time</p>
                      <p className="text-lg font-semibold text-calm-900">
                        {appointment.time}
                      </p>
                    </div>
                    <div className="h-12 w-px bg-spa-200"></div>
                    <div>
                      <p className="text-lg font-semibold text-calm-900">
                        {appointment.client}
                      </p>
                      <p className="text-calm-600">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {appointment.status === 'confirmed' ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Confirmed</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-yellow-600">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
