import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AnalyticsView } from './components/AnalyticsView';
import { MessagesView } from './components/MessagesView';
import { CreativeAssetsView } from './components/CreativeAssetsView';
import { SettingsView } from './components/SettingsView';
import { EditAssetModal } from './components/EditAssetModal';
import { ShareLibraryModal } from './components/ShareLibraryModal';
import { AINeuralModal } from './components/AINeuralModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { NavigationTab, GlassConfig, NotificationItem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global Glass Shader Configuration State
  const [glassConfig, setGlassConfig] = useState<GlassConfig>({
    blur: 24,
    bgOpacity: 5,
    borderOpacity: 10,
    accentColor: '#818cf8',
    glowIntensity: 20
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      user: 'Anna M.',
      action: 'updated',
      target: 'Frosted Glass Tokens v2.4',
      time: '10 mins ago',
      read: false,
      type: 'edit'
    },
    {
      id: 'n2',
      user: 'Sam K.',
      action: 'commented on',
      target: 'Cyber Emerald CTA component',
      time: '25 mins ago',
      read: false,
      type: 'comment'
    },
    {
      id: 'n3',
      user: 'Tina L.',
      action: 'shared',
      target: 'Q4 Campaign Vector Assets',
      time: '1 hour ago',
      read: true,
      type: 'share'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleUpdateGlassConfig = (newConfig: Partial<GlassConfig>) => {
    setGlassConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleResetGlassDefaults = () => {
    setGlassConfig({
      blur: 24,
      bgOpacity: 5,
      borderOpacity: 10,
      accentColor: '#818cf8',
      glowIntensity: 20
    });
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleApplyAIAsset = (title: string) => {
    // Add notification
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      user: 'AI Neural Engine',
      action: 'generated component',
      target: title,
      time: 'Just now',
      read: false,
      type: 'share'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <div 
      className="w-full h-screen bg-[#0A0C14] text-slate-100 flex overflow-hidden relative select-none font-sans"
      style={{
        backgroundImage: 'radial-gradient(circle at 0% 0%, #1e1b4b 0%, transparent 50%), radial-gradient(circle at 100% 100%, #312e81 0%, transparent 50%), radial-gradient(circle at 100% 0%, #1e293b 0%, transparent 40%)'
      }}
    >
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        unreadCount={3}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative z-0 scrollbar-thin">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          unreadNotificationsCount={unreadCount}
          onOpenAIModal={() => setIsAIModalOpen(true)}
          title={
            currentTab === 'dashboard' ? 'Project Workspace' :
            currentTab === 'analytics' ? 'Analytics & Telemetry' :
            currentTab === 'messages' ? 'Team Workspace Messages' :
            currentTab === 'assets' ? 'Q4 Creative Assets' :
            'Engine Settings'
          }
          subtitle={
            currentTab === 'dashboard' ? 'Creative Assets / Q4 Campaign' :
            currentTab === 'analytics' ? 'Realtime CDN & Session Metrics' :
            currentTab === 'messages' ? 'Collaborative Review Channel' :
            currentTab === 'assets' ? 'Design Tokens & Glass Components' :
            'Global Frosted Shaders & Storage'
          }
        />

        {/* Dynamic Tab Screen Render */}
        <div className="flex-1 flex flex-col">
          {currentTab === 'dashboard' && (
            <DashboardView
              onOpenEditModal={() => setIsEditModalOpen(true)}
              onOpenShareModal={() => setIsShareModalOpen(true)}
              onOpenAIModal={() => setIsAIModalOpen(true)}
              glassConfig={glassConfig}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView />
          )}

          {currentTab === 'messages' && (
            <MessagesView />
          )}

          {currentTab === 'assets' && (
            <CreativeAssetsView
              searchQuery={searchQuery}
              onOpenEditModal={() => setIsEditModalOpen(true)}
              onOpenAIModal={() => setIsAIModalOpen(true)}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              glassConfig={glassConfig}
              onUpdateConfig={handleUpdateGlassConfig}
              onResetDefaults={handleResetGlassDefaults}
            />
          )}
        </div>
      </main>

      {/* Interactive Modals */}
      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        glassConfig={glassConfig}
        onUpdateConfig={handleUpdateGlassConfig}
      />

      <ShareLibraryModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <AINeuralModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyAsset={handleApplyAIAsset}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
