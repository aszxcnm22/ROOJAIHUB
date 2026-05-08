import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

export const translations: Translations = {
  loginTitle: { en: 'RoojaiHub', th: 'รู้ใจ RoojaiHub' },
  username: { en: 'Username', th: 'ชื่อผู้ใช้' },
  password: { en: 'Password', th: 'รหัสผ่าน' },
  loginBtn: { en: 'LOGIN', th: 'เข้าสู่ระบบ' },
  notUser: { en: 'Not a user?', th: 'ยังไม่มีบัญชี?' },
  register: { en: 'Register', th: 'สมัครสมาชิก' },
  devicesTitle: { en: 'Devices', th: 'อุปกรณ์' },
  addNewDevice: { en: '+ Add New Device', th: '+ เพิ่มอุปกรณ์ใหม่' },
  deviceList: { en: 'Device List', th: 'รายการอุปกรณ์' },
  noDevices: { en: 'No devices connected', th: 'ไม่มีอุปกรณ์ที่เชื่อมต่อ' },
  noDevicesDesc: { en: 'Tap + Add New Device to pair your smartwatch', th: 'กด + เพิ่มอุปกรณ์ใหม่ เพื่อจับคู่นาฬิกาข้อมือของคุณ' },
  sync: { en: 'Sync', th: 'ซิงค์' },
  connect: { en: 'Connect', th: 'เชื่อมต่อ' },
  connecting: { en: 'Connecting', th: 'กำลังเชื่อมต่อ' },
  connected: { en: 'Connected', th: 'เชื่อมต่อแล้ว' },
  searching: { en: 'Searching for devices...', th: 'กำลังค้นหาอุปกรณ์...' },
  selectDevice: { en: 'Select a device', th: 'เลือกอุปกรณ์' },
  searchingDesc: { en: 'Make sure your device is powered on and discoverable.', th: 'ตรวจสอบให้แน่ใจว่าอุปกรณ์ของคุณเปิดอยู่และสามารถค้นพบได้' },
  foundDesc: { en: 'Found the following nearby devices.', th: 'พบอุปกรณ์ใกล้เคียงดังต่อไปนี้' },
  add: { en: 'Add', th: 'เพิ่ม' },
  myHealthData: { en: 'My Health Data', th: 'ข้อมูลสุขภาพของฉัน' },
  noDeviceData: { en: 'No Device Connected', th: 'ไม่มีอุปกรณ์ที่เชื่อมต่อ' },
  noDeviceDataDesc: { en: 'Please connect a device in the Devices tab to view your health data.', th: 'โปรดเชื่อมต่ออุปกรณ์ในหน้าอุปกรณ์เพื่อดูข้อมูลสุขภาพของคุณ' },
  avgHr: { en: 'Avg HR', th: 'อัตราการเต้นหัวใจเฉลี่ย' },
  energy: { en: 'Energy', th: 'พลังงาน' },
  activity: { en: 'Activity', th: 'กิจกรรม' },
  dailyRings: { en: 'Daily rings', th: 'วงแหวนประจำวัน' },
  steps: { en: 'Steps', th: 'ก้าว' },
  active: { en: 'Active', th: 'ระยะเวลา' },
  sleep: { en: 'Sleep', th: 'การนอนหลับ' },
  timeInBed: { en: 'Time in bed', th: 'เวลาบนเตียง' },
  efficiency: { en: 'Efficiency', th: 'ประสิทธิภาพ' },
  analysis: { en: 'Analysis', th: 'การวิเคราะห์' },
  workoutAnalysis: { en: 'Workout Analysis', th: 'การวิเคราะห์การออกกำลังกาย' },
  sleepAnalysis: { en: 'Sleep Analysis', th: 'การวิเคราะห์การนอนหลับ' },
  duration: { en: 'Duration', th: 'ระยะเวลา' },
  bedtime: { en: 'Bedtime', th: 'เวลานอน' },
  wake: { en: 'Wake', th: 'เวลาตื่น' },
  questionnaire: { en: 'Questionnaire', th: 'แบบสอบถาม' },
  q1: { en: '1. Location of pain', th: '1. ตำแหน่งที่มีอาการปวดหรือเจ็บ' },
  q2: { en: '2. Accident details during activity', th: '2. อุบัติเหตุที่เกิดขึ้นระหว่างทำกิจกรรม' },
  q3: { en: '3. Duration of symptoms (Hours)', th: '3. ระยะเวลาที่มีอาการ (ชั่วโมง)' },
  q4: { en: '4. Characteristics of pain', th: '4. ลักษณะของอาการปวดหรือเจ็บ' },
  submit: { en: 'Submit Assessment', th: 'ส่งแบบประเมิน' },
  thankYou: { en: 'Thank you!', th: 'ขอบคุณ!' },
  submitDesc: { en: 'Your assessment has been submitted successfully.', th: 'แบบประเมินของคุณถูกส่งเรียบร้อยแล้ว' },
  bodyMap: { en: 'Body Map', th: 'แผนผังร่างกาย' },
  bodyMapDesc: { en: 'View skeletal system & select pain points', th: 'ดูระบบโครงกระดูกและเลือกจุดปวด' },
  skeletalSystem: { en: 'Skeletal System', th: 'ระบบโครงกระดูก' },
  done: { en: 'Done', th: 'เสร็จสิ้น' },
  tapLabel: { en: 'Tap on a label to select the pain area', th: 'แตะที่ป้ายเพื่อเลือกบริเวณที่ปวด' },
  profile: { en: 'Profile', th: 'โปรไฟล์' },
  edit: { en: 'Edit', th: 'แก้ไข' },
  name: { en: 'Name', th: 'ชื่อ' },
  save: { en: 'Save', th: 'บันทึก' },
  cancel: { en: 'Cancel', th: 'ยกเลิก' },
  logout: { en: 'Logout', th: 'ออกจากระบบ' },
  logoutConfirmTitle: { en: 'Confirm Logout', th: 'ยืนยันการออกจากระบบ' },
  logoutConfirmDesc: { en: 'Are you sure you want to log out?', th: 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?' },
  yes: { en: 'Yes', th: 'ใช่' },
  no: { en: 'No', th: 'ไม่ใช่' },
  navDevice: { en: 'Device', th: 'อุปกรณ์' },
  navSummary: { en: 'Summary', th: 'สรุป' },
  navAnalysis: { en: 'Analysis', th: 'วิเคราะห์' },
  navProfile: { en: 'Profile', th: 'โปรไฟล์' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
