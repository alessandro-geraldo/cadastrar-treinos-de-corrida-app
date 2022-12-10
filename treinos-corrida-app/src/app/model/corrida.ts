export class Corrida {
    id!: string;
    calorias?: number;
    intensidade?: string;
    tempo?: number;
    frequenciaCardiaca?: number;

    constructor(id: string){
        this.id = id;
    }
    
    public static clone(corrida: Corrida){
        let c: Corrida = new Corrida(corrida.id);
         c.id = corrida.id;
         c.calorias = corrida.calorias;
         c.frequenciaCardiaca = corrida.frequenciaCardiaca;
         c.intensidade = corrida.intensidade;
         c.tempo = corrida.tempo;
         return c;
    }


}