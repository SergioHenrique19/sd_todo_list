/* eslint-disable no-unused-vars */
import {
  CheckCircleTwoTone, DeleteTwoTone, EditOutlined, FileDoneOutlined, PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Card, Checkbox, Col, DatePicker, Form, Input, Layout, Modal, Row, Spin, Typography,
} from 'antd';
import Tarefa from 'interfaces/tarefa';
import TarefaForm from 'interfaces/tarefaForm';
import moment from 'moment';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  createTarefa, deleteTarefa, getTarefas, updateTarefa,
} from 'services/tarefas';
import './index.css';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

export default function Home() {
  const { isLoading, data, refetch } = useQuery('tarefas', getTarefas);
  const deleteTarefaMutation = useMutation(deleteTarefa, { onSuccess: () => refetch() });
  const createTarefaMutation = useMutation(createTarefa, { onSuccess: () => refetch() });
  const updateTarefaMutation = useMutation(updateTarefa, { onSuccess: () => refetch() });

  const [tarefaFormAtual, setTarefaFormAtual] = React.useState<TarefaForm|undefined>(undefined);
  const [isModalTarefaVisible, setIsModalTarefaVisible] = React.useState(false);

  const handleOnCancelModalTarefa = React.useCallback(() => {
    setIsModalTarefaVisible(false);
  }, []);

  const handleOnClickCriarTarefa = React.useCallback(() => {
    setTarefaFormAtual(undefined);
    setIsModalTarefaVisible(true);
  }, []);

  const handleOnClickDeleteTarefa = React.useCallback((tarefa:Tarefa) => {
    deleteTarefaMutation.mutate(tarefa.id);
  }, []);

  const handleOnClickEditarTarefa = React.useCallback((tarefa: Tarefa) => {
    const tarefaForm: TarefaForm = {
      ...tarefa,
      prazo: moment(tarefa.prazo),
    };
    setTarefaFormAtual(tarefaForm);
    setIsModalTarefaVisible(true);
  }, []);

  const handleOnClickToggleCompleta = React.useCallback((tarefa: Tarefa) => {
    const toggle: Tarefa = {
      ...tarefa,
      completa: !tarefa.completa,
    };
    updateTarefaMutation.mutate(toggle);
  }, []);

  const handleOnFinishFormulario = React.useCallback((tarefaForm: TarefaForm) => {
    if (tarefaFormAtual) {
      const tarefa: Tarefa = {
        ...tarefaForm,
        id: tarefaFormAtual.id,
        prazo: tarefaForm.prazo.toISOString(),
      };
      updateTarefaMutation.mutate(tarefa);
    } else {
      const tarefa: Tarefa = {
        ...tarefaForm,
        prazo: tarefaForm.prazo.toISOString(),
      };
      createTarefaMutation.mutate(tarefa);
    }
    setIsModalTarefaVisible(false);
  }, [tarefaFormAtual]);

  return (
    <>
      <Modal destroyOnClose title={tarefaFormAtual ? 'Editar Tarefa' : 'Criar Tarefa'} onCancel={handleOnCancelModalTarefa} visible={isModalTarefaVisible} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={tarefaFormAtual}
          onFinish={handleOnFinishFormulario}
          autoComplete="off"
        >
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[{ required: true, message: 'Por favor, preencha a descrição da tarefa.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Prazo"
            name="prazo"
            rules={[{ required: true, message: 'Por favor, preencha o prazo da tarefa.' }]}
          >
            <DatePicker className="full-width" showTime={{ format: 'HH:mm' }} />
          </Form.Item>
          <Form.Item name="completa" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Completa?</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit" className="full-width">
              {tarefaFormAtual ? 'Editar' : 'Criar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Layout className="full-height">
        <Header>Header</Header>
        <Content className="full-height content">
          <Spin spinning={isLoading || createTarefaMutation.isLoading || deleteTarefaMutation.isLoading} className="full-height">
            <div className="frame">
              <Row justify="space-between">
                <Col><Title level={2}>Tarefas</Title></Col>
                <Col><Button icon={<PlusOutlined />} type="primary" onClick={handleOnClickCriarTarefa}>Criar Tarefa</Button></Col>
              </Row>
              <Row gutter={16}>
                {data?.map((tarefa) => (
                  <Col span={24} md={12} lg={8} xl={6}>
                    <Card
                      className="card"
                      actions={[
                        <DeleteTwoTone twoToneColor="#eb2f96" key="delete" onClick={() => handleOnClickDeleteTarefa(tarefa)} />,
                        <EditOutlined key="editar" onClick={() => handleOnClickEditarTarefa(tarefa)} />,
                        tarefa.completa ? <CheckCircleTwoTone key="completar" twoToneColor="#52c41a" onClick={() => handleOnClickToggleCompleta(tarefa)} /> : <FileDoneOutlined key="completar" onClick={() => handleOnClickToggleCompleta(tarefa)} />,
                      ]}
                      key={tarefa.id}
                    >
                      <div>
                        <Text>{tarefa.descricao}</Text>
                      </div>
                      <div>
                        <Text type="secondary">{new Date(tarefa.prazo).toLocaleString('pt-BR')}</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Spin>
        </Content>
        <Footer>
          <Text>João Victor Teófilo Salgado &amp; Sérgio Henrique Menta Garcia</Text>
        </Footer>
      </Layout>
    </>
  );
}
