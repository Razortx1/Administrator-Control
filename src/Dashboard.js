import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import Card from "./Card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Colors,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function Dashboard() {
  const [ContadorClienta, setContadorClienta] = useState([]);


  // Datos de ganancias por disciplina
  const clasesPorMes = 12; // Número de clases por mes
  const cuposPorClase = 8; // Número de cupos por clase

  // Ganancias estimadas para cada disciplina
  const yogaMonthlyRevenue = clasesPorMes * cuposPorClase * 19000;  // Ganancia de Yoga
  const crossfitMonthlyRevenue = clasesPorMes * cuposPorClase * 22000;  // Ganancia de Crossfit
  const zumbaMonthlyRevenue = clasesPorMes * cuposPorClase * 10000;  // Ganancia de Zumba

  // Distribución de ingresos (suponiendo estos valores por disciplina)
  const totalRevenue = yogaMonthlyRevenue + crossfitMonthlyRevenue + zumbaMonthlyRevenue;
  const gananciasYoga = [
    0, yogaMonthlyRevenue, yogaMonthlyRevenue * 1.1, yogaMonthlyRevenue * 1.2, yogaMonthlyRevenue * 1.3,
    yogaMonthlyRevenue * 1.0, yogaMonthlyRevenue * 1.0, yogaMonthlyRevenue * 1.2, yogaMonthlyRevenue * 1.7, 
    yogaMonthlyRevenue * 1.5, yogaMonthlyRevenue * 1.7, yogaMonthlyRevenue * 1.5, yogaMonthlyRevenue * 1.7
  ];
  
  const gananciasCrossfit = [
    0, crossfitMonthlyRevenue, crossfitMonthlyRevenue * 0.5, crossfitMonthlyRevenue * 0.2, crossfitMonthlyRevenue * 0.3,
    crossfitMonthlyRevenue * 0.7, crossfitMonthlyRevenue * 0.9, crossfitMonthlyRevenue * 1, crossfitMonthlyRevenue * 0.8, 
    crossfitMonthlyRevenue * 0.7, crossfitMonthlyRevenue * 0.9, crossfitMonthlyRevenue * 1, crossfitMonthlyRevenue * 1.3
  ];

  const gananciasZumba = [
    0, zumbaMonthlyRevenue, zumbaMonthlyRevenue * 1.1, zumbaMonthlyRevenue * 1.2, zumbaMonthlyRevenue * 1.2,
    zumbaMonthlyRevenue * 1.2, zumbaMonthlyRevenue * 1.3, zumbaMonthlyRevenue * 1.1, zumbaMonthlyRevenue * 1.0, 
    zumbaMonthlyRevenue * 1.8, zumbaMonthlyRevenue * 1.8, zumbaMonthlyRevenue * 2, zumbaMonthlyRevenue * 2.5
  ];


  useEffect(() => {
    getNumeroClienta();
  }, []);

  let getNumeroClienta = async () => {
    try {
      const cuentaCliente = await axios.get(
        "http://localhost:8000/api/contar-clientas"
      );
      setContadorClienta(cuentaCliente.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon
            icon={faDownload}
            style={{ marginRight: "0.25rem", color: "white" }}
          />
          Generar Reporte
        </a>
      </div>
      <div className="row">
        <Card title="Ganancias Mensuales" value="$750.000" color="primary" />
        <Card title="Ganancias Anuales" value="$9.000.000" color="success" />
        <Card
          title="Cantidad de Clientas"
          value={ContadorClienta.contador_clientas}
          color="warning"
        />
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-5">
          <Doughnut
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Ganancias por disciplina en 2024",
                },
              },
            }}
            data={{
              labels: [
                "Yoga", // Ganancia por Yoga
                "Crossfit", // Ganancia por Crossfit
                "Zumba", // Ganancia por Zumba
              ],
              datasets: [
                {
                  data: [
                    (yogaMonthlyRevenue), // Porcentaje de ganancia de Yoga
                    (crossfitMonthlyRevenue), // Porcentaje de ganancia de Crossfit
                    (zumbaMonthlyRevenue), // Porcentaje de ganancia de Zumba
                  ],
                  backgroundColor: [
                    "rgb(255, 99, 132)", // Color para Yoga
                    "rgb(54, 162, 235)", // Color para Crossfit
                    "lightgreen", // Color para Zumba
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </div>
        <div className="col-xl-8 col-lg-7">
        <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Resumen de Ganancias (2024)",
            },
          },
        }}
        data={{
          labels: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ],
          datasets: [
            {
              label: "Ganancias Yoga ($)",
              data: gananciasYoga,
              fill: false,
              borderColor: "rgb(255, 99, 132)", // Color para Yoga
              tension: 0.1,
            },
            {
              label: "Ganancias Crossfit ($)",
              data: gananciasCrossfit,
              fill: false,
              borderColor: "rgb(54, 162, 235)", // Color para Crossfit
              tension: 0.1,
            },
            {
              label: "Ganancias Zumba ($)",
              data: gananciasZumba,
              fill: false,
              borderColor: "lightgreen", // Color para Zumba
              tension: 0.1,
            },
          ],
        }}
      />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
