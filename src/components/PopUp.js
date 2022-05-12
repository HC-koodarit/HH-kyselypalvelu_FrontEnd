import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../PopUp.css";

//Pop up function. Uses props to trigger popup ontop of the page
function PopUp(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn btn btn-outline-primary" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default PopUp;