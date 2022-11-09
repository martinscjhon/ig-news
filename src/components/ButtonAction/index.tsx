import styles from "./styles.module.scss";
import { BsArrowRightShort } from "react-icons/bs";

interface ActionProps {
	priceId: string;
}

export function ButtonAction({ priceId }: ActionProps) {
	return (
		<button className={styles.buttonAction}>
			Subscribe now <i className={styles.iconButton}></i>
			<BsArrowRightShort />
		</button>
	);
}
