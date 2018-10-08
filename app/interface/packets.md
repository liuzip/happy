# 报文列表

## 1. 请求用户详情 srv -> client

### 请求
```
{
  'cmd': 'queryUserId',
  'type': 'request'
}
```
### 返回
```
{
  'cmd': 'queryUserId',
  'type': 'response',
  'payload': {
    'id': 'phone number',
    'alias': 'user alias'
  }
}
```
