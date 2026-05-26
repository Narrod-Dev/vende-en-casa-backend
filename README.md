# vende-en-casa-backend
##  Descripción
Backend desarrollado con NestJS para la plataforma VendeEnCasa, enfocada en la venta de artículos de segunda mano.
---
##  Tecnologías Utilizadas
- NestJS
- Node.js
- PostgreSQL
- TypeORM
- Swagger
- TypeScript

---
## Requisitos Previos
Antes de iniciar el proyecto, instalar lo siguiente:
-	Node.js 
-	NVM 
-	NestJS CLI 
-	PostgreSQL 
## Verificar versiones
` nvm -v`
`node -v`
`nest -v`
## Instalar versión de Node recomendada
`nvm install 24.14.1`
`nvm use 24.14.1`
## Instalar Nest CLI
npm install -g @nestjs/cli
## Creación del Proyecto
Crear el proyecto:

```bash
nest new vende-en-casa-backend
```

Seleccionar:

```bash
npm
```

Ingresar al proyecto:

```bash
cd vende-en-casa-backend
```
Iniciar el servidor:

```bash
npm run start:dev
```
Abrir en Visual Studio Code:

```bash
code .
```

---
## Estructura del Proyecto

``` 
src/
├── modules/
│ ├── categories/
│ ├── conversations/
│ ├── messages/
│ ├── product-images/
│ ├── products/
│ ├── ratings/
│ └── users/
│
├── app.module.ts
└── main.ts
```

---

## Módulos del Proyecto

| Módulo | Descripción |
|--------|-------------|
| users | Gestión de usuarios |
| products | Gestión de productos publicados |
| product-images | Manejo de imágenes de productos |
| categories | Categorías de productos |
| ratings | Sistema de valoraciones |
| conversations | Conversaciones entre usuarios |
| messages | Mensajes de chat |

---

## Generación de Módulos y Archivos
> La siguiente estructura utiliza el módulo `users` como ejemplo base para la creación de módulos dentro del proyecto.
Crear módulo

```bash
nest g module modules/users
```
 Crear controlador

```bash
nest g controller modules/users/controllers/users --flat
```
Crear servicio

```bash
nest g service modules/users/services/users --flat --no-spec
```
 Crear DTO

```bash
nest g class modules/users/dto/user.dto --flat --no-spec
```
Crear carpeta entities manualmente

```bash
mkdir src/modules/users/entities
```
Crear archivo entity

```bash
touch src/modules/users/entities/user.entity.ts
```

## Instalación de Dependencias
### Mapped Types
```bash
npm i @nestjs/mapped-types
```
### Swagger
```bash
npm install @nestjs/swagger swagger-ui-express
```
## variables de entorno
```
npm add @nestjs/config
```
> TypeORM y PostgreSQL
```bash
npm add @nestjs/typeorm typeorm
```
## Configuración de Swagger
 En main.ts agregar:
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  const config = new DocumentBuilder()
  .setTitle('API de VendeEnCasa')
  .setDescription('API para la venta de objetos de segunda mano en VendeEnCasa')
  .setVersion('1.0')
  .build();

  const documnt = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documnt);
  await app.listen(process.env.PORT ?? 3000);
}
```
> Luego acceder a Swagger desde:
http://localhost:3000/api/docs

## Configuración de Base de Datos
### Archivo .env.template
```env.template
DB_NAME=vendeencasadb
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```
### Archivo .env
```env
DB_NAME=vendeencasadb
DB_USERNAME=Tu_Usuario
DB_PASSWORD=Tu_Contraseña
DB_HOST=localhost
DB_PORT=5432
```
## Configuración TypeORM
En app.module.ts:
```ts
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MessagesModule,
    CategoriesModule,
    RatingsModule,

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConversationsModule,
    ProductImagesModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
```
## Entity user
```ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;
  @Column({ type: 'varchar', length: 100 })
  full_name: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;
  @Column({ type: 'varchar', length: 100 })
  location: string;
  @Column({ type: 'varchar', length: 20 })
  role: string;
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
```
# Configuración Inicial del Proyecto
## Project Setup
1.	Clonar el proyecto 
2.	Ejecutar: 
```Bash
npm install
```
3.	Clonar el archivo .env.template y renombrarlo a .env 
4.	Editar el archivo .env 
5.	Crear la base de datos 
6.	Levantar la API: 
```bash
npm run start:dev
```
## Estado del Proyecto

> Proyecto en desarrollo.

---
