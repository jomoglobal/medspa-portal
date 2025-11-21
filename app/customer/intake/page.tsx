'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText } from 'lucide-react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import { submitIntakeForm } from '@/lib/api';

export default function IntakePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    medicalHistory: '',
    allergies: '',
    medications: '',
    skinConcerns: '',
    previousTreatments: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await submitIntakeForm(formData);
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
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-calm-900 mb-2">
            Form Submitted!
          </h2>
          <p className="text-calm-600 mb-6">
            Your intake form has been submitted successfully. Our team will review it before your appointment.
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
            Pre-Visit Intake Form
          </h1>
          <p className="text-lg text-calm-600">
            Help us provide the best care by sharing your medical information
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
              <p className="text-sm text-calm-700">
                <strong>Privacy Notice:</strong> All information provided is confidential
                and will only be used to provide you with safe and effective treatments.
              </p>
            </div>

            <Textarea
              label="Medical History"
              value={formData.medicalHistory}
              onChange={(e) =>
                setFormData({ ...formData, medicalHistory: e.target.value })
              }
              placeholder="Please list any significant medical conditions, past surgeries, or ongoing health issues..."
              rows={4}
              required
            />

            <Textarea
              label="Known Allergies"
              value={formData.allergies}
              onChange={(e) =>
                setFormData({ ...formData, allergies: e.target.value })
              }
              placeholder="List any allergies to medications, foods, or substances..."
              rows={3}
              required
            />

            <Textarea
              label="Current Medications"
              value={formData.medications}
              onChange={(e) =>
                setFormData({ ...formData, medications: e.target.value })
              }
              placeholder="List all medications and supplements you&apos;re currently taking..."
              rows={3}
              required
            />

            <Textarea
              label="Skin Concerns"
              value={formData.skinConcerns}
              onChange={(e) =>
                setFormData({ ...formData, skinConcerns: e.target.value })
              }
              placeholder="Describe any skin concerns or goals you have for treatment..."
              rows={3}
              required
            />

            <Textarea
              label="Previous Aesthetic Treatments"
              value={formData.previousTreatments}
              onChange={(e) =>
                setFormData({ ...formData, previousTreatments: e.target.value })
              }
              placeholder="Have you had any previous cosmetic treatments? If yes, please describe..."
              rows={3}
            />

            <div className="pt-6 border-t border-spa-200">
              <h3 className="text-lg font-semibold text-calm-900 mb-4">
                Emergency Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Emergency Contact Name"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    setFormData({ ...formData, emergencyContact: e.target.value })
                  }
                  placeholder="Full name"
                  required
                />

                <Input
                  label="Emergency Contact Phone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, emergencyPhone: e.target.value })
                  }
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Submit Form'}
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
