'use client';

import { useState } from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Serene Spa Portal',
    emailNotifications: true,
    smsNotifications: true,
    reminderTiming: {
      oneWeek: 7,
      twentyFourHour: 1,
    },
  });

  const handleSave = () => {
    // In production, this would save to a database or config file
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-spa-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-calm-900 mb-2">
            System Settings
          </h1>
          <p className="text-lg text-calm-600">
            Configure API endpoints and system preferences
          </p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* API Configuration */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-sage-600" />
              <h2 className="text-2xl font-bold text-calm-900">
                API Configuration
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Input
                  label="n8n Webhook URL"
                  value={settings.n8nWebhookUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, n8nWebhookUrl: e.target.value })
                  }
                  placeholder="https://your-n8n-instance.com/webhook"
                />
                <p className="mt-2 text-sm text-calm-600">
                  The base URL for your n8n webhook endpoints. All API calls will be
                  routed through this URL.
                </p>
              </div>

              <div>
                <Input
                  label="Application Name"
                  value={settings.appName}
                  onChange={(e) =>
                    setSettings({ ...settings, appName: e.target.value })
                  }
                  placeholder="Serene Spa Portal"
                />
                <p className="mt-2 text-sm text-calm-600">
                  The name displayed throughout the application.
                </p>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-calm-900 mb-6">
              Notification Settings
            </h2>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                />
                <div>
                  <p className="font-medium text-calm-900">Email Notifications</p>
                  <p className="text-sm text-calm-600">
                    Send appointment reminders and updates via email
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smsNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                />
                <div>
                  <p className="font-medium text-calm-900">SMS Notifications</p>
                  <p className="text-sm text-calm-600">
                    Send appointment reminders via text message
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Reminder Timing */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-calm-900 mb-6">
              Reminder Timing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="First Reminder (days before)"
                  type="number"
                  value={settings.reminderTiming.oneWeek}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reminderTiming: {
                        ...settings.reminderTiming,
                        oneWeek: parseInt(e.target.value),
                      },
                    })
                  }
                  min="1"
                  max="30"
                />
                <p className="mt-2 text-sm text-calm-600">
                  Send the first reminder this many days before the appointment
                </p>
              </div>

              <div>
                <Input
                  label="Second Reminder (days before)"
                  type="number"
                  value={settings.reminderTiming.twentyFourHour}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reminderTiming: {
                        ...settings.reminderTiming,
                        twentyFourHour: parseInt(e.target.value),
                      },
                    })
                  }
                  min="0"
                  max="7"
                />
                <p className="mt-2 text-sm text-calm-600">
                  Send the second reminder this many days before the appointment
                </p>
              </div>
            </div>
          </Card>

          {/* Environment Variables */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Environment Variables
                </h3>
                <p className="text-sm text-blue-800 mb-3">
                  For production deployment, set these environment variables in your
                  Vercel project settings:
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm text-calm-900 space-y-1">
                  <p>NEXT_PUBLIC_N8N_WEBHOOK_URL</p>
                  <p>NEXTAUTH_URL</p>
                  <p>NEXTAUTH_SECRET</p>
                  <p>NEXT_PUBLIC_APP_NAME</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Save Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
