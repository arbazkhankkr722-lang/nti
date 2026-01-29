
import { User, UserRole, TimetableSlot, GalleryItem, InstituteSettings } from './types';

export const MOCK_STUDENTS: User[] = [
  { 
    id: '1', 
    name: 'Ahmed Khan', 
    rollNo: 'NTZ-2024-001', 
    username: 'ahmed',
    password: 'password123',
    class: 'CIT', 
    role: UserRole.STUDENT, 
    attendance: 85,
    fatherName: 'Gul Khan',
    cnic: '54401-1234567-1',
    age: '21',
    gender: 'Male',
    nationality: 'Pakistani',
    religion: 'Islam',
    address: 'Block A, Civil Lines, Zhob',
    reference: 'Direct Admission',
    attendanceHistory: [
      { month: 'Jan', percentage: 80 },
      { month: 'Feb', percentage: 90 },
      { month: 'Mar', percentage: 85 }
    ],
    totalFee: 25000,
    paidFee: 15000,
    paymentHistory: [
      { id: 'p1', amount: 10000, date: '2024-01-10', method: 'Bank Transfer' },
      { id: 'p2', amount: 5000, date: '2024-02-15', method: 'Cash' }
    ]
  },
  { 
    id: '2', 
    name: 'Sara Gul', 
    rollNo: 'NTZ-2024-002', 
    username: 'sara',
    password: 'password123',
    class: 'DIT', 
    role: UserRole.STUDENT, 
    attendance: 72,
    fatherName: 'Abdullah Jan',
    cnic: '54401-7654321-2',
    age: '19',
    gender: 'Female',
    nationality: 'Pakistani',
    religion: 'Islam',
    address: 'Near Main Mosque, Zhob',
    reference: 'Alumni Ref',
    attendanceHistory: [
      { month: 'Jan', percentage: 70 },
      { month: 'Feb', percentage: 75 },
      { month: 'Mar', percentage: 72 }
    ],
    totalFee: 45000,
    paidFee: 45000,
    paymentHistory: [
      { id: 'p3', amount: 45000, date: '2024-01-05', method: 'Scholarship/Full' }
    ]
  }
];

export const MOCK_ADMIN: User = {
  id: 'admin',
  name: 'Registrar Zhob',
  rollNo: 'NTIZB143',
  username: 'admin',
  password: 'NTIZB143',
  class: 'Administration',
  role: UserRole.ADMIN
};

export const MOCK_TIMETABLE: TimetableSlot[] = [
  { id: 't1', day: 'Monday', startTime: '08:30 AM', endTime: '10:00 AM', subject: 'IT Fundamentals' },
  { id: 't2', day: 'Monday', startTime: '10:00 AM', endTime: '11:30 AM', subject: 'Software Engineering' },
  { id: 't3', day: 'Tuesday', startTime: '08:30 AM', endTime: '10:30 AM', subject: 'Web Development' },
];

export const MOCK_EVENTS = [
  { id: 'e1', title: 'Zhob Tech Summit 2024', date: '2024-05-15', description: 'Annual technology showcase and networking event.' },
  { id: 'e2', title: 'Spring Graduation', date: '2024-06-01', description: 'Ceremony for CIT and DIT graduates.' },
  { id: 'e3', title: 'TTB Assessment Week', date: '2024-06-20', description: 'Official trade testing for certification.' },
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', type: 'image', title: 'Modern Lab Session' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', type: 'image', title: 'Collaboration Workshop' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', type: 'image', title: 'Coding Bootcamp' },
];

export const MOCK_SETTINGS: InstituteSettings = {
  aboutText: "NewTech Institute Zhob stands as a beacon of technical excellence in the region. Founded with the mission to bridge the digital divide, we provide world-class vocational training in Information Technology, Software Development, and Graphic Design.",
  mission: "To equip the youth of Zhob with market-ready technical skills that foster economic independence.",
  location: "Main Bazar Road, Near Post Office, Zhob, Balochistan",
  phone: "+92 822 412345",
  email: "admissions@newtechzhob.edu.pk"
};
