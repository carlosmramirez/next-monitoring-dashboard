***Check out the deployed project with the link below!***

https://next-monitoring-dashboard.vercel.app/

This application will allow a user to create and monitor issues for their application. This application was deployed with Vercel and the MySQL database was deployed with Aiven. Please let me know if you have any questions!

Technologies: React, TypeScript, Next.js, Prisma, MySQL, NextAuth.js, Google OAuth 2.0, Radix-UI, Tailwind CSS, Sentry, TanStack/React Query

## Screenshots of production application

### **Homepage/Dashboard**
![Screen Shot 2025-05-07 at 1 30 41 PM](https://github.com/user-attachments/assets/e6f9dbe1-c29e-4904-96e5-456012d0e5e7)

### **Issue List View**
![Screen Shot 2025-05-07 at 1 16 46 PM](https://github.com/user-attachments/assets/5bd195e7-9707-498a-ba07-36ff62aa5fa0)

### **Create Issue Form**
![Screen Shot 2025-05-07 at 1 19 55 PM](https://github.com/user-attachments/assets/0ddc3ed6-014c-4fb7-9f37-9dd579c7cc1a)

### **Edit Issue Form**
![Screen Shot 2025-05-07 at 1 20 42 PM](https://github.com/user-attachments/assets/1bb4228a-08da-4872-8a91-27387e91cb51)

### **Issue Details Page**
![Screen Shot 2025-05-07 at 1 20 17 PM](https://github.com/user-attachments/assets/abf7b108-3daa-4f08-9743-2059a603e6d6)

## Future Enhancements
- Add drop down and CRUD to change issue status
- Custom error toasts
- Allow to sort by descending in issue table
- Default sortBy on issue table with createdAt column so new issues are seen first
- Add search bar to issue table
- Add loader to chart on home page
- Add loader when creating an issue
- Add createdBy/updatedBy column, so it is clear which user has created/updated an issue

## Getting Started

INSTRUCTIONS TO RUN LOCALLY: 
  1. Clone the repo to your machine
  2. Create an `.env` file using the example and populate the required variables.
  3. Run `npm install`
  4. Run `npx prisma migrate dev`
  5. Run `npm run dev`
