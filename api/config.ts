// @ts-ignore
// Busca os valores declarados no .env 
// caso o arquivo não exista, o mesmo deve ser criado
import {IP_DEV, IP_PRODUCAO, AUTH, TESTE} from "@env";

export default{
    IP_DEV,
    IP_PRODUCAO,
    AUTH,
    TESTE
}