import { PrismaClient, TaskStatus } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

async function main() {
  console.log('เริ่มต้น Seeding...');

  // ลบข้อมูลเก่าทั้งหมดก่อน (เรียงตาม dependency)
  await prisma.task.deleteMany();
  await prisma.board.deleteMany();
  await prisma.user.deleteMany();

  console.log('ลบข้อมูลเก่าเรียบร้อย');

  // สร้าง Users
  const user1 = await prisma.user.create({
    data: {
      email: 'somchai@example.com',
      password: 'password123',
      name: 'สมชาย ใจดี',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'somying@example.com',
      password: 'password456',
      name: 'สมหญิง รักเรียน',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'dev@example.com',
      password: 'devpass',
      name: 'Developer',
    },
  });

  console.log('สร้าง Users เรียบร้อย:', { user1: user1.name, user2: user2.name, user3: user3.name });

  // สร้าง Boards
  const board1 = await prisma.board.create({
    data: {
      name: 'โปรเจค Website บริษัท',
      description: 'พัฒนาเว็บไซต์บริษัทใหม่ รวมถึงระบบ CMS และหน้าแสดงผลิตภัณฑ์',
      userId: user1.id,
    },
  });

  const board2 = await prisma.board.create({
    data: {
      name: 'แอป Mobile สั่งอาหาร',
      description: 'พัฒนาแอปพลิเคชันสำหรับสั่งอาหารออนไลน์ ทั้ง iOS และ Android',
      userId: user1.id,
    },
  });

  const board3 = await prisma.board.create({
    data: {
      name: 'ระบบจัดการสินค้าคงคลัง',
      description: 'พัฒนาระบบ Inventory Management สำหรับคลังสินค้า',
      userId: user2.id,
    },
  });

  const board4 = await prisma.board.create({
    data: {
      name: 'Learning Path - Vue.js',
      description: 'บอร์ดสำหรับเรียนรู้ Vue.js ตั้งแต่พื้นฐานจนถึงระดับสูง',
      userId: user3.id,
    },
  });

  console.log(' สร้าง Boards เรียบร้อย:', {
    board1: board1.name,
    board2: board2.name,
    board3: board3.name,
    board4: board4.name,
  });

  // สร้าง Tasks สำหรับ Board 1 (Website บริษัท)
  await prisma.task.createMany({
    data: [
      {
        title: 'ออกแบบ UI/UX',
        description: 'ออกแบบ Wireframe และ Mockup สำหรับหน้าหลัก',
        status: TaskStatus.DONE,
        boardId: board1.id,
        userId: user1.id,
      },
      {
        title: 'สร้างหน้า Homepage',
        description: 'พัฒนาหน้าหลักด้วย Vue.js และ Vuetify',
        status: TaskStatus.DOING,
        boardId: board1.id,
        userId: user2.id,
      },
      {
        title: 'ระบบ Login/Register',
        description: 'พัฒนาระบบยืนยันตัวตนผู้ใช้',
        status: TaskStatus.TODO,
        boardId: board1.id,
        userId: null,
      },
      {
        title: 'หน้าแสดงผลิตภัณฑ์',
        description: 'สร้างหน้าแสดงรายการสินค้าและรายละเอียด',
        status: TaskStatus.TODO,
        boardId: board1.id,
        userId: user3.id,
      },
    ],
  });

  // สร้าง Tasks สำหรับ Board 2 (แอป Mobile)
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup React Native',
        description: 'ตั้งค่าโปรเจคและ Dependencies พื้นฐาน',
        status: TaskStatus.DONE,
        boardId: board2.id,
        userId: user1.id,
      },
      {
        title: 'หน้าเมนูอาหาร',
        description: 'แสดงรายการอาหารพร้อมรูปภาพและราคา',
        status: TaskStatus.DOING,
        boardId: board2.id,
        userId: user1.id,
      },
      {
        title: 'ระบบตะกร้าสินค้า',
        description: 'เพิ่ม/ลบ/แก้ไขรายการในตะกร้า',
        status: TaskStatus.TODO,
        boardId: board2.id,
        userId: null,
      },
      {
        title: 'ระบบชำระเงิน',
        description: 'เชื่อมต่อกับ Payment Gateway',
        status: TaskStatus.TODO,
        boardId: board2.id,
        userId: null,
      },
    ],
  });

  // สร้าง Tasks สำหรับ Board 3 (Inventory)
  await prisma.task.createMany({
    data: [
      {
        title: 'ออกแบบ Database Schema',
        description: 'ออกแบบโครงสร้างฐานข้อมูลสำหรับระบบคลังสินค้า',
        status: TaskStatus.DONE,
        boardId: board3.id,
        userId: user2.id,
      },
      {
        title: 'CRUD สินค้า',
        description: 'สร้าง API สำหรับจัดการข้อมูลสินค้า',
        status: TaskStatus.DOING,
        boardId: board3.id,
        userId: user2.id,
      },
      {
        title: 'ระบบรายงาน',
        description: 'สร้างรายงานสินค้าคงเหลือและการเคลื่อนไหว',
        status: TaskStatus.TODO,
        boardId: board3.id,
        userId: null,
      },
    ],
  });

  // สร้าง Tasks สำหรับ Board 4 (Learning)
  await prisma.task.createMany({
    data: [
      {
        title: 'เรียน Vue Basics',
        description: 'เรียนรู้ Template, Reactivity, และ Components',
        status: TaskStatus.DONE,
        boardId: board4.id,
        userId: user3.id,
      },
      {
        title: 'เรียน Composition API',
        description: 'เรียนรู้ Script Setup และ Composables',
        status: TaskStatus.DONE,
        boardId: board4.id,
        userId: user3.id,
      },
      {
        title: 'เรียน Pinia',
        description: 'เรียนรู้ State Management ด้วย Pinia',
        status: TaskStatus.DOING,
        boardId: board4.id,
        userId: user3.id,
      },
      {
        title: 'เรียน Vue Router',
        description: 'เรียนรู้การจัดการ Routing',
        status: TaskStatus.TODO,
        boardId: board4.id,
        userId: user3.id,
      },
      {
        title: 'สร้างโปรเจคจริง',
        description: 'นำความรู้ที่เรียนมาสร้างโปรเจคจริง',
        status: TaskStatus.TODO,
        boardId: board4.id,
        userId: null,
      },
    ],
  });

  console.log('สร้าง Tasks เรียบร้อย');

  // แสดงสรุป
  const userCount = await prisma.user.count();
  const boardCount = await prisma.board.count();
  const taskCount = await prisma.task.count();

  console.log('สรุปข้อมูลที่สร้าง:');
  console.log(`Users: ${userCount}`);
  console.log(`Boards: ${boardCount}`);
  console.log(`Tasks: ${taskCount}`);
  console.log('Seeding เสร็จสิ้น!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
