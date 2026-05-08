# RoojaiHub

RoojaiHub เป็นเว็บแอปตัวอย่างสำหรับดูข้อมูลสุขภาพจากอุปกรณ์สวมใส่ เช่น Apple Watch, Garmin, Suunto, Polar, Whoop และ Oura Ring โดยใช้ข้อมูลจำลองภายในโปรเจกต์ แอปถูกออกแบบเป็นหน้าจอขนาดมือถือเป็นหลัก มีระบบเปลี่ยนภาษาไทย/อังกฤษ หน้ารายการอุปกรณ์ แดชบอร์ดสุขภาพ หน้าวิเคราะห์ และหน้าโปรไฟล์ผู้ใช้

## ฟีเจอร์หลัก

- เข้าสู่ระบบจำลองและนำทางเข้าสู่แอป
- เพิ่ม เชื่อมต่อ ซิงก์ และถอดอุปกรณ์ wearable แบบจำลอง
- แสดงข้อมูลกิจกรรม เช่น workout, heart rate, calories, steps และ active time
- แสดงข้อมูลการนอน เช่น time in bed, efficiency และ sleep stages
- วิเคราะห์ workout และ sleep จากข้อมูลจำลองของอุปกรณ์ที่เชื่อมต่อ
- Body Map สำหรับเลือกตำแหน่งอาการปวดในแบบสอบถาม
- หน้าโปรไฟล์สำหรับแก้ไขชื่อ อีเมล เปลี่ยนภาษา และออกจากระบบ
- รองรับภาษาไทยและอังกฤษผ่าน `LanguageContext`

## เทคโนโลยีที่ใช้

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion
- Lucide React
- Recharts

## โครงสร้างโปรเจกต์

```text
.
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components
│   │   └── Layout.tsx
│   ├── contexts
│   │   ├── DeviceContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib
│   │   └── mockData.ts
│   └── pages
│       ├── Analysis.tsx
│       ├── Dashboard.tsx
│       ├── DeviceList.tsx
│       ├── Login.tsx
│       └── Profile.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

หมายเหตุ: โฟลเดอร์ `my-app` เป็นโปรเจกต์แยก/ตัวอย่าง และถูกแยกออกจากการตรวจ TypeScript ของแอปหลักแล้ว

## การติดตั้งและรันโปรเจกต์

ติดตั้ง dependencies:

```bash
npm install
```

รัน dev server:

```bash
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ที่:

```text
http://localhost:3000
```

## คำสั่งที่ใช้บ่อย

ตรวจ TypeScript:

```bash
npm run lint
```

 build สำหรับ production:

```bash
npm run build
```

ดู build ที่สร้างแล้ว:

```bash
npm run preview
```

## เส้นทางหน้าในแอป

- `/` หน้า Login
- `/devices` หน้าอุปกรณ์
- `/dashboard` หน้าแดชบอร์ดสุขภาพ
- `/analysis` หน้าวิเคราะห์และแบบสอบถาม
- `/profile` หน้าโปรไฟล์

## ข้อมูลจำลอง

ข้อมูลสุขภาพอยู่ใน `src/lib/mockData.ts` โดย map ตามชื่ออุปกรณ์ เช่น `AppleWatch`, `Garmin Fenix 7`, `Suunto Race S` และอื่น ๆ ถ้าอุปกรณ์ไม่มีข้อมูลเฉพาะ ระบบจะใช้ `DEFAULT_MOCK_DATA`

## หมายเหตุสำหรับการพัฒนาต่อ

- สถานะอุปกรณ์เก็บใน `DeviceContext` ยังเป็น state ฝั่ง client เท่านั้น
- ระบบ login เป็นการจำลอง ยังไม่มี authentication จริง
- ข้อมูลสุขภาพเป็น mock data ยังไม่มีการเชื่อมต่อ API จากอุปกรณ์จริง
- หากต้องเชื่อม backend จริง ควรเพิ่ม service/API layer แยกออกจากหน้า UI
