import styles from "./ChatErrorMessage.module.scss";

export interface AlertMessage {
  type: "info" | "error" | "success" | "warning";
  description: string;
}

export interface ChatAlertMessageProps {
  message: AlertMessage;
}

export const ChatAlertMessage = ({ message }: ChatAlertMessageProps) => {
  const getClassName = () => {
    switch (message.type) {
      case "info":
        return styles.info;
      case "error":
        return styles.error;
      case "success":
        return styles.success;
      case "warning":
        return styles.warning;
      default:
        return styles.default;
    }
  };

  const className = getClassName();

  return (
    <div className={`${styles.chatAlertMessage} ${className}`}>
      <span className={styles.icon}>
        {message.type === "info" && "ℹ️"}
        {message.type === "error" && "❗"}
        {message.type === "success" && "✅"}
        {message.type === "warning" && "⚠️"}
        {message.type === undefined && "❓"}
      </span>
      {message.description}
    </div>
  );
};
