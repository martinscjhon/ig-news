import styles from "./styles.module.scss";
import { BsArrowRightShort } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";

interface ActionProps {
	priceId: string;
}

export function SubscribeButton({ priceId }: ActionProps) {
	const { data: session } = useSession();

	async function handleSubscribe() {
		if (!session) {
			signIn("github");
			return;
		}

		try {
			const response = await api.post("/subscribe");

			const { sessionId } = response.data;
		} catch (error) {}
	}

	return (
		<button className={styles.buttonAction} onClick={handleSubscribe}>
			Subscribe now <i className={styles.iconButton}></i>
			<BsArrowRightShort />
		</button>
	);
}
