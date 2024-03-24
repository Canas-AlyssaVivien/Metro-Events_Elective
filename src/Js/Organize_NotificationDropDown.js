import '../Css/Organizer_NotificationDropdown.css';
import React, {useState} from "react";

function Organizer_NotificationDropDown() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [isEventsActive, setIsEventsActive] = useState(false);

  const toggleTab = (tab) => {
    setActiveTab(tab);
    if (tab === "events") {
      setIsEventsActive(true);
    } else {
      setIsEventsActive(false);
    }
    };
  
    return (  
      <div className="card4">
        <div></div>
        <h4 onClick={() => toggleTab("notifications")} className={activeTab === "notifications" ? "active" : ""}>
          Your Notifications
        </h4>
        <h4 onClick={() => toggleTab("events")} className={activeTab === "events" ? "active" : ""}>
          Events
        </h4>
        {isEventsActive && <button className='buttonn'>Create Event</button>}
      </div>
    );
}

export default Organizer_NotificationDropDown;