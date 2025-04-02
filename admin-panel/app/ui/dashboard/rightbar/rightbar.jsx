import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore, MdNotifications, MdInfo } from "react-icons/md";

const Rightbar = () => {
  const announcements = [
    {
      id: 1,
      type: "new",
      title: "Introducing GPT-4: The Next Generation AI Model",
      subtitle: "Enhanced capabilities available",
      description: "Experience the power of GPT-4 with improved reasoning, better context understanding, and advanced features.",
      icon: "🤖",
      buttonText: "Try Now",
      buttonIcon: <MdPlayCircleFilled />,
    },
    {
      id: 2,
      type: "coming",
      title: "New AI Image Generation Tools",
      subtitle: "Enhanced image creation",
      description: "Get ready for advanced image generation with improved quality, more styles, and better control options.",
      icon: "🎨",
      buttonText: "Learn More",
      buttonIcon: <MdReadMore />,
    },
    {
      id: 3,
      type: "update",
      title: "System Maintenance",
      subtitle: "Scheduled for tomorrow",
      description: "We'll be performing system maintenance to improve performance and reliability.",
      icon: "⚙️",
      buttonText: "View Details",
      buttonIcon: <MdInfo />,
    },
  ];

  return (
    <div className={styles.container}>
      {announcements.map((announcement) => (
        <div key={announcement.id} className={styles.item}>
          <div className={styles.bgContainer}>
            <Image className={styles.bg} src="/astronaut.png" alt="" fill />
          </div>
          <div className={styles.text}>
            <span className={`${styles.notification} ${styles[announcement.type]}`}>
              {announcement.icon} {announcement.type === "new" ? "New AI Tool" : 
                announcement.type === "coming" ? "Coming Soon" : "System Update"}
            </span>
            <h3 className={styles.title}>{announcement.title}</h3>
            <span className={styles.subtitle}>{announcement.subtitle}</span>
            <p className={styles.desc}>{announcement.description}</p>
            <button className={`${styles.button} ${styles[announcement.type]}`}>
              {announcement.buttonIcon}
              {announcement.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rightbar;

