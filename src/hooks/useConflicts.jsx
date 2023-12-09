import { useQuery } from 'react-query'
import {ConflictService} from "../services/conflicts.service"

const useConflicts = () => {
    const {data, isLoading} = useQuery({
        queryKey: 'conflict',
        queryFn: () => ConflictService.findConflict(),
        initialData: [
          {
            id: "1",
            firstName: "Maria",
            lastName: "Zambrano",
            email:"mzamb@gmail.com",
            title:"Humedal El culebron",
            description:"Situado frente a la playa Changa, es un ecosistema al que llegan miles de aves migratorias. En 2015, tras el terremoto y tsunami del 16 de septiembre, los habitantes del sector denunciaron malos olores y contaminación de susu aguas.",
            lat: -29.95965000,
            lng: -71.32187000,
            date: "12-09-2022",
            status:"Amenaza",
            location: "Sector El Culebron",
            imageUrl: 'https://i.ytimg.com/vi/js1ajwcwpBQ/maxresdefault.jpg',
         },
         {
          id: "2",
          firstName: "Maria",
          lastName: "Zambrano",
          email:"mzamb@gmail.com",
          title:"Relleno Sanitario El Panul",
          description:"Conflicto causado por residuos, emisiones e inmisiones. Los habitantes de sectores como La Rinconada de El Sauce, La Herradura y El Peñón manifestaron al edil su preocupación respecto a malos olores, vectores de contaminación como aves y perros, además de diversas plagas como mosca y ratas que han llegado a sus viviendas.",
          lat: -30.00050,
          lng: -71.38431,
          date: "20-12-2022",
          status:"Amenaza",
          location: "Sector Altos del Panul",
          imageUrl: 'http://impreso.diarioeldia.cl/sites/default/files/styles/fullscreen/public/102019/una_moderna_maquina.jpg?itok=61StIdbN',
       },
       {
        id: "3",
        firstName: "Maria",
        lastName: "Zambrano",
        email:"mzamb@gmail.com",
        title:"Contaminación del río Choapa por Mina Los Pelambres",
        description:"Desde que las operaciones entraron en funcionamiento vecinos y organizaciones ambientales han acusado a la compañía de distintos eventos de contaminación, uno de estos, derrames en diversos afluentes de los ríos Choapa y Cuncumén, poniendo en grave riesgo el recurso hídrico de la zona. Esta situación fue respaldada por la Dirección General de Agua a través de un estudio que indicó elevación transitoria de los niveles de Sulfatos y Molibdeno.",
        lat: -31.8975,
        lng: -70.642778,
        date: "26-12-2017",
        status:"Amenaza",
        location: "Illapel, Los Vilos y Salamanca",
        imageUrl: 'https://www.davidnoticias.cl/wp-content/uploads/2018/01/agua-rtio.png',
     },
     {
      id: "4",
      firstName: "Maria",
      lastName: "Zambrano",
      email:"mzamb@gmail.com",
      title:"Mina Carmen de Andacollo",
      description:"Desde los inicios de la operación, la comunidad local ha planteado que la mina pone en riesgo la vida de los habitantes de la localidad, particularmente por la contaminación ambiental que se generaría producto de las “tronaduras”, los malos olores por los químicos usados en el procesamiento del cobre y su temor que las pilas de desechos se filtren a las napas de agua.",
      lat: -30.216667,
      lng: -71.083333,
      date: "21-12-2017",
      status:"Amenaza",
      location: "Andacollo",
      imageUrl: 'https://www.elandacollino.cl/wp-content/uploads/2023/06/minera-teck-carmen-tematica.jpg',
    }
        ],
    });
  return {
    conflict: data,
    isLoading
  }
}

export default useConflicts