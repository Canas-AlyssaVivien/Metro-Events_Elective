import '../Css/Organizer_Notification.css';
import React, {useState} from "react";

function Organizer_NotificationDropDown() {
    
    const [activeTab, setActiveTab] = useState("notifications");

    const toggleTab = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="card4">
        <h4 onClick={() => toggleTab("notifications")} className={activeTab === "notifications" ? "active" : ""}>
          Your Notifications
        </h4>
        <h4 onClick={() => toggleTab("events")} className={activeTab === "events" ? "active" : ""}>
          Events
        </h4>
        
      </div>
    );
}

export default Organizer_NotificationDropDown;