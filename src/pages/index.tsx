import { GetStaticProps } from "next";
import Head from "next/head";
import { ButtonAction } from "../components/ButtonAction";
import { stripe } from "../services/stripe";
import styles from "../styles/home.module.scss";

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>
			<main className={styles.homeContainer}>
				<section className={styles.sectionContent}>
					<span>👏 Hey, welcome</span>
					<h1>
						News about the <span>React</span> world.
					</h1>
					<p>
						Get access to all the publications <br />
						<span>for {product.amount} month</span>
					</p>
					<ButtonAction priceId={product.priceId} />
				</section>
				<img src="/images/avatar.svg" alt="gril-coding" />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve("price_1LztcrDCrBM9tzxj1k2yweAw");

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat("en-Us", {
			style: "currency",
			currency: "USD",
		}).format(Number(price.unit_amount) / 100),
	};

	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24, //60 (segundos) * 60(minutos) * 24 horas
	};
};
