import styles from "../ChatMessageList.module.scss";

export const NoMessagesAvailable = () => {
  return (
    <div className={styles.noMessagesAvailable}>No messages available</div>
  );
};
