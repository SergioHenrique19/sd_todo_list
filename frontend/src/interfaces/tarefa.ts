import { Moment } from 'moment';

interface Tarefa {
  id: number
  descricao: string,
  prazo: Moment,
  completa: boolean
}

export default Tarefa;
