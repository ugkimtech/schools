import "./assets/styles/Page.css";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

export default function Page({sideBar={}, topBar=true, children}){

    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    // Handle resize events
    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 600;
            setSidebarOpen(isDesktop);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    
    return (
        <>
        <div className="dashboard-container">
                {
                    sideBar ?
                    <Sidebar 
                        menuItems={sideBar.menuItems}
                        schoolProfile={sideBar.profile}
                        title={sideBar.title}
                        sidebarOpen={sidebarOpen}
                        onCloseSidebar={closeSidebar}
                    /> : ''
                }
                
                <main className="main-content">
                  <TopBar 
                    onMenuToggle={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                  />
                  <StatCardsGrid />
                  <TableCard />
                  <Events />
                  <PerformanceSummary />
                </main>
        
                {/* Overlay for mobile */}
                {sidebarOpen && window.innerWidth < 600 && (
                  <div className="sidebar-overlay" onClick={closeSidebar}></div>
                )}
              </div>
        </>
    );
}