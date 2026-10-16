# Liquid Glass buttons — CNR Alumni

## โครงสร้างและการใช้จริง

หน้าเว็บ GitHub Pages ยังคงใช้ `index.html` และ CSS โดยตรง ปุ่มหลัก ปุ่มเข้าร่วมชุมชน ปุ่มสำรวจรุ่น และปุ่มเมนูมือถือใช้เอฟเฟกต์เดียวกับคอมโพเนนต์ผ่าน `cnr-buttons.css` ไม่มีการเปลี่ยนปลายทางลิงก์หรือระบบปัดภาพฮีโร่

เพิ่มชุดคอมโพเนนต์ React/TypeScript ที่ติดตั้ง dependencies และตรวจ type/build แยกจากหน้าเว็บเดิมได้:

- `components/ui/liquid-glass-button.tsx`: `Button`, `LiquidButton`, `MetalButton`, `GlassFilter` และ variant helpers
- `examples/demo.tsx`: ตัวอย่างปุ่มและลิงก์ภาษาไทย พร้อมไอคอน Lucide
- `lib/utils.ts`: `cn()` จาก clsx และ tailwind-merge
- `styles/globals.css`: Tailwind v4, semantic tokens, dark theme และ import CSS ของปุ่ม
- `components.json`: shadcn aliases, TypeScript และไฟล์ styles
- `tsconfig.json`: `@/*` ชี้ไปที่ root ของ repository

โปรเจกต์เดิมไม่มีโฟลเดอร์คอมโพเนนต์ จึงสร้าง `/components/ui` ตามที่กำหนด โฟลเดอร์นี้ไม่ใช่ข้อบังคับของ React แต่ทำให้ shadcn CLI และ import `@/components/ui/...` ใช้ตำแหน่งเดียวกัน ลดไฟล์ซ้ำและ import ผิดที่

## Dependencies และการตรวจ

```bash
npm ci
npm run typecheck
npm run build:ui
```

`build:ui` สร้าง `assets/ui-components.css` สำหรับนำชุด React ไปใช้ ไม่ใช่ build ของหน้า GitHub Pages ปัจจุบัน ซึ่งโหลด `cnr-buttons.css` โดยตรง ห้ามโหลด Tailwind preflight ลงหน้า HTML เดิมโดยไม่ตรวจเลย์เอาต์

Dependencies: React, React DOM, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge, lucide-react; dev dependencies: TypeScript, React types, Tailwind CSS และ @tailwindcss/cli ไม่ต้องใช้ context provider หรือ state store เพิ่ม

## ตั้งค่าแอป React ใหม่ด้วย shadcn CLI (เมื่อต้องการย้ายทั้งเว็บ)

ทำในโฟลเดอร์ใหม่ เพื่อรักษาเว็บที่เผยแพร่อยู่:

```bash
npx shadcn@latest init --name cnr-alumni-react --template vite --preset radix-nova
cd cnr-alumni-react
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

เลือก TypeScript หาก CLI ถาม จากนั้นตรวจ `components.json` ว่า `aliases.ui` ชี้ไปที่ `@/components/ui` และตั้ง `@/*` ใน TypeScript และ Vite ให้ตรงกัน แอปที่ใช้ `src` สามารถใช้ `src/components/ui` โดยให้ `@` ชี้ไปที่ `src` ได้ โฟลเดอร์ `/components/ui` ใน repository นี้ใช้ root เป็นฐาน

หากติดตั้ง Tailwind v4 ใน Vite เอง:

```bash
npm install -D tailwindcss @tailwindcss/vite typescript @types/react @types/react-dom
```

เพิ่ม `tailwindcss()` จาก `@tailwindcss/vite` ลงใน `plugins` ของ `vite.config.ts` และใส่ `@import "tailwindcss";` ในไฟล์ global styles ที่ import จาก React entry อย่าเรียก `tailwindcss init -p` ซึ่งเป็นขั้นตอนของ Tailwind รุ่นก่อน

คัดลอก `components/ui/liquid-glass-button.tsx`, `lib/utils.ts` และ `cnr-buttons.css` ไปยังตำแหน่งที่ alias ของแอปใหม่อ้างถึง รวม theme tokens จาก `styles/globals.css` เข้ากับ global styles เดิม และแก้ relative CSS import ตามตำแหน่งไฟล์

## ตัวอย่าง

```tsx
import { LiquidButton } from "@/components/ui/liquid-glass-button"

<LiquidButton size="xl" onClick={() => console.log("join")}>เข้าร่วมชุมชน</LiquidButton>
<LiquidButton asChild size="xl"><a href="#generations">สำรวจรุ่นของคุณ</a></LiquidButton>
<LiquidButton disabled>กำลังดำเนินการ</LiquidButton>
```

`asChild` ต้องมี React element หนึ่งตัว เช่น `<a>` ปุ่มปกติ default เป็น `type="button"`; ตั้ง `type="submit"` เมื่อใช้ส่งฟอร์ม Props และ ref ถูกส่งต่อ รวมถึง event handlers ของผู้ใช้ ปุ่มไอคอนล้วนต้องกำหนด `aria-label`

`refraction` เป็นตัวเลือกเพิ่ม SVG distortion แบบเบาโดยใช้ filter ID ไม่ซ้ำกัน ค่าเริ่มต้นใช้ blur/saturation CSS ซึ่งเข้ากันได้กว้างกว่า หากเบราว์เซอร์ไม่รองรับ backdrop filter จะแสดงพื้นหลังสำรองและขอบเงา ข้อความไม่ผ่านตัวกรอง SVG จึงยังอ่านได้

เวอร์ชันที่ปรับแก้ใช้ pseudo-elements แทน `<div>` ภายในปุ่ม เพื่อรองรับ Slot ได้ถูกต้อง ไม่มี filter ID ซ้ำ และไม่เขียนทับ mouse/touch callbacks ของผู้ใช้ เอฟเฟกต์กดของ MetalButton ใช้ CSS จึงไม่ต้องมี state แยกและรองรับคีย์บอร์ดด้วย

ไม่ต้องเพิ่มภาพ stock: ปุ่มใช้ข้อความ/ไอคอน ส่วนฮีโร่ยังใช้ตราสมาคมและรูปพระที่ผู้ใช้ให้มา

## เอกสารต้นทาง

- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/components/radix/button
- https://tailwindcss.com/docs/installation/using-vite
