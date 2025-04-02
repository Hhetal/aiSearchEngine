import styles from "@/app/ui/dashboard/settings/settings.module.css";
import { FaUser, FaRobot, FaBell, FaShieldAlt, FaPalette } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Customize your AI tools experience and manage your preferences</p>
      </div>

      <div className={styles.sections}>
        {/* Profile Settings */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaUser className={styles.icon} />
            <h2>Profile Settings</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Display Name</label>
              <input type="text" placeholder="Your display name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea placeholder="Tell us about yourself"></textarea>
            </div>
            <button className={styles.saveButton}>Save Profile</button>
          </div>
        </div>

        {/* AI Preferences */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaRobot className={styles.icon} />
            <h2>AI Preferences</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Default AI Model</label>
              <select>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5">GPT-3.5</option>
                <option value="claude">Claude</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Temperature</label>
              <input type="range" min="0" max="100" />
            </div>
            <div className={styles.formGroup}>
              <label>Max Tokens</label>
              <input type="number" placeholder="2000" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                Enable Code Completion
              </label>
            </div>
            <button className={styles.saveButton}>Save AI Settings</button>
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaBell className={styles.icon} />
            <h2>Notifications</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                Email Notifications
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                Push Notifications
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                Usage Alerts
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                New Features Announcements
              </label>
            </div>
            <button className={styles.saveButton}>Save Notification Settings</button>
          </div>
        </div>

        {/* Security */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaShieldAlt className={styles.icon} />
            <h2>Security</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Current Password</label>
              <input type="password" />
            </div>
            <div className={styles.formGroup}>
              <label>New Password</label>
              <input type="password" />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <input type="password" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                Enable Two-Factor Authentication
              </label>
            </div>
            <button className={styles.saveButton}>Update Security</button>
          </div>
        </div>

        {/* Appearance */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaPalette className={styles.icon} />
            <h2>Appearance</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Theme</label>
              <select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Font Size</label>
              <select>
                <option value="small">Small</option>
                <option value="medium" selected>Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Code Editor Theme</label>
              <select>
                <option value="monokai">Monokai</option>
                <option value="dracula">Dracula</option>
                <option value="github">GitHub</option>
              </select>
            </div>
            <button className={styles.saveButton}>Save Appearance</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 