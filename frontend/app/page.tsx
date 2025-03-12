import TaskList from "@/components/task-list"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, ListChecks, Plus } from "lucide-react"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-pattern py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
                Organize your work
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Manage Tasks with <span className="text-primary">Ease</span>
              </h1>
              <p className="max-w-[700px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
                A beautiful and intuitive task management application to help you stay organized and productive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/tasks/new">
                  <Button size="lg" className="btn-hover-effect">
                    Create New Task
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organize Tasks</h3>
                <p className="text-muted-foreground">Keep all your tasks in one place and categorize them by status.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">Monitor your progress and stay on top of your deadlines.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete Goals</h3>
                <p className="text-muted-foreground">Achieve your goals by breaking them down into manageable tasks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Task List Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Your Tasks</h2>
                <p className="text-muted-foreground mt-1">Manage and organize your tasks efficiently</p>
              </div>
              <Link href="/tasks/new">
                <Button className="btn-hover-effect">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </Link>
            </div>
            <TaskList />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

