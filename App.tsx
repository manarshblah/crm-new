

import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Sidebar, Header, PageWrapper, AddLeadModal, AddActionModal, AssignLeadModal, FilterDrawer, AddDeveloperModal, AddProjectModal, AddUnitModal, UnitsFilterDrawer, AddOwnerModal, EditOwnerModal, DealsFilterDrawer, AddUserModal, EditUserModal, DeleteUserModal, AddCampaignModal, ManageIntegrationAccountModal, ChangePasswordModal, EditDeveloperModal, EditProjectModal } from './components/index';
import { ActivitiesPage, CampaignsPage, CreateDealPage, DashboardPage, DealsPage, EmployeesReportPage, IntegrationsPage, LeadsPage, LoginPage, MarketingReportPage, OwnersPage, ProfilePage, PropertiesPage, SettingsPage, TeamsReportPage, TodosPage, UsersPage, ViewLeadPage, ServicesInventoryPage, ProductsInventoryPage, ServicesPage, ServicePackagesPage, ServiceProvidersPage, ProductsPage, ProductCategoriesPage, SuppliersPage } from './pages';

const CurrentPageContent = () => {
    const { currentPage } = useAppContext();
    switch (currentPage) {
        case 'Dashboard':
            return <DashboardPage />;
        case 'Leads':
        case 'All Leads':
        case 'Fresh Leads':
        case 'Cold Leads':
        case 'My Leads':
        case 'Rotated Leads':
            return <LeadsPage key={currentPage} />;
        case 'ViewLead':
            return <ViewLeadPage />;
        case 'Activities':
            return <ActivitiesPage />;
        case 'Inventory':
        case 'Properties':
            return <PropertiesPage />;
        case 'Services':
            return <ServicesPage />;
        case 'Service Packages':
            return <ServicePackagesPage />;
        case 'Service Providers':
            return <ServiceProvidersPage />;
        case 'Products':
            return <ProductsPage />;
        case 'Product Categories':
            return <ProductCategoriesPage />;
        case 'Suppliers':
            return <SuppliersPage />;
        case 'Owners':
            return <OwnersPage />;
        case 'Deals':
            return <DealsPage />;
        case 'CreateDeal':
            return <CreateDealPage />;
        case 'Users':
            return <UsersPage />;
        case 'Marketing':
        case 'Campaigns':
            return <CampaignsPage />;
        case 'Todos':
            return <TodosPage />;
        case 'Reports':
        case 'Teams Report':
            return <TeamsReportPage />;
        case 'Employees Report':
            return <EmployeesReportPage />;
        case 'Marketing Report':
            return <MarketingReportPage />;
        case 'Integrations':
        case 'Meta':
        case 'TikTok':
        case 'WhatsApp':
            return <IntegrationsPage key={currentPage} />;
        case 'Settings':
            return <SettingsPage />;
        case 'Profile':
            return <ProfilePage />;
        // ... add other pages here
        default:
            // FIX: The PageWrapper component requires children.
            return <PageWrapper title={currentPage}><div>Content for {currentPage}</div></PageWrapper>;
    }
}

const TheApp = () => {
    const { isLoggedIn, language, isSidebarOpen, setIsSidebarOpen } = useAppContext();
    
    if (!isLoggedIn) {
        return <LoginPage />;
    }

    return (
        <div className={`${language === 'ar' ? 'font-arabic' : 'font-sans'} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
            <div className="relative min-h-screen">
                <Sidebar />
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                        aria-hidden="true"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
                <div className="flex flex-col flex-1 lg:ms-64">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        <CurrentPageContent />
                    </main>
                </div>
                {/* Global Modals & Drawers */}
                <AddLeadModal />
                <AddActionModal />
                <AssignLeadModal />
                <FilterDrawer />
                <UnitsFilterDrawer />
                <DealsFilterDrawer />
                <AddDeveloperModal />
                <AddProjectModal />
                <AddUnitModal />
                <AddOwnerModal />
                <EditOwnerModal />
                <EditDeveloperModal />
                <EditProjectModal />
                <AddUserModal />
                <EditUserModal />
                <DeleteUserModal />
                <AddCampaignModal />
                <ManageIntegrationAccountModal />
                <ChangePasswordModal />
            </div>
        </div>
    );
};


function App() {
  return (
    // FIX: The AppProvider component requires children.
    <AppProvider>
        <TheApp />
    </AppProvider>
  );
}

export default App;