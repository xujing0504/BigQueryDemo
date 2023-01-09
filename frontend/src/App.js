import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import { Form, Button } from "react-bootstrap";

const DATA_SOURCE = {
  LANGUAGE: 1,
  LICENSE: 2,
};
const CHART_TYPE = {
  BAR: 1,
  PIE: 2,
};

function App() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState(CHART_TYPE.BAR);
  const [dataScource, setDataScource] = useState(DATA_SOURCE.LANGUAGE);

  useEffect(() => {
    if (dataScource.toString() === DATA_SOURCE.LANGUAGE.toString()) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/languages`)
        .then(({ data }) => {
          const trans = [];
          data.result.map((item) =>
            trans.push({ title: item.LANGUAGE, value: item.total_bytes })
          );
          setData(trans);
        });
    }

    if (dataScource.toString() === DATA_SOURCE.LICENSE.toString()) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/licenses`)
        .then(({ data }) => {
          const trans = [];
          data.result.map((item) =>
            trans.push({ title: item.license, value: item.total })
          );
          setData(trans);
        });
    }
  }, [dataScource]);

  return (
    <div className="App">
      <Form.Group controlId="Chart">
        <Form.Label>Select Chart Type</Form.Label>
        <Form.Control
          as="select"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option>choose chart type</option>
          <option value={CHART_TYPE.BAR}>Bar Chart</option>
          <option value={CHART_TYPE.PIE}>Pie Chart</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="datasources">
        <Form.Label>Select Data Type</Form.Label>
        <Form.Control
          as="select"
          value={dataScource}
          onChange={(e) => setDataScource(e.target.value)}
        >
          <option>choose a source</option>
          <option value={DATA_SOURCE.LANGUAGE}>languages</option>
          <option value={DATA_SOURCE.LICENSE}>licences</option>
        </Form.Control>
      </Form.Group>

      {chartType == CHART_TYPE.BAR && <BarChart data={data} />}
      {chartType == CHART_TYPE.PIE && <PieChart data={data} />}
    </div>
  );
}

export default App;
