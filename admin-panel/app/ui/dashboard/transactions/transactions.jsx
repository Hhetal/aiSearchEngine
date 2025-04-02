import Image from "next/image";
import styles from "./transactions.module.css";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const Transactions = () => {
  const transactions = [
    {
      id: 1,
      name: "ChatGPT",
      status: "Active",
      date: "14.02.2024",
      usage: 1234,
      change: 12,
      icon: "🤖",
    },
    {
      id: 2,
      name: "DALL-E",
      status: "Active",
      date: "14.02.2024",
      usage: 856,
      change: 8,
      icon: "🎨",
    },
    {
      id: 3,
      name: "Stable Diffusion",
      status: "Maintenance",
      date: "14.02.2024",
      usage: 0,
      change: -5,
      icon: "🖼️",
    },
    {
      id: 4,
      name: "Midjourney",
      status: "Active",
      date: "14.02.2024",
      usage: 2345,
      change: 15,
      icon: "🎭",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent AI Tool Usage</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tool Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Usage Count</td>
            <td>Trend</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className={styles.user}>
                  <span className={styles.icon}>{transaction.icon}</span>
                  {transaction.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles[transaction.status.toLowerCase()]}`}>
                  {transaction.status}
                </span>
              </td>
              <td>{transaction.date}</td>
              <td>{transaction.usage.toLocaleString()}</td>
              <td>
                <span className={`${styles.trend} ${transaction.change >= 0 ? styles.positive : styles.negative}`}>
                  {transaction.change >= 0 ? <MdTrendingUp /> : <MdTrendingDown />}
                  {Math.abs(transaction.change)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
