import { Flexbox,  SeparationLine, Typography, Link } from "rainbows-ui";
import { useContext } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { NATIVE_TOKEN, UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
export const General = () => {
	const { loop } = useContext(LoopContext);
	const { chainId } = useMoralis();

	const contracts = [
		{ name: "Loop", address: loop?.address },
		{ name: "Plan", address: loop?.plan },
		{ name: "Token", address: loop?.token },
		{ name: "Governor", address: loop?.governor },
		{ name: "Treasury", address: loop?.treasury },
		{ name: "Fundraiser", address: loop?.fundraiser },
		{ name: "Actions", address: loop?.actions },
	];
	return (
		<Container>
			<div style={{ width: "100%" }}>
				<SeparationLine text="Balance" variant="default" />
				<Typography variant="titleL" weight="light">
					{tokenValueTxt(loop?.balance, UNIT_TOKEN.decimal, UNIT_TOKEN.ticker)}
				</Typography>
				<SeparationLine text="Contracts" variant="default" />
				{contracts?.map((contract, index) => (
					<Flexbox
						key={`contract-${contract.index}`}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						style={{ marginTop: "2rem" }}
					>
						<Typography variant="titleXS" weight="strong">
							{contract?.name}
						</Typography>
						<Link
							href={
								NATIVE_TOKEN[chainId].explorer + `address/${contract?.address}`
							}
							target="_blank"
							rel="noreferrer"
							color="textPrimary"
						>
							{contract?.address}
						</Link>
					</Flexbox>
				))}
			</div>
		</Container>
	);
};

const Container = styled.div`
	padding: 3rem;
	max-width: 90rem;
	margin-right: 10rem;
`;

