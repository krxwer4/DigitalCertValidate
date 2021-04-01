import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import availableIcon from "../svg/check.svg";
import notAvailableIcon from "../svg/close.svg";
import warningIcon from "../svg/warning.svg";
import { Link } from "react-router-dom";

const ValidateResult = (props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const zeroPad = (num) => {
    if (num < 10) {
      num = num.toString();
      num = "0" + num;
    }
    return num;
  };

  const preparingOutput = (receipt) => {
    const receiptTime = parseInt(receipt[2]);
    const rcTimeToDatetime = new Date(receiptTime * 1000);
    const time =
      rcTimeToDatetime.getHours() +
      ":" +
      zeroPad(rcTimeToDatetime.getMinutes()) +
      ":" +
      rcTimeToDatetime.getSeconds();
    const date =
      rcTimeToDatetime.getDate() +
      " " +
      months[rcTimeToDatetime.getMonth()] +
      " " +
      rcTimeToDatetime.getFullYear();
    var certInformation = {};
    certInformation.status = receipt[0] ? "Usable" : "Revoke";
    certInformation.addBy = receipt[1];
    certInformation.dateAdded = date + " " + time + " UTC+7";
    certInformation.blocknumber = receipt[3];
    certInformation.adderPublicKeyLinkCheck = receipt[4];
    console.log(certInformation);
    return certInformation;
  };
  console.log(props.location.state.res);
  console.log(props.location.state.res.publicKey);
  const certInformation = preparingOutput(props.location.state.res);
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1} textAlign="center">
          {props.location.state.res[0] === true &&
            props.location.state.res.publicKey === certInformation.addBy && (
              <img src={availableIcon} alt="Alfredo Hernandez" width="250px" />
            )}
          {props.location.state.res[0] === false &&
            props.location.state.res[2] !== "0" &&
            props.location.state.res.publicKey === certInformation.addBy && (
              <img
                src={notAvailableIcon}
                alt="Alfredo Hernandez"
                width="250px"
              />
            )}
          {props.location.state.res[2] !== "0" &&
            props.location.state.res.publicKey !== certInformation.addBy && (
              <img src={warningIcon} alt="Freepik" width="250px" />
            )}
        </Box>
        <Box p={1} textAlign="center">
          {props.location.state.res[2] !== "0" && (
            <div>
              <h2>We found your certificate in blockchain!</h2>
              {props.location.state.res.publicKey === certInformation.addBy && (
                <div>
                  <h3>Certificate's Status : {certInformation.status}</h3>
                  <h3>Certificate's Added By : {certInformation.addBy}</h3>
                  <h3>
                    Certificate's Date Added : {certInformation.dateAdded}
                  </h3>
                  <h3>
                    Certificate's Adder Link :{" "}
                    {certInformation.adderPublicKeyLinkCheck}
                  </h3>
                </div>
              )}
              {props.location.state.res.publicKey !== certInformation.addBy && (
                <div>
                  <h3>
                    But not registered by this account :{" "}
                    {props.location.state.res.publicKey}
                  </h3>
                </div>
              )}
            </div>
          )}
          {props.location.state.res[0] === false &&
            props.location.state.res[2] === "0" && (
              <div>
                <h2>We can't find your certificate in blockchain.</h2>
              </div>
            )}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box mx={4}>
            <Link to={{ pathname: "/" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("wait for edit");
                }}
              >
                Menu
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ValidateResult;
