import { groupBy, sumBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import '../App.css';

function Statistiikka() {
  const [vastaukset, setVastaukset] = useState([{duration: '', name: ''}]);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState([]);

  let trainingsArray = [];

  const COLORS = ['#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6', '#7CDDDD', '#323232'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/vastaukset')
      .then(response => response.json())
      .then(data => {
        setVastaukset(data.content)
        setReady(true);
      })
      .catch(err => console.error(err))
  };

  if (ready) {
    let myTrainings = {};
    let grouppedObject = groupBy(vastaukset, 'kysymys');
    for (let item in grouppedObject) {
        myTrainings = {
            "kysymys": item,
            "Vastaus": sumBy(grouppedObject[item], 'vastausteksti')
        };
        trainingsArray.push(myTrainings);
    };
    setData(trainingsArray);
    setReady(false);
    console.log(data);
    console.log(ready);
    console.log(vastaukset);
  };

  return (
    <div>
      <div>
        <BarChart width={800} height={400} data={data}>
          <XAxis dataKey="kysymys" stroke="#8884d8" />
          <YAxis />
          <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#333', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Tooltip wrapperStyle={{ width: 120, backgroundColor: '#333' }} />
          <Bar dataKey="Vastaus" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
}

export default Statistiikka;