# สรุปสถาปัตยกรรมระบบ (Technical Architecture) - RetirementHub

**แพลตฟอร์ม:** Longevity & Life Freedom App (Thailand Hub)

### 1. ภาพรวมระบบ (Architecture Overview)
ออกแบบมาเป็นระบบ **Decoupled Architecture** (แยกส่วนการทำงาน) เพื่อให้ขยายระบบได้ง่าย และเตรียมพร้อมสำหรับทำ Mobile App ในอนาคต โดยแบ่งเป็น 3 ส่วนหลัก:
*   **Frontend (ฝั่งผู้ใช้งาน):** พัฒนาด้วย Next.js ให้บริการบน Vercel
*   **Backend (ฝั่งเซิร์ฟเวอร์):** พัฒนาด้วย NestJS (REST API) ให้บริการบน Railway
*   **AI Layer:** ทำงานด้วยโมเดล Claude (Anthropic) 

### 2. เทคโนโลยีที่ใช้ (Tech Stack)
*   **Frontend:** Next.js 14, TypeScript, Shadcn/ui + Tailwind CSS, Zustand, React Query, Mapbox GL JS
*   **Backend:** NestJS 10, REST API + Swagger, Prisma (ORM), PostgreSQL (ผ่าน Supabase), Redis (Upstash) สำหรับ Cache, BullMQ สำหรับ Background Jobs
*   **AI Layer:** Claude (claude-sonnet-4-6), OpenAI text-embedding, pgvector (Vector DB), LangChain.js
*   **DevOps & Infra:** Supabase (Database, Auth, Storage), Cloudflare (CDN/Security), Omise & Stripe (สำหรับระบบจ่ายเงิน)

### 3. โครงสร้างฐานข้อมูล (Database Schema)
แบ่งข้อมูลเป็นโมดูลหลักๆ ดังนี้:
*   **Users & Auth:** จัดการข้อมูลผู้ใช้, สัญชาติ, ข้อมูลการเงิน/สุขภาพ
*   **Service Marketplace:** จัดการหมวดหมู่บริการ, ข้อมูลผู้ให้บริการ (Providers), และบริการ (Services)
*   **Reviews & Trust:** จัดการรีวิวจากผู้ใช้งานจริง และคำนวณคะแนนความน่าเชื่อถือ (Trust Score)
*   **Bookings & Payments:** บันทึกการจอง, สถานะการจ่ายเงิน, ค่าคอมมิชชัน, และระบบ Affiliate
*   **AI Planning:** เก็บประวัติการแชทกับ AI และแผนการเกษียณ
*   **Community:** โพสต์ในเว็บบอร์ด การกดไลก์ คอมเมนต์

### 4. ระบบ AI (AI System Architecture)
*   **Retirement Readiness Score Engine:** ให้คะแนนความพร้อมในการเกษียณ
*   **AI Chat Assistant (Planner):** แชทบอทที่ตอบกลับแบบสตรีมมิ่ง (SSE) สามารถเรียกใช้ Tools เพื่อดึงข้อมูลจริง
*   **Service Recommendation Engine:** แนะนำบริการด้วย Semantic Search (pgvector)
*   **Content Moderation:** คอยช่วยคัดกรองรีวิวหรือโพสต์ที่ไม่เหมาะสม

### 5. API และความปลอดภัย (API Design & Security)
*   **Authentication:** ใช้ Supabase Auth ร่วมกับ JWT Guard ของ NestJS
*   **Authorization:** มีระบบ Role (User, Provider, Creator, Admin) ควบคุมสิทธิ์ และ RLS (Row-Level Security)
*   API ใช้ NestJS `@Sse()` สำหรับสตรีมข้อมูลข้อความจาก AI

### 6. แผนการพัฒนา (Milestones)
*   **Phase 1 (Foundation):** ขึ้นระบบพื้นฐาน, ระบบล็อกอิน, Marketplace เบื้องต้น, AI ประเมินคะแนนเกษียณ และข้อมูลวีซ่า
*   **Phase 2 (Commerce):** ทำระบบจอง, ระบบจ่ายเงิน, ระบบ Affiliate, บอร์ดคอมมูนิตี้, และระบบ AI Chat
*   **Phase 3 (Intelligence & Scale):** วิเคราะห์ความเสี่ยงสุขภาพเชิงลึก, ทำแพลนย้ายถิ่นฐาน, รองรับภาษาอื่นๆ เพิ่มเติม
