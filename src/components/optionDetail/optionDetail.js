import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./confirmDeleteModal";
import CloseLegModal from "../closeOptions/closeLegModal";
import history from "../../utils/history";
import { getSingleOptionsTrade } from "../../actions";
import formatCash from "../../utils/formatCash";
import "./optionDetail.css";
import axios from "axios";
import { server_url } from "../../config";
const OptionDetail = ({ trade, match, getSingleOptionsTrade }) => {
  useEffect(() => {
    getSingleOptionsTrade(match.params.id);
  }, []);
  const [updatedTrade, setUpdatedTrade] = useState(null);
  // const deleteUrl = `${server_url}/options/${trade._id}`;
  const goBack = () => {
    history.push("/options-dashboard");
  };
  const renderTags = () => {
    return trade.tags.map((el) => {
      return <div className="tagsItem">{el.text}</div>;
    });
  };
  console.log(trade);
  const renderTable = () => {
    return trade.leg.map((en) => {
      return (
        <tr>
          <td>{`${en.typeOfTrade.toUpperCase()} 
             ${en.strike}
           ${en.optionType.toUpperCase()}`}</td>
          {/* <td>{en.strike}</td> */}
          <td>${formatCash(en.premium)}</td>
          <td>${en.closingPremium}</td>
          <td>{en.quantity}</td>
          <td>{en.lotSize}</td>
          {/* <td>{en.typeOfTrade.toUpperCase()}</td> */}
          <td
            className={`${
              en.profitLoss > 0 ? "colorGreen" : "colorRed"
            } cardFieldtextValue textMain cardField`}
          >
            ${formatCash(en.profitLoss)}
          </td>
          <td>{new Date(en.expireDate).toDateString()}</td>
          <td>{new Date(en.closeDate).toDateString()}</td>
          <td>{new Date(en.openDate).toDateString()}</td>
          <td>
            {en.currentHoldings === 0 ? (
              "Closed leg"
            ) : (
              <CloseLegModal
                updatedTrade={setUpdatedTrade}
                leg={en}
                trade={trade._id}
              />
            )}
          </td>
        </tr>
      );
    });
  };

  if (!trade) return <div>Loading</div>;
  return (
    <div className="optionDetail">
      <div className="optionDetailContainer">
        <div className="optionDetailContainerBackground">
          <div className="optionDetailGoBack" onClick={(e) => goBack()}>
            Go back
          </div>
          <div className={`optionDetailStratName`}>
            <div
              className={`${
                trade.netProfitLoss > 0 ? "winTrade" : "loseTrade"
              }`}
            >
              {trade.ticker}
            </div>
          </div>
          <div className="editBtnContainer">
            <Link
              to={`/option/close-strat/${trade._id}`}
              className="btn primaryBtn "
            >
              Close Trade
            </Link>
            <Link className="btn secondryBtn marginleft">Edit Trade</Link>

            <DeleteModal id={trade._id} />
          </div>
        </div>

        <div className="optionsDEtailsGen">
          <div className="optionsDetailGeneralInfoContainer">
            <div className="tradeDetailsTextContainerLeft">
              <p className="  cardField">
                <span className="textDescription">Ticker :</span> {trade.ticker}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Underlying :</span>{" "}
                {trade.underlying}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Open Date :</span>{" "}
                {new Date(trade.openDate).toDateString()}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Expire Date :</span>{" "}
                {new Date(trade.expireDate).toDateString()}
              </p>
            </div>
            <div className="tradeDetailsTextContainerRight">
              <p className="  cardField">
                <span className={`textDescription `}>Net Premium :</span> $
                {trade.netPremium}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Type of :</span>{" "}
                {trade.typeOfTrade}
              </p>
              <p
                className={`${
                  trade.netProfitLoss > 0 ? "colorGreen" : "colorRed"
                } cardFieldtextValue textMain cardField`}
              >
                <span className={`textDescription  `}>MTM :</span> $
                {trade.netProfitLoss}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Total Legs :</span>{" "}
                {trade.leg.length}
              </p>
            </div>
          </div>
        </div>
        <div className={"tagsContainer"}>Tags : {renderTags()}</div>
      </div>
      <div className="headerContainer">
        <div className="headerMarker"></div>
        <div className="subHeading">All the legs</div>
      </div>
      <div className="subHeading ">
        <div>
          <table className="optionLegTable">
            <tr>
              <th className="optionsTableHeading">Option Name</th>
              {/* <th className="optionsTableHeading">Strike</th> */}
              <th className="optionsTableHeading">Open Premium</th>
              <th className="optionsTableHeading">Close Premium</th>
              <th className="optionsTableHeading">Quantity</th>
              <th className="optionsTableHeading">Lot Size</th>
              {/* <th className="optionsTableHeading">Type Of Trade</th> */}
              <th className="optionsTableHeading">Profit Loss</th>
              <th className="optionsTableHeading">Expire Date</th>
              <th className="optionsTableHeading">Close Date</th>
              <th className="optionsTableHeading">Open Date</th>
              <th className="optionsTableHeading">Actions</th>
            </tr>
            {renderTable()}
          </table>
        </div>
      </div>

      <div className="headerContainer">
        <div className="headerMarker"></div>
        <div className="subHeading">Notes</div>
      </div>
      <div className="optionDetailNotesContainer marginTop marginBottom">
        <div className="tradeDetailsTextContainer">{trade.notes}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trade: state.singleOptiontrade,
  };
};
export default connect(mapStateToProps, { getSingleOptionsTrade })(
  OptionDetail
);
