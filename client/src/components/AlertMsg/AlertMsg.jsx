import { closeError } from "../../redux/actions";
import styles from "./Alert.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function AlertMsg() {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const funcioncita = () => {
    dispatch(closeError());
  };

  return (
    <div className={styles.containerCont}>
      <div className={styles.msgContainer}>
        <div className={styles.msgContent}>
          <button className={styles.closeBtn} onClick={funcioncita}>x</button>
          <div className={styles.errorMsg}>{error}</div>
        </div>
      </div>
    </div>
  );
}
