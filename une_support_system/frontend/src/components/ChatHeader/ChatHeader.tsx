import { Student } from "../../context/ChatContext";
import "./ChatHeader.module.scss";
import styles from "./ChatHeader.module.scss";

export interface ChatHeaderProps {
  activeStudent?: Student | null;
}
export const ChatHeader = ({ activeStudent }: ChatHeaderProps) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeader__title}>
        <h1>Course Support Chat</h1>
      </div>

      <div className={styles.chatHeader__userInfo}>
        <div className={styles.chatHeader__userInfo__name}>
          {`${activeStudent?.firstName} ${activeStudent?.lastName}`}
        </div>
        <div
          className={`${styles.chatHeader__userInfo__status} 
            ${activeStudent?.id ? styles.active : styles.inActive}`}
        >
          {activeStudent?.id ? "Active" : "InActive"}
        </div>
      </div>
    </div>
  );
};
