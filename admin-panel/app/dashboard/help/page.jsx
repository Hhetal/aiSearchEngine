import styles from "@/app/ui/dashboard/help/help.module.css";
import { FaRobot, FaQuestionCircle, FaBook, FaLightbulb } from "react-icons/fa";

const HelpPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>AI Tools Help Center</h1>
        <p>Find answers to common questions and learn how to use our AI tools effectively</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <FaRobot />
          </div>
          <h2>Getting Started with AI</h2>
          <ul>
            <li>How to use ChatGPT effectively</li>
            <li>Best practices for image generation</li>
            <li>Understanding AI model capabilities</li>
            <li>Tips for better AI prompts</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaQuestionCircle />
          </div>
          <h2>Common Questions</h2>
          <ul>
            <li>How to manage API credits</li>
            <li>Understanding usage limits</li>
            <li>Content moderation guidelines</li>
            <li>Account settings and preferences</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaBook />
          </div>
          <h2>Resources</h2>
          <ul>
            <li>AI prompt templates</li>
            <li>Video tutorials</li>
            <li>Documentation</li>
            <li>Community guides</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaLightbulb />
          </div>
          <h2>Tips & Tricks</h2>
          <ul>
            <li>Advanced prompt engineering</li>
            <li>Optimizing image generation</li>
            <li>Workflow automation</li>
            <li>Integration with other tools</li>
          </ul>
        </div>
      </div>

      <div className={styles.contact}>
        <h2>Need More Help?</h2>
        <p>Our support team is available 24/7 to assist you</p>
        <div className={styles.contactOptions}>
          <button className={styles.contactButton}>Email Support</button>
          <button className={styles.contactButton}>Live Chat</button>
          <button className={styles.contactButton}>Schedule Call</button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 