import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Form, Button, Input, Flex, notification, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query';
import { login, register } from '../../api/login/mutations';
import { Login, Signup } from '../../api/login/Login-types';
import Cookies from 'universal-cookie';
import { useUserStore } from '../../store/UserStore';
import { useState } from 'react';



export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const onFinish = (values: never) => {
    if(newAcc) signUpMutation.mutate(values as Signup)
    else loginMutation.mutate(values as Login)
  };
  const [newAcc,setNewAcc]=useState(false)
  const cookie = new Cookies()
  const store= useUserStore()
  const setName = store.setName;
  const setEmail = store.setEmail;
  const setId = store.setId;
  const navigate=useNavigate()
  const loginMutation = useMutation({
    mutationFn: (val: Login) => {
      return login(val)
    },
    onSuccess: (res) => {
      cookie.set("token", "Bearer" + " " + res?.data?.access_token, {
        path: "/",
      });
      notification.success({ message: "Logged in successfully" })
      setEmail(res?.email);
      setName(res?.data?.name);
      setId(res?.data?.id);
      navigate({to:'/home'})
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err:any) => {
     
      notification.error({
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  })

  const signUpMutation=useMutation({
    mutationFn:(values:Signup)=>{
        return register(values)
      },
      onSuccess:(res)=>{
        notification.success({message:res?.message})
        setNewAcc(false)
      },
      onError:(err)=>{
        console.log(err?.message);
        notification.error({message:"Something went wrong"})
      }
})

  return (
    <Flex style={{ width: '100vw', height: '100vh' }} justify='center' align='center'>
      <Col>
      <h2>{newAcc?"Register":"Login"}</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{}}
        onFinish={onFinish}
      >
        {newAcc&&
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <p style={{cursor:'pointer'}} onClick={()=>{setNewAcc(true)}}>Register now!</p>
        </Form.Item>
      </Form>
      </Col>
    </Flex>
  )
}
