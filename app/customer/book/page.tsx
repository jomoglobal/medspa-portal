'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import { bookAppointment } from '@/lib/api';

export default function BookAppointmentPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: session?.user?.name || '',
    customerEmail: session?.user?.email || '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const services = [
    { value: '', label: 'Select a service' },
    { value: 'facial', label: 'Facial Treatment' },
    { value: 'massage', label: 'Massage Therapy' },
    { value: 'botox', label: 'Botox Injection' },
    { value: 'filler', label: 'Dermal Fillers' },
    { value: 'laser', label: 'Laser Hair Removal' },
    { value: 'peel', label: 'Chemical Peel' },
    { value: 'microneedling', label: 'Microneedling' },
  ];

  const timeSlots = [
    { value: '', label: 'Select a time' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bookAppointment(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/customer/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-calm-900 mb-2">
            Booking Successful!
          </h2>
          <p className="text-calm-600 mb-6">
            Your appointment request has been submitted. We&apos;ll confirm it shortly.
          </p>
          <Button onClick={() => router.push('/customer/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-calm-900 mb-2">
            Book an Appointment
          </h1>
          <p className="text-lg text-calm-600">
            Schedule your next wellness treatment
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                placeholder="Your name"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                placeholder="you@example.com"
                required
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="(555) 123-4567"
              required
            />

            <Select
              label="Service"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              options={services}
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Preferred Date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) =>
                  setFormData({ ...formData, preferredDate: e.target.value })
                }
                min={new Date().toISOString().split('T')[0]}
                required
              />

              <Select
                label="Preferred Time"
                value={formData.preferredTime}
                onChange={(e) =>
                  setFormData({ ...formData, preferredTime: e.target.value })
                }
                options={timeSlots}
                required
              />
            </div>

            <Textarea
              label="Additional Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any special requests or concerns?"
              rows={4}
            />

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Book Appointment'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
