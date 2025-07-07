export * from './database.module'
export * from './database.service'
export * from './repositories'
export * from './entities'
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

// Seed admin user if not exists
(async () => {
  const dataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433'),
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_DATABASE || 'realestate',
    entities: [UserEntity],
    synchronize: false,
    options: {
      encrypt: false
    }
  });
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(UserEntity);
  const adminEmail = 'admin@admin.com';
  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const password = await bcrypt.hash('admin123', 10);
    admin = userRepo.create({ email: adminEmail, password, role: 'admin' });
    await userRepo.save(admin);
    console.log('Admin user created:', adminEmail);
  } else {
    console.log('Admin user already exists:', adminEmail);
  }
  await dataSource.destroy();
})();
