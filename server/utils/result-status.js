function setResultStatus(response, functionname, status, statusmessage, result) {
    response.setHeader("Content-Type", "application/json");
    if (status === "error") {
        console.error(new Date());
        console.error("Error occured in : " + functionname);
        console.error(result);
        response.status(403).send({ status: status, statusmessage: statusmessage });
    } else {
        response
        .status(200)
        .send({ status: status, statusmessage: statusmessage, result: result });
    }
    response.end();
}

module.exports = setResultStatus;