import { Moment } from 'moment';

interface TarefaForm {
  id: number
  descricao: string,
  prazo: Moment,
  completa: boolean
}

export default TarefaForm;
