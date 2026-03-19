import { useEffect, useState } from "react";
import "./assets/styles/Page.css";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

export default function Page({sideBar={}, topBar=true, components=[]}){
    // sideBar={{menuItems:menuItems,profile:{},title:''}} 
    // topBar={true} components={[<Component1 />,...]}

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
                    {
                        topBar ? 
                        <TopBar 
                          onMenuToggle={toggleSidebar}
                          sidebarOpen={sidebarOpen}
                        /> : ''
                    }

                    {
                        components ? 
                        components.map((component, index) => (
                            <div className="component" key={index}>{component}</div>
                        )):''
                    }
                </main>
        
                {sidebarOpen && window.innerWidth < 600 && (
                  <div className="sidebar-overlay" onClick={closeSidebar}></div>
                )}
              </div>
        </>
    );
}