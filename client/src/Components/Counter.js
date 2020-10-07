import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function Counter() {
	const [count, setCount] = useState(0);
	console.log(useState(0));
	return (
		<div>
			<h1>HelloWorld</h1>
			<h2>{count}</h2>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setCount(count + 1)}
			>
				click+
			</Button>
			<br />
			<button onClick={() => setCount(count - 1)}>click-</button>
		</div>
	);
}

export default Counter;
