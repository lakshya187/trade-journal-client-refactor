import React from "react";
import { Link } from "react-router-dom";

// import { History } from "@mui/icons-material";
import history from "../../utils/history";
import "./addNewTrade.css";
import AddManually from "./../../assets/icons/AddNewTrade/addManually.svg";
import ImportBroker from "./../../assets/icons/AddNewTrade/importBroker.svg";
import ImportExcel from "./../../assets/icons/AddNewTrade/importExcel.svg";
const AddNewTrade = () => {
  return (
    <div className="addNewTradeContainerMain">
      <div
        className="goBack"
        style={{ color: "#fff" }}
        onClick={(e) => history.push("/")}
      >
        Go back
      </div>
      <div className="dashboardAddNewTrades">
        <div className="dashboardAddNewTradesItem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="104.754"
            height="104.936"
            viewBox="0 0 104.754 104.936"
          >
            <g
              id="Group_17412"
              data-name="Group 17412"
              transform="translate(-874.619 -720.217)"
            >
              <path
                id="Path_3"
                data-name="Path 3"
                d="M277.473,147.88l-7.967,7.967,7.967,7.967,2.721-2.72-5.052-5.247,5.052-5.247Z"
                transform="translate(639.703 595.462)"
                fill="silver"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M382.38,150.59l5.052,5.247-5.052,5.247,2.721,2.72,7.967-7.967L385.1,147.87Z"
                transform="translate(551.895 595.469)"
                fill="silver"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M322.29,151.534l8.671-23.314,3.643,1.355-8.671,23.314Z"
                transform="translate(598.64 610.756)"
                fill="silver"
              />
              <path
                id="Path_6"
                data-name="Path 6"
                d="M214.608,136.64a7.729,7.729,0,0,0-4.664-4.858V72.9H197.313a31.156,31.156,0,0,0-62.183,0H122.5v56.937a7.047,7.047,0,0,0-4.081,5.441,6.956,6.956,0,0,0-4.664,6.607,6.759,6.759,0,0,0,6.8,6.8h16.517a6.139,6.139,0,0,0,6.218-6.218,6.254,6.254,0,0,0-4.081-5.83,7.762,7.762,0,0,0-8.55-5.247,7.463,7.463,0,0,0-4.469-2.138V76.791h8.939a31.188,31.188,0,0,0,29.148,29.148v7.773c-.389,0-.777-.194-1.166-.194a7.484,7.484,0,0,0-7.19,6.024,6.956,6.956,0,0,0-4.664,6.607,6.759,6.759,0,0,0,6.8,6.8h16.517a6.139,6.139,0,0,0,6.218-6.218,6.549,6.549,0,0,0-4.081-5.83,7.762,7.762,0,0,0-8.55-5.247l-.194-.194v-9.522a31.188,31.188,0,0,0,29.148-29.148h8.744V131.4a7.176,7.176,0,0,0-5.247-2.138,7.484,7.484,0,0,0-7.19,6.024,6.956,6.956,0,0,0-4.664,6.607,6.8,6.8,0,0,0,7,6.8h16.517a6.139,6.139,0,0,0,6.218-6.218,6.075,6.075,0,0,0-3.886-5.83ZM166.221,102.05a27.205,27.205,0,1,1,27.205-27.205A27.285,27.285,0,0,1,166.221,102.05Z"
                transform="translate(760.864 676.462)"
                fill="silver"
              />
            </g>
          </svg>

          <div>Broker integration</div>
          <p>We will integrate your accourt with your broker and fetch data.</p>
          <div className="btnContainer">
            <div className="btn secondryBtn ">Learn More</div>
            <div
              className="btn primaryBtn marginLeft"
              style={{ marginLeft: "20px" }}
            >
              Select
            </div>
          </div>
        </div>
        <div className="dashboardAddNewTradesItem">
          <svg
            // className="addNewTradeIcon"
            // style={{ width: "50%", fontSize: "18px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="77.14"
            height="72.694"
            viewBox="0 0 77.14 72.694"
          >
            <g
              id="Group_17414"
              data-name="Group 17414"
              transform="translate(-379.869 -720.217)"
            >
              <path
                id="Path_7"
                data-name="Path 7"
                d="M203.42,208.32H183.6a2.159,2.159,0,1,0,0,4.319H203.42a2.159,2.159,0,1,0,0-4.319Z"
                transform="translate(211.842 534.148)"
                fill="silver"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M183.6,309.519H196.67a2.159,2.159,0,1,0,0-4.319H183.6a2.159,2.159,0,1,0,0,4.319Z"
                transform="translate(211.842 452.211)"
                fill="silver"
              />
              <path
                id="Path_9"
                data-name="Path 9"
                d="M183.6,406.959h34.874a2.159,2.159,0,1,0,0-4.319H183.6a2.159,2.159,0,1,0,0,4.319Z"
                transform="translate(211.842 369.801)"
                fill="silver"
              />
              <path
                id="Path_10"
                data-name="Path 10"
                d="M159.109,122.341a2.14,2.14,0,0,0-2.163,2.159v22.976a5.608,5.608,0,0,1-5.624,5.614H104.592a5.608,5.608,0,0,1-5.624-5.614V98.415a5.608,5.608,0,0,1,5.624-5.614H142.58a2.159,2.159,0,1,0,0-4.319H104.591a10,10,0,0,0-9.951,9.933v49.061a10,10,0,0,0,9.951,9.933H151.32a10,10,0,0,0,9.951-9.933V124.5A2.14,2.14,0,0,0,159.109,122.341Z"
                transform="translate(285.229 635.502)"
                fill="silver"
              />
              <path
                id="Path_11"
                data-name="Path 11"
                d="M375.856,70.589,368.415,64.8a3.251,3.251,0,0,0-2.6-.691,3.5,3.5,0,0,0-2.423,1.382l-4.76,6.133-19.73,25.135v.086l-.086.086a.656.656,0,0,0-.173.345c0,.086,0,.086-.086.173a1.1,1.1,0,0,0-.086.518l-.866,10.97a2.2,2.2,0,0,0,.866,1.9,2.335,2.335,0,0,0,1.3.432,1.915,1.915,0,0,0,.692-.086l10.471-3.455a1.9,1.9,0,0,0,.433-.259.084.084,0,0,0,.086-.086l.26-.259.086-.086v-.086l24.49-31.268a3.5,3.5,0,0,0-.433-5.1Zm-15.144,5.356,6.231,4.837L349.9,102.548l-6.231-4.837ZM342.194,106l.259-3.714,3.289,2.5Zm27.432-28.59L363.4,72.576l2.942-3.8,6.231,4.837Z"
                transform="translate(79.817 656.159)"
                fill="silver"
              />
            </g>
          </svg>

          <div>Add Manually</div>
          <p>
            You will have to fill up a form and add all the details manually
          </p>
          <div className="btnContainer">
            <div className="btn secondryBtn ">Learn More</div>
            <Link to={"/add-manually"} style={{ marginLeft: "20px" }}>
              <div className="btn primaryBtn marginLeft">Select</div>
            </Link>
          </div>
        </div>
        <div className="dashboardAddNewTradesItem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39.765"
            height="53.02"
            viewBox="0 0 39.765 53.02"
          >
            <path
              id="noun-document-4695945"
              d="M141.65,0A1.657,1.657,0,0,0,140,1.663V51.369a1.657,1.657,0,0,0,1.65,1.651h36.464a1.657,1.657,0,0,0,1.651-1.651V13.258a1.658,1.658,0,0,0-.489-1.175L167.681.489A1.656,1.656,0,0,0,166.507,0Zm1.664,3.314h21.539v9.945a1.657,1.657,0,0,0,1.65,1.654h9.948V49.707H143.313ZM168.167,5.66l5.935,5.935h-5.935Zm-14.106.968A1.656,1.656,0,0,0,152.423,8.3V40.739l-2.129-2.13a1.653,1.653,0,1,0-2.333,2.343l4.954,4.958a1.653,1.653,0,0,0,2.333,0l4.971-4.958a1.658,1.658,0,1,0-2.346-2.343l-2.136,2.142V8.3a1.656,1.656,0,0,0-1.676-1.676Z"
              transform="translate(-140)"
              fill="silver"
            />
          </svg>

          <div>Excel import</div>
          <p>
            You can import an excel file to add trades. Our servers parse a
            particular format of excel sheet to extrat data.
          </p>
          <div className="btnContainer">
            <div className="btn secondryBtn ">Learn More</div>
            <Link to={"/add-excel"} style={{ marginLeft: "20px" }}>
              <div className="btn primaryBtn marginLeft">Select</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTrade;
