import React, { useState, useEffect, useRef } from "react";
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { FaArrowRight } from "react-icons/fa";
import logo from "./e-resti.png"
import { FaPix } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import emailjs from 'emailjs-com';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase-config';
import { Document, Page, View, Text, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { FaRegQuestionCircle } from "react-icons/fa";
import logoIr360 from "./logoir360.png"
import { v4 as uuidv4 } from 'uuid';  // Importa a função uuidv4

const indices_IPCA_E = [
  {
    "data": "01/2019",
    "indice": 1.3636909188
  },
  {
    "data": "02/2019",
    "indice": 1.3596120826
  },
  {
    "data": "03/2019",
    "indice": 1.3550050654
  },
  {
    "data": "04/2019",
    "indice": 1.3477273378
  },
  {
    "data": "05/2019",
    "indice": 1.3380930677
  },
  {
    "data": "06/2019",
    "indice": 1.3334260764
  },
  {
    "data": "07/2019",
    "indice": 1.3326265005
  },
  {
    "data": "08/2019",
    "indice": 1.3314282151
  },
  {
    "data": "09/2019",
    "indice": 1.330363924
  },
  {
    "data": "10/2019",
    "indice": 1.3291676731
  },
  {
    "data": "11/2019",
    "indice": 1.3279724978
  },
  {
    "data": "12/2019",
    "indice": 1.3261159355
  },
  {
    "data": "01/2020",
    "indice": 1.3123364033
  },
  {
    "data": "02/2020",
    "indice": 1.3030845033
  },
  {
    "data": "03/2020",
    "indice": 1.3002240105
  },
  {
    "data": "04/2020",
    "indice": 1.2999640177
  },
  {
    "data": "05/2020",
    "indice": 1.3000940271
  },
  {
    "data": "06/2020",
    "indice": 1.3078101067
  },
  {
    "data": "07/2020",
    "indice": 1.307548597
  },
  {
    "data": "08/2020",
    "indice": 1.3036376839
  },
  {
    "data": "09/2020",
    "indice": 1.3006461977
  },
  {
    "data": "10/2020",
    "indice": 1.2948195099
  },
  {
    "data": "11/2020",
    "indice": 1.2827615513
  },
  {
    "data": "12/2020",
    "indice": 1.2724546685
  },
  {
    "data": "01/2021",
    "indice": 1.2591081224
  },
  {
    "data": "02/2021",
    "indice": 1.2493630903
  },
  {
    "data": "03/2021",
    "indice": 1.2433947953
  },
  {
    "data": "04/2021",
    "indice": 1.231937774
  },
  {
    "data": "05/2021",
    "indice": 1.2245902326
  },
  {
    "data": "06/2021",
    "indice": 1.2192256398
  },
  {
    "data": "07/2021",
    "indice": 1.209189368
  },
  {
    "data": "08/2021",
    "indice": 1.2005454408
  },
  {
    "data": "09/2021",
    "indice": 1.1899548427
  },
  {
    "data": "10/2021",
    "indice": 1.176542261
  },
  {
    "data": "11/2021",
    "indice": 1.162591167
  },
  {
    "data": "12/2021",
    "indice": 1.1491461569
  },
  {
    "data": "01/2022",
    "indice": 1.1402521898
  },
  {
    "data": "02/2022",
    "indice": 1.133676864
  },
  {
    "data": "03/2022",
    "indice": 1.1225634855
  },
  {
    "data": "04/2022",
    "indice": 1.1119994904
  },
  {
    "data": "05/2022",
    "indice": 1.0930890498
  },
  {
    "data": "06/2022",
    "indice": 1.0866776517
  },
  {
    "data": "07/2022",
    "indice": 1.079230958
  },
  {
    "data": "08/2022",
    "indice": 1.0778297793
  },
  {
    "data": "09/2022",
    "indice": 1.0857557966
  },
  {
    "data": "10/2022",
    "indice": 1.0897880123
  },
  {
    "data": "11/2022",
    "indice": 1.0880471369
  },
  {
    "data": "12/2022",
    "indice": 1.0823108892
  },
  {
    "data": "01/2023",
    "indice": 1.0767119868
  },
  {
    "data": "02/2023",
    "indice": 1.0708224633
  },
  {
    "data": "03/2023",
    "indice": 1.0627455967
  },
  {
    "data": "04/2023",
    "indice": 1.0554629027
  },
  {
    "data": "05/2023",
    "indice": 1.0494808618
  },
  {
    "data": "06/2023",
    "indice": 1.0441556679
  },
  {
    "data": "07/2023",
    "indice": 1.0437381726
  },
  {
    "data": "08/2023",
    "indice": 1.0444693011
  },
  {
    "data": "09/2023",
    "indice": 1.0415529529
  },
  {
    "data": "10/2023",
    "indice": 1.0379202321
  },
  {
    "data": "11/2023",
    "indice": 1.0357451672
  },
  {
    "data": "12/2023",
    "indice": 1.0323384503
  },
  {
    "data": "01/2024",
    "indice": 1.0282255481
  },
  {
    "data": "02/2024",
    "indice": 1.0250478996
  },
  {
    "data": "03/2024",
    "indice": 1.0171144073
  },
  {
    "data": "04/2024",
    "indice": 1.0134659299
  },
  {
    "data": "05/2024",
    "indice": 1.0113421115
  },
  {
    "data": "06/2024",
    "indice": 1.0069117
  },
  {
    "data": "07/2024",
    "indice": 1.003
  }
];


const App = () => {
  const [brutoHomologado, setBrutoHomologado] = useState(null);
  const [tributavelHomologado, setTributavelHomologado] = useState(null);
  const [numeroDeMeses, setNumeroDeMeses] = useState(null);
  const [alvaraUm, setAlvaraUm] = useState(null);
  const [alvaraDois, setAlvaraDois] = useState(null);
  const [alvaraTres, setAlvaraTres] = useState(null);
  const [alvaraQuatro, setAlvaraQuatro] = useState(null);
  const [alvaraCinco, setAlvaraCinco] = useState(null);
  const [alvaraSeis, setAlvaraSeis] = useState(null);
  const [alvaraSete, setAlvaraSete] = useState(null);
  const [alvaraOito, setAlvaraOito] = useState(null);
  const [alvaraNove, setAlvaraNove] = useState(null);
  const [alvaraDez, setAlvaraDez] = useState(null);
  const [darfUm, setDarfUm] = useState(null);
  const [darfDois, setDarfDois] = useState(null);
  const [darfTres, setDarfTres] = useState(null);
  const [darfQuatro, setDarfQuatro] = useState(null);
  const [darfCinco, setDarfCinco] = useState(null);
  const [darfSeis, setDarfSeis] = useState(null);
  const [darfSete, setDarfSete] = useState(null);
  const [darfOito, setDarfOito] = useState(null);
  const [darfNove, setDarfNove] = useState(null);
  const [darfDez, setDarfDez] = useState(null);
  const [honorariosUm, setHonorariosUm] = useState(null);
  const [honorariosDois, setHonorariosDois] = useState(null);
  const [honorariosTres, setHonorariosTres] = useState(null);
  const [honorariosQuatro, setHonorariosQuatro] = useState(null);
  const [honorariosCinco, setHonorariosCinco] = useState(null);
  const [honorariosSeis, setHonorariosSeis] = useState(null);
  const [honorariosSete, setHonorariosSete] = useState(null);
  const [honorariosOito, setHonorariosOito] = useState(null);
  const [honorariosNove, setHonorariosNove] = useState(null);
  const [honorariosDez, setHonorariosDez] = useState(null);
  const [alvaraUmData, setAlvaraUmData] = useState(null);
  const [alvaraDoisData, setAlvaraDoisData] = useState(null);
  const [alvaraTresData, setAlvaraTresData] = useState(null);
  const [alvaraQuatroData, setAlvaraQuatroData] = useState(null);
  const [alvaraCincoData, setAlvaraCincoData] = useState(null);
  const [alvaraSeisData, setAlvaraSeisData] = useState(null);
  const [alvaraSeteData, setAlvaraSeteData] = useState(null);
  const [alvaraOitoData, setAlvaraOitoData] = useState(null);
  const [alvaraNoveData, setAlvaraNoveData] = useState(null);
  const [alvaraDezData, setAlvaraDezData] = useState(null);
  const [darfUmData, setDarfUmData] = useState(null);
  const [darfDoisData, setDarfDoisData] = useState(null);
  const [darfTresData, setDarfTresData] = useState(null);
  const [darfQuatroData, setDarfQuatroData] = useState(null);
  const [darfCincoData, setDarfCincoData] = useState(null);
  const [darfSeisData, setDarfSeisData] = useState(null);
  const [darfSeteData, setDarfSeteData] = useState(null);
  const [darfOitoData, setDarfOitoData] = useState(null);
  const [darfNoveData, setDarfNoveData] = useState(null);
  const [darfDezData, setDarfDezData] = useState(null);
  const [honorariosUmData, setHonorariosUmData] = useState(null);
  const [honorariosDoisData, setHonorariosDoisData] = useState(null);
  const [honorariosTresData, setHonorariosTresData] = useState(null);
  const [honorariosQuatroData, setHonorariosQuatroData] = useState(null);
  const [honorariosCincoData, setHonorariosCincoData] = useState(null);
  const [honorariosSeisData, setHonorariosSeisData] = useState(null);
  const [honorariosSeteData, setHonorariosSeteData] = useState(null);
  const [honorariosOitoData, setHonorariosOitoData] = useState(null);
  const [honorariosNoveData, setHonorariosNoveData] = useState(null);
  const [honorariosDezData, setHonorariosDezData] = useState(null);
  const [indiceUm, setIndiceUm] = useState(null);
  const [indiceDois, setIndiceDois] = useState(null);
  const [indiceTres, setIndiceTres] = useState(null);
  const [indiceQuatro, setIndiceQuatro] = useState(null);
  const [indiceCinco, setIndiceCinco] = useState(null);
  const [indiceSeis, setIndiceSeis] = useState(null);
  const [indiceSete, setIndiceSete] = useState(null);
  const [indiceOito, setIndiceOito] = useState(null);
  const [indiceNove, setIndiceNove] = useState(null);
  const [indiceDez, setIndiceDez] = useState(null);
  const [corrigidoAlvaraUm, setCorrigidoAlvaraUm] = useState(null)
  const [corrigidoAlvaraDois, setCorrigidoAlvaraDois] = useState(null);
  const [corrigidoAlvaraTres, setCorrigidoAlvaraTres] = useState(null);
  const [corrigidoAlvaraQuatro, setCorrigidoAlvaraQuatro] = useState(null);
  const [corrigidoAlvaraCinco, setCorrigidoAlvaraCinco] = useState(null);
  const [corrigidoAlvaraSeis, setCorrigidoAlvaraSeis] = useState(null);
  const [corrigidoAlvaraSete, setCorrigidoAlvaraSete] = useState(null);
  const [corrigidoAlvaraOito, setCorrigidoAlvaraOito] = useState(null);
  const [corrigidoAlvaraNove, setCorrigidoAlvaraNove] = useState(null);
  const [corrigidoAlvaraDez, setCorrigidoAlvaraDez] = useState(null);
  const [corrigidoDarfUm, setCorrigidoDarfUm] = useState(null)
  const [corrigidoDarfDois, setCorrigidoDarfDois] = useState(null);
  const [corrigidoDarfTres, setCorrigidoDarfTres] = useState(null);
  const [corrigidoDarfQuatro, setCorrigidoDarfQuatro] = useState(null);
  const [corrigidoDarfCinco, setCorrigidoDarfCinco] = useState(null);
  const [corrigidoDarfSeis, setCorrigidoDarfSeis] = useState(null);
  const [corrigidoDarfSete, setCorrigidoDarfSete] = useState(null);
  const [corrigidoDarfOito, setCorrigidoDarfOito] = useState(null);
  const [corrigidoDarfNove, setCorrigidoDarfNove] = useState(null);
  const [corrigidoDarfDez, setCorrigidoDarfDez] = useState(null);
  const [darfCalcUm, setDarfCalcUm] = useState(null);
  const [darfCalcDois, setDarfCalcDois] = useState(null);
  const [darfCalcTres, setDarfCalcTres] = useState(null);
  const [darfCalcQuatro, setDarfCalcQuatro] = useState(null);
  const [darfCalcCinco, setDarfCalcCinco] = useState(null);
  const [darfCalcSeis, setDarfCalcSeis] = useState(null);
  const [darfCalcSete, setDarfCalcSete] = useState(null);
  const [darfCalcOito, setDarfCalcOito] = useState(null);
  const [darfCalcNove, setDarfCalcNove] = useState(null);
  const [darfCalcDez, setDarfCalcDez] = useState(null);
  const [somaDarf, setSomaDarf] = useState(null)
  const [alvaraCalcUm, setAlvaraCalcUm] = useState(null);
  const [alvaraCalcDois, setAlvaraCalcDois] = useState(null);
  const [alvaraCalcTres, setAlvaraCalcTres] = useState(null);
  const [alvaraCalcQuatro, setAlvaraCalcQuatro] = useState(null);
  const [alvaraCalcCinco, setAlvaraCalcCinco] = useState(null);
  const [alvaraCalcSeis, setAlvaraCalcSeis] = useState(null);
  const [alvaraCalcSete, setAlvaraCalcSete] = useState(null);
  const [alvaraCalcOito, setAlvaraCalcOito] = useState(null);
  const [alvaraCalcNove, setAlvaraCalcNove] = useState(null);
  const [alvaraCalcDez, setAlvaraCalcDez] = useState(null);
  const [somaAlvara, setSomaAlvara] = useState(null)
  const [mesUm, setMesUm] = useState(null);
  const [mesDois, setMesDois] = useState(null);
  const [mesTres, setMesTres] = useState(null);
  const [mesQuatro, setMesQuatro] = useState(null);
  const [mesCinco, setMesCinco] = useState(null);
  const [mesSeis, setMesSeis] = useState(null);
  const [mesSete, setMesSete] = useState(null);
  const [mesOito, setMesOito] = useState(null);
  const [mesNove, setMesNove] = useState(null);
  const [mesDez, setMesDez] = useState(null);
  const [tribAlvaraUm, setTribAlvaraUm] = useState(null);
  const [tribAlvaraDois, setTribAlvaraDois] = useState(null);
  const [tribAlvaraTres, setTribAlvaraTres] = useState(null);
  const [tribAlvaraQuatro, setTribAlvaraQuatro] = useState(null);
  const [tribAlvaraCinco, setTribAlvaraCinco] = useState(null);
  const [tribAlvaraSeis, setTribAlvaraSeis] = useState(null);
  const [tribAlvaraSete, setTribAlvaraSete] = useState(null);
  const [tribAlvaraOito, setTribAlvaraOito] = useState(null);
  const [tribAlvaraNove, setTribAlvaraNove] = useState(null);
  const [tribAlvaraDez, setTribAlvaraDez] = useState(null);
  const [tribHonorariosUm, setTribHonorariosUm] = useState(null);
  const [tribHonorariosDois, setTribHonorariosDois] = useState(null);
  const [tribHonorariosTres, setTribHonorariosTres] = useState(null);
  const [tribHonorariosQuatro, setTribHonorariosQuatro] = useState(null);
  const [tribHonorariosCinco, setTribHonorariosCinco] = useState(null);
  const [tribHonorariosSeis, setTribHonorariosSeis] = useState(null);
  const [tribHonorariosSete, setTribHonorariosSete] = useState(null);
  const [tribHonorariosOito, setTribHonorariosOito] = useState(null);
  const [tribHonorariosNove, setTribHonorariosNove] = useState(null);
  const [tribHonorariosDez, setTribHonorariosDez] = useState(null);
  const [isentoAlvaraUm, setIsentoAlvaraUm] = useState(null);
  const [isentoAlvaraDois, setIsentoAlvaraDois] = useState(null);
  const [isentoAlvaraTres, setIsentoAlvaraTres] = useState(null);
  const [isentoAlvaraQuatro, setIsentoAlvaraQuatro] = useState(null);
  const [isentoAlvaraCinco, setIsentoAlvaraCinco] = useState(null);
  const [isentoAlvaraSeis, setIsentoAlvaraSeis] = useState(null);
  const [isentoAlvaraSete, setIsentoAlvaraSete] = useState(null);
  const [isentoAlvaraOito, setIsentoAlvaraOito] = useState(null);
  const [isentoAlvaraNove, setIsentoAlvaraNove] = useState(null);
  const [isentoAlvaraDez, setIsentoAlvaraDez] = useState(null);

  const [fillQtdAlvaras, setFillQtdAlvaras] = useState(0)
  const [fillQtdDarf, setFillQtdDarf] = useState(0)
  const [fillQtdHonorarios, setFillQtdHonorarios] = useState(0)

  const [exUm, setExUm] = useState(null);
  const [exDois, setExDois] = useState(null);
  const [exTres, setExTres] = useState(null);
  const [exQuatro, setExQuatro] = useState(null);
  const [exCinco, setExCinco] = useState(null);
  const [exSeis, setExSeis] = useState(null);
  const [exSete, setExSete] = useState(null);
  const [exOito, setExOito] = useState(null);
  const [exNove, setExNove] = useState(null);
  const [exDez, setExDez] = useState(null);

  const [rendTribUmAlvara, setRendTribUmAlvara] = useState(null);
  const [rendTribDoisAlvara, setRendTribDoisAlvara] = useState(null);
  const [rendTribTresAlvara, setRendTribTresAlvara] = useState(null);
  const [rendTribQuatroAlvara, setRendTribQuatroAlvara] = useState(null);
  const [rendTribCincoAlvara, setRendTribCincoAlvara] = useState(null);
  const [rendTribSeisAlvara, setRendTribSeisAlvara] = useState(null);
  const [rendTribSeteAlvara, setRendTribSeteAlvara] = useState(null);
  const [rendTribOitoAlvara, setRendTribOitoAlvara] = useState(null);
  const [rendTribNoveAlvara, setRendTribNoveAlvara] = useState(null);
  const [rendTribDezAlvara, setRendTribDezAlvara] = useState(null);

  const [rendTribUmHonorarios, setRendTribUmHonorarios] = useState(null);
  const [rendTribDoisHonorarios, setRendTribDoisHonorarios] = useState(null);
  const [rendTribTresHonorarios, setRendTribTresHonorarios] = useState(null);
  const [rendTribQuatroHonorarios, setRendTribQuatroHonorarios] = useState(null);
  const [rendTribCincoHonorarios, setRendTribCincoHonorarios] = useState(null);
  const [rendTribSeisHonorarios, setRendTribSeisHonorarios] = useState(null);
  const [rendTribSeteHonorarios, setRendTribSeteHonorarios] = useState(null);
  const [rendTribOitoHonorarios, setRendTribOitoHonorarios] = useState(null);
  const [rendTribNoveHonorarios, setRendTribNoveHonorarios] = useState(null);
  const [rendTribDezHonorarios, setRendTribDezHonorarios] = useState(null);

  const [rendTribUmMes, setRendTribUmMes] = useState(null);
  const [rendTribDoisMes, setRendTribDoisMes] = useState(null);
  const [rendTribTresMes, setRendTribTresMes] = useState(null);
  const [rendTribQuatroMes, setRendTribQuatroMes] = useState(null);
  const [rendTribCincoMes, setRendTribCincoMes] = useState(null);
  const [rendTribSeisMes, setRendTribSeisMes] = useState(null);
  const [rendTribSeteMes, setRendTribSeteMes] = useState(null);
  const [rendTribOitoMes, setRendTribOitoMes] = useState(null);
  const [rendTribNoveMes, setRendTribNoveMes] = useState(null);
  const [rendTribDezMes, setRendTribDezMes] = useState(null);

  const [rendTribUmDarf, setRendTribUmDarf] = useState(null);
  const [rendTribDoisDarf, setRendTribDoisDarf] = useState(null);
  const [rendTribTresDarf, setRendTribTresDarf] = useState(null);
  const [rendTribQuatroDarf, setRendTribQuatroDarf] = useState(null);
  const [rendTribCincoDarf, setRendTribCincoDarf] = useState(null);
  const [rendTribSeisDarf, setRendTribSeisDarf] = useState(null);
  const [rendTribSeteDarf, setRendTribSeteDarf] = useState(null);
  const [rendTribOitoDarf, setRendTribOitoDarf] = useState(null);
  const [rendTribNoveDarf, setRendTribNoveDarf] = useState(null);
  const [rendTribDezDarf, setRendTribDezDarf] = useState(null);

  const [IrpfUm, setIrpfUm] = useState(null);
  const [IrpfDois, setIrpfDois] = useState(null);
  const [IrpfTres, setIrpfTres] = useState(null);
  const [IrpfQuatro, setIrpfQuatro] = useState(null);
  const [IrpfCinco, setIrpfCinco] = useState(null);
  const [IrpfSeis, setIrpfSeis] = useState(null);
  const [IrpfSete, setIrpfSete] = useState(null);
  const [IrpfOito, setIrpfOito] = useState(null);
  const [IrpfNove, setIrpfNove] = useState(null);
  const [IrpfDez, setIrpfDez] = useState(null);

  const [anoEquivalenteUm, setAnoEquivalenteUm] = useState(null);
  const [anoEquivalenteDois, setAnoEquivalenteDois] = useState(null);
  const [anoEquivalenteTres, setAnoEquivalenteTres] = useState(null);
  const [anoEquivalenteQuatro, setAnoEquivalenteQuatro] = useState(null);
  const [anoEquivalenteCinco, setAnoEquivalenteCinco] = useState(null);
  const [anoEquivalenteSeis, setAnoEquivalenteSeis] = useState(null);
  const [anoEquivalenteSete, setAnoEquivalenteSete] = useState(null);
  const [anoEquivalenteOito, setAnoEquivalenteOito] = useState(null);
  const [anoEquivalenteNove, setAnoEquivalenteNove] = useState(null);
  const [anoEquivalenteDez, setAnoEquivalenteDez] = useState(null);

  const alvaraStyleUm = useRef()
  const alvaraStyleDois = useRef()
  const alvaraStyleTres = useRef()
  const alvaraStyleQuatro = useRef()
  const alvaraStyleCinco = useRef()
  const alvaraStyleSeis = useRef()
  const alvaraStyleSete = useRef()
  const alvaraStyleOito = useRef()
  const alvaraStyleNove = useRef()
  const alvaraStyleDez = useRef()

  const darfStyleUm = useRef()
  const darfStyleDois = useRef()
  const darfStyleTres = useRef()
  const darfStyleQuatro = useRef()
  const darfStyleCinco = useRef()
  const darfStyleSeis = useRef()
  const darfStyleSete = useRef()
  const darfStyleOito = useRef()
  const darfStyleNove = useRef()
  const darfStyleDez = useRef()

  const honorariosStyleUm = useRef()
  const honorariosStyleDois = useRef()
  const honorariosStyleTres = useRef()
  const honorariosStyleQuatro = useRef()
  const honorariosStyleCinco = useRef()
  const honorariosStyleSeis = useRef()
  const honorariosStyleSete = useRef()
  const honorariosStyleOito = useRef()
  const honorariosStyleNove = useRef()
  const honorariosStyleDez = useRef()

  const [selicUm, setSelicUm] = useState(null)
  const [selicDois, setSelicDois] = useState(null)
  const [selicTres, setSelicTres] = useState(null)
  const [selicQuatro, setSelicQuatro] = useState(null)
  const [selicCinco, setSelicCinco] = useState(null)

  const [finalUmCorrigido, setFinalUmCorrigido] = useState(null)
  const [finalDoisCorrigido, setFinalDoisCorrigido] = useState(null)
  const [finalTresCorrigido, setFinalTresCorrigido] = useState(null)
  const [finalQuatroCorrigido, setFinalQuatroCorrigido] = useState(null)
  const [finalCincoCorrigido, setFinalCincoCorrigido] = useState(null)

  const [fontePagadora, setFontePagadora] = useState("")

  const [finalSomaCorrigido, setFinalSomaCorrigido] = useState(null)

  const [estado, setEstado] = useState(0)

  const calculosRef = useRef();

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


  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckboxChange = (checkbox) => {
    if (checkbox === 'A') {
      setCheckedA(true);
      setCheckedB(false);
      setCheckedCount(0)
    } else if (checkbox === 'B') {
      setCheckedA(false);
      setCheckedB(true);
      setCheckedCount(1)
    }
  };

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
        const maioDoAnoUm = acumulados.find(item => item.data.includes(`06/${anoEquivalenteUm}`));
        const maioDoAnoDois = acumulados.find(item => item.data.includes(`06/${anoEquivalenteDois}`));
        const maioDoAnoTres = acumulados.find(item => item.data.includes(`06/${anoEquivalenteTres}`));
        const maioDoAnoQuatro = acumulados.find(item => item.data.includes(`06/${anoEquivalenteQuatro}`));
        const maioDoAnoCinco = acumulados.find(item => item.data.includes(`06/${anoEquivalenteCinco}`));

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
  }, [anoEquivalenteCinco, anoEquivalenteDois, anoEquivalenteQuatro, anoEquivalenteTres, anoEquivalenteUm]);



  useEffect(() => {
    if (anoEquivalenteUm !== null) {
      setFinalUmCorrigido((parseFloat(IrpfUm) * (taxaSelicUm / 100)) + parseFloat(IrpfUm))
      setSelicUm(taxaSelicUm)
    }
    if (anoEquivalenteDois !== null) {
      setFinalDoisCorrigido((parseFloat(IrpfDois) * (taxaSelicDois / 100)) + parseFloat(IrpfDois))
      setSelicDois(taxaSelicDois)
    }
    if (anoEquivalenteTres !== null) {
      setFinalTresCorrigido((parseFloat(IrpfTres) * (taxaSelicTres / 100)) + parseFloat(IrpfTres))
      setSelicTres(taxaSelicTres)
    }
    if (anoEquivalenteQuatro !== null) {
      setFinalQuatroCorrigido((parseFloat(IrpfQuatro) * (taxaSelicQuatro / 100)) + parseFloat(IrpfQuatro))
      setSelicQuatro(taxaSelicQuatro)
    }
    if (anoEquivalenteCinco !== null) {
      setFinalCincoCorrigido((parseFloat(IrpfCinco) * (taxaSelicCinco / 100)) + parseFloat(IrpfCinco))
      setSelicCinco(taxaSelicCinco)
    }

  }, [IrpfUm, IrpfDois, IrpfTres, IrpfQuatro, IrpfCinco, anoEquivalenteUm, anoEquivalenteDois, anoEquivalenteTres, anoEquivalenteQuatro, anoEquivalenteCinco, taxaSelicUm, taxaSelicDois, taxaSelicTres, taxaSelicQuatro, taxaSelicCinco])




  useEffect(() => {
    setFinalSomaCorrigido(
      finalUmCorrigido + finalDoisCorrigido +
      finalTresCorrigido + finalQuatroCorrigido +
      finalCincoCorrigido
    )
  }, [finalUmCorrigido, finalDoisCorrigido, finalTresCorrigido, finalQuatroCorrigido, finalCincoCorrigido])

  const [loading, setLoading] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [processo, setProcesso] = useState("")
  const [comarca, setComarca] = useState("")
  const [vara, setVara] = useState("")
  const [INSS, setINSS] = useState("")

  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");
  const [cpfErro, setCpfErro] = useState("");
  const [dataNascimentoErro, setDataNascimentoErro] = useState("");
  const [processoErro, setProcessoErro] = useState("");
  const [comarcaErro, setComarcaErro] = useState("");
  const [varaErro, setVaraErro] = useState("");

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    let pos = 5;
    for (let i = 0; i < 12; i++) {
      soma += cnpj.charAt(i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(cnpj.charAt(12))) return false;

    // Cálculo do segundo dígito verificador
    soma = 0;
    pos = 6;
    for (let i = 0; i < 13; i++) {
      soma += cnpj.charAt(i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(cnpj.charAt(13));
  };

  // Formatação de CNPJ
  const formatarCNPJ = (cnpj) => {
    if (!cnpj) return '';
    cnpj = cnpj.replace(/[^\d]+/g, '');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  // Função de manipulação para CNPJ
  const handleCNPJChange = (event) => {
    let { value } = event.target;
    value = value.replace(/[^\d]+/g, '');

    if (value.length <= 14) {
      setCnpj(value);
      setCnpjErro('');

      if (value.length === 14 && !validarCNPJ(value)) {
        setCnpjErro('CNPJ inválido');
      }
    }
  };

  // Estados para CNPJ
  const [cnpj, setCnpj] = useState('');
  const [cnpjErro, setCnpjErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validarDataNascimento = (data) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    return regex.test(data);
  }

  const validarTelefone = (telefone) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  }



  function Calcular() {
    if (nomeUsuario === "") {
      setNomeErro("Nome do usuário está vazio*");
    } else {
      setNomeErro("");
    }

    if (telefone === "" || !validarTelefone(telefone)) {
      setTelefoneErro("Telefone inválido*");
    } else {
      setTelefoneErro("");
    }

    if (email === "" || !validarEmail(email)) {
      setEmailErro("Email inválido*");
    } else {
      setEmailErro("");
    }

    if (cpf === "" || !validarCPF(cpf)) {
      setCpfErro("CPF inválido*");
    } else {
      setCpfErro("");
    }

    if (dataNascimento === "" || !validarDataNascimento(dataNascimento)) {
      setDataNascimentoErro("Data de nascimento inválida*");
    } else {
      setDataNascimentoErro("");
    }

    if (processo === "") {
      setProcessoErro("Processo está vazio*");
    } else {
      setProcessoErro("");
    }

    if (comarca === "") {
      setComarcaErro("Comarca está vazia*");
    } else {
      setComarcaErro("");
    }


    if (vara === "") {
      setVaraErro("Vara está vazia*");
    } else {
      setVaraErro("");
    }

    if (fontePagadora === "") {
      setFontePagadoraErro("Fonte Pagadora está vazio*");
    } else {
      setFontePagadoraErro("");
    }

    if (brutoHomologado === null) {
      setBrutoHomologadoErro("O campo está vazio*");
    } else {
      setBrutoHomologadoErro(null);
    }

    if (tributavelHomologado === null) {
      setTributavelHomologadoErro("O campo está vazio*");
    } else {
      setTributavelHomologadoErro(null);
    }

    if (cnpj === "") {
      setCnpjErro("O campo está vazio*");
    } else {
      setCnpjErro("");
    }

    if (numeroDeMeses === null) {
      setNumeroDeMesesErro("O campo está vazio*");
    } else {
      setNumeroDeMesesErro("");
    }
  }

  const [numeroDeMesesErro, setNumeroDeMesesErro] = useState("")
  const [fontePagadoraErro, setFontePagadoraErro] = useState("")
  const [brutoHomologadoErro, setBrutoHomologadoErro] = useState("")
  const [tributavelHomologadoErro, setTributavelHomologadoErro] = useState("")

  const [plano, setPlano] = useState("Free")

  const [paymentData, setPaymentData] = useState({
    idApp: "",
    assinatura: "",
  })


  const [userData, setUserData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: ''
  });

  const [processData, setProcessData] = useState({
    numeroProcesso: '',
    comarca: '',
    vara: ''
  });

  const [valueData, setValueData] = useState({
    brutoHomologado: '',
    tributavelHomologado: '',
    numeroMeses: '',
    alvara1: '',
    alvara2: '',
    alvara3: '',
    alvara4: '',
    alvara5: '',
    alvara6: '',
    alvara7: '',
    alvara8: '',
    alvara9: '',
    alvara10: '',
    darf1: '',
    darf2: '',
    darf3: '',
    darf4: '',
    darf5: '',
    darf6: '',
    darf7: '',
    darf8: '',
    darf9: '',
    darf10: '',
    honorarios1: '',
    honorarios2: '',
    honorarios3: '',
    honorarios4: '',
    honorarios5: '',
    honorarios6: '',
    honorarios7: '',
    honorarios8: '',
    honorarios9: '',
    honorarios10: '',
    alvara1Data: '',
    alvara2Data: '',
    alvara3Data: '',
    alvara4Data: '',
    alvara5Data: '',
    alvara6Data: '',
    alvara7Data: '',
    alvara8Data: '',
    alvara9Data: '',
    alvara10Data: '',
    darf1Data: '',
    darf2Data: '',
    darf3Data: '',
    darf4Data: '',
    darf5Data: '',
    darf6Data: '',
    darf7Data: '',
    darf8Data: '',
    darf9Data: '',
    darf10Data: '',
    honorarios1Data: '',
    honorarios2Data: '',
    honorarios3Data: '',
    honorarios4Data: '',
    honorarios5Data: '',
    honorarios6Data: '',
    honorarios7Data: '',
    honorarios8Data: '',
    honorarios9Data: '',
    honorarios10Data: '',
    indice1: '',
    indice2: '',
    indice3: '',
    indice4: '',
    indice5: '',
    indice6: '',
    indice7: '',
    indice8: '',
    indice9: '',
    indice10: '',
    anoEquivalente1: '',
    anoEquivalente2: '',
    anoEquivalente3: '',
    anoEquivalente4: '',
    anoEquivalente5: '',
    anoEquivalente6: '',
    anoEquivalente7: '',
    anoEquivalente8: '',
    anoEquivalente9: '',
    anoEquivalente10: '',
    rendTribMes1: '',
    rendTribMes2: '',
    rendTribMes3: '',
    rendTribMes4: '',
    rendTribMes5: '',
    rendTribMes6: '',
    rendTribMes7: '',
    rendTribMes8: '',
    rendTribMes9: '',
    rendTribMes10: '',
    //
    ex1: '',
    ex2: '',
    ex3: '',
    ex4: '',
    ex5: '',
    ex6: '',
    ex7: '',
    ex8: '',
    ex9: '',
    ex10: '',
    //
    corrigidoAlvara1: '',
    corrigidoAlvara2: '',
    corrigidoAlvara3: '',
    corrigidoAlvara4: '',
    corrigidoAlvara5: '',
    corrigidoAlvara6: '',
    corrigidoAlvara7: '',
    corrigidoAlvara8: '',
    corrigidoAlvara9: '',
    corrigidoAlvara10: '',
    //
    corrigidoDarf1: '',
    corrigidoDarf2: '',
    corrigidoDarf3: '',
    corrigidoDarf4: '',
    corrigidoDarf5: '',
    corrigidoDarf6: '',
    corrigidoDarf7: '',
    corrigidoDarf8: '',
    corrigidoDarf9: '',
    corrigidoDarf10: '',
    //
    qtdMes1: '',
    qtdMes2: '',
    qtdMes3: '',
    qtdMes4: '',
    qtdMes5: '',
    qtdMes6: '',
    qtdMes7: '',
    qtdMes8: '',
    qtdMes9: '',
    qtdMes10: '',
    //
    tribAlvara1: '',
    tribAlvara2: '',
    tribAlvara3: '',
    tribAlvara4: '',
    tribAlvara5: '',
    tribAlvara6: '',
    tribAlvara7: '',
    tribAlvara8: '',
    tribAlvara9: '',
    tribAlvara10: '',
    //
    tribHonorarios1: '',
    tribHonorarios2: '',
    tribHonorarios3: '',
    tribHonorarios4: '',
    tribHonorarios5: '',
    tribHonorarios6: '',
    tribHonorarios7: '',
    tribHonorarios8: '',
    tribHonorarios9: '',
    tribHonorarios10: '',
    //
    isentoAlvara1: '',
    isentoAlvara2: '',
    isentoAlvara3: '',
    isentoAlvara4: '',
    isentoAlvara5: '',
    isentoAlvara6: '',
    isentoAlvara7: '',
    isentoAlvara8: '',
    isentoAlvara9: '',
    isentoAlvara10: '',
    //
  });

  const [pdfData, setPdfData] = useState({
    pdfData1: '',
    pdfData2: '',
    pdfData3: '',
    pdfData4: '',
    pdfData5: '',
    pdfEsc1: '',
    pdfEsc2: '',
    pdfEsc3: '',
    pdfEsc4: '',
    pdfEsc5: '',
  })

  const [valorCalculos, setValorCalculos] = useState({
    somaDarf: 0,
    somaAlvara: 0,
    numeroDeMeses: '',
    brutoHomologado: '',
    tributavelHomologado: '',
    rendTribUm: 0,
    rendTribDois: 0,
    rendTribTres: 0,
    rendTribQuatro: 0,
    rendTribCinco: 0,
    rendTribSeis: 0,
    rendTribSete: 0,
    rendTribOito: 0,
    rendTribNove: 0,
    rendTribDez: 0,
    irrfUm: 0,
    irrfDois: 0,
    irrfTres: 0,
    irrfQuatro: 0,
    irrfCinco: 0,
    irrfSeis: 0,
    irrfSete: 0,
    irrfOito: 0,
    irrfNove: 0,
    irrfDez: 0,
    irpfUm: 0,
    irpfDois: 0,
    irpfTres: 0,
    irpfQuatro: 0,
    irpfCinco: 0,
    irpfSeis: 0,
    irpfSete: 0,
    irpfOito: 0,
    irpfNove: 0,
    irpfDez: 0,
    selicUm: 0,
    selicDois: 0,
    selicTres: 0,
    selicQuatro: 0,
    selicCinco: 0,
    finalUmCorrigido: 0,
    finalDoisCorrigido: 0,
    finalTresCorrigido: 0,
    finalQuatroCorrigido: 0,
    finalCincoCorrigido: 0,
  });

  const [stateId, setStateId] = useState(null)

  useEffect(() => {
    setStateId(uuidv4())
  }, [])

  useEffect(() => {
    setPaymentData(prevPaymentData => ({
      ...prevPaymentData,
      idApp: stateId,
      assinatura: plano,
    }))
  }, [plano, stateId])

  useEffect(() => {
    setUserData(prevUserData => ({
      ...prevUserData,
      nomeCompleto: nomeUsuario,
      email: email,
      telefone: telefone,
      cpf: cpf,
      dataNascimento: dataNascimento
    }));
  }, [nomeUsuario, email, telefone, cpf, dataNascimento]);

  useEffect(() => {
    setProcessData(prevProcessData => ({
      ...prevProcessData,
      numeroProcesso: processo,
      comarca: comarca,
      vara: vara
    }));
  }, [processo, comarca, vara]);

  useEffect(() => {
    setValueData(prevValueData => ({
      ...prevValueData,
      brutoHomologado: brutoHomologado,
      tributavelHomologado: tributavelHomologado,
      numeroMeses: numeroDeMeses,
      alvara1: alvaraUm,
      alvara2: alvaraDois,
      alvara3: alvaraTres,
      alvara4: alvaraQuatro,
      alvara5: alvaraCinco,
      alvara6: alvaraSeis,
      alvara7: alvaraSete,
      alvara8: alvaraOito,
      alvara9: alvaraNove,
      alvara10: alvaraDez,
      darf1: darfUm,
      darf2: darfDois,
      darf3: darfTres,
      darf4: darfQuatro,
      darf5: darfCinco,
      darf6: darfSeis,
      darf7: darfSete,
      darf8: darfOito,
      darf9: darfNove,
      darf10: darfDez,
      honorarios1: honorariosUm,
      honorarios2: honorariosDois,
      honorarios3: honorariosTres,
      honorarios4: honorariosQuatro,
      honorarios5: honorariosCinco,
      honorarios6: honorariosSeis,
      honorarios7: honorariosSete,
      honorarios8: honorariosOito,
      honorarios9: honorariosNove,
      honorarios10: honorariosDez,
      alvara1Data: alvaraUmData,
      alvara2Data: alvaraDoisData,
      alvara3Data: alvaraTresData,
      alvara4Data: alvaraQuatroData,
      alvara5Data: alvaraCincoData,
      alvara6Data: alvaraSeisData,
      alvara7Data: alvaraSeteData,
      alvara8Data: alvaraOitoData,
      alvara9Data: alvaraNoveData,
      alvara10Data: alvaraDezData,
      darf1Data: darfUmData,
      darf2Data: darfDoisData,
      darf3Data: darfTresData,
      darf4Data: darfQuatroData,
      darf5Data: darfCincoData,
      darf6Data: darfSeisData,
      darf7Data: darfSeteData,
      darf8Data: darfOitoData,
      darf9Data: darfNoveData,
      darf10Data: darfDezData,
      honorarios1Data: honorariosUmData,
      honorarios2Data: honorariosDoisData,
      honorarios3Data: honorariosTresData,
      honorarios4Data: honorariosQuatroData,
      honorarios5Data: honorariosCincoData,
      honorarios6Data: honorariosSeisData,
      honorarios7Data: honorariosSeteData,
      honorarios8Data: honorariosOitoData,
      honorarios9Data: honorariosNoveData,
      honorarios10Data: honorariosDezData,
      indice1: indiceUm,
      indice2: indiceDois,
      indice3: indiceTres,
      indice4: indiceQuatro,
      indice5: indiceCinco,
      indice6: indiceSeis,
      indice7: indiceSete,
      indice8: indiceOito,
      indice9: indiceNove,
      indice10: indiceDez,
      anoEquivalente1: anoEquivalenteUm,
      anoEquivalente2: anoEquivalenteDois,
      anoEquivalente3: anoEquivalenteTres,
      anoEquivalente4: anoEquivalenteQuatro,
      anoEquivalente5: anoEquivalenteCinco,
      anoEquivalente6: anoEquivalenteSeis,
      anoEquivalente7: anoEquivalenteSete,
      anoEquivalente8: anoEquivalenteOito,
      anoEquivalente9: anoEquivalenteNove,
      anoEquivalente10: anoEquivalenteDez,
      rendTribMes1: rendTribUmMes,
      rendTribMes2: rendTribDoisMes,
      rendTribMes3: rendTribTresMes,
      rendTribMes4: rendTribQuatroMes,
      rendTribMes5: rendTribCincoMes,
      rendTribMes6: rendTribSeisMes,
      rendTribMes7: rendTribSeteMes,
      rendTribMes8: rendTribOitoMes,
      rendTribMes9: rendTribNoveMes,
      rendTribMes10: rendTribDezMes,
      //
      ex1: exUm,
      ex2: exDois,
      ex3: exTres,
      ex4: exQuatro,
      ex5: exCinco,
      ex6: exSeis,
      ex7: exSete,
      ex8: exOito,
      ex9: exNove,
      ex10: exDez,
      //
      corrigidoAlvara1: corrigidoAlvaraUm,
      corrigidoAlvara2: corrigidoAlvaraDois,
      corrigidoAlvara3: corrigidoAlvaraTres,
      corrigidoAlvara4: corrigidoAlvaraQuatro,
      corrigidoAlvara5: corrigidoAlvaraCinco,
      corrigidoAlvara6: corrigidoAlvaraSeis,
      corrigidoAlvara7: corrigidoAlvaraSete,
      corrigidoAlvara8: corrigidoAlvaraOito,
      corrigidoAlvara9: corrigidoAlvaraNove,
      corrigidoAlvara10: corrigidoAlvaraDez,
      //
      corrigidoDarf1: corrigidoDarfUm,
      corrigidoDarf2: corrigidoDarfDois,
      corrigidoDarf3: corrigidoDarfTres,
      corrigidoDarf4: corrigidoDarfQuatro,
      corrigidoDarf5: corrigidoDarfCinco,
      corrigidoDarf6: corrigidoDarfSeis,
      corrigidoDarf7: corrigidoDarfSete,
      corrigidoDarf8: corrigidoDarfOito,
      corrigidoDarf9: corrigidoDarfNove,
      corrigidoDarf10: corrigidoDarfDez,
      //
      qtdMes1: mesUm,
      qtdMes2: mesDois,
      qtdMes3: mesTres,
      qtdMes4: mesQuatro,
      qtdMes5: mesCinco,
      qtdMes6: mesSeis,
      qtdMes7: mesSete,
      qtdMes8: mesOito,
      qtdMes9: mesNove,
      qtdMes10: mesDez,
      //
      tribAlvara1: tribAlvaraUm,
      tribAlvara2: tribAlvaraDois,
      tribAlvara3: tribAlvaraTres,
      tribAlvara4: tribAlvaraQuatro,
      tribAlvara5: tribAlvaraCinco,
      tribAlvara6: tribAlvaraSeis,
      tribAlvara7: tribAlvaraSete,
      tribAlvara8: tribAlvaraOito,
      tribAlvara9: tribAlvaraNove,
      tribAlvara10: tribAlvaraDez,
      //
      tribHonorarios1: tribHonorariosUm,
      tribHonorarios2: tribHonorariosDois,
      tribHonorarios3: tribHonorariosTres,
      tribHonorarios4: tribHonorariosQuatro,
      tribHonorarios5: tribHonorariosCinco,
      tribHonorarios6: tribHonorariosSeis,
      tribHonorarios7: tribHonorariosSete,
      tribHonorarios8: tribHonorariosOito,
      tribHonorarios9: tribHonorariosNove,
      tribHonorarios10: tribHonorariosDez,
      //
      isentoAlvara1: isentoAlvaraUm,
      isentoAlvara2: isentoAlvaraDois,
      isentoAlvara3: isentoAlvaraTres,
      isentoAlvara4: isentoAlvaraQuatro,
      isentoAlvara5: isentoAlvaraCinco,
      isentoAlvara6: isentoAlvaraSeis,
      isentoAlvara7: isentoAlvaraSete,
      isentoAlvara8: isentoAlvaraOito,
      isentoAlvara9: isentoAlvaraNove,
      isentoAlvara10: isentoAlvaraDez,
    }));
  }, [brutoHomologado, tributavelHomologado, numeroDeMeses, alvaraUm, alvaraDois, alvaraTres, alvaraQuatro, alvaraCinco, alvaraSeis, alvaraSete, alvaraOito, alvaraNove, alvaraDez, darfUm, darfDois, darfTres, darfQuatro, darfCinco, darfSeis, darfSete, darfOito, darfNove, darfDez, honorariosUm, honorariosDois, honorariosTres, honorariosQuatro, honorariosCinco, honorariosSeis, honorariosSete, honorariosOito, honorariosNove, honorariosDez, alvaraUmData, alvaraDoisData, alvaraTresData, alvaraQuatroData, alvaraCincoData, alvaraSeisData, alvaraSeteData, alvaraOitoData, alvaraNoveData, alvaraDezData, darfUmData, darfDoisData, darfTresData, darfQuatroData, darfCincoData, darfSeisData, darfSeteData, darfOitoData, darfNoveData, darfDezData, honorariosUmData, honorariosDoisData, honorariosTresData, honorariosQuatroData, honorariosCincoData, honorariosSeisData, honorariosSeteData, honorariosOitoData, honorariosNoveData, honorariosDezData, indiceUm, indiceDois, indiceTres, indiceQuatro, indiceCinco, indiceSeis, indiceSete, indiceOito, indiceNove, indiceDez, anoEquivalenteUm, anoEquivalenteDois, anoEquivalenteTres, anoEquivalenteQuatro, anoEquivalenteCinco, anoEquivalenteSeis, anoEquivalenteSete, anoEquivalenteOito, anoEquivalenteNove, anoEquivalenteDez, rendTribUmMes, rendTribDoisMes, rendTribTresMes, rendTribQuatroMes, rendTribCincoMes, rendTribSeisMes, rendTribSeteMes, rendTribOitoMes, rendTribNoveMes, rendTribDezMes, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez, corrigidoAlvaraUm, corrigidoAlvaraDois, corrigidoAlvaraTres, corrigidoAlvaraQuatro, corrigidoAlvaraCinco, corrigidoAlvaraSeis, corrigidoAlvaraSete, corrigidoAlvaraOito, corrigidoAlvaraNove, corrigidoAlvaraDez, corrigidoDarfUm, corrigidoDarfDois, corrigidoDarfTres, corrigidoDarfQuatro, corrigidoDarfCinco, corrigidoDarfSeis, corrigidoDarfSete, corrigidoDarfOito, corrigidoDarfNove, corrigidoDarfDez, mesUm, mesDois, mesTres, mesQuatro, mesCinco, mesSeis, mesSete, mesOito, mesNove, mesDez, tribAlvaraUm, tribAlvaraDois, tribAlvaraTres, tribAlvaraQuatro, tribAlvaraCinco, tribAlvaraSeis, tribAlvaraSete, tribAlvaraOito, tribAlvaraNove, tribAlvaraDez, tribHonorariosUm, tribHonorariosDois, tribHonorariosTres, tribHonorariosQuatro, tribHonorariosCinco, tribHonorariosSeis, tribHonorariosSete, tribHonorariosOito, tribHonorariosNove, tribHonorariosDez, isentoAlvaraUm, isentoAlvaraDois, isentoAlvaraTres, isentoAlvaraQuatro, isentoAlvaraCinco, isentoAlvaraSeis, isentoAlvaraSete, isentoAlvaraOito, isentoAlvaraNove, isentoAlvaraDez]);


  const [rendTrib1, setRendTrib1] = useState(null)
  const [rendTrib2, setRendTrib2] = useState(null)
  const [rendTrib3, setRendTrib3] = useState(null)
  const [rendTrib4, setRendTrib4] = useState(null)
  const [rendTrib5, setRendTrib5] = useState(null)
  const [rendTrib6, setRendTrib6] = useState(null)
  const [rendTrib7, setRendTrib7] = useState(null)
  const [rendTrib8, setRendTrib8] = useState(null)
  const [rendTrib9, setRendTrib9] = useState(null)
  const [rendTrib10, setRendTrib10] = useState(null)






  useEffect(() => {
    /* Correção Alvará */
    const corrigidoAlvaraUm = parseFloat(alvaraUm) * indiceUm;
    const corrigidoAlvaraDois = parseFloat(alvaraDois) * indiceDois;
    const corrigidoAlvaraTres = parseFloat(alvaraTres) * indiceTres;
    const corrigidoAlvaraQuatro = parseFloat(alvaraQuatro) * indiceQuatro;
    const corrigidoAlvaraCinco = parseFloat(alvaraCinco) * indiceCinco;
    const corrigidoAlvaraSeis = parseFloat(alvaraSeis) * indiceSeis;
    const corrigidoAlvaraSete = parseFloat(alvaraSete) * indiceSete;
    const corrigidoAlvaraOito = parseFloat(alvaraOito) * indiceOito;
    const corrigidoAlvaraNove = parseFloat(alvaraNove) * indiceNove;
    const corrigidoAlvaraDez = parseFloat(alvaraDez) * indiceDez;

    setCorrigidoAlvaraUm(corrigidoAlvaraUm);
    setCorrigidoAlvaraDois(corrigidoAlvaraDois);
    setCorrigidoAlvaraTres(corrigidoAlvaraTres);
    setCorrigidoAlvaraQuatro(corrigidoAlvaraQuatro);
    setCorrigidoAlvaraCinco(corrigidoAlvaraCinco);
    setCorrigidoAlvaraSeis(corrigidoAlvaraSeis);
    setCorrigidoAlvaraSete(corrigidoAlvaraSete);
    setCorrigidoAlvaraOito(corrigidoAlvaraOito);
    setCorrigidoAlvaraNove(corrigidoAlvaraNove);
    setCorrigidoAlvaraDez(corrigidoAlvaraDez);

    /* Soma Alvara Corrigido */
    const somaAlvara = parseFloat(alvaraCalcUm) + parseFloat(alvaraCalcDois) +
      parseFloat(alvaraCalcTres) + parseFloat(alvaraCalcQuatro) +
      parseFloat(alvaraCalcCinco) + parseFloat(alvaraCalcSeis) +
      parseFloat(alvaraCalcSete) + parseFloat(alvaraCalcOito) +
      parseFloat(alvaraCalcNove) + parseFloat(alvaraCalcDez);

    setSomaAlvara(somaAlvara);

    /* Soma Darf */
    const somaDarf = parseFloat(darfCalcUm) + parseFloat(darfCalcDois) +
      parseFloat(darfCalcTres) + parseFloat(darfCalcQuatro) +
      parseFloat(darfCalcCinco) + parseFloat(darfCalcSeis) +
      parseFloat(darfCalcSete) + parseFloat(darfCalcOito) +
      parseFloat(darfCalcNove) + parseFloat(darfCalcDez);

    setSomaDarf(somaDarf);

    /* Darf Corrigido */
    setCorrigidoDarfUm((somaDarf * (corrigidoAlvaraUm / somaAlvara)) / indiceUm);
    setCorrigidoDarfDois((somaDarf * (corrigidoAlvaraDois / somaAlvara)) / indiceDois);
    setCorrigidoDarfTres((somaDarf * (corrigidoAlvaraTres / somaAlvara)) / indiceTres);
    setCorrigidoDarfQuatro((somaDarf * (corrigidoAlvaraQuatro / somaAlvara)) / indiceQuatro);
    setCorrigidoDarfCinco((somaDarf * (corrigidoAlvaraCinco / somaAlvara)) / indiceCinco);
    setCorrigidoDarfSeis((somaDarf * (corrigidoAlvaraSeis / somaAlvara)) / indiceSeis);
    setCorrigidoDarfSete((somaDarf * (corrigidoAlvaraSete / somaAlvara)) / indiceSete);
    setCorrigidoDarfOito((somaDarf * (corrigidoAlvaraOito / somaAlvara)) / indiceOito);
    setCorrigidoDarfNove((somaDarf * (corrigidoAlvaraNove / somaAlvara)) / indiceNove);
    setCorrigidoDarfDez((somaDarf * (corrigidoAlvaraDez / somaAlvara)) / indiceDez);

    /* Relação Meses */
    setMesUm(parseFloat(numeroDeMeses) * (corrigidoAlvaraUm / somaAlvara));
    setMesDois(parseFloat(numeroDeMeses) * (corrigidoAlvaraDois / somaAlvara));
    setMesTres(parseFloat(numeroDeMeses) * (corrigidoAlvaraTres / somaAlvara));
    setMesQuatro(parseFloat(numeroDeMeses) * (corrigidoAlvaraQuatro / somaAlvara));
    setMesCinco(parseFloat(numeroDeMeses) * (corrigidoAlvaraCinco / somaAlvara));
    setMesSeis(parseFloat(numeroDeMeses) * (corrigidoAlvaraSeis / somaAlvara));
    setMesSete(parseFloat(numeroDeMeses) * (corrigidoAlvaraSete / somaAlvara));
    setMesOito(parseFloat(numeroDeMeses) * (corrigidoAlvaraOito / somaAlvara));
    setMesNove(parseFloat(numeroDeMeses) * (corrigidoAlvaraNove / somaAlvara));
    setMesDez(parseFloat(numeroDeMeses) * (corrigidoAlvaraDez / somaAlvara));

    /* Rendimentos Tributáveis */
    /* Alvará Tributável */
    setTribAlvaraUm((parseFloat(alvaraUm) + corrigidoDarfUm) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraDois((parseFloat(alvaraDois) + corrigidoDarfDois) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraTres((parseFloat(alvaraTres) + corrigidoDarfTres) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraQuatro((parseFloat(alvaraQuatro) + corrigidoDarfQuatro) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraCinco((parseFloat(alvaraCinco) + corrigidoDarfCinco) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraSeis((parseFloat(alvaraSeis) + corrigidoDarfSeis) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraSete((parseFloat(alvaraSete) + corrigidoDarfSete) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraOito((parseFloat(alvaraOito) + corrigidoDarfOito) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraNove((parseFloat(alvaraNove) + corrigidoDarfNove) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribAlvaraDez((parseFloat(alvaraDez) + corrigidoDarfDez) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));

    /* Honorários */
    setTribHonorariosUm(parseFloat(honorariosUm) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosDois(parseFloat(honorariosDois) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosTres(parseFloat(honorariosTres) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosQuatro(parseFloat(honorariosQuatro) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosCinco(parseFloat(honorariosCinco) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosSeis(parseFloat(honorariosSeis) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosSete(parseFloat(honorariosSete) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosOito(parseFloat(honorariosOito) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosNove(parseFloat(honorariosNove) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));
    setTribHonorariosDez(parseFloat(honorariosDez) * (parseFloat(tributavelHomologado) / parseFloat(brutoHomologado)));

    /* Alvará Isento */
    setIsentoAlvaraUm((parseFloat(alvaraUm) + corrigidoDarfUm) - parseFloat(tribAlvaraUm));
    setIsentoAlvaraDois((parseFloat(alvaraDois) + corrigidoDarfDois) - parseFloat(tribAlvaraDois));
    setIsentoAlvaraTres((parseFloat(alvaraTres) + corrigidoDarfTres) - parseFloat(tribAlvaraTres));
    setIsentoAlvaraQuatro((parseFloat(alvaraQuatro) + corrigidoDarfQuatro) - parseFloat(tribAlvaraQuatro));
    setIsentoAlvaraCinco((parseFloat(alvaraCinco) + corrigidoDarfCinco) - parseFloat(tribAlvaraCinco));
    setIsentoAlvaraSeis((parseFloat(alvaraSeis) + corrigidoDarfSeis) - parseFloat(tribAlvaraSeis));
    setIsentoAlvaraSete((parseFloat(alvaraSete) + corrigidoDarfSete) - parseFloat(tribAlvaraSete));
    setIsentoAlvaraOito((parseFloat(alvaraOito) + corrigidoDarfOito) - parseFloat(tribAlvaraOito));
    setIsentoAlvaraNove((parseFloat(alvaraNove) + corrigidoDarfNove) - parseFloat(tribAlvaraNove));
    setIsentoAlvaraDez((parseFloat(alvaraDez) + corrigidoDarfDez) - parseFloat(tribAlvaraDez));


  }, [alvaraUm, alvaraDois, alvaraTres, alvaraQuatro, alvaraCinco, alvaraSeis, alvaraSete, alvaraOito, alvaraNove, alvaraDez, indiceUm, indiceDois, indiceTres, indiceQuatro, indiceCinco, indiceSeis, indiceSete, indiceOito, indiceNove, indiceDez, alvaraCalcUm, alvaraCalcDois, alvaraCalcTres, alvaraCalcQuatro, alvaraCalcCinco, alvaraCalcSeis, alvaraCalcSete, alvaraCalcOito, alvaraCalcNove, alvaraCalcDez, darfCalcUm, darfCalcDois, darfCalcTres, darfCalcQuatro, darfCalcCinco, darfCalcSeis, darfCalcSete, darfCalcOito, darfCalcNove, darfCalcDez, somaDarf, somaAlvara, numeroDeMeses, tributavelHomologado, brutoHomologado, honorariosUm, honorariosDois, honorariosTres, honorariosQuatro, honorariosCinco, honorariosSeis, honorariosSete, honorariosOito, honorariosNove, honorariosDez, corrigidoDarfUm, corrigidoDarfDois, corrigidoDarfTres, corrigidoDarfQuatro, corrigidoDarfCinco, corrigidoDarfSeis, corrigidoDarfSete, corrigidoDarfOito, corrigidoDarfNove, corrigidoDarfDez, tribAlvaraUm, tribAlvaraDois, tribAlvaraTres, tribAlvaraQuatro, tribAlvaraCinco, tribAlvaraSeis, tribAlvaraSete, tribAlvaraOito, tribAlvaraNove, tribAlvaraDez]);

  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: tribAlvaraUm || 0 },
        { year: exDois, value: tribAlvaraDois || 0 },
        { year: exTres, value: tribAlvaraTres || 0 },
        { year: exQuatro, value: tribAlvaraQuatro || 0 },
        { year: exCinco, value: tribAlvaraCinco || 0 },
        { year: exSeis, value: tribAlvaraSeis || 0 },
        { year: exSete, value: tribAlvaraSete || 0 },
        { year: exOito, value: tribAlvaraOito || 0 },
        { year: exNove, value: tribAlvaraNove || 0 },
        { year: exDez, value: tribAlvaraDez || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados setAnoEquivalenteUm até setAnoEquivalenteDez
      sortedYears.forEach((year, index) => {
        if (index < 10) { // Garantir que estamos dentro dos 10 primeiros anos
          switch (index) {
            case 0:
              setAnoEquivalenteUm(year);
              break;
            case 1:
              setAnoEquivalenteDois(year);
              break;
            case 2:
              setAnoEquivalenteTres(year);
              break;
            case 3:
              setAnoEquivalenteQuatro(year);
              break;
            case 4:
              setAnoEquivalenteCinco(year);
              break;
            case 5:
              setAnoEquivalenteSeis(year);
              break;
            case 6:
              setAnoEquivalenteSete(year);
              break;
            case 7:
              setAnoEquivalenteOito(year);
              break;
            case 8:
              setAnoEquivalenteNove(year);
              break;
            case 9:
              setAnoEquivalenteDez(year);
              break;
            default:
              break;
          }
        }
      });

      // Set remaining setAnoEquivalente states to null if not used
      for (let i = sortedYears.length; i < 10; i++) {
        switch (i) {
          case 0:
            setAnoEquivalenteUm(null);
            break;
          case 1:
            setAnoEquivalenteDois(null);
            break;
          case 2:
            setAnoEquivalenteTres(null);
            break;
          case 3:
            setAnoEquivalenteQuatro(null);
            break;
          case 4:
            setAnoEquivalenteCinco(null);
            break;
          case 5:
            setAnoEquivalenteSeis(null);
            break;
          case 6:
            setAnoEquivalenteSete(null);
            break;
          case 7:
            setAnoEquivalenteOito(null);
            break;
          case 8:
            setAnoEquivalenteNove(null);
            break;
          case 9:
            setAnoEquivalenteDez(null);
            break;
          default:
            break;
        }
      }

      // Atualizar estados rendTrib
      const rendTribs = [
        setRendTribUmAlvara,
        setRendTribDoisAlvara,
        setRendTribTresAlvara,
        setRendTribQuatroAlvara,
        setRendTribCincoAlvara,
        setRendTribSeisAlvara,
        setRendTribSeteAlvara,
        setRendTribOitoAlvara,
        setRendTribNoveAlvara,
        setRendTribDezAlvara
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [tribAlvaraUm, tribAlvaraDois, tribAlvaraTres, tribAlvaraQuatro, tribAlvaraCinco, tribAlvaraSeis, tribAlvaraSete, tribAlvaraOito, tribAlvaraNove, tribAlvaraDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);


  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: honorariosUm, value: tribHonorariosUm || 0 },
        { year: honorariosDois, value: tribHonorariosDois || 0 },
        { year: honorariosTres, value: tribHonorariosTres || 0 },
        { year: honorariosQuatro, value: tribHonorariosQuatro || 0 },
        { year: honorariosCinco, value: tribHonorariosCinco || 0 },
        { year: honorariosSeis, value: tribHonorariosSeis || 0 },
        { year: honorariosSete, value: tribHonorariosSete || 0 },
        { year: honorariosOito, value: tribHonorariosOito || 0 },
        { year: honorariosNove, value: tribHonorariosNove || 0 },
        { year: honorariosDez, value: tribHonorariosDez || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setRendTribUmHonorarios,
        setRendTribDoisHonorarios,
        setRendTribTresHonorarios,
        setRendTribQuatroHonorarios,
        setRendTribCincoHonorarios,
        setRendTribSeisHonorarios,
        setRendTribSeteHonorarios,
        setRendTribOitoHonorarios,
        setRendTribNoveHonorarios,
        setRendTribDezHonorarios
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };


    calculateSums();
  }, [tribHonorariosUm, tribHonorariosDois, tribHonorariosTres, tribHonorariosQuatro, tribHonorariosCinco, tribHonorariosSeis, tribHonorariosSete, tribHonorariosOito, tribHonorariosNove, tribHonorariosDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez, honorariosUm, honorariosDois, honorariosTres, honorariosQuatro, honorariosCinco, honorariosSeis, honorariosSete, honorariosOito, honorariosNove, honorariosDez]);


  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: mesUm || 0 },
        { year: exDois, value: mesDois || 0 },
        { year: exTres, value: mesTres || 0 },
        { year: exQuatro, value: mesQuatro || 0 },
        { year: exCinco, value: mesCinco || 0 },
        { year: exSeis, value: mesSeis || 0 },
        { year: exSete, value: mesSete || 0 },
        { year: exOito, value: mesOito || 0 },
        { year: exNove, value: mesNove || 0 },
        { year: exDez, value: mesDez || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setRendTribUmMes,
        setRendTribDoisMes,
        setRendTribTresMes,
        setRendTribQuatroMes,
        setRendTribCincoMes,
        setRendTribSeisMes,
        setRendTribSeteMes,
        setRendTribOitoMes,
        setRendTribNoveMes,
        setRendTribDezMes
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [mesUm, mesDois, mesTres, mesQuatro, mesCinco, mesSeis, mesSete, mesOito, mesNove, mesDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);

  const [tableAlvarasUm, setTableAlvarasUm] = useState(null)
  const [tableAlvarasDois, setTableAlvarasDois] = useState(null)
  const [tableAlvarasTres, setTableAlvarasTres] = useState(null)
  const [tableAlvarasQuatro, setTableAlvarasQuatro] = useState(null)
  const [tableAlvarasCinco, setTableAlvarasCinco] = useState(null)

  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: parseFloat(alvaraUm) || 0 },
        { year: exDois, value: parseFloat(alvaraDois) || 0 },
        { year: exTres, value: parseFloat(alvaraTres) || 0 },
        { year: exQuatro, value: parseFloat(alvaraQuatro) || 0 },
        { year: exCinco, value: parseFloat(alvaraCinco) || 0 },
        { year: exSeis, value: parseFloat(alvaraSeis) || 0 },
        { year: exSete, value: parseFloat(alvaraSete) || 0 },
        { year: exOito, value: parseFloat(alvaraOito) || 0 },
        { year: exNove, value: parseFloat(alvaraNove) || 0 },
        { year: exDez, value: parseFloat(alvaraDez) || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setTableAlvarasUm,
        setTableAlvarasDois,
        setTableAlvarasTres,
        setTableAlvarasQuatro,
        setTableAlvarasCinco
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [alvaraUm, alvaraDois, alvaraTres, alvaraQuatro, alvaraCinco, alvaraSeis, alvaraSete, alvaraOito, alvaraNove, alvaraDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);


  const [tableDarfUm, setTableDarfUm] = useState(null)
  const [tableDarfDois, setTableDarfDois] = useState(null)
  const [tableDarfTres, setTableDarfTres] = useState(null)
  const [tableDarfQuatro, setTableDarfQuatro] = useState(null)
  const [tableDarfCinco, setTableDarfCinco] = useState(null)

  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: parseFloat(corrigidoDarfUm) || 0 },
        { year: exDois, value: parseFloat(corrigidoDarfDois) || 0 },
        { year: exTres, value: parseFloat(corrigidoDarfTres) || 0 },
        { year: exQuatro, value: parseFloat(corrigidoDarfQuatro) || 0 },
        { year: exCinco, value: parseFloat(corrigidoDarfCinco) || 0 },
        { year: exSeis, value: parseFloat(corrigidoDarfSeis) || 0 },
        { year: exSete, value: parseFloat(corrigidoDarfSete) || 0 },
        { year: exOito, value: parseFloat(corrigidoDarfOito) || 0 },
        { year: exNove, value: parseFloat(corrigidoDarfNove) || 0 },
        { year: exDez, value: parseFloat(corrigidoDarfDez) || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setTableDarfUm,
        setTableDarfDois,
        setTableDarfTres,
        setTableDarfQuatro,
        setTableDarfCinco
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [corrigidoDarfUm, corrigidoDarfDois, corrigidoDarfTres, corrigidoDarfQuatro, corrigidoDarfCinco, corrigidoDarfSeis, corrigidoDarfSete, corrigidoDarfOito, corrigidoDarfNove, corrigidoDarfDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);


  const [tableIsentoAlvaraUm, setTableIsentoAlvaraUm] = useState(null)
  const [tableIsentoAlvaraDois, setTableIsentoAlvaraDois] = useState(null)
  const [tableIsentoAlvaraTres, setTableIsentoAlvaraTres] = useState(null)
  const [tableIsentoAlvaraQuatro, setTableIsentoAlvaraQuatro] = useState(null)
  const [tableIsentoAlvaraCinco, setTableIsentoAlvaraCinco] = useState(null)

  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: parseFloat(isentoAlvaraUm) || 0 },
        { year: exDois, value: parseFloat(isentoAlvaraDois) || 0 },
        { year: exTres, value: parseFloat(isentoAlvaraTres) || 0 },
        { year: exQuatro, value: parseFloat(isentoAlvaraQuatro) || 0 },
        { year: exCinco, value: parseFloat(isentoAlvaraCinco) || 0 },
        { year: exSeis, value: parseFloat(isentoAlvaraSeis) || 0 },
        { year: exSete, value: parseFloat(isentoAlvaraSete) || 0 },
        { year: exOito, value: parseFloat(isentoAlvaraOito) || 0 },
        { year: exNove, value: parseFloat(isentoAlvaraNove) || 0 },
        { year: exDez, value: parseFloat(isentoAlvaraDez) || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setTableIsentoAlvaraUm,
        setTableIsentoAlvaraDois,
        setTableIsentoAlvaraTres,
        setTableIsentoAlvaraQuatro,
        setTableIsentoAlvaraCinco
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [isentoAlvaraUm, isentoAlvaraDois, isentoAlvaraTres, isentoAlvaraQuatro, isentoAlvaraCinco, isentoAlvaraSeis, isentoAlvaraSete, isentoAlvaraOito, isentoAlvaraNove, isentoAlvaraDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);

  const [tableRendAlvaraUm, setTableRendAlvaraUm] = useState(null)
  const [tableRendAlvaraDois, setTableRendAlvaraDois] = useState(null)
  const [tableRendAlvaraTres, setTableRendAlvaraTres] = useState(null)
  const [tableRendAlvaraQuatro, setTableRendAlvaraQuatro] = useState(null)
  const [tableRendAlvaraCinco, setTableRendAlvaraCinco] = useState(null)


  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: parseFloat(rendTribUmAlvara) || 0 },
        { year: exDois, value: parseFloat(rendTribDoisAlvara) || 0 },
        { year: exTres, value: parseFloat(rendTribTresAlvara) || 0 },
        { year: exQuatro, value: parseFloat(rendTribQuatroAlvara) || 0 },
        { year: exCinco, value: parseFloat(rendTribCincoAlvara) || 0 },
        { year: exSeis, value: parseFloat(rendTribSeisAlvara) || 0 },
        { year: exSete, value: parseFloat(rendTribSeteAlvara) || 0 },
        { year: exOito, value: parseFloat(rendTribOitoAlvara) || 0 },
        { year: exNove, value: parseFloat(rendTribNoveAlvara) || 0 },
        { year: exDez, value: parseFloat(rendTribDezAlvara) || 0 },
      ];

      // Agregar somas por ano equivalente
      const sumsByYear = {
        [anoEquivalenteUm]: 0,
        [anoEquivalenteDois]: 0,
        [anoEquivalenteTres]: 0,
        [anoEquivalenteQuatro]: 0,
        [anoEquivalenteCinco]: 0,
      };

      tribAlvaraValues.forEach(({ year, value }) => {
        if (year in sumsByYear) {
          sumsByYear[year] += value;
        }
      });

      // Atualizar estados rendTrib
      setTableRendAlvaraUm(sumsByYear[anoEquivalenteUm]);
      setTableRendAlvaraDois(sumsByYear[anoEquivalenteDois]);
      setTableRendAlvaraTres(sumsByYear[anoEquivalenteTres]);
      setTableRendAlvaraQuatro(sumsByYear[anoEquivalenteQuatro]);
      setTableRendAlvaraCinco(sumsByYear[anoEquivalenteCinco]);
    };

    calculateSums();
  }, [rendTribUmAlvara, rendTribDoisAlvara, rendTribTresAlvara, rendTribQuatroAlvara, rendTribCincoAlvara, rendTribSeisAlvara, rendTribSeteAlvara, rendTribOitoAlvara, rendTribNoveAlvara, rendTribDezAlvara, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);



  const [tableHonorariosUm, setTableHonorariosUm] = useState(null)
  const [tableHonorariosDois, setTableHonorariosDois] = useState(null)
  const [tableHonorariosTres, setTableHonorariosTres] = useState(null)
  const [tableHonorariosQuatro, setTableHonorariosQuatro] = useState(null)
  const [tableHonorariosCinco, setTableHonorariosCinco] = useState(null)



  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: honorariosUmData, value: parseFloat(honorariosUm) || 0 },
        { year: honorariosDoisData, value: parseFloat(honorariosDois) || 0 },
        { year: honorariosTresData, value: parseFloat(honorariosTres) || 0 },
        { year: honorariosQuatroData, value: parseFloat(honorariosQuatro) || 0 },
        { year: honorariosCincoData, value: parseFloat(honorariosCinco) || 0 },
        { year: honorariosSeisData, value: parseFloat(honorariosSeis) || 0 },
        { year: honorariosSeteData, value: parseFloat(honorariosSete) || 0 },
        { year: honorariosOitoData, value: parseFloat(honorariosOito) || 0 },
        { year: honorariosNoveData, value: parseFloat(honorariosNove) || 0 },
        { year: honorariosDezData, value: parseFloat(honorariosDez) || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setTableHonorariosUm,
        setTableHonorariosDois,
        setTableHonorariosTres,
        setTableHonorariosQuatro,
        setTableHonorariosCinco
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [honorariosUm, honorariosDois, honorariosTres, honorariosQuatro, honorariosCinco, honorariosSeis, honorariosSete, honorariosOito, honorariosNove, honorariosDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez, honorariosUmData, honorariosDoisData, honorariosTresData, honorariosQuatroData, honorariosCincoData, honorariosSeisData, honorariosSeteData, honorariosOitoData, honorariosNoveData, honorariosDezData]);


  const [tableTribHonorariosUm, setTableTribHonorariosUm] = useState(null)
  const [tableTribHonorariosDois, setTableTribHonorariosDois] = useState(null)
  const [tableTribHonorariosTres, setTableTribHonorariosTres] = useState(null)
  const [tableTribHonorariosQuatro, setTableTribHonorariosQuatro] = useState(null)
  const [tableTribHonorariosCinco, setTableTribHonorariosCinco] = useState(null)
  const [tableTribHonorariosSeis, setTableTribHonorariosSeis] = useState(null)
  const [tableTribHonorariosSete, setTableTribHonorariosSete] = useState(null)
  const [tableTribHonorariosOito, setTableTribHonorariosOito] = useState(null)
  const [tableTribHonorariosNove, setTableTribHonorariosNove] = useState(null)
  const [tableTribHonorariosDez, setTableTribHonorariosDez] = useState(null)



  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: honorariosUmData, value: parseFloat(tribHonorariosUm) || 0 },
        { year: honorariosDoisData, value: parseFloat(tribHonorariosDois) || 0 },
        { year: honorariosTresData, value: parseFloat(tribHonorariosTres) || 0 },
        { year: honorariosQuatroData, value: parseFloat(tribHonorariosQuatro) || 0 },
        { year: honorariosCincoData, value: parseFloat(tribHonorariosCinco) || 0 },
        { year: honorariosSeisData, value: parseFloat(tribHonorariosSeis) || 0 },
        { year: honorariosSeteData, value: parseFloat(tribHonorariosSete) || 0 },
        { year: honorariosOitoData, value: parseFloat(tribHonorariosOito) || 0 },
        { year: honorariosNoveData, value: parseFloat(tribHonorariosNove) || 0 },
        { year: honorariosDezData, value: parseFloat(tribHonorariosDez) || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setTableTribHonorariosUm,
        setTableTribHonorariosDois,
        setTableTribHonorariosTres,
        setTableTribHonorariosQuatro,
        setTableTribHonorariosCinco,
        setTableTribHonorariosSeis,
        setTableTribHonorariosSete,
        setTableTribHonorariosOito,
        setTableTribHonorariosNove,
        setTableTribHonorariosDez
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [tribHonorariosUm, tribHonorariosDois, tribHonorariosTres, tribHonorariosQuatro, tribHonorariosCinco, tribHonorariosSeis, tribHonorariosSete, tribHonorariosOito, tribHonorariosNove, tribHonorariosDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez, honorariosUmData, honorariosDoisData, honorariosTresData, honorariosQuatroData, honorariosCincoData, honorariosSeisData, honorariosSeteData, honorariosOitoData, honorariosNoveData, honorariosDezData]);




  useEffect(() => {
    const calculateSums = () => {
      const tribAlvaraValues = [
        { year: exUm, value: corrigidoDarfUm || 0 },
        { year: exDois, value: corrigidoDarfDois || 0 },
        { year: exTres, value: corrigidoDarfTres || 0 },
        { year: exQuatro, value: corrigidoDarfQuatro || 0 },
        { year: exCinco, value: corrigidoDarfCinco || 0 },
        { year: exSeis, value: corrigidoDarfSeis || 0 },
        { year: exSete, value: corrigidoDarfSete || 0 },
        { year: exOito, value: corrigidoDarfOito || 0 },
        { year: exNove, value: corrigidoDarfNove || 0 },
        { year: exDez, value: corrigidoDarfDez || 0 },
      ];

      // Agregar somas por ano
      const sumsByYear = tribAlvaraValues.reduce((acc, curr) => {
        if (curr.year != null) {
          if (!acc[curr.year]) {
            acc[curr.year] = 0;
          }
          acc[curr.year] += curr.value;
        }
        return acc;
      }, {});

      // Ordenar anos
      const sortedYears = Object.keys(sumsByYear).sort((a, b) => a - b);

      // Atualizar estados rendTrib
      const rendTribs = [
        setRendTribUmDarf,
        setRendTribDoisDarf,
        setRendTribTresDarf,
        setRendTribQuatroDarf,
        setRendTribCincoDarf,
        setRendTribSeisDarf,
        setRendTribSeteDarf,
        setRendTribOitoDarf,
        setRendTribNoveDarf,
        setRendTribDezDarf
      ];

      sortedYears.forEach((year, index) => {
        if (rendTribs[index]) {
          rendTribs[index](sumsByYear[year]);
        }
      });

      // Set remaining rendTribs to null if not used
      for (let i = sortedYears.length; i < rendTribs.length; i++) {
        rendTribs[i](null);
      }
    };

    calculateSums();
  }, [corrigidoDarfUm, corrigidoDarfDois, corrigidoDarfTres, corrigidoDarfQuatro, corrigidoDarfCinco, corrigidoDarfSeis, corrigidoDarfSete, corrigidoDarfOito, corrigidoDarfNove, corrigidoDarfDez, exUm, exDois, exTres, exQuatro, exCinco, exSeis, exSete, exOito, exNove, exDez]);




  useEffect(() => {

  }, [])


  useEffect(() => {
    if (alvaraUm != null) {
      setAlvaraCalcUm(corrigidoAlvaraUm);
    } else {
      setAlvaraCalcUm(0);
    }

    if (alvaraDois != null) {
      setAlvaraCalcDois(corrigidoAlvaraDois);
    } else {
      setAlvaraCalcDois(0);
    }

    if (alvaraTres != null) {
      setAlvaraCalcTres(corrigidoAlvaraTres);
    } else {
      setAlvaraCalcTres(0);
    }

    if (alvaraQuatro != null) {
      setAlvaraCalcQuatro(corrigidoAlvaraQuatro);
    } else {
      setAlvaraCalcQuatro(0);
    }

    if (alvaraCinco != null) {
      setAlvaraCalcCinco(corrigidoAlvaraCinco);
    } else {
      setAlvaraCalcCinco(0);
    }

    if (alvaraSeis != null) {
      setAlvaraCalcSeis(corrigidoAlvaraSeis);
    } else {
      setAlvaraCalcSeis(0);
    }

    if (alvaraSete != null) {
      setAlvaraCalcSete(corrigidoAlvaraSete);
    } else {
      setAlvaraCalcSete(0);
    }

    if (alvaraOito != null) {
      setAlvaraCalcOito(corrigidoAlvaraOito);
    } else {
      setAlvaraCalcOito(0);
    }

    if (alvaraNove != null) {
      setAlvaraCalcNove(corrigidoAlvaraNove);
    } else {
      setAlvaraCalcNove(0);
    }

    if (alvaraDez != null) {
      setAlvaraCalcDez(corrigidoAlvaraDez);
    } else {
      setAlvaraCalcDez(0);
    }
  }, [corrigidoAlvaraUm, corrigidoAlvaraDois, corrigidoAlvaraTres, corrigidoAlvaraQuatro, corrigidoAlvaraCinco, corrigidoAlvaraSeis, corrigidoAlvaraSete, corrigidoAlvaraOito, corrigidoAlvaraNove, corrigidoAlvaraDez]);


  useEffect(() => {
    if (darfUm != null) {
      setDarfCalcUm(darfUm);
    } else {
      setDarfCalcUm(0);
    }

    if (darfDois != null) {
      setDarfCalcDois(darfDois);
    } else {
      setDarfCalcDois(0);
    }

    if (darfTres != null) {
      setDarfCalcTres(darfTres);
    } else {
      setDarfCalcTres(0);
    }

    if (darfQuatro != null) {
      setDarfCalcQuatro(darfQuatro);
    } else {
      setDarfCalcQuatro(0);
    }

    if (darfCinco != null) {
      setDarfCalcCinco(darfCinco);
    } else {
      setDarfCalcCinco(0);
    }

    if (darfSeis != null) {
      setDarfCalcSeis(darfSeis);
    } else {
      setDarfCalcSeis(0);
    }

    if (darfSete != null) {
      setDarfCalcSete(darfSete);
    } else {
      setDarfCalcSete(0);
    }

    if (darfOito != null) {
      setDarfCalcOito(darfOito);
    } else {
      setDarfCalcOito(0);
    }

    if (darfNove != null) {
      setDarfCalcNove(darfNove);
    } else {
      setDarfCalcNove(0);
    }

    if (darfDez != null) {
      setDarfCalcDez(darfDez);
    } else {
      setDarfCalcDez(0);
    }
  }, [darfUm, darfDois, darfTres, darfQuatro, darfCinco, darfSeis, darfSete, darfOito, darfNove, darfDez]);

  useEffect(() => {
    const formatYear = (dateString) => {
      if (!dateString) return null;
      const parts = dateString.split('/');
      if (parts.length !== 3) return null;
      const [day, month, year] = parts;
      return parseInt(year) !== null ? parseInt(year) + 1 : null;
    };

    // Atualiza os estados com os anos formatados
    setExUm(formatYear(alvaraUmData));
    setExDois(formatYear(alvaraDoisData));
    setExTres(formatYear(alvaraTresData));
    setExQuatro(formatYear(alvaraQuatroData));
    setExCinco(formatYear(alvaraCincoData));
    setExSeis(formatYear(alvaraSeisData));
    setExSete(formatYear(alvaraSeteData));
    setExOito(formatYear(alvaraOitoData));
    setExNove(formatYear(alvaraNoveData));
    setExDez(formatYear(alvaraDezData));
  }, [
    alvaraUmData, alvaraDoisData, alvaraTresData, alvaraQuatroData,
    alvaraCincoData, alvaraSeisData, alvaraSeteData, alvaraOitoData,
    alvaraNoveData, alvaraDezData
  ]);




  useEffect(() => {
    const formatMonthYear = (dateString) => {
      if (!dateString) return null;
      const parts = dateString.split('/');
      if (parts.length !== 3) return null;
      const [day, month, year] = parts;
      return `${month}/${year}`;
    };

    const findIndice = (data) => {
      const formattedData = formatMonthYear(data);
      if (!formattedData) return null;
      const found = indices_IPCA_E.find(item => {
        const formattedItemData = item.data;
        return formattedItemData === formattedData;
      });
      if (checkedA === true) {
        return found ? found.indice : null;
      }
      else {
        return 1.00000
      }
    };

    setIndiceUm(findIndice(alvaraUmData));
    setIndiceDois(findIndice(alvaraDoisData));
    setIndiceTres(findIndice(alvaraTresData));
    setIndiceQuatro(findIndice(alvaraQuatroData));
    setIndiceCinco(findIndice(alvaraCincoData));
    setIndiceSeis(findIndice(alvaraSeisData));
    setIndiceSete(findIndice(alvaraSeteData));
    setIndiceOito(findIndice(alvaraOitoData));
    setIndiceNove(findIndice(alvaraNoveData));
    setIndiceDez(findIndice(alvaraDezData));
  }, [
    alvaraUmData, alvaraDoisData, alvaraTresData, alvaraQuatroData,
    alvaraCincoData, alvaraSeisData, alvaraSeteData, alvaraOitoData,
    alvaraNoveData, alvaraDezData
  ]);



  const handleSelectChange = (event) => {
    const value = parseFloat(event.target.value);
    setFillQtdAlvaras(value);

    // Hide all alvaras by default
    alvaraStyleUm.current.style.display = "none";
    alvaraStyleDois.current.style.display = "none";
    alvaraStyleTres.current.style.display = "none";
    alvaraStyleQuatro.current.style.display = "none";
    alvaraStyleCinco.current.style.display = "none";
    alvaraStyleSeis.current.style.display = "none";
    alvaraStyleSete.current.style.display = "none";
    alvaraStyleOito.current.style.display = "none";
    alvaraStyleNove.current.style.display = "none";
    alvaraStyleDez.current.style.display = "none";

    // Show alvaras based on selected value
    if (value >= 1) {
      alvaraStyleUm.current.style.display = "flex";
    }
    if (value >= 2) {
      alvaraStyleDois.current.style.display = "flex";
    }
    if (value >= 3) {
      alvaraStyleTres.current.style.display = "flex";
    }
    if (value >= 4) {
      alvaraStyleQuatro.current.style.display = "flex";
    }
    if (value >= 5) {
      alvaraStyleCinco.current.style.display = "flex";
    }
    if (value >= 6) {
      alvaraStyleSeis.current.style.display = "flex";
    }
    if (value >= 7) {
      alvaraStyleSete.current.style.display = "flex";
    }
    if (value >= 8) {
      alvaraStyleOito.current.style.display = "flex";
    }
    if (value >= 9) {
      alvaraStyleNove.current.style.display = "flex";
    }
    if (value >= 10) {
      alvaraStyleDez.current.style.display = "flex";
    }
  };

  const handleSelectChangeDarf = (event) => {
    const value = parseFloat(event.target.value);
    setFillQtdDarf(value);

    darfStyleUm.current.style.display = "none";
    darfStyleDois.current.style.display = "none";
    darfStyleTres.current.style.display = "none";
    darfStyleQuatro.current.style.display = "none";
    darfStyleCinco.current.style.display = "none";
    darfStyleSeis.current.style.display = "none";
    darfStyleSete.current.style.display = "none";
    darfStyleOito.current.style.display = "none";
    darfStyleNove.current.style.display = "none";
    darfStyleDez.current.style.display = "none";

    // Show alvaras based on selected value
    if (value >= 1) {
      darfStyleUm.current.style.display = "flex";
    }
    if (value >= 2) {
      darfStyleDois.current.style.display = "flex";
    }
    if (value >= 3) {
      darfStyleTres.current.style.display = "flex";
    }
    if (value >= 4) {
      darfStyleQuatro.current.style.display = "flex";
    }
    if (value >= 5) {
      darfStyleCinco.current.style.display = "flex";
    }
    if (value >= 6) {
      darfStyleSeis.current.style.display = "flex";
    }
    if (value >= 7) {
      darfStyleSete.current.style.display = "flex";
    }
    if (value >= 8) {
      darfStyleOito.current.style.display = "flex";
    }
    if (value >= 9) {
      darfStyleNove.current.style.display = "flex";
    }
    if (value >= 10) {
      darfStyleDez.current.style.display = "flex";
    }
  };

  const handleSelectChangeHonorarios = (event) => {
    const value = parseFloat(event.target.value);
    setFillQtdHonorarios(value);

    honorariosStyleUm.current.style.display = "none";
    honorariosStyleDois.current.style.display = "none";
    honorariosStyleTres.current.style.display = "none";
    honorariosStyleQuatro.current.style.display = "none";
    honorariosStyleCinco.current.style.display = "none";
    honorariosStyleSeis.current.style.display = "none";
    honorariosStyleSete.current.style.display = "none";
    honorariosStyleOito.current.style.display = "none";
    honorariosStyleNove.current.style.display = "none";
    honorariosStyleDez.current.style.display = "none";

    // Show alvaras based on selected value
    if (value >= 1) {
      honorariosStyleUm.current.style.display = "flex";
    }
    if (value >= 2) {
      honorariosStyleDois.current.style.display = "flex";
    }
    if (value >= 3) {
      honorariosStyleTres.current.style.display = "flex";
    }
    if (value >= 4) {
      honorariosStyleQuatro.current.style.display = "flex";
    }
    if (value >= 5) {
      honorariosStyleCinco.current.style.display = "flex";
    }
    if (value >= 6) {
      honorariosStyleSeis.current.style.display = "flex";
    }
    if (value >= 7) {
      honorariosStyleSete.current.style.display = "flex";
    }
    if (value >= 8) {
      honorariosStyleOito.current.style.display = "flex";
    }
    if (value >= 9) {
      honorariosStyleNove.current.style.display = "flex";
    }
    if (value >= 10) {
      honorariosStyleDez.current.style.display = "flex";
    }
  };




  const tabelaIRRF = {
    "2024": [
      { faixa: { inicio: 0, fim: 2259.20 }, aliquota: 0, deducao: 0 },
      { faixa: { inicio: 2259.21, fim: 2826.65 }, aliquota: 7.5, deducao: 158.40 },
      { faixa: { inicio: 2826.66, fim: 3751.05 }, aliquota: 15.0, deducao: 370.40 },
      { faixa: { inicio: 3751.06, fim: 4664.68 }, aliquota: 22.5, deducao: 651.73 },
      { faixa: { inicio: 4664.69, fim: Infinity }, aliquota: 27.5, deducao: 884.96 }
    ],
    "2023": [
      { faixa: { inicio: 0, fim: 2112.20 }, aliquota: 0, deducao: 0 },
      { faixa: { inicio: 2112.01, fim: 2826.65 }, aliquota: 7.5, deducao: 158.40 },
      { faixa: { inicio: 2826.66, fim: 3751.05 }, aliquota: 15.0, deducao: 370.40 },
      { faixa: { inicio: 3751.06, fim: 4664.68 }, aliquota: 22.5, deducao: 651.73 },
      { faixa: { inicio: 4664.69, fim: Infinity }, aliquota: 27.5, deducao: 884.96 }
    ],
    "2016-2022": [
      { faixa: { inicio: 0, fim: 2112.20 }, aliquota: 0, deducao: 0 },
      { faixa: { inicio: 2112.01, fim: 2826.65 }, aliquota: 7.5, deducao: 158.40 },
      { faixa: { inicio: 2826.66, fim: 3751.05 }, aliquota: 15.0, deducao: 370.40 },
      { faixa: { inicio: 3751.06, fim: 4664.68 }, aliquota: 22.5, deducao: 651.73 },
      { faixa: { inicio: 4664.69, fim: Infinity }, aliquota: 27.5, deducao: 884.96 }
    ]
  };

  const calcularIRPF = (rendaAlvara, rendaHonorarios, rendaDarf, rendaMes, anoEq) => {
    // Encontrar a tabela de alíquotas baseado no ano equivalente
    let tabela = tabelaIRRF[anoEq] || tabelaIRRF["2016-2022"];

    // Calcular o stepZero
    const stepZero = (parseFloat(rendaAlvara) - parseFloat(rendaHonorarios)) / 100;

    // Calcular o stepUm
    const stepUm = stepZero / rendaMes;

    // Encontrar a faixa de alíquota correspondente ao valor de stepUm
    let aliquota = 0;
    let deducao = 0;

    for (let i = 0; i < tabela.length; i++) {
      const faixa = tabela[i].faixa;
      if (stepUm >= faixa.inicio && stepUm <= faixa.fim) {
        aliquota = tabela[i].aliquota;
        deducao = tabela[i].deducao;
        break;
      }
    }

    // Calcular os steps subsequentes
    const stepDois = aliquota * 0.01;
    const stepTres = stepUm * stepDois;
    const stepQuatro = stepTres - deducao;
    const stepCinco = stepQuatro * rendaMes;

    // Calcular o IRPF
    const IRPF = (parseFloat(rendaDarf) / 100 - stepCinco) * 100;

    return IRPF;
  };

  // useEffect para calcular o IRPF para cada conjunto de valores
  useEffect(() => {
    const calcularTodosIRPF = () => {
      const resultados = [];
      const prefixos = ["Um", "Dois", "Tres", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez"];

      for (let i = 0; i < 10; i++) {
        const prefixo = prefixos[i];
        const rendaAlvara = eval(`rendTrib${prefixo}Alvara`);
        const rendaHonorarios = eval(`tableTribHonorarios${prefixo}`);
        const rendaDarf = eval(`rendTrib${prefixo}Darf`);
        const rendaMes = eval(`rendTrib${prefixo}Mes`);
        const anoEq = eval(`anoEquivalente${prefixo}`);

        if (rendaAlvara !== null && rendaHonorarios !== null && rendaDarf !== null && rendaMes !== null && anoEq !== null) {
          const IRPF = calcularIRPF(rendaAlvara, rendaHonorarios, rendaDarf, rendaMes, anoEq);
          resultados.push(IRPF);
        } else {
          resultados.push(null);
        }
      }
      return resultados;
    };

    const irpfResultados = calcularTodosIRPF();
    setIrpfUm(irpfResultados[0]);
    setIrpfDois(irpfResultados[1]);
    setIrpfTres(irpfResultados[2]);
    setIrpfQuatro(irpfResultados[3]);
    setIrpfCinco(irpfResultados[4]);
    setIrpfSeis(irpfResultados[5]);
    setIrpfSete(irpfResultados[6]);
    setIrpfOito(irpfResultados[7]);
    setIrpfNove(irpfResultados[8]);
    setIrpfDez(irpfResultados[9]);
  }, [
    tableTribHonorariosUm, rendTribUmAlvara, rendTribUmMes, anoEquivalenteUm, rendTribUmDarf,
    tableTribHonorariosDois, rendTribDoisAlvara, rendTribDoisMes, anoEquivalenteDois, rendTribDoisDarf,
    tableTribHonorariosTres, rendTribTresAlvara, rendTribTresMes, anoEquivalenteTres, rendTribTresDarf,
    tableTribHonorariosQuatro, rendTribQuatroAlvara, rendTribQuatroMes, anoEquivalenteQuatro, rendTribQuatroDarf,
    tableTribHonorariosCinco, rendTribCincoAlvara, rendTribCincoMes, anoEquivalenteCinco, rendTribCincoDarf,
    tableTribHonorariosSeis, rendTribSeisAlvara, rendTribSeisMes, anoEquivalenteSeis, rendTribSeisDarf,
    tableTribHonorariosSete, rendTribSeteAlvara, rendTribSeteMes, anoEquivalenteSete, rendTribSeteDarf,
    tableTribHonorariosOito, rendTribOitoAlvara, rendTribOitoMes, anoEquivalenteOito, rendTribOitoDarf,
    tableTribHonorariosNove, rendTribNoveAlvara, rendTribNoveMes, anoEquivalenteNove, rendTribNoveDarf,
    tableTribHonorariosDez, rendTribDezAlvara, rendTribDezMes, anoEquivalenteDez, rendTribDezDarf,
  ]);


  const handleValorChange = (event, setter) => {
    const inputValue = event.target.value;
    const onlyDigits = inputValue.replace(/[^0-9]/g, '');
    setter(onlyDigits);
  };

  const handleDataChange = (event, setter) => {
    let formattedValue = event.target.value.replace(/\D/g, '');

    if (formattedValue.length > 8) {
      formattedValue = formattedValue.slice(0, 8);
    }

    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
    }
    if (formattedValue.length > 5) {
      formattedValue =
        formattedValue.slice(0, 5) + '/' + formattedValue.slice(5);
    }

    setter(formattedValue);
  };

  const handleTextChange = (event, setter) => {
    const inputValue = event.target.value;
    setter(inputValue);
  };

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value || 0) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);
  };

  const formatPhoneNumber = (value) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Format the number based on its length
    if (numericValue.length <= 2) {
      return `(${numericValue}`;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    } else {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
    }
  };

  const handlePhoneNumberChange = (event, setTelefone) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setTelefone(formattedPhoneNumber);
  };


  function ValorRestituir({ finalSomaCorrigido }) {
    if (parseFloat(finalSomaCorrigido) > 0) {
      return (
        <div>
          <div className="msgAprovado">Parabéns! Você possui valor à restituir!</div>
        </div>
      );
    } else {
      return <div ref={msg} className="msg">Você não possui valor para restituir.</div>;
    }
  }


  const msg = useRef()



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    value: '',
    paymentMethod: 'PIX', // ou 'CREDIT_CARD'
  });

  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentCompletedUm, setPaymentCompletedUm] = useState(false);
  const [paymentCompletedDois, setPaymentCompletedDois] = useState(false);
  const [paymentCompletedTres, setPaymentCompletedTres] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [plan, setPlan] = useState('');


  const starterPlan = useRef(null);
  const builderPlan = useRef(null);
  const specialistPlan = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUm = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados do formulário:', formData);
      const response = await axios.post('https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/create-payment', formData);
      console.log('Resposta do servidor:', response.data);
      const paymentUrl = response.data.invoiceUrl || response.data.bankSlipUrl;

      setPaymentUrl(paymentUrl);
      setPaymentId(response.data.id);

      // Abre a URL de pagamento em uma nova aba
      window.open(paymentUrl, '_blank');

      // Verifica o status do pagamento periodicamente
      checkPaymentStatusUm(response.data.id);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error.response ? error.response.data : error.message);
      alert('Erro ao criar pagamento');
    }
  };

  const handleSubmitDois = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados do formulário:', formData);
      const response = await axios.post('https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/create-payment', formData);
      console.log('Resposta do servidor:', response.data);
      const paymentUrl = response.data.invoiceUrl || response.data.bankSlipUrl;

      setPaymentUrl(paymentUrl);
      setPaymentId(response.data.id);

      // Abre a URL de pagamento em uma nova aba
      window.open(paymentUrl, '_blank');

      // Verifica o status do pagamento periodicamente
      checkPaymentStatusDois(response.data.id);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error.response ? error.response.data : error.message);
      alert('Erro ao criar pagamento');
    }



  };

  const handleSubmitTres = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados do formulário:', formData);
      const response = await axios.post('https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/create-payment', formData);
      console.log('Resposta do servidor:', response.data);
      const paymentUrl = response.data.invoiceUrl || response.data.bankSlipUrl;

      setPaymentUrl(paymentUrl);
      setPaymentId(response.data.id);

      // Abre a URL de pagamento em uma nova aba
      window.open(paymentUrl, '_blank');

      // Verifica o status do pagamento periodicamente
      checkPaymentStatusTres(response.data.id);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error.response ? error.response.data : error.message);
      alert('Erro ao criar pagamento');
    }
  };

  const checkPaymentStatusUm = async (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/payment-status/${paymentId}`);
        if (response.data.status === 'RECEIVED' || response.data.status === 'CONFIRMED') {
          setPaymentCompletedUm(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error.response ? error.response.data : error.message);
      }
    }, 5000); // Verifica a cada 5 segundos
  };

  const checkPaymentStatusDois = async (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/payment-status/${paymentId}`);
        if (response.data.status === 'RECEIVED' || response.data.status === 'CONFIRMED') {
          setPaymentCompletedDois(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error.response ? error.response.data : error.message);
      }
    }, 5000); // Verifica a cada 5 segundos
  };

  const checkPaymentStatusTres = async (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`https://asaas-payment-ir-1a1d7a79d60d.herokuapp.com/payment-status/${paymentId}`);
        if (response.data.status === 'RECEIVED' || response.data.status === 'CONFIRMED') {
          setPaymentCompletedTres(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error.response ? error.response.data : error.message);
      }
    }, 5000); // Verifica a cada 5 segundos
  };



  const handleSelect = (method) => {
    setPaymentMethod(method);
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: method,
    }));
  };

  const [showPlan, setShowPlan] = useState(null);
  const [valueCheck, setValueCheck] = useState();

  const handleSelectPlan = (selectedPlan) => {
    setPlan(selectedPlan);
    setShowPlan(selectedPlan);

    let value = '';
    if (selectedPlan === 'Starter') {
      value = parseFloat(starter);
      setValueCheck(parseFloat(starter));
      payStarter.current.style.display = 'block';
      payBuilder.current.style.display = 'none';
      paySpecialist.current.style.display = 'none';
    } else if (selectedPlan === 'Builder') {
      value = parseFloat(builder);
      setValueCheck(parseFloat(builder));
      payStarter.current.style.display = 'none';
      payBuilder.current.style.display = 'block';
      paySpecialist.current.style.display = 'none';
    } else if (selectedPlan === 'Specialist') {
      value = parseFloat(specialist);
      setValueCheck(parseFloat(specialist));
      payStarter.current.style.display = 'none';
      payBuilder.current.style.display = 'none';
      paySpecialist.current.style.display = 'block';
    }

    setFormData((prevData) => ({
      ...prevData,
      value: value,
    }));
  };


  useEffect(() => {
    if (paymentCompletedUm === true) {
      payStarter.current.style.display = "none";
      starterPlan.current.style.display = "none";
    }
    if (paymentCompletedDois === true) {
      setPaymentCompletedUm(false)
      payBuilder.current.style.display = "none";
      builderPlan.current.style.display = "none";
      starterPlan.current.style.display = "none";
    }
    if (paymentCompletedTres === true) {
      setPaymentCompletedUm(false)
      setPaymentCompletedDois(false)
      paySpecialist.current.style.display = "none";
      specialistPlan.current.style.display = "none";
      starterPlan.current.style.display = "none";
      builderPlan.current.style.display = "none";
    }
  }, [paymentCompletedDois, paymentCompletedTres, paymentCompletedUm])

  const paymentDiv = useRef();
  const envCalcs = useRef();

  const payStarter = useRef();
  const payBuilder = useRef();
  const paySpecialist = useRef();


  const [starter, setStarter] = useState(29.9);
  const [builder, setBuilder] = useState(499, 9);
  const [specialist, setSpecialist] = useState(2499, 90);

  useEffect(() => {
    if (paymentCompletedUm) {
      if (plan === 'Starter') {
        setBuilder(469.9);
        setSpecialist(2469.9)
      }
    }
    if (paymentCompletedDois) {
      if (plan === 'Builder') {
        setSpecialist(1999.9);
      }
    }
  }, [paymentCompletedDois, paymentCompletedUm, plan]);



  function updateHiddenPlansUm() {
    if (paymentCompletedUm === true) {
      return (
        <div className="">
          <h3>Total a restituir:</h3>
          <h3 className="text-verde">{formatCurrency(finalSomaCorrigido)}</h3>
        </div>
      );
    }
  }

  function updateHiddenPlansDois() {
    if (paymentCompletedDois === true) {
      return (
        <div className="sucessoPayBuilder">
          <div className="sucesso-pay">
            <h3>Total a restituir:</h3>
            <h3 className="text-verde">{formatCurrency(finalSomaCorrigido)}</h3>
          </div>
          <div>Os Arquivos foram enviados para o seu email. (Verifique o lixo eletronico.) </div>
        </div>
      );
    }
  }


  function updateHiddenPlansTres() {
    if (paymentCompletedTres === true) {
      return (
        <div>
          <div className="div">Entraremos em contato via Email e WhatsApp.</div>
          <div className="div">Qualquer duvida, entre em contato via <a href="#">WhatsApp</a>.</div>
        </div>
      );
    }
  }

  const refNome = useRef()




  const enviarEmail = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Table />
        </Page>
      </Document>
    );

    const EscUm = () => (
      <Document>
        <EsclarecimentosUm />
      </Document>
    );

    try {
      const documents = [
        { doc: <MyDocument />, name: 'documento1' },
        { doc: <EscUm />, name: 'documento6' },
      ];

      let pdfURLs = [];

      for (const { doc, name } of documents) {
        const pdfBlob = await pdf(doc).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }

      const templateParams = {
        nomeUsuario: nomeUsuario,
        email: email,
        fileURL1: pdfURLs[0],
        fileURL6: pdfURLs[1],
      };

      await emailjs.send(
        'service_m5ti1w3',
        'template_bjxa32u',
        templateParams,
        '7W0_MR9192Rjrt7F2'
      );

      alert('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao enviar o email.');
    }
  };

  const enviarEmailDois = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Table />
        </Page>
      </Document>
    );

    const MyDocumentDois = () => (
      <Document>
        <Page style={styles.page}>
          <TableDois />
        </Page>
      </Document>
    );

    const EscUm = () => (
      <Document>
        <EsclarecimentosUm />
      </Document>
    );

    const EscDois = () => (
      <Document>
        <EsclarecimentosDois />
      </Document>
    );

    try {
      const documents = [
        { doc: <MyDocument />, name: 'documento1' },
        { doc: <MyDocumentDois />, name: 'documento2' },
        { doc: <EscUm />, name: 'documento6' },
        { doc: <EscDois />, name: 'documento7' },
      ];

      let pdfURLs = [];

      for (const { doc, name } of documents) {
        const pdfBlob = await pdf(doc).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }

      const templateParams = {
        nomeUsuario: nomeUsuario,
        email: email,
        fileURL1: pdfURLs[0],
        fileURL2: pdfURLs[1],
        fileURL6: pdfURLs[2],
        fileURL7: pdfURLs[3],
      };


      await emailjs.send(
        'service_m5ti1w3',
        'template_diww4ar',
        templateParams,
        '7W0_MR9192Rjrt7F2'
      );

      alert('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao enviar o email.');
    }
  };

  const enviarEmailTres = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Table />
        </Page>
      </Document>
    );

    const MyDocumentDois = () => (
      <Document>
        <Page style={styles.page}>
          <TableDois />
        </Page>
      </Document>
    );

    const MyDocumentTres = () => (
      <Document>
        <Page style={styles.page}>
          <TableTres />
        </Page>
      </Document>
    );

    const EscUm = () => (
      <Document>
        <EsclarecimentosUm />
      </Document>
    );

    const EscDois = () => (
      <Document>
        <EsclarecimentosDois />
      </Document>
    );

    const EscTres = () => (
      <Document>
        <EsclarecimentosTres />
      </Document>
    );

    try {
      const documents = [
        { doc: <MyDocument />, name: 'documento1' },
        { doc: <MyDocumentDois />, name: 'documento2' },
        { doc: <MyDocumentTres />, name: 'documento3' },
        { doc: <EscUm />, name: 'documento6' },
        { doc: <EscDois />, name: 'documento7' },
        { doc: <EscTres />, name: 'documento8' },
      ];

      let pdfURLs = [];

      for (const { doc, name } of documents) {
        const pdfBlob = await pdf(doc).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }

      const templateParams = {
        nomeUsuario: nomeUsuario,
        email: email,
        fileURL1: pdfURLs[0],
        fileURL2: pdfURLs[1],
        fileURL3: pdfURLs[2],
        fileURL6: pdfURLs[3],
        fileURL7: pdfURLs[4],
        fileURL8: pdfURLs[5],
      };

      await emailjs.send(
        'service_sqv9wgn',
        'template_hkofuby',
        templateParams,
        'SwpYSoV9HZwddLQ-f'
      );

      alert('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao enviar o email.');
    }
  };

  const enviarEmailQuatro = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Table />
        </Page>
      </Document>
    );

    const MyDocumentDois = () => (
      <Document>
        <Page style={styles.page}>
          <TableDois />
        </Page>
      </Document>
    );

    const MyDocumentTres = () => (
      <Document>
        <Page style={styles.page}>
          <TableTres />
        </Page>
      </Document>
    );

    const MyDocumentQuatro = () => (
      <Document>
        <Page style={styles.page}>
          <TableQuatro />
        </Page>
      </Document>
    );

    const EscUm = () => (
      <Document>
        <EsclarecimentosUm />
      </Document>
    );

    const EscDois = () => (
      <Document>
        <EsclarecimentosDois />
      </Document>
    );

    const EscTres = () => (
      <Document>
        <EsclarecimentosTres />
      </Document>
    );

    const EscQuatro = () => (
      <Document>
        <EsclarecimentosQuatro />
      </Document>
    );

    try {
      const documents = [
        { doc: <MyDocument />, name: 'documento1' },
        { doc: <MyDocumentDois />, name: 'documento2' },
        { doc: <MyDocumentTres />, name: 'documento3' },
        { doc: <MyDocumentQuatro />, name: 'documento4' },
        { doc: <EscUm />, name: 'documento6' },
        { doc: <EscDois />, name: 'documento7' },
        { doc: <EscTres />, name: 'documento8' },
        { doc: <EscQuatro />, name: 'documento9' },
      ];

      let pdfURLs = [];

      for (const { doc, name } of documents) {
        const pdfBlob = await pdf(doc).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }

      const templateParams = {
        nomeUsuario: nomeUsuario,
        email: email,
        fileURL1: pdfURLs[0],
        fileURL2: pdfURLs[1],
        fileURL3: pdfURLs[2],
        fileURL4: pdfURLs[3],
        fileURL6: pdfURLs[4],
        fileURL7: pdfURLs[5],
        fileURL8: pdfURLs[6],
        fileURL9: pdfURLs[7],
      };

      await emailjs.send(
        'service_sqv9wgn',
        'template_orhz48s',
        templateParams,
        'SwpYSoV9HZwddLQ-f'
      );

      alert('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao enviar o email.');
    }
  };

  const enviarEmailCinco = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Table />
        </Page>
      </Document>
    );

    const MyDocumentDois = () => (
      <Document>
        <Page style={styles.page}>
          <TableDois />
        </Page>
      </Document>
    );

    const MyDocumentTres = () => (
      <Document>
        <Page style={styles.page}>
          <TableTres />
        </Page>
      </Document>
    );

    const MyDocumentQuatro = () => (
      <Document>
        <Page style={styles.page}>
          <TableQuatro />
        </Page>
      </Document>
    );

    const MyDocumentCinco = () => (
      <Document>
        <Page style={styles.page}>
          <TableCinco />
        </Page>
      </Document>
    );

    const EscUm = () => (
      <Document>
        <EsclarecimentosUm />
      </Document>
    );

    const EscDois = () => (
      <Document>
        <EsclarecimentosDois />
      </Document>
    );

    const EscTres = () => (
      <Document>
        <EsclarecimentosTres />
      </Document>
    );

    const EscQuatro = () => (
      <Document>
        <EsclarecimentosQuatro />
      </Document>
    );

    const EscCinco = () => (
      <Document>
        <EsclarecimentosCinco />
      </Document>
    );

    try {
      const documents = [
        { doc: <MyDocument />, name: 'documento1' },
        { doc: <MyDocumentDois />, name: 'documento2' },
        { doc: <MyDocumentTres />, name: 'documento3' },
        { doc: <MyDocumentQuatro />, name: 'documento4' },
        { doc: <MyDocumentCinco />, name: 'documento5' },
        { doc: <EscUm />, name: 'documento6' },
        { doc: <EscDois />, name: 'documento7' },
        { doc: <EscTres />, name: 'documento8' },
        { doc: <EscQuatro />, name: 'documento9' },
        { doc: <EscCinco />, name: 'documento10' },
      ];

      let pdfURLs = [];

      for (const { doc, name } of documents) {
        const pdfBlob = await pdf(doc).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }

      const templateParams = {
        nomeUsuario: nomeUsuario,
        email: email,
        fileURL1: pdfURLs[0],
        fileURL2: pdfURLs[1],
        fileURL3: pdfURLs[2],
        fileURL4: pdfURLs[3],
        fileURL5: pdfURLs[4],
        fileURL6: pdfURLs[5],
        fileURL7: pdfURLs[6],
        fileURL8: pdfURLs[7],
        fileURL9: pdfURLs[8],
        fileURL10: pdfURLs[9],
      };

      await emailjs.send(
        'service_mu32oot',
        'template_uu0nrxh',
        templateParams,
        'zUrCThunPpHYsM7Im'
      );

      alert('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao enviar o email.');
    }
  };

  const [linkPdf1, setLinkPdf1] = useState(null)
  const [linkPdf2, setLinkPdf2] = useState(null)
  const [linkPdf3, setLinkPdf3] = useState(null)
  const [linkPdf4, setLinkPdf4] = useState(null)
  const [linkPdf5, setLinkPdf5] = useState(null)
  const [link2Pdf1, setLink2Pdf1] = useState(null)
  const [link2Pdf2, setLink2Pdf2] = useState(null)
  const [link2Pdf3, setLink2Pdf3] = useState(null)
  const [link2Pdf4, setLink2Pdf4] = useState(null)
  const [link2Pdf5, setLink2Pdf5] = useState(null)

  const gerarEArmazenarPDFs = async () => {
    const documents = [
      { component: <MyDocument />, name: 'documento1' },
      { component: <MyDocumentDois />, name: 'documento2' },
      { component: <MyDocumentTres />, name: 'documento3' },
      { component: <MyDocumentQuatro />, name: 'documento4' },
      { component: <MyDocumentCinco />, name: 'documento5' },
      { component: <EscUm />, name: 'documento6' },
      { component: <EscDois />, name: 'documento7' },
      { component: <EscTres />, name: 'documento8' },
      { component: <EscQuatro />, name: 'documento9' },
      { component: <EscCinco />, name: 'documento10' },
    ];

    try {
      let pdfURLs = [];
      for (const { component, name } of documents) {
        const pdfBlob = await pdf(component).toBlob();
        const pdfRef = ref(storage, `pdfs/${name}_${Date.now()}.pdf`);
        await uploadBytes(pdfRef, pdfBlob);
        const pdfURL = await getDownloadURL(pdfRef);
        pdfURLs.push(pdfURL);
      }
      return pdfURLs;
    } catch (error) {
      console.error('Erro ao gerar e armazenar PDFs:', error);
      throw error;
    }
  };

  // Componentes dos documentos
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Table />
      </Page>
    </Document>
  );

  const MyDocumentDois = () => (
    <Document>
      <Page style={styles.page}>
        <TableDois />
      </Page>
    </Document>
  );

  const MyDocumentTres = () => (
    <Document>
      <Page style={styles.page}>
        <TableTres />
      </Page>
    </Document>
  );

  const MyDocumentQuatro = () => (
    <Document>
      <Page style={styles.page}>
        <TableQuatro />
      </Page>
    </Document>
  );

  const MyDocumentCinco = () => (
    <Document>
      <Page style={styles.page}>
        <TableCinco />
      </Page>
    </Document>
  );

  const EscUm = () => (
    <Document>
      <EsclarecimentosUm />
    </Document>
  );

  const EscDois = () => (
    <Document>
      <EsclarecimentosDois />
    </Document>
  );

  const EscTres = () => (
    <Document>
      <EsclarecimentosTres />
    </Document>
  );

  const EscQuatro = () => (
    <Document>
      <EsclarecimentosQuatro />
    </Document>
  );

  const EscCinco = () => (
    <Document>
      <EsclarecimentosCinco />
    </Document>
  );






  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    const enviarEmailCondicional = async () => {
      try {
        if (anoEquivalenteCinco !== null) {
          await enviarEmailCinco();
        } else if (anoEquivalenteQuatro !== null) {
          await enviarEmailQuatro();
        } else if (anoEquivalenteTres !== null) {
          await enviarEmailTres();
        } else if (anoEquivalenteDois !== null) {
          await enviarEmailDois();
        } else if (anoEquivalenteUm !== null) {
          await enviarEmail();
        }
        setEmailSent(true);
      } catch (error) {
        console.error('Erro ao enviar o email:', error);
      }
    };

    if (paymentCompletedDois && !emailSent) {
      console.log("Condição de pagamento completa e email ainda não enviado");
      enviarEmailCondicional();
    }
  }, [paymentCompletedDois, emailSent, enviarEmail, enviarEmailDois, enviarEmailTres, enviarEmailQuatro, enviarEmailCinco]);

  const Table = () => (
    <View style={styles.table}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "80%" }]}>
          <Text style={styles.tableCellHeader}>DEMONSTRATIVO DE APURAÇÃO DAS VERBAS TRIBUTÁVEIS REFERENTES À RECLAMAÇÃO TRABALHISTA</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>DIRPF</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>{anoEquivalenteUm}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO CONTRIBUINTE</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nome do Cliente:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{nomeUsuario}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CPF:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{cpf}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Data de Nascimento:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{dataNascimento}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO PROCESSO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nº Processo:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{processo}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Vara:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{vara}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Comarca:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{comarca}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Fonte Pagadora:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{fontePagadora}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CNPJ:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{formatarCNPJ(cnpj)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>1 - TOTAL DE RENDIMENTOS RECEBIDOS PELO AUTOR:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableAlvarasUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>2 - TOTAL DE IMPOSTO DE RENDA RETIDO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>3 - TOTAL DA CAUSA</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableAlvarasUm) + parseFloat(tableDarfUm))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>APURAÇÃO DOS RENDIMENTOS ISENTOS DE TRIBUTAÇÃO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>4 - RENDIMENTOS BRUTO HOMOLOGADO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(brutoHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>5 - RENDIMENTOS TRIBUTÁVEIS CALCULADOS NA MESMA DATA BASE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tributavelHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>6 - PROPORÇÃO DE RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}%</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>7 - TOTAL DE RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>8 - RENDIMENTOS SUJEITOS À TRIBUTAÇÃO NORMAL</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(rendTribUmAlvara)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>9 - TOTAL DE DESPESAS PAGAS COM ADVOGADO E PERITO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableHonorariosUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>10 - DESPESAS PAGAS AO ADVOGADO E PERITO, PROPORCIONAIS:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableTribHonorariosUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>VALORES ESPERADOS DA DECLARAÇÃO DE AJUSTE ANUAL DO IR</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>11 - RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(rendTribUmAlvara - tableTribHonorariosUm))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>12 - IMPOSTO DE RENDA RETIDO NA FONTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfUm)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>13 - MESES DISCUTIDOS NA AÇÃO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>
            {rendTribUmMes !== null ? (
              rendTribUmMes % 1 === 0
                ? rendTribUmMes.toLocaleString('pt-BR')
                : rendTribUmMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : ''}

          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>14 - INSS RECLAMANTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(INSS)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>15 - RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraUm)}</Text>
        </View>
      </View>
    </View>
  );

  const TableDois = () => (
    <View style={styles.table}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "80%" }]}>
          <Text style={styles.tableCellHeader}>DEMONSTRATIVO DE APURAÇÃO DAS VERBAS TRIBUTÁVEIS REFERENTES À RECLAMAÇÃO TRABALHISTA</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>DIRPF</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>{anoEquivalenteDois}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO CONTRIBUINTE</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nome do Cliente:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{nomeUsuario}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CPF:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{cpf}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Data de Nascimento:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{dataNascimento}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO PROCESSO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nº Processo:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{processo}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Vara:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{vara}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Comarca:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{comarca}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Fonte Pagadora:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{fontePagadora}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CNPJ:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{formatarCNPJ(cnpj)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>1 - TOTAL DE RENDIMENTOS RECEBIDOS PELO AUTOR:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableAlvarasDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>2 - TOTAL DE IMPOSTO DE RENDA RETIDO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>3 - TOTAL DA CAUSA</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableAlvarasDois) + parseFloat(tableDarfDois))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>APURAÇÃO DOS RENDIMENTOS ISENTOS DE TRIBUTAÇÃO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>4 - RENDIMENTOS BRUTO HOMOLOGADO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(brutoHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>5 - RENDIMENTOS TRIBUTÁVEIS CALCULADOS NA MESMA DATA BASE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tributavelHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>6 - PROPORÇÃO DE RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}%</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>7 - TOTAL DE RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>8 - RENDIMENTOS SUJEITOS À TRIBUTAÇÃO NORMAL</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(rendTribDoisAlvara)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>9 - TOTAL DE DESPESAS PAGAS COM ADVOGADO E PERITO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableHonorariosDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>10 - DESPESAS PAGAS AO ADVOGADO E PERITO, PROPORCIONAIS:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableTribHonorariosDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>VALORES ESPERADOS DA DECLARAÇÃO DE AJUSTE ANUAL DO IR</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>11 - RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(rendTribDoisAlvara - tableTribHonorariosDois))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>12 - IMPOSTO DE RENDA RETIDO NA FONTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfDois)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>13 - MESES DISCUTIDOS NA AÇÃO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>
            {rendTribDoisMes !== null ? (
              rendTribDoisMes % 1 === 0
                ? rendTribDoisMes.toLocaleString('pt-BR')
                : rendTribDoisMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : ''}
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>14 - INSS RECLAMANTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(INSS)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>15 - RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraDois)}</Text>
        </View>
      </View>
    </View>
  );

  const TableTres = () => (
    <View style={styles.table}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "80%" }]}>
          <Text style={styles.tableCellHeader}>DEMONSTRATIVO DE APURAÇÃO DAS VERBAS TRIBUTÁVEIS REFERENTES À RECLAMAÇÃO TRABALHISTA</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>DIRPF</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>{anoEquivalenteTres}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO CONTRIBUINTE</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nome do Cliente:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{nomeUsuario}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CPF:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{cpf}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Data de Nascimento:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{dataNascimento}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO PROCESSO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nº Processo:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{processo}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Vara:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{vara}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Comarca:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{comarca}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Fonte Pagadora:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{fontePagadora}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CNPJ:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{formatarCNPJ(cnpj)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>1 - TOTAL DE RENDIMENTOS RECEBIDOS PELO AUTOR:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableAlvarasTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>2 - TOTAL DE IMPOSTO DE RENDA RETIDO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>3 - TOTAL DA CAUSA</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableAlvarasTres) + parseFloat(tableDarfTres))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>APURAÇÃO DOS RENDIMENTOS ISENTOS DE TRIBUTAÇÃO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>4 - RENDIMENTOS BRUTO HOMOLOGADO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(brutoHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>5 - RENDIMENTOS TRIBUTÁVEIS CALCULADOS NA MESMA DATA BASE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tributavelHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>6 - PROPORÇÃO DE RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}%</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>7 - TOTAL DE RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>8 - RENDIMENTOS SUJEITOS À TRIBUTAÇÃO NORMAL</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(rendTribTresAlvara)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>9 - TOTAL DE DESPESAS PAGAS COM ADVOGADO E PERITO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableHonorariosTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>10 - DESPESAS PAGAS AO ADVOGADO E PERITO, PROPORCIONAIS:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableTribHonorariosTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>VALORES ESPERADOS DA DECLARAÇÃO DE AJUSTE ANUAL DO IR</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>11 - RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableRendAlvaraTres - tableTribHonorariosTres))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>12 - IMPOSTO DE RENDA RETIDO NA FONTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfTres)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>13 - MESES DISCUTIDOS NA AÇÃO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>
            {rendTribTresMes !== null ? (
              rendTribTresMes % 1 === 0
                ? rendTribTresMes.toLocaleString('pt-BR')
                : rendTribTresMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : ''}

          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>14 - INSS RECLAMANTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(INSS)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>15 - RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraTres)}</Text>
        </View>
      </View>
    </View>
  );

  const TableQuatro = () => (
    <View style={styles.table}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "80%" }]}>
          <Text style={styles.tableCellHeader}>DEMONSTRATIVO DE APURAÇÃO DAS VERBAS TRIBUTÁVEIS REFERENTES À RECLAMAÇÃO TRABALHISTA</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>DIRPF</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>{anoEquivalenteQuatro}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO CONTRIBUINTE</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nome do Cliente:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{nomeUsuario}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CPF:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{cpf}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Data de Nascimento:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{dataNascimento}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO PROCESSO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nº Processo:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{processo}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Vara:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{vara}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Comarca:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{comarca}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Fonte Pagadora:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{fontePagadora}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CNPJ:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{formatarCNPJ(cnpj)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>1 - TOTAL DE RENDIMENTOS RECEBIDOS PELO AUTOR:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableAlvarasQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>2 - TOTAL DE IMPOSTO DE RENDA RETIDO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>3 - TOTAL DA CAUSA</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableAlvarasQuatro) + parseFloat(tableDarfQuatro))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>APURAÇÃO DOS RENDIMENTOS ISENTOS DE TRIBUTAÇÃO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>4 - RENDIMENTOS BRUTO HOMOLOGADO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(brutoHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>5 - RENDIMENTOS TRIBUTÁVEIS CALCULADOS NA MESMA DATA BASE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tributavelHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>6 - PROPORÇÃO DE RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}%</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>7 - TOTAL DE RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>8 - RENDIMENTOS SUJEITOS À TRIBUTAÇÃO NORMAL</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(rendTribQuatroAlvara)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>9 - TOTAL DE DESPESAS PAGAS COM ADVOGADO E PERITO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableHonorariosQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>10 - DESPESAS PAGAS AO ADVOGADO E PERITO, PROPORCIONAIS:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableTribHonorariosQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>VALORES ESPERADOS DA DECLARAÇÃO DE AJUSTE ANUAL DO IR</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>11 - RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(rendTribQuatroAlvara - tableTribHonorariosQuatro))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>12 - IMPOSTO DE RENDA RETIDO NA FONTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfQuatro)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>13 - MESES DISCUTIDOS NA AÇÃO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>
            {rendTribQuatroMes !== null ? (
              rendTribQuatroMes % 1 === 0
                ? rendTribQuatroMes.toLocaleString('pt-BR')
                : rendTribQuatroMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : ''}

          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>14 - INSS RECLAMANTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(INSS)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>15 - RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraQuatro)}</Text>
        </View>
      </View>
    </View>
  );

  const TableCinco = () => (
    <View style={styles.table}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "80%" }]}>
          <Text style={styles.tableCellHeader}>DEMONSTRATIVO DE APURAÇÃO DAS VERBAS TRIBUTÁVEIS REFERENTES À RECLAMAÇÃO TRABALHISTA</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>DIRPF</Text>
        </View>
        <View style={[styles.tableCol, { width: "20%" }]}>
          <Text style={styles.tableCellHeader}>{anoEquivalenteCinco}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO CONTRIBUINTE</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nome do Cliente:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{nomeUsuario}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CPF:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{cpf}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Data de Nascimento:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCellData}>{dataNascimento}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>DADOS DO PROCESSO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Nº Processo:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{processo}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Vara:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{vara}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Comarca:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{comarca}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>Fonte Pagadora:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{fontePagadora}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "25%" }]}>
          <Text style={styles.tableCellHeader}>CNPJ:</Text>
        </View>
        <View style={[styles.tableCol, { width: "75%" }]}>
          <Text style={styles.tableCell}>{formatarCNPJ(cnpj)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>1 - TOTAL DE RENDIMENTOS RECEBIDOS PELO AUTOR:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableAlvarasCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>2 - TOTAL DE IMPOSTO DE RENDA RETIDO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>3 - TOTAL DA CAUSA</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(tableAlvarasCinco) + parseFloat(tableDarfCinco))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>APURAÇÃO DOS RENDIMENTOS ISENTOS DE TRIBUTAÇÃO</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>4 - RENDIMENTOS BRUTO HOMOLOGADO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(brutoHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>5 - RENDIMENTOS TRIBUTÁVEIS CALCULADOS NA MESMA DATA BASE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tributavelHomologado)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>6 - PROPORÇÃO DE RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}%</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>7 - TOTAL DE RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>8 - RENDIMENTOS SUJEITOS À TRIBUTAÇÃO NORMAL</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(rendTribCincoAlvara)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>9 - TOTAL DE DESPESAS PAGAS COM ADVOGADO E PERITO:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableHonorariosCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>10 - DESPESAS PAGAS AO ADVOGADO E PERITO, PROPORCIONAIS:</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableTribHonorariosCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "100%" }]}>
          <Text style={styles.tableCellCenter}>VALORES ESPERADOS DA DECLARAÇÃO DE AJUSTE ANUAL DO IR</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>11 - RENDIMENTOS TRIBUTÁVEIS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(parseFloat(rendTribCincoAlvara - tableTribHonorariosCinco))}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>12 - IMPOSTO DE RENDA RETIDO NA FONTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableDarfCinco)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>13 - MESES DISCUTIDOS NA AÇÃO</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>
            {rendTribCincoMes !== null ? (
              rendTribCincoMes % 1 === 0
                ? rendTribCincoMes.toLocaleString('pt-BR')
                : rendTribCincoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : ''}
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>14 - INSS RECLAMANTE</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(INSS)}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableCol, { width: "65%" }]}>
          <Text style={styles.tableCellHeader}>15 - RENDIMENTOS ISENTOS</Text>
        </View>
        <View style={[styles.tableCol, { width: "35%" }]}>
          <Text style={styles.tableCell}>{formatCurrency(tableIsentoAlvaraCinco)}</Text>
        </View>
      </View>
    </View>
  );

  const EsclarecimentosUm = () => (
    <Page size="A4" style={stylesEsc.page}>
      <Image src={logo} style={stylesEsc.logo} />
      <View style={stylesEsc.header}>
        <Text style={stylesEsc.top}></Text>
        <Text style={stylesEsc.title}>ESCLARECIMENTOS SOBRE OS RENDIMENTOS RECEBIDOS ACUMULADAMENTE AO SETOR DE MALHA FISCAL DA RECEITA FEDERAL DO BRASIL</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionLeft}>DIRPF {anoEquivalenteUm}</Text>
        <Text style={stylesEsc.sectionTitle}>CONTRIBUINTE: {nomeUsuario}</Text>
        <Text style={stylesEsc.sectionTitle}>CPF: {cpf}</Text>
        <Text style={stylesEsc.sectionTitle}>DATA DE NASCIMENTO: {dataNascimento}</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>A) DADOS DA AÇÃO:</Text>
        <Text style={stylesEsc.text}>
          Trata-se de rendimento recebido de forma acumulada, referente a Ação Judicial Trabalhista, processo n.º {processo} que tramitou perante a {vara} de {comarca}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>B) VALORES E DATAS:</Text>
        <Text style={stylesEsc.text}>
          2) O valor total levantado pelo(a) contribuinte, referente ao exercício foi de {formatCurrency(tableAlvarasUm)};
        </Text>
        <Text style={stylesEsc.text}>
          3) O imposto de renda no valor total de {formatCurrency(tableDarfUm)}, foi retido, pelo(a) {fontePagadora} - CNPJ n.º {formatarCNPJ(cnpj)}, conforme documento(s) anexo(s).
        </Text>
        <Text style={stylesEsc.text}>
          4) O valor bruto da ação corresponde a soma entre o(s) alvará(s)/mandado(s) de levantamento e o imposto de renda retido, o que equivale, neste caso, ao valor de {formatCurrency(parseFloat(tableAlvarasUm) + parseFloat(tableDarfUm))};
        </Text>
        <Text style={stylesEsc.text}>
          5) O valor atualizado apurado de {formatCurrency(rendTribUmAlvara)}, referente ao(s) Rendimento(s) Tributável(is), equivale(m) a {parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}% do valor bruto da ação, conforme apurado em planilha anexa.
        </Text>
        <Text style={stylesEsc.text}>
          6) O valor total apurado de despesas dedutíveis¹ com a ação judicial, sobre a mesma proporção dos rendimentos tributáveis, nos exatos termos da Lei, foi de {formatCurrency(tableTribHonorariosUm)}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleDois}>CAMPOS E VALORES DECLARADOS NA FICHA DE RRA* DA DIRPF,</Text>
        <Text style={stylesEsc.sectionMidleDoisBar}>NA OPÇÃO DE TRIBUTAÇÃO EXCLUSIVA NA FONTE</Text>
      </View>


      <View style={stylesEsc.table}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>A) RENDIMENTOS TRIBUTÁVEIS RECEBIDOS:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(parseFloat(rendTribUmAlvara - tableTribHonorariosUm))}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>B) INSS RECLAMANTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(INSS)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>C) IMPOSTO DE RENDA RETIDO NA FONTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableDarfUm)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>D) Nº DE MESES DISCUTIDOS NA AÇÃO:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{rendTribUmMes !== null ? rendTribUmMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleTres}>FICHA DE RENDIMENTOS ISENTOS</Text>
      </View>

      <View style={stylesEsc.tableDois}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>RENDIMENTOS ISENTOS: </Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableIsentoAlvaraUm)}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidle}>Obs.:</Text>
        <Text style={stylesEsc.sectionMidle}>a) Os honorários pagos, foram lançados na ficha de pagamentos, em item próprio;</Text>
        <Text style={stylesEsc.sectionMidle}>b) O valor referente ao rendimento isento foi lançado na ficha de rendimentos isentos e não tributáveis, no item “OUTROS”,
          com a denominação de “Verbas Isentas Ação Judicial”, com os mesmos dados da Fonte Pagadora. </Text>
        <Text style={stylesEsc.topUm}></Text>
        <Text style={stylesEsc.sectionMidle}>1 Art. 12.A, §2º da Lei 7.713/88</Text>
      </View>

      <View style={stylesEsc.footer}>
        <Text style={stylesEsc.top}></Text>
        <Image src={logoIr360} style={stylesEsc.logo} />
      </View>
    </Page>
  );

  const EsclarecimentosDois = () => (
    <Page size="A4" style={stylesEsc.page}>
      <Image src={logo} style={stylesEsc.logo} />
      <View style={stylesEsc.header}>
        <Text style={stylesEsc.top}></Text>
        <Text style={stylesEsc.title}>ESCLARECIMENTOS SOBRE OS RENDIMENTOS RECEBIDOS ACUMULADAMENTE AO SETOR DE MALHA FISCAL DA RECEITA FEDERAL DO BRASIL</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionLeft}>DIRPF {anoEquivalenteDois}</Text>
        <Text style={stylesEsc.sectionTitle}>CONTRIBUINTE: {nomeUsuario}</Text>
        <Text style={stylesEsc.sectionTitle}>CPF: {cpf}</Text>
        <Text style={stylesEsc.sectionTitle}>DATA DE NASCIMENTO: {dataNascimento}</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>A) DADOS DA AÇÃO:</Text>
        <Text style={stylesEsc.text}>
          Trata-se de rendimento recebido de forma acumulada, referente a Ação Judicial Trabalhista, processo n.º {processo} que tramitou perante a {vara} de {comarca}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>B) VALORES E DATAS:</Text>
        <Text style={stylesEsc.text}>
          2) O valor total levantado pelo(a) contribuinte, referente ao exercício foi de {formatCurrency(tableAlvarasDois)};
        </Text>
        <Text style={stylesEsc.text}>
          3) O imposto de renda no valor total de {formatCurrency(tableDarfDois)}, foi retido, pelo(a) {fontePagadora} - CNPJ n.º {formatarCNPJ(cnpj)}, conforme documento(s) anexo(s).
        </Text>
        <Text style={stylesEsc.text}>
          4) O valor bruto da ação corresponde a soma entre o(s) alvará(s)/mandado(s) de levantamento e o imposto de renda retido, o que equivale, neste caso, ao valor de {formatCurrency(parseFloat(tableAlvarasDois) + parseFloat(tableDarfDois))};
        </Text>
        <Text style={stylesEsc.text}>
          5) O valor atualizado apurado de {formatCurrency(rendTribDoisAlvara)}, referente ao(s) Rendimento(s) Tributável(is), equivale(m) a {parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}% do valor bruto da ação, conforme apurado em planilha anexa.
        </Text>
        <Text style={stylesEsc.text}>
          6) O valor total apurado de despesas dedutíveis¹ com a ação judicial, sobre a mesma proporção dos rendimentos tributáveis, nos exatos termos da Lei, foi de {formatCurrency(tableTribHonorariosDois)}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleDois}>CAMPOS E VALORES DECLARADOS NA FICHA DE RRA* DA DIRPF,</Text>
        <Text style={stylesEsc.sectionMidleDoisBar}>NA OPÇÃO DE TRIBUTAÇÃO EXCLUSIVA NA FONTE</Text>
      </View>


      <View style={stylesEsc.table}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>A) RENDIMENTOS TRIBUTÁVEIS RECEBIDOS:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(parseFloat(rendTribDoisAlvara - tableTribHonorariosDois))}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>B) INSS RECLAMANTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(INSS)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>C) IMPOSTO DE RENDA RETIDO NA FONTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableDarfDois)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>D) Nº DE MESES DISCUTIDOS NA AÇÃO:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{rendTribDoisMes !== null ? rendTribDoisMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleTres}>FICHA DE RENDIMENTOS ISENTOS</Text>
      </View>

      <View style={stylesEsc.tableDois}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>RENDIMENTOS ISENTOS: </Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableIsentoAlvaraDois)}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidle}>Obs.:</Text>
        <Text style={stylesEsc.sectionMidle}>a) Os honorários pagos, foram lançados na ficha de pagamentos, em item próprio;</Text>
        <Text style={stylesEsc.sectionMidle}>b) O valor referente ao rendimento isento foi lançado na ficha de rendimentos isentos e não tributáveis, no item “OUTROS”,
          com a denominação de “Verbas Isentas Ação Judicial”, com os mesmos dados da Fonte Pagadora. </Text>
        <Text style={stylesEsc.topDois}></Text>
        <Text style={stylesEsc.sectionMidle}>1 Art. 12.A, §2º da Lei 7.713/88</Text>
      </View>

      <View style={stylesEsc.footer}>
        <Text style={stylesEsc.top}></Text>
        <Image src={logoIr360} style={stylesEsc.logo} />
      </View>
    </Page>
  );

  const EsclarecimentosTres = () => (
    <Page size="A4" style={stylesEsc.page}>
      <Image src={logo} style={stylesEsc.logo} />
      <View style={stylesEsc.header}>
        <Text style={stylesEsc.top}></Text>
        <Text style={stylesEsc.title}>ESCLARECIMENTOS SOBRE OS RENDIMENTOS RECEBIDOS ACUMULADAMENTE AO SETOR DE MALHA FISCAL DA RECEITA FEDERAL DO BRASIL</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionLeft}>DIRPF {anoEquivalenteTres}</Text>
        <Text style={stylesEsc.sectionTitle}>CONTRIBUINTE: {nomeUsuario}</Text>
        <Text style={stylesEsc.sectionTitle}>CPF: {cpf}</Text>
        <Text style={stylesEsc.sectionTitle}>DATA DE NASCIMENTO: {dataNascimento}</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>A) DADOS DA AÇÃO:</Text>
        <Text style={stylesEsc.text}>
          Trata-se de rendimento recebido de forma acumulada, referente a Ação Judicial Trabalhista, processo n.º {processo} que tramitou perante a {vara} de {comarca}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>B) VALORES E DATAS:</Text>
        <Text style={stylesEsc.text}>
          2) O valor total levantado pelo(a) contribuinte, referente ao exercício foi de {formatCurrency(tableAlvarasTres)};
        </Text>
        <Text style={stylesEsc.text}>
          3) O imposto de renda no valor total de {formatCurrency(tableDarfTres)}, foi retido, pelo(a) {fontePagadora} - CNPJ n.º {formatarCNPJ(cnpj)}, conforme documento(s) anexo(s).
        </Text>
        <Text style={stylesEsc.text}>
          4) O valor bruto da ação corresponde a soma entre o(s) alvará(s)/mandado(s) de levantamento e o imposto de renda retido, o que equivale, neste caso, ao valor de {formatCurrency(parseFloat(tableAlvarasTres) + parseFloat(tableDarfTres))};
        </Text>
        <Text style={stylesEsc.text}>
          5) O valor atualizado apurado de {formatCurrency(rendTribTresAlvara)}, referente ao(s) Rendimento(s) Tributável(is), equivale(m) a {parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}% do valor bruto da ação, conforme apurado em planilha anexa.
        </Text>
        <Text style={stylesEsc.text}>
          6) O valor total apurado de despesas dedutíveis¹ com a ação judicial, sobre a mesma proporção dos rendimentos tributáveis, nos exatos termos da Lei, foi de {formatCurrency(tableTribHonorariosTres)}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleDois}>CAMPOS E VALORES DECLARADOS NA FICHA DE RRA* DA DIRPF,</Text>
        <Text style={stylesEsc.sectionMidleDoisBar}>NA OPÇÃO DE TRIBUTAÇÃO EXCLUSIVA NA FONTE</Text>
      </View>


      <View style={stylesEsc.table}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>A) RENDIMENTOS TRIBUTÁVEIS RECEBIDOS:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(parseFloat(rendTribTresAlvara - tableTribHonorariosTres))}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>B) INSS RECLAMANTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(INSS)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>C) IMPOSTO DE RENDA RETIDO NA FONTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableDarfTres)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>D) Nº DE MESES DISCUTIDOS NA AÇÃO:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{rendTribTresMes !== null ? rendTribTresMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleTres}>FICHA DE RENDIMENTOS ISENTOS</Text>
      </View>

      <View style={stylesEsc.tableDois}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>RENDIMENTOS ISENTOS: </Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableIsentoAlvaraTres)}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidle}>Obs.:</Text>
        <Text style={stylesEsc.sectionMidle}>a) Os honorários pagos, foram lançados na ficha de pagamentos, em item próprio;</Text>
        <Text style={stylesEsc.sectionMidle}>b) O valor referente ao rendimento isento foi lançado na ficha de rendimentos isentos e não tributáveis, no item “OUTROS”,
          com a denominação de “Verbas Isentas Ação Judicial”, com os mesmos dados da Fonte Pagadora. </Text>
        <Text style={stylesEsc.topTres}></Text>
        <Text style={stylesEsc.sectionMidle}>1 Art. 12.A, §2º da Lei 7.713/88</Text>
      </View>

      <View style={stylesEsc.footer}>
        <Text style={stylesEsc.top}></Text>
        <Image src={logoIr360} style={stylesEsc.logo} />
      </View>
    </Page>
  );

  const EsclarecimentosQuatro = () => (
    <Page size="A4" style={stylesEsc.page}>
      <Image src={logo} style={stylesEsc.logo} />
      <View style={stylesEsc.header}>
        <Text style={stylesEsc.top}></Text>
        <Text style={stylesEsc.title}>ESCLARECIMENTOS SOBRE OS RENDIMENTOS RECEBIDOS ACUMULADAMENTE AO SETOR DE MALHA FISCAL DA RECEITA FEDERAL DO BRASIL</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionLeft}>DIRPF {anoEquivalenteQuatro}</Text>
        <Text style={stylesEsc.sectionTitle}>CONTRIBUINTE: {nomeUsuario}</Text>
        <Text style={stylesEsc.sectionTitle}>CPF: {cpf}</Text>
        <Text style={stylesEsc.sectionTitle}>DATA DE NASCIMENTO: {dataNascimento}</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>A) DADOS DA AÇÃO:</Text>
        <Text style={stylesEsc.text}>
          Trata-se de rendimento recebido de forma acumulada, referente a Ação Judicial Trabalhista, processo n.º {processo} que tramitou perante a {vara} de {comarca}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>B) VALORES E DATAS:</Text>
        <Text style={stylesEsc.text}>
          2) O valor total levantado pelo(a) contribuinte, referente ao exercício foi de {formatCurrency(tableAlvarasQuatro)};
        </Text>
        <Text style={stylesEsc.text}>
          3) O imposto de renda no valor total de {formatCurrency(tableDarfQuatro)}, foi retido, pelo(a) {fontePagadora} - CNPJ n.º {formatarCNPJ(cnpj)}, conforme documento(s) anexo(s).
        </Text>
        <Text style={stylesEsc.text}>
          4) O valor bruto da ação corresponde a soma entre o(s) alvará(s)/mandado(s) de levantamento e o imposto de renda retido, o que equivale, neste caso, ao valor de {formatCurrency(parseFloat(tableAlvarasQuatro) + parseFloat(tableDarfQuatro))};
        </Text>
        <Text style={stylesEsc.text}>
          5) O valor atualizado apurado de {formatCurrency(rendTribQuatroAlvara)}, referente ao(s) Rendimento(s) Tributável(is), equivale(m) a {parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}% do valor bruto da ação, conforme apurado em planilha anexa.
        </Text>
        <Text style={stylesEsc.text}>
          6) O valor total apurado de despesas dedutíveis¹ com a ação judicial, sobre a mesma proporção dos rendimentos tributáveis, nos exatos termos da Lei, foi de {formatCurrency(tableTribHonorariosQuatro)}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleDois}>CAMPOS E VALORES DECLARADOS NA FICHA DE RRA* DA DIRPF,</Text>
        <Text style={stylesEsc.sectionMidleDoisBar}>NA OPÇÃO DE TRIBUTAÇÃO EXCLUSIVA NA FONTE</Text>
      </View>


      <View style={stylesEsc.table}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>A) RENDIMENTOS TRIBUTÁVEIS RECEBIDOS:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(parseFloat(rendTribQuatroAlvara - tableTribHonorariosQuatro))}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>B) INSS RECLAMANTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(INSS)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>C) IMPOSTO DE RENDA RETIDO NA FONTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableDarfQuatro)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>D) Nº DE MESES DISCUTIDOS NA AÇÃO:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{rendTribQuatroMes !== null ? rendTribQuatroMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleQuatro}>FICHA DE RENDIMENTOS ISENTOS</Text>
      </View>

      <View style={stylesEsc.tableDois}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>RENDIMENTOS ISENTOS: </Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableIsentoAlvaraQuatro)}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidle}>Obs.:</Text>
        <Text style={stylesEsc.sectionMidle}>a) Os honorários pagos, foram lançados na ficha de pagamentos, em item próprio;</Text>
        <Text style={stylesEsc.sectionMidle}>b) O valor referente ao rendimento isento foi lançado na ficha de rendimentos isentos e não tributáveis, no item “OUTROS”,
          com a denominação de “Verbas Isentas Ação Judicial”, com os mesmos dados da Fonte Pagadora. </Text>
        <Text style={stylesEsc.topQuatro}></Text>
        <Text style={stylesEsc.sectionMidle}>1 Art. 12.A, §2º da Lei 7.713/88</Text>
      </View>

      <View style={stylesEsc.footer}>
        <Text style={stylesEsc.top}></Text>
        <Image src={logoIr360} style={stylesEsc.logo} />
      </View>
    </Page>
  );

  const EsclarecimentosCinco = () => (
    <Page size="A4" style={stylesEsc.page}>
      <Image src={logo} style={stylesEsc.logo} />
      <View style={stylesEsc.header}>
        <Text style={stylesEsc.top}></Text>
        <Text style={stylesEsc.title}>ESCLARECIMENTOS SOBRE OS RENDIMENTOS RECEBIDOS ACUMULADAMENTE AO SETOR DE MALHA FISCAL DA RECEITA FEDERAL DO BRASIL</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionLeft}>DIRPF {anoEquivalenteCinco}</Text>
        <Text style={stylesEsc.sectionTitle}>CONTRIBUINTE: {nomeUsuario}</Text>
        <Text style={stylesEsc.sectionTitle}>CPF: {cpf}</Text>
        <Text style={stylesEsc.sectionTitle}>DATA DE NASCIMENTO: {dataNascimento}</Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>A) DADOS DA AÇÃO:</Text>
        <Text style={stylesEsc.text}>
          Trata-se de rendimento recebido de forma acumulada, referente a Ação Judicial Trabalhista, processo n.º {processo} que tramitou perante a {vara} de {comarca}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionTitle}>B) VALORES E DATAS:</Text>
        <Text style={stylesEsc.text}>
          2) O valor total levantado pelo(a) contribuinte, referente ao exercício foi de {formatCurrency(tableAlvarasCinco)};
        </Text>
        <Text style={stylesEsc.text}>
          3) O imposto de renda no valor total de {formatCurrency(tableDarfCinco)}, foi retido, pelo(a) {fontePagadora} - CNPJ n.º {formatarCNPJ(cnpj)}, conforme documento(s) anexo(s).
        </Text>
        <Text style={stylesEsc.text}>
          4) O valor bruto da ação corresponde a soma entre o(s) alvará(s)/mandado(s) de levantamento e o imposto de renda retido, o que equivale, neste caso, ao valor de {formatCurrency(parseFloat(tableAlvarasCinco) + parseFloat(tableDarfCinco))};
        </Text>
        <Text style={stylesEsc.text}>
          5) O valor atualizado apurado de {formatCurrency(rendTribCincoAlvara)}, referente ao(s) Rendimento(s) Tributável(is), equivale(m) a {parseFloat((tributavelHomologado / brutoHomologado) * 100) !== null ? parseFloat((tributavelHomologado / brutoHomologado) * 100).toFixed(2) : ''}% do valor bruto da ação, conforme apurado em planilha anexa.
        </Text>
        <Text style={stylesEsc.text}>
          6) O valor total apurado de despesas dedutíveis¹ com a ação judicial, sobre a mesma proporção dos rendimentos tributáveis, nos exatos termos da Lei, foi de {formatCurrency(tableTribHonorariosCinco)}.
        </Text>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleDois}>CAMPOS E VALORES DECLARADOS NA FICHA DE RRA* DA DIRPF,</Text>
        <Text style={stylesEsc.sectionMidleDoisBar}>NA OPÇÃO DE TRIBUTAÇÃO EXCLUSIVA NA FONTE</Text>
      </View>


      <View style={stylesEsc.table}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>A) RENDIMENTOS TRIBUTÁVEIS RECEBIDOS:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(parseFloat(rendTribCincoAlvara - tableTribHonorariosCinco))}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>B) INSS RECLAMANTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(INSS)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>C) IMPOSTO DE RENDA RETIDO NA FONTE:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableDarfCinco)}</Text>
          </View>
        </View>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>D) Nº DE MESES DISCUTIDOS NA AÇÃO:</Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{rendTribCincoMes !== null ? rendTribCincoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidleCinco}>FICHA DE RENDIMENTOS ISENTOS</Text>
      </View>

      <View style={stylesEsc.tableDois}>
        <View style={stylesEsc.tableRow}>
          <View style={stylesEsc.tableColHeader}>
            <Text style={stylesEsc.tableCell}>RENDIMENTOS ISENTOS: </Text>
          </View>
          <View style={stylesEsc.tableCol}>
            <Text style={stylesEsc.tableCellNum}>{formatCurrency(tableIsentoAlvaraCinco)}</Text>
          </View>
        </View>
      </View>

      <View style={stylesEsc.section}>
        <Text style={stylesEsc.sectionMidle}>Obs.:</Text>
        <Text style={stylesEsc.sectionMidle}>a) Os honorários pagos, foram lançados na ficha de pagamentos, em item próprio;</Text>
        <Text style={stylesEsc.sectionMidle}>b) O valor referente ao rendimento isento foi lançado na ficha de rendimentos isentos e não tributáveis, no item “OUTROS”,
          com a denominação de “Verbas Isentas Ação Judicial”, com os mesmos dados da Fonte Pagadora. </Text>
        <Text style={stylesEsc.topCinco}></Text>
        <Text style={stylesEsc.sectionMidle}>1 Art. 12.A, §2º da Lei 7.713/88</Text>
      </View>

      <View style={stylesEsc.footer}>
        <Text style={stylesEsc.top}></Text>
        <Image src={logoIr360} style={stylesEsc.logo} />
      </View>
    </Page>
  );


  const exp = useRef(null);

  const [calcDuvida, setCalcDuvida] = useState(0);

  useEffect(() => {
    if (calcDuvida >= 1 && calcDuvida <= 10) {
      exp.current.style.display = "block";
    }
    else {
      exp.current.style.display = "none";
    }
  }, [calcDuvida]); // Adicione calcDuvida como dependência

  function DescTexto() {
    if (calcDuvida === 1) {
      return (
        <div className="">
          Se os valores recebidos e o(s) Imposto(s) foi(ram) retido(s) no mesmo ano. É muito comum receber o valor parcial (incontroverso) em um ano, depois em ano subsequente receber o saldo e o imposto ser retido posteriormente.
        </div>
      )
    }
    if (calcDuvida === 2) {
      return (
        <div className="">
          Coloque no seguinte formato: 0000000-00.0000.0.00.0000
        </div>
      )
    }
    if (calcDuvida === 3) {
      return (
        <div className="">
          Texto Livre, podendo colocar número e texto.
        </div>
      )
    }
    if (calcDuvida === 4) {
      return (
        <div className="">
          Texto Livre, podendo colocar número e texto.
        </div>
      )
    }
    if (calcDuvida === 5) {
      return (
        <div className="">
          Este valor consta no Cálculo Homologado pelo Juiz. Normalmente é a somatória do Valor Líquido + Valor do Imposto de Renda + Valor do INSS do Reclamante. Se houver outros valores, desconsidere na somatória ou deduza-os do total.
        </div>
      )
    }
    if (calcDuvida === 6) {
      return (
        <div className="">
          Este valor sempre Pode ser encontrado em anexos do Cálculo Homologado pelo juiz. Normalmente está sempre como anexo ou pagina exclusiva para cálculo do Imposto de renda
        </div>
      )
    }
    if (calcDuvida === 7) {
      return (
        <div className="">
          O Número de meses está sempre no anexo ou na ficha de rendimento tributável, quando da apuração do Imposto a ser retido no processo. Se não constar, contar os meses que estão incluídos no cálculo, ou seja, considerando a data de início até o ultimo mês utilizado na planilha de cálculo.
        </div>
      )
    }
    if (calcDuvida === 8) {
      return (
        <div className="">
          Aqui deve ser informado quantas vezes seu advogado levantou valores em seu nome ou se o seu pagamento foi realizado em parcelas. Importante preencher o valor e a data de cada um(a).
        </div>
      )
    }
    if (calcDuvida === 9) {
      return (
        <div className="">
          Informar quantos DARF´s, ou seja, quantos imposto de renda foram recolhidos. Importante preencher o valor e a data de cada um(a).
        </div>
      )
    }
    if (calcDuvida === 10) {
      return (
        <div className="">
          informar todos os pagamentos realizados ao seu advogado e do perito, se você arcou com esse pagamento. Importante preencher o valor e a data de cada um(a).
        </div>
      )
    }
    return null; // Retorne null quando calcDuvida não for 1 ou 2
  }

  useEffect(() => {
    if (checkedCount === 0) {
      setRendTrib1(parseFloat(rendTribUmAlvara) - parseFloat(rendTribUmHonorarios))
      setRendTrib2(parseFloat(rendTribDoisAlvara) - parseFloat(rendTribDoisHonorarios))
      setRendTrib3(parseFloat(rendTribTresAlvara) - parseFloat(rendTribTresHonorarios))
      setRendTrib4(parseFloat(rendTribQuatroAlvara) - parseFloat(rendTribQuatroHonorarios))
      setRendTrib5(parseFloat(rendTribCincoAlvara) - parseFloat(rendTribCincoHonorarios))
      setRendTrib6(parseFloat(rendTribSeisAlvara) - parseFloat(rendTribSeisHonorarios))
      setRendTrib7(parseFloat(rendTribSeteAlvara) - parseFloat(rendTribSeteHonorarios))
      setRendTrib8(parseFloat(rendTribOitoAlvara) - parseFloat(rendTribOitoHonorarios))
      setRendTrib9(parseFloat(rendTribNoveAlvara) - parseFloat(rendTribNoveHonorarios))
      setRendTrib10(parseFloat(rendTribDezAlvara) - parseFloat(rendTribDezHonorarios))
    } else if (checkedCount === 1) {
      setRendTrib1(parseFloat(rendTribUmAlvara) - parseFloat(tableTribHonorariosUm))
      setRendTrib2(null)
      setRendTrib3(null)
      setRendTrib4(null)
      setRendTrib5(null)
      setRendTrib6(null)
      setRendTrib7(null)
      setRendTrib8(null)
      setRendTrib9(null)
      setRendTrib10(null)
    }
  }, [checkedCount, rendTribCincoAlvara, rendTribCincoHonorarios, rendTribDezAlvara, rendTribDezHonorarios, rendTribDoisAlvara, rendTribDoisHonorarios, rendTribNoveAlvara, rendTribNoveHonorarios, rendTribOitoAlvara, rendTribOitoHonorarios, rendTribQuatroAlvara, rendTribQuatroHonorarios, rendTribSeisAlvara, rendTribSeisHonorarios, rendTribSeteAlvara, rendTribSeteHonorarios, rendTribTresAlvara, rendTribTresHonorarios, rendTribUmAlvara, rendTribUmHonorarios, tableTribHonorariosUm])

  useEffect(() => {
    setValorCalculos(prevValorCalculos => ({
      ...prevValorCalculos,
      somaDarf: somaDarf,
      somaAlvara: somaAlvara,
      numeroDeMeses: numeroDeMeses,
      brutoHomologado: brutoHomologado,
      tributavelHomologado: tributavelHomologado,
      rendTribUm: rendTrib1,
      rendTribDois: rendTrib2,
      rendTribTres: rendTrib3,
      rendTribQuatro: rendTrib4,
      rendTribCinco: rendTrib5,
      rendTribSeis: rendTrib6,
      rendTribSete: rendTrib7,
      rendTribOito: rendTrib8,
      rendTribNove: rendTrib9,
      rendTribDez: rendTrib10,
      irrfUm: rendTribUmDarf,
      irrfDois: rendTribDoisDarf,
      irrfTres: rendTribTresDarf,
      irrfQuatro: rendTribQuatroDarf,
      irrfCinco: rendTribCincoDarf,
      irrfSeis: rendTribSeisDarf,
      irrfSete: rendTribSeteDarf,
      irrfOito: rendTribOitoDarf,
      irrfNove: rendTribNoveDarf,
      irrfDez: rendTribDezDarf,
      irpfUm: IrpfUm,
      irpfDois: IrpfDois,
      irpfTres: IrpfTres,
      irpfQuatro: IrpfQuatro,
      irpfCinco: IrpfCinco,
      irpfSeis: IrpfSeis,
      irpfSete: IrpfSete,
      irpfOito: IrpfOito,
      irpfNove: IrpfNove,
      irpfDez: IrpfDez,
      selicUm: selicUm,
      selicDois: selicDois,
      selicTres: selicTres,
      selicQuatro: selicQuatro,
      selicCinco: selicCinco,
      finalUmCorrigido: finalUmCorrigido,
      finalDoisCorrigido: finalDoisCorrigido,
      finalTresCorrigido: finalTresCorrigido,
      finalQuatroCorrigido: finalQuatroCorrigido,
      finalCincoCorrigido: finalCincoCorrigido,
    }));
  }, [somaDarf, somaAlvara, numeroDeMeses, brutoHomologado, tributavelHomologado, rendTribUmAlvara, rendTribUmHonorarios, rendTribDoisAlvara, rendTribDoisHonorarios, rendTribTresAlvara, rendTribTresHonorarios, rendTribQuatroAlvara, rendTribQuatroHonorarios, rendTribCincoAlvara, rendTribCincoHonorarios, rendTribSeisAlvara, rendTribSeisHonorarios, rendTribSeteAlvara, rendTribSeteHonorarios, rendTribOitoAlvara, rendTribOitoHonorarios, rendTribNoveAlvara, rendTribNoveHonorarios, rendTribDezAlvara, rendTribDezHonorarios, rendTribUmDarf, rendTribDoisDarf, rendTribTresDarf, rendTribQuatroDarf, rendTribCincoDarf, rendTribSeisDarf, rendTribSeteDarf, rendTribOitoDarf, rendTribNoveDarf, rendTribDezDarf, IrpfUm, IrpfDois, IrpfTres, IrpfQuatro, IrpfCinco, IrpfSeis, IrpfSete, IrpfOito, IrpfNove, IrpfDez, selicUm, selicDois, selicTres, selicQuatro, selicCinco, finalUmCorrigido, finalDoisCorrigido, finalTresCorrigido, finalQuatroCorrigido, finalCincoCorrigido, rendTrib1, rendTrib2, rendTrib3, rendTrib4, rendTrib5, rendTrib6, rendTrib7, rendTrib8, rendTrib9, rendTrib10]);

  const formatCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
  };

  const handleChangeCPF = (event) => {
    const formattedCPF = formatCPF(event.target.value);
    if (formattedCPF.length <= 14) {
      setCpf(formattedCPF);
      if (validarCPF(formattedCPF)) {
        setCpfErro('');
      } else {
        setCpfErro('CPF inválido');
      }
    }
  };

  const formatProcesso = (valor) => {
    // Remove caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Aplica a máscara
    valor = valor.replace(/^(\d{7})(\d)/, '$1-$2');
    valor = valor.replace(/^(\d{7})-(\d{2})(\d)/, '$1-$2.$3');
    valor = valor.replace(/^(\d{7})-(\d{2})\.(\d{4})(\d)/, '$1-$2.$3.$4');
    valor = valor.replace(/^(\d{7})-(\d{2})\.(\d{4})\.(\d)(\d{2})(\d{4})/, '$1-$2.$3.$4.$5.$6');

    return valor;
  };

  const handleValorChangeProcesso = (event, setFunc) => {
    const formattedValue = formatProcesso(event.target.value);
    if (formattedValue.length <= 25) {
      setFunc(formattedValue);
    }
  };

  const capitalizeWords = (string) => {
    return string
      .split(' ')
      .map((word, index) => {
        if (index > 0 && (word.toLowerCase() === 'de' || word.toLowerCase() === 'do')) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };






  const apiUrl = 'https://erestituicaoapi-a4b405e4e1ad.herokuapp.com/users/';

  const handleEnvioDados = async (e) => {
    if (e) e.preventDefault();

    if (
      nomeUsuario === "" ||
      telefone === "" ||
      email === "" ||
      cpf === "" ||
      dataNascimento === "" ||
      processo === "" ||
      vara === "" ||
      comarca === "" /* ||
      fontePagadora === "" ||
      cnpjErro === "" ||
      fontePagadora === "" ||
      cnpj === "" ||
      brutoHomologado === null ||
      tributavelHomologado === null ||
      numeroDeMeses === null */
    ) {
      Calcular();
      console.log('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        paymentDiv.current.style.display = "flex";
        envCalcs.current.style.display = "none";
      }, 2000);

      const pdfURLs = await gerarEArmazenarPDFs();

      let links = {
        linkPdf1: null,
        linkPdf2: null,
        linkPdf3: null,
        linkPdf4: null,
        linkPdf5: null,
        link2Pdf1: null,
        link2Pdf2: null,
        link2Pdf3: null,
        link2Pdf4: null,
        link2Pdf5: null
      };

      // Define os links de acordo com o ano equivalente
      if (anoEquivalenteCinco !== null) {
        links = {
          linkPdf1: pdfURLs[0],
          linkPdf2: pdfURLs[1],
          linkPdf3: pdfURLs[2],
          linkPdf4: pdfURLs[3],
          linkPdf5: pdfURLs[4],
          link2Pdf1: pdfURLs[5],
          link2Pdf2: pdfURLs[6],
          link2Pdf3: pdfURLs[7],
          link2Pdf4: pdfURLs[8],
          link2Pdf5: pdfURLs[9]
        };
      } else if (anoEquivalenteQuatro !== null) {
        links = {
          linkPdf1: pdfURLs[0],
          linkPdf2: pdfURLs[1],
          linkPdf3: pdfURLs[2],
          linkPdf4: pdfURLs[3],
          linkPdf5: null,
          link2Pdf1: pdfURLs[5],
          link2Pdf2: pdfURLs[6],
          link2Pdf3: pdfURLs[7],
          link2Pdf4: pdfURLs[8],
          link2Pdf5: null
        };
      } else if (anoEquivalenteTres !== null) {
        links = {
          linkPdf1: pdfURLs[0],
          linkPdf2: pdfURLs[1],
          linkPdf3: pdfURLs[2],
          linkPdf4: null,
          linkPdf5: null,
          link2Pdf1: pdfURLs[5],
          link2Pdf2: pdfURLs[6],
          link2Pdf3: pdfURLs[7],
          link2Pdf4: null,
          link2Pdf5: null
        };
      } else if (anoEquivalenteDois !== null) {
        links = {
          linkPdf1: pdfURLs[0],
          linkPdf2: pdfURLs[1],
          linkPdf3: null,
          linkPdf4: null,
          linkPdf5: null,
          link2Pdf1: pdfURLs[5],
          link2Pdf2: pdfURLs[6],
          link2Pdf3: null,
          link2Pdf4: null,
          link2Pdf5: null
        };
      } else if (anoEquivalenteUm !== null) {
        links = {
          linkPdf1: pdfURLs[0],
          linkPdf2: null,
          linkPdf3: null,
          linkPdf4: null,
          linkPdf5: null,
          link2Pdf1: pdfURLs[5],
          link2Pdf2: null,
          link2Pdf3: null,
          link2Pdf4: null,
          link2Pdf5: null
        };
      }

      setLinkPdf1(links.linkPdf1);
      setLinkPdf2(links.linkPdf2);
      setLinkPdf3(links.linkPdf3);
      setLinkPdf4(links.linkPdf4);
      setLinkPdf5(links.linkPdf5);
      setLink2Pdf1(links.link2Pdf1);
      setLink2Pdf2(links.link2Pdf2);
      setLink2Pdf3(links.link2Pdf3);
      setLink2Pdf4(links.link2Pdf4);
      setLink2Pdf5(links.link2Pdf5);

      const updatedPdfData = {
        pdfData1: links.linkPdf1,
        pdfData2: links.linkPdf2,
        pdfData3: links.linkPdf3,
        pdfData4: links.linkPdf4,
        pdfData5: links.linkPdf5,
        pdfEsc1: links.link2Pdf1,
        pdfEsc2: links.link2Pdf2,
        pdfEsc3: links.link2Pdf3,
        pdfEsc4: links.link2Pdf4,
        pdfEsc5: links.link2Pdf5
      };

      setPdfData(updatedPdfData);

      const newProcess = {
        paymentData,
        timestamp: new Date().toISOString(),
        userData,
        processData,
        valueData,
        valorCalculos,
        pdfData: updatedPdfData
      };

      const response = await axios.post(apiUrl, newProcess);
      console.log('Usuário criado:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados do usuário:', error);
    }
  };

  // Função para realizar o PUT e atualizar a assinatura
  const atualizarPlano = async (novoPlano) => {
    try {
      const objectId = paymentData.idApp;  // Ensure this is valid and correct

      const response = await axios.put(`${apiUrl}${objectId}`, {
        paymentData: {
          idApp: stateId,
          assinatura: novoPlano
        }
      });
      console.log('Assinatura atualizada:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erro ao atualizar assinatura:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Cabeçalhos:', error.response.headers);
      } else if (error.request) {
        console.error('Erro ao atualizar assinatura (sem resposta):', error.request);
      } else {
        console.error('Erro ao atualizar assinatura:', error.message);
      }
    }
  };


  useEffect(() => {
    if (paymentCompletedUm && !paymentCompletedDois && !paymentCompletedTres) {
      setPlano("Starter");
      atualizarPlano("Starter");
    } else if (paymentCompletedDois && !paymentCompletedUm && !paymentCompletedTres) {
      setPlano("Builder");
      atualizarPlano("Builder");
    } else if (paymentCompletedDois && paymentCompletedUm && !paymentCompletedTres) {
      setPlano("Builder");
      atualizarPlano("Builder");
    } else if (paymentCompletedTres && !paymentCompletedUm && !paymentCompletedDois) {
      setPlano("Specialist");
      atualizarPlano("Specialist");
    } else if (paymentCompletedTres && !paymentCompletedUm && paymentCompletedDois) {
      setPlano("Specialist");
      atualizarPlano("Specialist");
    } else if (paymentCompletedTres && paymentCompletedUm && paymentCompletedDois) {
      setPlano("Specialist");
      atualizarPlano("Specialist");
    }
  }, [paymentCompletedUm, paymentCompletedDois, paymentCompletedTres]);


  const handleEnviarDados = () => {
    handleEnvioDados();
  };




  return (
    <div className="App">
      <div ref={exp} id="description" className="description">
        <DescTexto />
      </div>
      <img className="logo" src={logo} alt="" />
      <div className="env-infos">
        <div ref={envCalcs} className="env-format">
          <div className="h2">
            <h2>Descubra o quanto você pode recuperar de imposto</h2>
          </div>
          <div className="p">
            <p>
              LEVANTAMENTO E IMPOSTO RETIDO
              <FaRegQuestionCircle
                onMouseEnter={() => setCalcDuvida(1)}
                onMouseLeave={() => setCalcDuvida(0)}
                style={{ marginLeft: '5px', cursor: 'pointer' }}
              />
            </p>
          </div>
          <div className="env-checks">
            <div className="env-radio">
              <label className="radio">
                <input
                  type="radio"
                  name="option"
                  checked={checkedA}
                  onChange={() => handleCheckboxChange('A')}
                  style={{ display: 'none' }} // Hide the original radio input
                />
                <span className="check"></span>
                <div className="text-radio">ANOS DIFERENTES</div>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="option"
                  id="sameYear"
                  checked={checkedB}
                  onChange={() => handleCheckboxChange('B')}
                  style={{ display: 'none' }} // Hide the original radio input
                />
                <span className="check"></span>
                <div className="text-radio">MESMO ANO</div>
              </label>
            </div>
          </div>
          <div className="inputs-text">
            <div className="env-inputs">
              <div className="inputs-dados">
                <p>Nome Completo: <div className="erro">{nomeErro}</div></p>
                <input
                  id="nomecompleto"
                  name="name"
                  onChange={(event) => {
                    handleTextChange(event, setNomeUsuario);
                    handleChange(event);
                  }}
                  type="text"
                  value={nomeUsuario}
                  required
                />
              </div>
              <div className="inputs-dados">
                <p>Email: <div className="erro">{emailErro}</div></p>
                <input
                  id="email"
                  name="email"
                  onChange={(event) => {
                    handleTextChange(event, setEmail);
                    handleChange(event);
                  }}
                  type="email"
                  value={email}
                  required
                />
              </div>
              <div className="inputs-dados">
                <p>N.º telefone: <div className="erro">{telefoneErro}</div></p>
                <input
                  id="fone"
                  name="phone"
                  onChange={(event) => {
                    handlePhoneNumberChange(event, setTelefone);
                    handleChange(event);
                  }}
                  type="text"
                  value={telefone}
                  required
                />
              </div>
              <div className="inputs-dados">
                <p>CPF: <div className="erro">{cpfErro}</div></p>
                <input
                  id="cpf"
                  name="cpf"
                  onChange={handleChangeCPF}
                  type="text"
                  value={cpf}
                  required
                />
              </div>
              <div className="inputs-dados">
                <p>Data de Nascimento: <div className="erro">{dataNascimentoErro}</div></p>
                <input
                  id="borndate"
                  type="text"
                  value={dataNascimento}
                  onChange={(event) => handleDataChange(event, setDataNascimento)}
                />
              </div>
              <div className="inputs-dados">
                <p>
                  Nº Processo:
                  <div className="erro">{processoErro}</div>
                </p>
                <input
                  id="processo"
                  onChange={(event) => handleValorChangeProcesso(event, setProcesso)}
                  type="text"
                  value={processo}
                />
              </div>
              <div className="inputs-dados">
                <p>
                  Vara:
                  <div className="erro">{varaErro}</div></p>
                <input
                  id="vara"
                  onChange={(event) => handleTextChange(event, setVara)}
                  type="text"
                  value={vara}
                />
              </div>
              <div className="inputs-dados">
                <p>Comarca:
                  <div className="erro">{comarcaErro}</div>
                </p>
                <input
                  id="comarca"
                  name="comarca"
                  onChange={(event) => {
                    const { value } = event.target;
                    const formattedValue = capitalizeWords(value);
                    setComarca(formattedValue);
                  }}
                  value={comarca}
                  type="text"
                />
              </div>
              <div className="inputs-dados">
                <p>Fonte Pagadora:
                  <div className="erro">{fontePagadoraErro}</div>
                </p>
                <input
                  id="fontePagadora"
                  name="fontePagadora"
                  onChange={(event) => {
                    const { value } = event.target;
                    const formattedValue = capitalizeWords(value);
                    setFontePagadora(formattedValue);
                  }}
                  value={fontePagadora}
                  type="text"
                />
              </div>
              <div className="inputs-dados">
                <p>CNPJ: <div className="erro">{cnpjErro}</div></p>
                <input
                  id="cnpj"
                  name="cnpj"
                  onChange={handleCNPJChange}
                  type="text"
                  value={formatarCNPJ(cnpj)}
                  required
                />
              </div>
              <div className="inputs-dados">
                <p>INSS Reclamante (Opcional):
                </p>
                <input
                  id="INSS"
                  onChange={(event) => handleValorChange(event, setINSS)}
                  type="text"
                  value={formatCurrency(INSS)}
                />
              </div>
              <div className="inputs-dados">
                <p>
                  Valor Bruto Homologado:
                  <FaRegQuestionCircle
                    onMouseEnter={() => setCalcDuvida(5)}
                    onMouseLeave={() => setCalcDuvida(0)}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                  <div className="erro">{brutoHomologadoErro}</div>
                </p>
                <input
                  id="bruto"
                  onChange={(event) => handleValorChange(event, setBrutoHomologado)}
                  type="text"
                  value={formatCurrency(brutoHomologado)}
                />
              </div>
              <div className="inputs-dados">
                <p>
                  Valor Tributável Homologado:
                  <FaRegQuestionCircle
                    onMouseEnter={() => setCalcDuvida(6)}
                    onMouseLeave={() => setCalcDuvida(0)}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                  <div className="erro">{tributavelHomologadoErro}</div>
                </p>
                <input
                  id="trib"
                  onChange={(event) => handleValorChange(event, setTributavelHomologado)}
                  type="text"
                  value={formatCurrency(tributavelHomologado)}
                />
              </div>
              <div className="inputs-dados n-meses">
                <p>
                  Número de Meses:
                  <FaRegQuestionCircle
                    onMouseEnter={() => setCalcDuvida(7)}
                    onMouseLeave={() => setCalcDuvida(0)}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                  <div className="erro">{numeroDeMesesErro}</div>
                </p>
                <input
                  id="meses"
                  type="text"
                  value={numeroDeMeses}
                  onChange={(e) => {
                    const value = e.target.value;
                    const onlyNumbers = value.replace(/\D/g, ''); // Remove any non-numeric characters
                    setNumeroDeMeses(onlyNumbers);
                  }}
                />
              </div>

            </div>
          </div>
          <div className="env-selects">
            <div className="env-alvaras">
              <div className="p">
                Informe o número de Alvarás:
                <FaRegQuestionCircle
                  onMouseEnter={() => setCalcDuvida(8)}
                  onMouseLeave={() => setCalcDuvida(0)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
              </div>
              <select value={fillQtdAlvaras} onChange={handleSelectChange} id="alvaraOptions" name="Quantidade de Alvarás">
                <option value="0">Quantidade de Alvarás</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div ref={alvaraStyleUm} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 1</p>
                  <input id="alvara1" onChange={(event) => handleValorChange(event, setAlvaraUm)} type="text" value={formatCurrency(alvaraUm)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 1</p>
                  <input id="dataalvara1" type="text" value={alvaraUmData} onChange={(event) => handleDataChange(event, setAlvaraUmData)} />
                </div>
              </div>
              <div ref={alvaraStyleDois} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 2</p>
                  <input id="alvara2" onChange={(event) => handleValorChange(event, setAlvaraDois)} type="text" value={formatCurrency(alvaraDois)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 2</p>
                  <input id="dataalvara2" type="text" value={alvaraDoisData} onChange={(event) => handleDataChange(event, setAlvaraDoisData)} />
                </div>
              </div>
              <div ref={alvaraStyleTres} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 3</p>
                  <input id="alvara3" onChange={(event) => handleValorChange(event, setAlvaraTres)} type="text" value={formatCurrency(alvaraTres)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 3</p>
                  <input id="dataalvara3" type="text" value={alvaraTresData} onChange={(event) => handleDataChange(event, setAlvaraTresData)} />
                </div>
              </div>
              <div ref={alvaraStyleQuatro} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 4</p>
                  <input id="alvara4" onChange={(event) => handleValorChange(event, setAlvaraQuatro)} type="text" value={formatCurrency(alvaraQuatro)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 4</p>
                  <input id="dataalvara4" type="text" value={alvaraQuatroData} onChange={(event) => handleDataChange(event, setAlvaraQuatroData)} />
                </div>
              </div>
              <div ref={alvaraStyleCinco} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 5</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraCinco)} type="text" value={formatCurrency(alvaraCinco)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 5</p>
                  <input type="text" value={alvaraCincoData} onChange={(event) => handleDataChange(event, setAlvaraCincoData)} />
                </div>
              </div>
              <div ref={alvaraStyleSeis} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 6</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraSeis)} type="text" value={formatCurrency(alvaraSeis)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 6</p>
                  <input type="text" value={alvaraSeisData} onChange={(event) => handleDataChange(event, setAlvaraSeisData)} />
                </div>
              </div>
              <div ref={alvaraStyleSete} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 7</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraSete)} type="text" value={formatCurrency(alvaraSete)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 7</p>
                  <input type="text" value={alvaraSeteData} onChange={(event) => handleDataChange(event, setAlvaraSeteData)} />
                </div>
              </div>
              <div ref={alvaraStyleOito} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 8</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraOito)} type="text" value={formatCurrency(alvaraOito)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 8</p>
                  <input type="text" value={alvaraOitoData} onChange={(event) => handleDataChange(event, setAlvaraOitoData)} />
                </div>
              </div>
              <div ref={alvaraStyleNove} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 9</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraNove)} type="text" value={formatCurrency(alvaraNove)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 9</p>
                  <input type="text" value={alvaraNoveData} onChange={(event) => handleDataChange(event, setAlvaraNoveData)} />
                </div>
              </div>
              <div ref={alvaraStyleDez} className="Alvara">
                <div className="aba">
                  <p>Valor Alvara 10</p>
                  <input onChange={(event) => handleValorChange(event, setAlvaraDez)} type="text" value={formatCurrency(alvaraDez)} />
                </div>
                <div className="aba">
                  <p>Data Alvara 10</p>
                  <input type="text" value={alvaraDezData} onChange={(event) => handleDataChange(event, setAlvaraDezData)} />
                </div>
              </div>
            </div>
            <div className="env-darfs">
              <div className="p">
                Número de DARF´s recolhidos:
                <FaRegQuestionCircle
                  onMouseEnter={() => setCalcDuvida(9)}
                  onMouseLeave={() => setCalcDuvida(0)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
              </div>
              <select value={fillQtdDarf} onChange={handleSelectChangeDarf} id="darfOptions" name="Quantidade de Darfs">
                <option value="0">Quantidade de DARFs</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div ref={darfStyleUm} className="Darf">
                <div className="aba">
                  <p>Valor DARF 1</p>
                  <input id="darf1" onChange={(event) => handleValorChange(event, setDarfUm)} type="text" value={formatCurrency(darfUm)} />
                </div>
                <div className="aba">
                  <p>Data DARF 1</p>
                  <input id="datadarf1" type="text" value={darfUmData} onChange={(event) => handleDataChange(event, setDarfUmData)} />
                </div>
              </div>
              <div ref={darfStyleDois} className="Darf">
                <div className="aba">
                  <p>Valor DARF 2</p>
                  <input id="darf2" onChange={(event) => handleValorChange(event, setDarfDois)} type="text" value={formatCurrency(darfDois)} />
                </div>
                <div className="aba">
                  <p>Data DARF 2</p>
                  <input id="datadarf2" type="text" value={darfDoisData} onChange={(event) => handleDataChange(event, setDarfDoisData)} />
                </div>
              </div>
              <div ref={darfStyleTres} className="Darf">
                <div className="aba">
                  <p>Valor DARF 3</p>
                  <input onChange={(event) => handleValorChange(event, setDarfTres)} type="text" value={formatCurrency(darfTres)} />
                </div>
                <div className="aba">
                  <p>Data DARF 3</p>
                  <input type="text" value={darfTresData} onChange={(event) => handleDataChange(event, setDarfTresData)} />
                </div>
              </div>
              <div ref={darfStyleQuatro} className="Darf">
                <div className="aba">
                  <p>Valor DARF 4</p>
                  <input onChange={(event) => handleValorChange(event, setDarfQuatro)} type="text" value={formatCurrency(darfQuatro)} />
                </div>
                <div className="aba">
                  <p>Data DARF 4</p>
                  <input type="text" value={darfQuatroData} onChange={(event) => handleDataChange(event, setDarfQuatroData)} />
                </div>
              </div>
              <div ref={darfStyleCinco} className="Darf">
                <div className="aba">
                  <p>Valor DARF 5</p>
                  <input onChange={(event) => handleValorChange(event, setDarfCinco)} type="text" value={formatCurrency(darfCinco)} />
                </div>
                <div className="aba">
                  <p>Data DARF 5</p>
                  <input type="text" value={darfCincoData} onChange={(event) => handleDataChange(event, setDarfCincoData)} />
                </div>
              </div>
              <div ref={darfStyleSeis} className="Darf">
                <div className="aba">
                  <p>Valor DARF 6</p>
                  <input onChange={(event) => handleValorChange(event, setDarfSeis)} type="text" value={formatCurrency(darfSeis)} />
                </div>
                <div className="aba">
                  <p>Data DARF 6</p>
                  <input type="text" value={darfSeisData} onChange={(event) => handleDataChange(event, setDarfSeisData)} />
                </div>
              </div>
              <div ref={darfStyleSete} className="Darf">
                <div className="aba">
                  <p>Valor DARF 7</p>
                  <input onChange={(event) => handleValorChange(event, setDarfSete)} type="text" value={formatCurrency(darfSete)} />
                </div>
                <div className="aba">
                  <p>Data DARF 7</p>
                  <input type="text" value={darfSeteData} onChange={(event) => handleDataChange(event, setDarfSeteData)} />
                </div>
              </div>
              <div ref={darfStyleOito} className="Darf">
                <div className="aba">
                  <p>Valor DARF 8</p>
                  <input onChange={(event) => handleValorChange(event, setDarfOito)} type="text" value={formatCurrency(darfOito)} />
                </div>
                <div className="aba">
                  <p>Data DARF 8</p>
                  <input type="text" value={darfOitoData} onChange={(event) => handleDataChange(event, setDarfOitoData)} />
                </div>
              </div>
              <div ref={darfStyleNove} className="Darf">
                <div className="aba">
                  <p>Valor DARF 9</p>
                  <input onChange={(event) => handleValorChange(event, setDarfNove)} type="text" value={formatCurrency(darfNove)} />
                </div>
                <div className="aba">
                  <p>Data DARF 9</p>
                  <input type="text" value={darfNoveData} onChange={(event) => handleDataChange(event, setDarfNoveData)} />
                </div>
              </div>
              <div ref={darfStyleDez} className="Darf">
                <div className="aba">
                  <p>Valor DARF 10</p>
                  <input onChange={(event) => handleValorChange(event, setDarfDez)} type="text" value={formatCurrency(darfDez)} />
                </div>
                <div className="aba">
                  <p>Data DARF 10</p>
                  <input type="text" value={darfDezData} onChange={(event) => handleDataChange(event, setDarfDezData)} />
                </div>
              </div>
            </div>
            <div className="env-honorarios">
              <div className="p">
                Informe a quantidade de honorários pagos:
                <FaRegQuestionCircle
                  onMouseEnter={() => setCalcDuvida(10)}
                  onMouseLeave={() => setCalcDuvida(0)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
              </div>
              <select value={fillQtdHonorarios} onChange={handleSelectChangeHonorarios} id="honorariosOptions" name="Quantidade de Honorários">
                <option value="0">Quantidade de Honorários</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div ref={honorariosStyleUm} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 1</p>
                  <input id="honorarios1" onChange={(event) => handleValorChange(event, setHonorariosUm)} type="text" value={formatCurrency(honorariosUm)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 1</p>
                  <input id="anohonorarios1" type="text" maxLength="4" value={honorariosUmData} onChange={(e) => setHonorariosUmData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleDois} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 2</p>
                  <input id="honorarios2" onChange={(event) => handleValorChange(event, setHonorariosDois)} type="text" value={formatCurrency(honorariosDois)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 2</p>
                  <input id="anohonorarios2" type="text" maxLength="4" value={honorariosDoisData} onChange={(e) => setHonorariosDoisData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleTres} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 3</p>
                  <input id="honorarios3" onChange={(event) => handleValorChange(event, setHonorariosTres)} type="text" value={formatCurrency(honorariosTres)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 3</p>
                  <input id="anohonorarios3" type="text" maxLength="4" value={honorariosTresData} onChange={(e) => setHonorariosTresData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleQuatro} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 4</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosQuatro)} type="text" value={formatCurrency(honorariosQuatro)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 4</p>
                  <input type="text" maxLength="4" value={honorariosQuatroData} onChange={(e) => setHonorariosQuatroData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleCinco} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 5</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosCinco)} type="text" value={formatCurrency(honorariosCinco)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 5</p>
                  <input type="text" maxLength="4" value={honorariosCincoData} onChange={(e) => setHonorariosCincoData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleSeis} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 6</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosSeis)} type="text" value={formatCurrency(honorariosSeis)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 6</p>
                  <input type="text" maxLength="4" value={honorariosSeisData} onChange={(e) => setHonorariosSeisData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleSete} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 7</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosSete)} type="text" value={formatCurrency(honorariosSete)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 7</p>
                  <input type="text" maxLength="4" value={honorariosSeteData} onChange={(e) => setHonorariosSeteData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleOito} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 8</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosOito)} type="text" value={formatCurrency(honorariosOito)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 8</p>
                  <input type="text" maxLength="4" value={honorariosOitoData} onChange={(e) => setHonorariosOitoData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleNove} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 9</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosNove)} type="text" value={formatCurrency(honorariosNove)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 9</p>
                  <input type="text" maxLength="4" value={honorariosNoveData} onChange={(e) => setHonorariosNoveData(e.target.value)} />
                </div>
              </div>
              <div ref={honorariosStyleDez} className="Honorarios">
                <div className="aba">
                  <p>Valor Honorarios 10</p>
                  <input onChange={(event) => handleValorChange(event, setHonorariosDez)} type="text" value={formatCurrency(honorariosDez)} />
                </div>
                <div className="aba">
                  <p>Ano Honorarios 10</p>
                  <input type="text" maxLength="4" value={honorariosDezData} onChange={(e) => setHonorariosDezData(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          {loading && <div className="loading-spinner"></div>}
          <br />
          <div disabled className="button" onClick={handleEnviarDados}>
            <p>Calcular</p>
            <FaArrowRight width={16} />
          </div>
        </div>

        <div ref={paymentDiv} className="env-all-pay">
          <ValorRestituir finalSomaCorrigido={finalSomaCorrigido} />
          <div class="env-ops">
            <div
              ref={starterPlan}
              class="ops"
              onClick={() => handleSelectPlan('Starter')}
              style={{
                border: plan === 'Starter' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <div class="title-ops">Starter</div>
              <div class="desc-ops">Descubra o valor exato que você tem direiro a restituir!</div>
              <div class="valor-ops">{formatCurrency(starter * 100)}</div>
            </div>
            <div
              ref={builderPlan}
              class="ops"
              onClick={() => handleSelectPlan('Builder')}
              style={{
                border: plan === 'Builder' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <div class="title-ops">Builder</div>
              <div class="desc-ops">Receba os documentos necessários e as orientações para restituir o valor retido!</div>
              <div class="valor-ops">{formatCurrency(builder * 100)}</div>
            </div>
            <div
              ref={specialistPlan}
              class="ops"
              onClick={() => handleSelectPlan('Specialist')}
              style={{
                border: plan === 'Specialist' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <div class="title-ops">Specialist</div>
              <div class="desc-ops">Tenha uma equipe de advogados e contadores para realizar o processo para você!</div>
              <div class="valor-ops">{formatCurrency(specialist * 100)}</div>
            </div>
          </div>
          <div ref={payStarter} className="env-pay" id="env-pay">
            <h1>Escolha o método de pagamento:</h1>
            {showPlan && <h4>Plano selecionado: {showPlan}</h4>}
            <h4>Checkout: {formatCurrency(valueCheck * 100)}</h4>
            <form onSubmit={handleSubmitUm}>
              <div className="pay-method">
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('PIX')}
                  style={{
                    border: paymentMethod === 'PIX' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <FaPix size={30} />
                </button>
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('CREDIT_CARD')}
                  style={{
                    border: paymentMethod === 'CREDIT_CARD' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <CiCreditCard1 size={35} />
                </button>
              </div>
              <button className="button pay" type="submit">
                <p>Pagar</p>
                <FaArrowRight width={16} />
              </button>
            </form>
          </div>
          <div ref={payBuilder} className="env-pay" id="env-pay">
            <h1>Escolha o método de pagamento:</h1>
            {showPlan && <h4>Plano selecionado: {showPlan}</h4>}
            <h4>Checkout: {formatCurrency(valueCheck * 100)}</h4>
            <form onSubmit={handleSubmitDois}>
              <div className="pay-method">
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('PIX')}
                  style={{
                    border: paymentMethod === 'PIX' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <FaPix size={30} />
                </button>
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('CREDIT_CARD')}
                  style={{
                    border: paymentMethod === 'CREDIT_CARD' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <CiCreditCard1 size={35} />
                </button>
              </div>
              <button className="button pay" type="submit">
                <p>Pagar</p>
                <FaArrowRight width={16} />
              </button>
            </form>
          </div>

          <div ref={paySpecialist} className="env-pay" id="env-pay">
            <h1>Escolha o método de pagamento:</h1>
            {showPlan && <h4>Plano selecionado: {showPlan}</h4>}
            <h4>Checkout: {formatCurrency(valueCheck * 100)}</h4>
            <form onSubmit={handleSubmitTres}>
              <div className="pay-method">
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('PIX')}
                  style={{
                    border: paymentMethod === 'PIX' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <FaPix size={30} />
                </button>
                <button
                  className="choose"
                  type="button"
                  onClick={() => handleSelect('CREDIT_CARD')}
                  style={{
                    border: paymentMethod === 'CREDIT_CARD' ? '2px solid #00FF77' : '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    margin: '5px'
                  }}
                >
                  <CiCreditCard1 size={35} />
                </button>
              </div>
              <button className="button pay" type="submit">
                <p>Pagar</p>
                <FaArrowRight width={16} />
              </button>
            </form>
          </div>
        </div>
        {paymentCompletedUm && updateHiddenPlansUm()}
        {paymentCompletedDois && updateHiddenPlansDois()}
        {paymentCompletedTres && updateHiddenPlansTres()}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 0.8,
    borderRightWidth: 0,
    borderBottomWidth: 0.2
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 0.8,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 5,
  },
  tableCellData: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    textAlign: 'Left',
    paddingLeft: 5,
  },
  tableCellHeader: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 15,
  },
  tableCellCenter: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    backgroundColor: "#bfbfbf",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 0.8,
    color: "#2D4152",
    fontStyle: "italic",
    borderLeftWidth: 0,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.4,
    borderRightWidth: 0,
  },
  logo: {
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const stylesEsc = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: '#000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 3,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    marginTop: 6,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
  },
  tableDois: {
    display: 'table',
    width: 'auto',

  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
  },
  tableCell: {
    margin: 3,
    fontSize: 8,
    textAlign: 'left',
  },
  tableCellNum: {
    margin: 3,
    fontSize: 8,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 8,
    textAlign: 'center',
  },
  top: {
    borderTopWidth: 2,
  },
  topUm: {
    borderTopWidth: 1,
    width: "30%",
    marginTop: 5,
  },
  sectionLeft: {
    textAlign: 'right',
  },
  sectionMidle: {
    fontSize: 9.4,
    marginTop: 6,
  },
  sectionMidleDois: {
    textAlign: 'center',
  },
  sectionMidleTres: {
    textAlign: 'center',
    marginTop: 10,
  },
  sectionMidleDoisBar: {
    textAlign: 'center',
    textDecoration: 'underline',
  },
  tableImg: {
    flex: 1,
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
    display: 'flex',
    marginTop: 10,
    width: '100%',
  },
  logo: {
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});