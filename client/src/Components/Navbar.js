import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function Navbar() {
	const classes = useStyles();
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					Digital Certificate Validator
				</Typography>
				{/* <Button color="inherit">Login</Button> */}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
