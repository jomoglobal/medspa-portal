'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Send } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { getAppointments, sendReminder } from '@/lib/api';

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      // Mock data for demo
      setAppointments([
        {
          id: '1',
          date: '2025-11-25',
          time: '9:00 AM',
          customer: {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
          },
          service: 'Facial Treatment',
          status: 'confirmed',
          remindersSent: {
            oneWeek: true,
            twentyFourHour: false,
          },
        },
        {
          id: '2',
          date: '2025-11-25',
          time: '10:30 AM',
          customer: {
            name: 'Michael Chen',
            email: 'michael@example.com',
            phone: '(555) 234-5678',
          },
          service: 'Botox Consultation',
          status: 'confirmed',
          remindersSent: {
            oneWeek: true,
            twentyFourHour: true,
          },
        },
        {
          id: '3',
          date: '2025-11-26',
          time: '2:00 PM',
          customer: {
            name: 'Emily Davis',
            email: 'emily@example.com',
            phone: '(555) 345-6789',
          },
          service: 'Laser Hair Removal',
          status: 'pending',
          remindersSent: {
            oneWeek: false,
            twentyFourHour: false,
          },
        },
        {
          id: '4',
          date: '2025-11-27',
          time: '11:00 AM',
          customer: {
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '(555) 456-7890',
          },
          service: 'Chemical Peel',
          status: 'confirmed',
          remindersSent: {
            oneWeek: false,
            twentyFourHour: false,
          },
        },
      ]);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async (appointmentId: string, type: '1-week' | '24-hour') => {
    try {
      await sendReminder({ appointmentId, type });
      alert(`${type} reminder sent successfully!`);
      loadAppointments();
    } catch (error) {
      alert('Failed to send reminder');
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-calm-600">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-spa-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-calm-900 mb-2">
              Appointment Schedule
            </h1>
            <p className="text-lg text-calm-600">
              View and manage all appointments
            </p>
          </div>

          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Appointments' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
        </div>

        {filteredAppointments.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-spa-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-calm-900 mb-2">
              No appointments found
            </h3>
            <p className="text-calm-600">
              {filter === 'all'
                ? 'There are no appointments scheduled'
                : `No ${filter} appointments`}
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-4">
                    {/* Date and Time */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-sage-600" />
                        <span className="font-semibold text-calm-900">
                          {appointment.date}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-sage-600" />
                        <span className="text-calm-700">{appointment.time}</span>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {appointment.status}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <p className="text-lg font-semibold text-calm-900">
                        {appointment.service}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-calm-500" />
                        <span className="text-sm text-calm-700">
                          {appointment.customer.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-calm-500" />
                        <span className="text-sm text-calm-700">
                          {appointment.customer.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-calm-500" />
                        <span className="text-sm text-calm-700">
                          {appointment.customer.phone}
                        </span>
                      </div>
                    </div>

                    {/* Reminder Status */}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-calm-600">Reminders:</span>
                      <div className="flex items-center space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            appointment.remindersSent.oneWeek
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <span className="text-calm-700">1-week</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            appointment.remindersSent.twentyFourHour
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <span className="text-calm-700">24-hour</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:pl-6">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendReminder(appointment.id, '1-week')}
                      disabled={appointment.remindersSent.oneWeek}
                      className="whitespace-nowrap"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send 1-Week
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendReminder(appointment.id, '24-hour')}
                      disabled={appointment.remindersSent.twentyFourHour}
                      className="whitespace-nowrap"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send 24-Hour
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
