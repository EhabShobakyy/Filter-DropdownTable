import React, { useEffect, useState } from "react";
// to call data
import axios from "axios";
import AccessRefreshTokens from "../RefreshToken/AccessRefreshTokens";
// Style
import "./FinancialReports.css";
function FinancialReport() {
  const [FinancialReport, setFinancialReport] = useState([]);
  const [filterReports, setFilterReports] = useState();

  var filterValue = [];

  useEffect(() => {
    AccessRefreshTokens.getAccessToken();
    axios
      .get(`https://data.argaam.com/api/v1/json/ir-api/financial-results/en`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.financialResults);
        setFinancialReport(res.data.financialResults);
        setFilterReports(res.data.financialResults);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("token")]);

  const handelEvent = (e) => {
    filterValue = FinancialReport.slice(0, 5).filter((item) => {
      return e.target.value == item.year;
    });

    e.target.value === "All Years"
      ? setFilterReports(FinancialReport)
      : setFilterReports(filterValue);
  };

  return (
    <>
      <div className="financial-reports py-5">
        <div className="container-md">
          <h2 className="mb-4">Financial Reports</h2>
          <select onChange={handelEvent}>
            <option>All Years</option>
            {FinancialReport?.slice(0, 5)?.map((years, id) => {
              return <option key={id}>{years.year}</option>;
            })}
          </select>

          <table
            className="reports-table text-center"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Year</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Annual</th>
                <th>Board</th>
              </tr>
            </thead>
            <tbody>
              {filterReports?.slice(0, 5)?.map((item, id) => {
                return (
                  <tr className="py-3" key={id}>
                    <td style={{ textAlign: "left" }}>{item.year}</td>
                    <td>
                      {item.q1en != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q1en}
                        >
                          EN
                        </a>
                      )}
                      {item.q1ar != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q1ar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                    <td>
                      {item.q2en != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q2enn}
                        >
                          EN
                        </a>
                      )}
                      {item.q2ar != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q2ar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                    <td>
                      {item.q3en != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q3en === "" ? "" : item.q3en}
                        >
                          EN
                        </a>
                      )}
                      {item.q3ar != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q3ar === "" ? "" : item.q3ar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                    <td>
                      {item.q4en != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q4en}
                        >
                          EN
                        </a>
                      )}
                      {item.q4ar != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.q4ar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                    <td>
                      {item.annualen != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.annualen}
                        >
                          EN
                        </a>
                      )}
                      {item.annualar != "" && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.annualar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                    <td>
                      {item.managementen != "" && item.managementen != null && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.managementen}
                        >
                          EN
                        </a>
                      )}
                      {item.managementar != "" && item.managementar != null && (
                        <a
                          target="_blank"
                          download
                          className="btn btn-dark btn-sm m-1"
                          href={item.managementar}
                        >
                          AR
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FinancialReport;
