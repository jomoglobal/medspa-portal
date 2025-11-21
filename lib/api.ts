import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export interface BookingData {
  customerName: string;
  customerEmail: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface IntakeData {
  medicalHistory: string;
  allergies: string;
  medications: string;
  skinConcerns: string;
  previousTreatments: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface ChatMessage {
  message: string;
  customerId: string;
  sessionId?: string;
}

export interface CancelData {
  appointmentId: string;
  reason: string;
}

export interface ReminderData {
  appointmentId: string;
  type: '1-week' | '24-hour';
}

// Customer API calls
export const bookAppointment = async (data: BookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book`, data);
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw new Error('Failed to book appointment. Please try again.');
  }
};

export const cancelAppointment = async (data: CancelData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cancel`, data);
    return response.data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    throw new Error('Failed to cancel appointment. Please try again.');
  }
};

export const sendChatMessage = async (data: ChatMessage) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to send message. Please try again.');
  }
};

export const submitIntakeForm = async (data: IntakeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/intake`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting intake form:', error);
    throw new Error('Failed to submit intake form. Please try again.');
  }
};

// Employee API calls
export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw new Error('Failed to fetch appointments. Please try again.');
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events. Please try again.');
  }
};

export const sendReminder = async (data: ReminderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-reminder`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending reminder:', error);
    throw new Error('Failed to send reminder. Please try again.');
  }
};
