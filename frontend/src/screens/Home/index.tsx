import {
  CheckCircleTwoTone, DeleteOutlined, EditOutlined, FileDoneOutlined, PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Card, Checkbox, Col, DatePicker, Form, Input, Layout, Modal, Row, Typography,
} from 'antd';
import Tarefa from 'interfaces/tarefa';
import moment from 'moment';
import React from 'react';
import './index.css';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

export default function Home() {
  const [tarefaAtual, setTarefaAtual] = React.useState<Tarefa|undefined>(undefined);
  const [isModalTarefaVisible, setIsModalTarefaVisible] = React.useState(false);

  const handleOnCancelModalTarefa = React.useCallback(() => {
    setIsModalTarefaVisible(false);
  }, []);

  const handleOnClickCriarTarefa = React.useCallback(() => {
    setTarefaAtual(undefined);
    setIsModalTarefaVisible(true);
  }, []);

  const handleOnClickEditarTarefa = React.useCallback((tarefa: Tarefa) => {
    setTarefaAtual(tarefa);
    setIsModalTarefaVisible(true);
  }, []);

  const handleOnFinishFormulario = React.useCallback((values: Tarefa) => {
    console.log(values);
    setIsModalTarefaVisible(false);
  }, []);

  const tarefas: Tarefa[] = [
    {
      id: 0, descricao: 'teste 1', completa: true, prazo: moment('2016-08-29T09:12:33.001Z'),
    },
    {
      id: 1, descricao: 'teste 2', completa: false, prazo: moment('2016-08-30T09:12:33.001Z'),
    },
    {
      id: 2, descricao: 'teste 3', completa: true, prazo: moment('2016-08-31T09:12:33.001Z'),
    },
    {
      id: 3, descricao: 'teste 4', completa: true, prazo: moment('2016-02-29T09:12:33.001Z'),
    },
    {
      id: 4, descricao: 'teste 5', completa: false, prazo: moment('2016-07-30T09:12:33.001Z'),
    },
    {
      id: 5, descricao: 'teste 6', completa: true, prazo: moment('2016-09-31T09:12:33.001Z'),
    },
  ];

  return (
    <>
      <Modal destroyOnClose title={tarefaAtual ? 'Editar Tarefa' : 'Criar Tarefa'} onCancel={handleOnCancelModalTarefa} visible={isModalTarefaVisible} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={tarefaAtual}
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
              {tarefaAtual ? 'Editar' : 'Criar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Layout className="full-height">
        <Header>Header</Header>
        <Content className="full-height content">
          <div className="frame">
            <Row justify="space-between">
              <Col><Title level={2}>Tarefas</Title></Col>
              <Col><Button icon={<PlusOutlined />} type="primary" onClick={handleOnClickCriarTarefa}>Criar Tarefa</Button></Col>
            </Row>
            <Row gutter={16}>
              {tarefas.map((tarefa) => (
                <Col span={24} md={12} lg={8} xl={6}>
                  <Card
                    className="card"
                    actions={[
                      <DeleteOutlined key="apagar" />,
                      <EditOutlined key="editar" onClick={() => handleOnClickEditarTarefa(tarefa)} />,
                      tarefa.completa ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <FileDoneOutlined />,
                    ]}
                    key={tarefa.id}
                  >
                    <div>
                      <Text>{tarefa.descricao}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{tarefa.prazo.toLocaleString()}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        <Footer>
          <Text>João Victor Teófilo Salgado &amp; Sérgio Henrique Menta Garcia</Text>
        </Footer>
      </Layout>
    </>
  );
}
