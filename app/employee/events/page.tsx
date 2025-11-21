'use client';

import { useState, useEffect } from 'react';
import { Activity, Calendar, MessageCircle, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '@/components/Card';
import Select from '@/components/Select';
import { getEvents } from '@/lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      // Mock data for demo
      setEvents([
        {
          id: '1',
          type: 'booking',
          title: 'New Appointment Booked',
          description: 'Sarah Johnson booked Facial Treatment for Nov 25',
          timestamp: '2025-11-21T14:30:00',
          status: 'success',
        },
        {
          id: '2',
          type: 'reminder',
          title: '1-Week Reminder Sent',
          description: 'Reminder sent to Michael Chen for Nov 25 appointment',
          timestamp: '2025-11-21T10:00:00',
          status: 'success',
        },
        {
          id: '3',
          type: 'chat',
          title: 'AI Chat Session',
          description: 'Emily Davis asked about laser hair removal pricing',
          timestamp: '2025-11-21T09:15:00',
          status: 'info',
        },
        {
          id: '4',
          type: 'reminder',
          title: '24-Hour Reminder Sent',
          description: 'Reminder sent to David Wilson for Nov 22 appointment',
          timestamp: '2025-11-21T08:00:00',
          status: 'success',
        },
        {
          id: '5',
          type: 'intake',
          title: 'Intake Form Submitted',
          description: 'Jennifer Lopez completed pre-visit medical intake',
          timestamp: '2025-11-20T16:45:00',
          status: 'success',
        },
        {
          id: '6',
          type: 'booking',
          title: 'Appointment Cancelled',
          description: 'Robert Brown cancelled Nov 23 Botox appointment',
          timestamp: '2025-11-20T14:20:00',
          status: 'warning',
        },
        {
          id: '7',
          type: 'chat',
          title: 'AI Chat Session',
          description: 'Lisa Anderson inquired about available time slots',
          timestamp: '2025-11-20T11:30:00',
          status: 'info',
        },
        {
          id: '8',
          type: 'reminder',
          title: 'Reminder Failed',
          description: 'Failed to send 1-week reminder to invalid email',
          timestamp: '2025-11-20T09:00:00',
          status: 'error',
        },
      ]);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'reminder':
        return Bell;
      case 'chat':
        return MessageCircle;
      case 'intake':
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-calm-600">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-spa-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-calm-900 mb-2">
              Event Stream
            </h1>
            <p className="text-lg text-calm-600">
              Digital twin activity logs and system events
            </p>
          </div>

          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Events' },
              { value: 'booking', label: 'Bookings' },
              { value: 'reminder', label: 'Reminders' },
              { value: 'chat', label: 'Chat Sessions' },
              { value: 'intake', label: 'Intake Forms' },
            ]}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-calm-600 mb-1">Total Events</p>
            <p className="text-2xl font-bold text-calm-900">{events.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-calm-600 mb-1">Bookings</p>
            <p className="text-2xl font-bold text-calm-900">
              {events.filter((e) => e.type === 'booking').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-calm-600 mb-1">Reminders</p>
            <p className="text-2xl font-bold text-calm-900">
              {events.filter((e) => e.type === 'reminder').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-calm-600 mb-1">Chat Sessions</p>
            <p className="text-2xl font-bold text-calm-900">
              {events.filter((e) => e.type === 'chat').length}
            </p>
          </Card>
        </div>

        {/* Event Timeline */}
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <Activity className="w-16 h-16 text-spa-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-calm-900 mb-2">
              No events found
            </h3>
            <p className="text-calm-600">
              {filter === 'all'
                ? 'No events have been logged yet'
                : `No ${filter} events found`}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const Icon = getEventIcon(event.type);
              return (
                <Card
                  key={event.id}
                  className={`p-6 border-l-4 ${getEventColor(event.status)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getEventColor(
                        event.status
                      )}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-calm-900">
                          {event.title}
                        </h3>
                        <span className="text-sm text-calm-500">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-calm-700">{event.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-calm-500">
                        <span className="capitalize">{event.type}</span>
                        <span>•</span>
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
