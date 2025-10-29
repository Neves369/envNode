import api from "../api/api";
import exceptionHandler from "../utils/ExceptionHandler";


//Envia os dados coletados da memoria de massa para a API
const SendData = async (serial: string, data: string, arquivo: any) => {
    try {
        return await api.post(`/job-gatway/arquivo-sinc`, arquivo, {
            
            headers: {
                serial: `${serial}`,
                data: `${data}`,
                token: "6b880c59-64e7-4a8d-a64e-41cea0da5589"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

//Recebe da API uma lista de datas que ainda não foram sincronizadas
const GetData = async (serial: string) => {
    try {
        return await api.get(`/job-gatway/datas-sinc`, {

            headers: {
                serial: `${serial}`,
                token: "6b880c59-64e7-4a8d-a64e-41cea0da5589"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

//Recebe da API um relatório referente ao período informado 
const GetRelatorio = async (dataInicio: string, dataFim: string) => {
    try {
        return await api.get(`/log-leitura/relatorio`, {

            headers: {
                serial: `4F3A22`,
                "agrupar-por-hora": true,
                "data-relatorio-inicio": `${dataInicio}`,
                "data-relatorio-fim": `${dataFim}`,
                token: "6b880c59-64e7-4a8d-a64e-41cea0da5589"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

export default {
    SendData,
    GetData,
    GetRelatorio
}