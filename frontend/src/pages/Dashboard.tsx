import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Home, Settings } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );

  const Sidebar = () => (
    <div className="hidden md:flex  flex-col w-64 p-4 border-r">
      <NavItem
        icon={Home}
        label="Home"
        isActive={activeTab === "home"}
        onClick={() => setActiveTab("home")}
      />
      <NavItem
        icon={Settings}
        label="Settings"
        isActive={activeTab === "settings"}
        onClick={() => setActiveTab("settings")}
      />
    </div>
  );

  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around p-2">
      <Button variant="ghost" onClick={() => setActiveTab("home")}>
        <Home
          className={`h-6 w-6 ${activeTab === "home" ? "text-primary" : ""}`}
        />
      </Button>
      <Button variant="ghost" onClick={() => setActiveTab("settings")}>
        <Settings
          className={`h-6 w-6 ${
            activeTab === "settings" ? "text-primary" : ""
          }`}
        />
      </Button>
    </div>
  );

  const HomeContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, User!</h2>
      <p>This is your dashboard home page.</p>
    </div>
  );

  const SettingsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <Input id="username" placeholder="Your username" className="mt-1" />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            className="mt-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button>Reset Password</Button>
          <Button variant={"destructive"}>Logout</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pb-16 md:pb-0">
          {/* <div className="p-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div> */}
          {activeTab === "home" ? <HomeContent /> : <SettingsContent />}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
