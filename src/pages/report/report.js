import React, { useState } from 'react'
import { BarChart } from '../../components/barChart/barChart'
import { DoughnutChart } from '../../components/doughnutChart/doughnutChart'
import useFetchWithLoader from '../../hooks/useFechWithLoader'
import useSessionStorage from '../../hooks/useSessionStorage'
import { getProyectosByFilter } from '../../services/proyecto-service'
import { getUsersByFilter } from '../../services/usuario-service'
import './report.scss'

const data = {
    labels: [ 'Red', 'Orange', 'Blue' ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
            label: 'Popularity of colours',
            data: [ 55, 23, 96 ],
            // you can set indiviual colors for each bar
            backgroundColor: [
                'red',
                'orange',
                'blue'
            ],
            borderWidth: 1,
        }
    ]
}


const proyectoInitialState = {
    data: [
        {
            id: null,
            nombre: null,
        }
    ]
}

const userInitialState = {
    data: [
        {

            id: null,
            name: null,
            lastName: null,
            email: null
        }
    ]
}

function ReportPage() {
    const [ chartData, setChartData ] = useState(data)
    const [ chartEmpleadoData, setChartEmpleadoData ] = useState(data)
    const [ proyectos, setProyectos ] = React.useState(proyectoInitialState.data);
    const [ users, setUsers ] = React.useState(userInitialState.data);
    const { loading, callEndpoint } = useFetchWithLoader();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()


    React.useEffect(() => {
        const getProyectos = async () => {
            var response;
            if (userSession.userRole === 1) {
                response = await callEndpoint(
                    getProyectosByFilter('', null)
                )
            } else {
                response = await callEndpoint(
                    getProyectosByFilter('', userSession.empresaId)
                )
            }

            if (response?.status === 200) {
                setProyectos(response?.data)

                setChartData({
                    labels: response?.data.map((x) => x.nombre),
                    datasets: [
                        {
                            label: "Price in USD",
                            data: response?.data.map((x) => x.tareas.length),
                            backgroundColor: [
                                "#ffbb11",
                                "#a60726",
                                "#50AF95",
                                "#f3ba2f",
                                "#2a71d0",
                                "#7a6867",
                                "#06471d",
                                "#120647"
                            ]
                        }
                    ]
                });
            };
        }

        const getUsers = async () => {
            var response;
            if (userSession.userRole === 1) {
                response = await callEndpoint(
                    getUsersByFilter('', null)
                )
            } else {

                response = await callEndpoint(
                    getUsersByFilter('', userSession.empresaId)
                )
            }
            if (response?.status === 200) {
                setUsers(response.data)

                console.log(response)
                setChartEmpleadoData({
                    labels: response?.data.map((x) => x.name),
                    datasets: [
                        {
                            label: "Empleados",
                            data: response?.data.map(x => x.tareas.length),
                            backgroundColor: [
                                "#ffbb11",
                                "#50AF95",
                                "#a60726",
                                "#f3ba2f",
                                "#2a71d0",
                                "#7a6867",
                                "#06471d",
                                "#120647"
                            ]
                        }
                    ]
                });
            }

        }
        getProyectos()
        getUsers()
    }, [])

    return (
        <div className='report-container'>
            <DoughnutChart chartData={chartData} width='400px' />
            <BarChart chartData={chartEmpleadoData} width='800px' />
        </div>
    )
}

export default ReportPage