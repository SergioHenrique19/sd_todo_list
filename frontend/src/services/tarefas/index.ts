import Tarefa from 'interfaces/tarefa';
import axios from 'services/axios';

export async function getTarefas(): Promise<Tarefa[]> {
  const response = await axios.get('/tarefas');
  return response.data;
}

export async function getTarefa(id: number): Promise<Tarefa> {
  const response = await axios.get(`/tarefas/${id}`);
  return response.data;
}

export async function deleteTarefa(id: number) {
  await axios.delete(`/tarefas/${id}`);
}

export async function createTarefa(tarefa: Tarefa) {
  await axios.post('/tarefas', tarefa);
}

export async function updateTarefa(tarefa: Tarefa) {
  await axios.put(`/tarefas/${tarefa.id}`, tarefa);
}
