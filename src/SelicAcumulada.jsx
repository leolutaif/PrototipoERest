import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelicAcumulada = ({ anoUm, anoDois, anoTres, anoQuatro, anoCinco }) => {
  const [dadosSelic, setDadosSelic] = useState([]);
  const [valorMaioUm, setValorMaioUm] = useState({});
  const [valorMaioDois, setValorMaioDois] = useState({});
  const [valorMaioTres, setValorMaioTres] = useState({});
  const [valorMaioQuatro, setValorMaioQuatro] = useState({});
  const [valorMaioCinco, setValorMaioCinco] = useState({});

  const [taxaSelicUm, setTaxaSelicUm] = useState(null);
  const [taxaSelicDois, setTaxaSelicDois] = useState(null);
  const [taxaSelicTres, setTaxaSelicTres] = useState(null);
  const [taxaSelicQuatro, setTaxaSelicQuatro] = useState(null);
  const [taxaSelicCinco, setTaxaSelicCinco] = useState(null);

  useEffect(() => {
    const fetchSelicData = async () => {
      try {
        const response = await axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados?formato=json');
        const data = response.data;

        // Ordenar os dados em ordem decrescente de data
        data.sort((a, b) => new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-')));

        // Calcular o valor acumulado da Selic
        let acumulado = 1;
        const acumulados = data.map(item => {
          acumulado += parseFloat(item.valor);
          return { ...item, acumulado };
        });

        // Filtrar os dados para o mês de maio dos anos especificados
        const maioDoAnoUm = acumulados.find(item => item.data.includes(`06/${anoUm}`));
        const maioDoAnoDois = acumulados.find(item => item.data.includes(`06/${anoDois}`));
        const maioDoAnoTres = acumulados.find(item => item.data.includes(`06/${anoTres}`));
        const maioDoAnoQuatro = acumulados.find(item => item.data.includes(`06/${anoQuatro}`));
        const maioDoAnoCinco = acumulados.find(item => item.data.includes(`06/${anoCinco}`));

        setDadosSelic(acumulados);
        if (maioDoAnoUm) {
          setValorMaioUm(maioDoAnoUm);
          setTaxaSelicUm(maioDoAnoUm.acumulado); // Atribuir o valor diretamente
        }
        if (maioDoAnoDois) {
          setValorMaioDois(maioDoAnoDois);
          setTaxaSelicDois(maioDoAnoDois.acumulado); // Atribuir o valor diretamente
        }
        if (maioDoAnoTres) {
          setValorMaioTres(maioDoAnoTres);
          setTaxaSelicTres(maioDoAnoTres.acumulado); // Atribuir o valor diretamente
        }
        if (maioDoAnoQuatro) {
          setValorMaioQuatro(maioDoAnoQuatro);
          setTaxaSelicQuatro(maioDoAnoQuatro.acumulado); // Atribuir o valor diretamente
        }
        if (maioDoAnoCinco) {
          setValorMaioCinco(maioDoAnoCinco);
          setTaxaSelicCinco(maioDoAnoCinco.acumulado); // Atribuir o valor diretamente
        }
      } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
      }
    };

    fetchSelicData();
  }, [anoUm, anoDois, anoTres, anoQuatro, anoCinco]);

  return (
    <div>
      <h1>Valor Acumulado da Selic</h1>

      {taxaSelicUm !== null ? (
        <p>O valor acumulado da Selic para maio de {anoUm} é: {taxaSelicUm.toFixed(2)}</p>
      ) : null}

      {taxaSelicDois !== null ? (
        <p>O valor acumulado da Selic para maio de {anoDois} é: {taxaSelicDois.toFixed(2)}</p>
      ) : null}

      {taxaSelicTres !== null ? (
        <p>O valor acumulado da Selic para maio de {anoTres} é: {taxaSelicTres.toFixed(2)}</p>
      ) : null}

      {taxaSelicQuatro !== null ? (
        <p>O valor acumulado da Selic para maio de {anoQuatro} é: {taxaSelicQuatro.toFixed(2)}</p>
      ) : null}

      {taxaSelicCinco !== null ? (
        <p>O valor acumulado da Selic para maio de {anoCinco} é: {taxaSelicCinco.toFixed(2)}</p>
      ) : null}
    </div>
  );
};

export default SelicAcumulada;
