# TaskFlow: Modern Task Management Application

Version
License
NestJS
MongoDB
React


  A beautiful and intuitive task management application to help you stay organized and productive.


## ✨ Features

- 📱 **Responsive Design** - Works flawlessly across all devices
- 🌓 **Theme Switching** - Choose between light, dark, or system theme
- 📋 **Task Organization** - Keep all your tasks in one place, categorized by status
- ⏱️ **Progress Tracking** - Monitor task progress and stay on top of deadlines
- 🎯 **Goal Achievement** - Break down goals into manageable tasks
- 🔄 **CRUD Operations** - Create, read, update, and delete tasks with ease

## 📸 Screenshots

![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/1.png)
![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/2.png)
![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/3.png)
![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/4.png)
![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/5.png)
![Alt text](https://github.com/ayerna/TaskFlow/blob/main/taskFlow%20pics/6.png)

## 🛠️ Technology Stack

### Frontend
- **React** - Building UI components
- **React Router** - Navigation management
- **CSS/SCSS** - Styling and responsive design
- **Context API** - State management (theme, tasks)

### Backend
- **NestJS** - Scalable and efficient server-side framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **RESTful API** - Industry standard API architecture

## 📋 Application Pages

### Home Page
Displays a comprehensive list of all your tasks with:
- Task titles for quick identification
- Status indicators (pending, in-progress, completed)
- Clean, intuitive interface

### Task Detail Page
Provides in-depth information about each task:
- Complete title and description
- Current status with visual indicators
- Options to edit or delete

### New Task Page
A user-friendly form to create tasks with:
- Title input field (required)
- Detailed description field (required)
- Status dropdown selection

### Edit Task Page
Pre-populated form allowing you to:
- Modify task title and description
- Update task status
- Save changes or cancel

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/:id` | Retrieve a specific task by ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Remove a task |

## 📊 Data Model

```typescript
Task {
  id: ObjectId,              // Unique identifier (MongoDB)
  title: string,             // Short, descriptive title (required)
  description: string,       // Detailed task information (required)
  status: enum               // One of: 'pending', 'in-progress', 'completed'
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or Atlas)
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/ayerna/taskflow.git
cd taskflow/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start the development server
npm run start:dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Launch the application
npm start
```

## 🎨 Theme Options

TaskFlow offers three theme options for optimal user experience:
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Reduced eye strain in low-light environments
- **System** - Automatically matches your device preferences

## 🤝 Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Enhancements

- User authentication
- Task categories and tags
- Due dates and reminders
- Task priority levels
- Collaborative features

---


  TaskFlow - Manage your tasks with ease and boost your productivity!



  Made with ❤️ by Gladwin Benjamin aka ayerna
