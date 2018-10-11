# 报文列表

## 1. 请求用户详情 srv -> client

### 请求
```
{
  'cmd': 'query.user.id'
}
```
### 返回
```
{
  'cmd': 'ack.user.id'
  'success': true/false,
  'payload': {
    'id': 'phone number',
    'alias': 'user alias'
  }
}
```
